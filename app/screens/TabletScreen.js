import React,{useState,useEffect ,useRef} from "react";
import { StyleSheet,Platform ,Text,Dimensions,View,FlatList } from "react-native";
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import colors from "../config/colors";
import routes from "../navigation/routes";
import { AppModalize } from "../components/Modalize";
import CardBuildDetails from "../components/CardBuildDetails";
import Card from "../components/CardCategory";

import { StatusBar } from 'expo-status-bar';
import { useAssets } from "expo-asset";
import { StorageAccessFramework } from 'expo-file-system';
import FormImagePicker from "../components/forms/FormImagePicker";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import * as ImagePicker from "expo-image-picker";
import ActivityIndicator from "../components/ActivityIndicator";
import constants from "../config/constants";
import { documentDirectory, readAsStringAsync } from "expo-file-system";
import TabletsApi from "../api/tablet";

function TabletScreen(props) {
  console.log( "Document Directory Path :"+FileSystem.documentDirectory);
  //console.log( FileSystem.cacheDirectory);
  //console.log( FileSystem.bundleDirectory);

  var { height, width } = Dimensions.get('window');
  height = height -30;
  ///data/data/tr.bel.bagcilarbelediyesi.mobil/files
   
  /*const [index, indexLoadingError] = useAssets(
    //require("./assets/assets--BuildingsApp/index.html")
  //require("./../../android/app/src/main/assets/assets--BuildingsApp/htmlcode-Buildings.html")

   // require('file:///data/user/0/tr.bel.bagcilarbelediyesi.mobil/files/assets-water-talabat/htmlcode.html')

     );
   */
     const [loading, setLoading] = useState(true);
     const [msg, setMsg] = useState("");
     const modalizeRef = useRef(null);
     const [viewerHeight, setViewerHeight] = useState(height);
     const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
     const [fromUnits, setFromUnits] = useState(false);
     const [B_ID, setB_ID] = useState(false);

     const [html, setHtml] = useState("");
     const  mainPath= FileSystem.documentDirectory+'TabletFiles/';
     const [docsList, setDocsList] = useState([]);
     const [writePath,setWritePath]=useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F_updates.txt");
     const [updatesPath,setUpdatesPath]=useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F_updates.txt");
     const [backupPath,setBackupPath]=useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F_backup.txt");
     const [picsPath,setPicsPath]=useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F_pics.txt");
     const [imgsPath,setImagsPath]=useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F");
     const webViewRef = useRef(null);

     const [offline, setOffline] = useState(true);
     const [mainCategories, setMainCategories] = useState({
      loading: false, data:
        [
          { TalabCode: '1', TextAr: 'يافطات', ImageName: "bannersIcon" },
          { TalabCode: '10', TextAr: 'طلبات', ImageName: "certificateIcon" },
          { TalabCode: '2', TextAr: 'مياه', ImageName: "waterIcon" },
          { TalabCode: '3', TextAr: 'وحدات', ImageName: "buildingsIcon" },
          { TalabCode: '4', TextAr: 'صرف', ImageName: "sewageIcon" },
          { TalabCode: '5', TextAr: 'حرف', ImageName: "industryIcon" },
          { TalabCode: '6', TextAr: 'الرسوم', ImageName: "taxIcon" },
          { TalabCode: '7', TextAr: 'إخطارات', ImageName: "streetsIcon" },
          { TalabCode: '8', TextAr: 'كهرباء', ImageName: "electricityIcon" },
          { TalabCode: '9', TextAr: 'مخالفات', ImageName: "certificateIcon" },
          
        ]
    });
     // if (index) {  readAsStringAsync(index[0].localUri).then((data) => {  setHtml(data); });  }
  useEffect(() => { 
    //getPermissions();
    loadHTMLFile();
  
  },
   []);

   async function writeFile(path,data){
    let result = null;
    try {
        result = await StorageAccessFramework.writeAsStringAsync(
          path,
          data,
          { encoding: FileSystem.EncodingType.Base64 });
    } catch(e) {
        console.log("Error write File : "+e);
    }
   
  }
 
  async function createImage(path,name,code){
    let result = null;
    console.log("will create Image .... "+path);
    try {
        result = await StorageAccessFramework.createFileAsync(path,name,"image/jpg");
    } catch(e) {
        console.log(e);
    }
    console.log("Image was created :"+result);
    writeFile(result,code);
  

   
  }
  async function Capture (imgname)
  {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        base64: true,

      });
      if (!result.canceled) {
      //  console.log(result);
      //const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      var path=imgsPath+imgname+".jpg";
      console.log(path);
      createImage(imgsPath,imgname+".jpg",result.base64)  
    }
    } catch (error) {
      console.log("Error capturing image", error);
    }
  }
  async function appendFiles(path,data){
    let result = null;
    console.log("will write file .... "+path+"/"+data);
    try {
        result = await StorageAccessFramework.readAsStringAsync(path);
        //console.log(result);
        result = await StorageAccessFramework.writeAsStringAsync(path,result+data+"\n");
    } catch(e)
    {console.log(e);
    }
    //let Files= result.split(/\r?\n/);
    //console.log(Files);
    //await DownLoadAllFilesInDir(Files,dir)
   
  }

  const sendRequest = async (url) => {
    const result = await TabletsApi.send(rUrl + url);
    if (!result.ok) {
      console.log(result);
      // /  setUploadVisible(false);
      setLoading(false);
      setInfo({
        RequestStatus: "لم يتم الارسال",
        RequestNo: "",
      });
      // setError(true);
      return;
    }
    else {
    }
  };

  async function read(path,table){
    let result = null;
    console.log("will write file .... "+path+"/");
    try {
        result = await StorageAccessFramework.readAsStringAsync(path);
        //console.log(result); 
       
        console.log("result",result); 
        console.log("Will Lpad from RN"); 
          var js="tt();loadvectorFromRN('"+table+"','"+result+"');";
        webViewRef.current.injectJavaScript(js);
    } catch(e)
    {console.log(e);
    }
    //let Files= result.split(/\r?\n/);
    //console.log(Files);
    //await DownLoadAllFilesInDir(Files,dir)
   
  }
   const loadHTMLFile = async () => {
    try {
      let fileString = await FileSystem.readAsStringAsync(
       mainPath+'index.html'
      );
      setHtml(fileString);
    } catch (error) {
      console.warn(error);
      console.warn("Unable to resolve index file");
    }
  };

  const getPermissions=async()=>
  {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(imgsPath);

    if (permissions.granted) {
      if(true){
      // Gets SAF URI from response
    const uri = permissions.directoryUri;
     // console.log("uri:   "+uri);
      console.log("imgPath:    "+imgsPath);
       
      //setImagsPath(uri);
      //setWritePath(uri+"/updates.txt");

      console.log(imgsPath);
      // Gets all files inside of selected directory
     // const files = await StorageAccessFramework.readDirectoryAsync(uri);
      // /console.log(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
    }
  };
}

   return (
    <>
    <Screen style={styles.screen}>
  {true && <AppWebView  
      ref={webViewRef}     
      source={{ html: html,baseUrl:  mainPath }}
      style={{ flex: 1, height: height , width: width, }}     
      //injectedJavaScript= this.webview.injectJavaScript(redirectTo);
      onMessage={
        event => {
        var contents = event.nativeEvent.data;
       // webViewRef.current.injectJavaScript("alert('ffffffffffffff')");
       // window.postMessage("HELLOOOOOOO"+contents);
        console.log(contents);
        setMsg(contents);
        console.log(contents);
        if (contents.startsWith("loading")) {
          console.log(contents);
        }   
        else if(contents.startsWith("View-B-")) 
        {
          var contents=contents.replace("View-B-","");
          var arr=contents.split("-");
          console.log(arr[0]);

          setB_ID(arr[0]);
          //modalizeRef.current.open();
        props.navigation.navigate(routes.BUILDINGSPROC,{B_ID:arr[0],BNO:arr[1],STNO:arr[2],BLOCK:arr[3],PARCEL:arr[4]});

        }
       else if (contents.includes("LoadFile")) {
        var table=contents.split(':')[1];
        console.log("In loading File ...........");
        read("file:///data/user/0/com.hebronline/files/TabletFiles/jsondata/"+table+".txt",table);
         
        }
        else if(contents.includes("PROC-"))
        {
          var B_ID=contents.replace("View-PROC-","")
          props.navigation.navigate(routes.BUILDINGSPROC,{B_ID:B_ID});
        }
      else if(contents.includes("View"))
      {
        var type=contents.replace("View-","");
        if(type.includes("S"))
        {
          var B_ID=type.replace("S-","")
          props.navigation.navigate(routes.SIGNBOARD,{B_ID:B_ID}); 
          console.log(B_ID) ;     
        }
      }
      else if(contents.includes("Wcfrest"))
      {
        if(offline)
        {
          appendFiles(updatesPath,contents+"\n");
          appendFiles(backupPath,contents+"\n");
        }
        else
        {
          sendRequest(contents);


        }
       
      }
      else if(contents.includes("Camera"))
      {
        var s=contents.split("&&");
        var imgname=s[1];
        console.log("will capture image "+imgname);
        Capture(imgname);
        console.log("\n"+imgsPath+imgname+".jpg");
        appendFiles(picsPath,imgsPath+imgname+".jpg"+"&&&"+imgname+".jpg");

       
      }
      else if (contents.includes("solidwastecontainersstr"))
      {
        
      }
      else if (contents.startsWith("Upload")) {
        contents = contents.replace("Upload", "");
        console.log("Pics Contentjjj:  "+contents);
        appendFiles(picsPath,contents+".jpg");
        //appendFiles(backupPath,contents+"\n");
    }
    else{
     /* contents = contents.replace("Upload", "");
      console.log("Pics Content:  "+contents);
      appendFiles(picsPath,contents+"\n");
      appendFiles(backupPath,contents+"\n");
    */}
       
    }
    }
  />}       
   {false&&<AppWebView source={{ uri: constants.CADASTRAL}} />}
     {false&&<WebView
      style={{ flex: 1, height: height , width: width, }}
      enabledUploadAndroid={true}
      onLoadStart={() => {
        setLoading(true);
      }}
      onLoadEnd={() => {
        setLoading(false);
      }}
      renderLoading={() => <ActivityIndicator visible={loading} />}
      setAllowFileAccessFromFileURLs={true}
      setAllowUniversalAccessFromFileURLs={true}
      allowFileAccess={true}
      javaScriptEnabled={true}
      scrollEnabled={false}
      domStorageEnabled={true}
     // renderLoading={this.ActivityIndicatorLoadingView}
       originWhitelist={['*']}
      mixedContentMode={"always"} 
      source={{ html: html,baseUrl:  mainPath }}
      //source={{ html: html,baseUrl: "file:///android_asset/assets--BuildingsApp/" }}
      //source={{ html: html,baseUrl: "file:///android_asset/assets-water-talabat/" }}
      geolocationEnabled={true}                   
/>}
    </Screen>
          <AppModalize
          ref={modalizeRef}
          title={"معلومات البناء"}
          adjustToContentHeight={true}
          onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
          onPress = { 
            async () => {modalizeRef.current.close();         
         }}
        >
            <View style={{ height: viewerHeight*.9 }}>
            <ActivityIndicator visible={false} />
            <CardBuildDetails
            BNO={10+''}
            STNO={100+''}
            BLOCK={34440+''}
            PARCEL={15+''}
            /*  ADDRESS={taxItem?.ADDRESS==""?"غير معرّف":taxItem.ADDRESS}
            UNIT={taxItem?.UNIT==""?"غير معرّف":taxItem.UNIT}
              TAX_NAME={taxItem.TAX_NAME+""}
              TAX_DATE={dayjs(taxItem.TAX_DATE).locale("ar").format('D/MM/YYYY' )}
              AMOUNT={taxItem.AMOUNT+''}
              CURN={taxItem.CURN+""}
              DISCOUNT={taxItem.DISCOUNT+''}
              LOCAL_AMOUNT={taxItem.LOCAL_AMOUNT+''}
              LOCAL_AMOUNT_AFTER_DISCOUNT={taxItem.LOCAL_AMOUNT_AFTER_DISCOUNT+ '₪'} 
              */
              />
    <View style={{ height: mainCategoriesVisible ? '100%' : 0 }}>
          {mainCategories.data && mainCategoriesVisible && !fromUnits && (
            <FlatList
              numColumns={5}
              data={mainCategories.data}
              keyExtractor={(item) => "mainc" + item.TalabCode
              }
              renderItem={({ item }) => (
                <Card
                  // s={modalizeRef}
                  unit={item}
                  navigation={props.navigation}
                  title={item.TextAr}
                  imageHeight={50}
                  onPress={() => {
                    //setmainCategoriesVisible(false);
                    console.log("ddd");
                   // modalizeRef.current.close();
                    props.navigation.navigate(routes.SIGNBOARD,{B_ID:B_ID}); 
                    // modalizeRef.current.open();
                  }} 
                  imageUrl={item.ImageName}//{item.img}
                />
              )}
            />
          )}
          </View>
          </View>
        </AppModalize>
        </>
  );
}
export default TabletScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.dark,
  },
});
