import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Platform, Text, Dimensions, View } from "react-native";
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import Button from "../components/Button"
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import { StorageAccessFramework } from 'expo-file-system';
import TabletsApi from "../api/tablet";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import * as Network from 'expo-network';
import UploadScreen from "./UploadScreen";
import * as Progress from "react-native-progress";
import authStorage from "../auth/storage";


import { ProgressBar } from 'react-native-paper';


import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import colors from "../config/colors";
import { StatusBar } from 'expo-status-bar';
import { useAssets } from "expo-asset";
import { documentDirectory, readAsStringAsync } from "expo-file-system";
import { color } from "react-native-reanimated";
import { ScrollView } from "react-native";
import {
  FormCheckboxList as CheckBoxList,FormSwitch as Switch
} from "../components/forms";
function DownloadTabletScreen() {
  var { height, width } = Dimensions.get('window');
  const { user } = useAuth();
  var success=true;

  height = height;
  const [app, setApp] = useState('GIS');
  const [rUrl, serrUrl] = useState('http://10.11.20.10/FilesWebsite/');//('http://10.11.20.9/GIS-App-Website/');
  const [pUrl, setPUrl] = useState('http://maps.hebron-city.ps/FilesWebsite/');//('http://10.11.20.9/GIS-App-Website/');

  const tabletDir = FileSystem.documentDirectory + 'TabletFiles/';
   const [uploadVisible, setUploadVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const countRef = useRef()
  const [isEnabled, setIsEnabled] = useState(false);
  const [userFiles,setUserFiles]=useState({loading:false,data:[]});
  const [seletedFiles,setSelectedFiles]=useState([]);
  const [checkedItems,setCheckedItems]=useState(null);
  const [count,setCount]=useState(0);


  const [progress, setProgress] = useState(0);

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
 
  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);

  }
  const getTabletFiles = async () => {
    setUserFiles({loading:false, data:[] });
    var token = await authStorage.getToken();
    var APP_ID = await authStorage.getAppId();

    const result = await TabletsApi.GetTabletsFiles(APP_ID);
     if (!result.ok) { 
       setUserFiles({ loading: false, data: null });
       console.log(result);
       setError(true);
       return;
     }
     console.log(result);
      //var d=result.data.ResponseObject;
      var d=result.data;

       
      // console.log(d);
     setUserFiles({ loading: false, data: d});
    
   };

  const getUserFiles = async()=>
  {
    const filesMap = new Map();
    var files=[
      {"id":"gisbuildings","b":"صصص","c":"الأبنية"},
      {"id":"gisunitsdetails","b":"صصص","c":"الوحدات"},
      {"id":"talabatrej","b":"صصص","c":"الطلبات"},
      {"id":"parcels","b":"صصص","c":"القطع"}
    ];
    setUserFiles({loading:false, data:files });
    files.forEach((file) => {
     // console.log(file.id);
      filesMap.set(file.id, false);
    });
    setCheckedItems(filesMap);



  }
 

  const handleSubmit = async (Request, { resetForm }) => {
    setSelectedFiles(Request.FilesList);
    //console.log(Request.FilesList);
    await DownAllSelectedFiles(Request.FilesList);
   // resetForm();   
  };

  async function DownAllSelectedFiles(FilesList)
{  var lastIndex=FilesList.length-1;
  if(lastIndex==-1)return;

  
  setLoading(true);
  setCount(0);
  success=true;
  FilesList.forEach((file,index) => {
    downloadFile(file,lastIndex,index);  
});

}
  const downloadFile = async(filename,total,idx) => {
    let remoteUrl = rUrl+user.serialnumber+'/'+filename+".js";  
    if(isEnabled)  
    remoteUrl =  pUrl+user.serialnumber+'/'+filename+".js"; 
    else
    remoteUrl =  rUrl+user.serialnumber+'/'+filename+".js"; 
    let localPath = tabletDir+"jsondata"+'/'+filename+".js";  
    await FileSystem.downloadAsync(remoteUrl, localPath).then(({uri}) => {
    console.log("  From  "+remoteUrl+"  Local   "+localPath+"     was downloaded...  ");
    success=success&true;
   // console.log("Count= ",idx);
    if(idx==total-1)
    {
      console.log("Completed");setLoading(false);
      setInfo({
        Status: "تم إنهاء التنزيل",
        
      });
    
    }
    else setCount(count+1);

    return;
     }).catch(error => {
      console.error(error);
    });
     success=false;
  }
  useEffect(() => {
    handleNetwork();
   // getUserFiles();
   getTabletFiles(); 
   //console.log(progress);
    //if(!loading)setProgress(0);
  }, [countRef.current]);

  return (

    <Screen style={styles.screen}>
      {info && (
        <Info
          numberOfLines={5}
          buttonText="أعد التنزيل"
          buttonVisible={true}
          color={colors.danger}
          message={
            (success? (" تم إنهاء التنزيل بنجاح!" + "\n")
              : "حدث خلل أثناء التنزيل")
          }
          onPress={() => setInfo(null)}
        />
      )}
      {true && <UploadScreen
        onDone={() => {
          setUploadVisible(false);
          countRef.current = 0;
        }}
        progress={progress}
        visible={uploadVisible}
      />}
      <ActivityIndicator visible={loading} />

      <View style={{ alignSelf: "center", width: '80%' }}>
        <Form
          initialValues={
            {
              "App": { label: 'نظم المعلومات الجغرافية', value: 'GIS' },
              "URL": rUrl,"PublicURL": pUrl,
              "FilesList":[],
            }}
          onSubmit={handleSubmit}
  
          ><ScrollView>
         {user.serialnumber=="1927"&& <Field
            name="URL"
            showPlaceholder={true}
            placeholder={"رابط الخدمة من داخل البلدية"}
            style={[styles.name]}
            onChangeT={(url) => {
              console.log(url);
              serrUrl(url);
            }}
          />}
           {user.serialnumber=="1927"&&<Field
            name="PublicURL"
            showPlaceholder={true}
            placeholder={"رابط الخدمة من خارج البلدية"}
            style={[styles.name]}
            onChangeT={(url) => {
              console.log(url);
              serrUrl(url);
            }}
          />}
          <Switch
          height={12}
          style={{ transform:[{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#378ffa' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          name="urlSwitch"
          onValueChange={toggleSwitch}
          value={isEnabled}
          placeholder="الشبكـة الخارجيـة"
           />        
          <CheckBoxList
                name={"FilesList"}
               // on
                //values={getBorcDetayApi.data.borcSorgulamaC?.borcListesi.map(
                values={userFiles.data?.map(
                  (val) => {
                    return {
                      id: val.File_Name,
                    //  preTitle: "الوحدات: " + val.b,
                      preSubTitle: val.File_Name_AR ,//+ " ₺",
                     // title:  "الملفاات: " ,//+
                        //dayjs(val.sonOdemeTarihi).format("DD/MM/YYYY"),
                     // subTitle: "البيانات: " + val.a,
                    };
                  }
                )}
              />
            <SubmitButton  title="تنزيل البيانات المحددة" />
            </ScrollView>
        </Form>
        </View>
    </Screen>
  );
}
export default DownloadTabletScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  ProgressBar:
  {
    alignSelf: "center",
    alignContent: "center",
    marginTop: 10,
    width: '90%',
    // marginHorizontal:'20%'
  },
  buttonClose: {
    width: "80%",
    alignSelf: "center",


  },
  name:
  {
    marginTop: 10,
    fontSize: 16,
    color: colors.instagram

  },
  buttonTxt: {
    color: colors.white,
    fontSize: 17.5,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"

  },
});
