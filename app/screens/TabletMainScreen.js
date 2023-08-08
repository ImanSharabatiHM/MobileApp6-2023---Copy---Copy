import React,{useState,useEffect } from "react";
import { StyleSheet,Platform ,Text,Dimensions ,View} from "react-native";
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import Button from"../components/Button"
import { ScrollView } from "react-native";

import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import { StorageAccessFramework } from 'expo-file-system';
import CustomerApi from "../api/customer";
import authStorage from "./../auth/storage";
import ActivityIndicator from "../components/ActivityIndicator";
import { ListItem, ListItemSeparator } from "../components/lists";

import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import colors from "../config/colors";
import { StatusBar } from 'expo-status-bar';
import { useAssets } from "expo-asset";
import { documentDirectory, readAsStringAsync } from "expo-file-system";
import { color } from "react-native-reanimated";
import routes from "../navigation/routes";
function TabletMainScreen(props)  {
  //console.log(FileSystem.documentDirectory);
  //console.log(FileSystem.cacheDirectory);
  //console.log(FileSystem.bundleDirectory.getInfoAsync());


  var { height, width } = Dimensions.get('window');
  height = height ;
  const [docsList, setDocsList] = useState([]);
  const[writePath,setWritePath]=useState("");
  const[filePath,setFilePath]=useState("");
  const { user } = useAuth();

  const [app,setApp]=useState({loading:false,data:null});
  const [rUrl,serrUrl]=useState(user.serialnumber);//('http://10.11.20.9/GIS-App-Website/');
  const [empName,setEmpName]=useState(user.name);//('http://10.11.20.9/GIS-App-Website/');

  const tabletDir= FileSystem.documentDirectory+'TabletFiles/';

  const maintabletDir= '';
  const jsDir='js';
  const cssDir='css';
  const scssDir='css';
  const metadateDir='metadata';
  const svgsDir='svgs';
  const spritesDir='sprites';
  const webfontsDir='webfonts';
  const fontsDir='fonts';
  const imgsDir='imgs';
  const lessDir='less';
  const tilesDir='tiles';

  const jsondateDir='jsondata';
  const dirsList=[maintabletDir,jsDir,cssDir,scssDir,metadateDir,svgsDir,spritesDir,webfontsDir,fontsDir,imgsDir,lessDir,jsondateDir];
  const updateFiles=['updates','backup','logs','pics'];
  
 function getFileUri(uri,name) {
 console.log(uri + `${encodeURI("/"+name)}.txt`);
  return uri + `${encodeURI(name)}.txt`;
}
 async function writeFile(path,data){
  let result = null;
   console.log("will write file .... "+path);
  try {
      result = await StorageAccessFramework.writeAsStringAsync(path,data);
  } catch(e) {
      console.log(e);
  }
  
 
}
 
const getEmpDetails = async () => {
  setApp({loading:true,data:null});

  var token = await authStorage.getToken();
  const result = await CustomerApi.GetEmpAppDetails(token);
  if (!result.ok) { 
    setApp({loading:false,data:null});
   
    return;
  }
  console.log(result);
  authStorage.storeTabletApp(result.data.APP_ID);
  setApp({loading:false,data:result.data});
};

 useEffect(() => { 
  getEmpDetails();
   }, []);

 
 
  
   return (
    <>

    <ActivityIndicator visible={app.loading} />
    <Screen style={styles.screen}>
     {!app.loading && app?.data && (
           <View>
              <ListItemSeparator />
              {empName!=null? <ListItem
                title={"اسم الموظف"}
                rightInfo={empName}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}
              <ListItemSeparator />
              {app.data?.APP_NAME_AR!==null? <ListItem
                title={"التطبيق"}
                rightInfo={app.data?.APP_NAME_AR}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyleBold}
              />:null}<ListItemSeparator />
               </View>)} 
            <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="الصفحة الرئيسية" 
             onPress={() =>
              props.navigation.navigate(routes.TABLET)
            }      
             /></View>
             <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="الصفحة الرئيسية اونلاين" 
             onPress={() =>
              props.navigation.navigate(routes.TABLETONLINE)
            }      
             /></View>
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="ترحيل البيانات" 
             onPress={() =>
              props.navigation.navigate(routes.TABLETUPLOAD)
            }      
             />
          </View>
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="تنزيل البيانات" 
             onPress={() =>
              props.navigation.navigate(routes.TABLETDOWNLOAD)
            }      
             />
          </View>               
    </Screen>
    </>
  
)
}
export default TabletMainScreen;

const styles = StyleSheet.create({
  screen: {
     backgroundColor: colors.light,
  },
  buttonClose: {
    width: "80%",
     alignSelf: "center",
     
    
  },
  name:
  {
    marginTop:10,
    fontSize:14,
    color:colors.instagram

  },
  buttonTxt: {
    color:colors.white,
    fontSize:16,
    alignContent:"center",
    alignItems:"center",
    textAlign:"center"
    
   },
   listItem: {
    backgroundColor: colors.white,
  },
  listTextStyle: {
    color: colors.darkNew,
  },
  screen: {
    backgroundColor: colors.backgroundColor,
  },
  listTextStyleBold: {
    color: colors.danger,
    fontFamily:'Cairo_700Bold',
  },
});
