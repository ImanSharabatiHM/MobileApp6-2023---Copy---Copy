import React,{useState,useEffect ,useRef} from "react";
import { StyleSheet,Platform ,Text,Dimensions,View } from "react-native";
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import colors from "../config/colors";
import { StatusBar } from 'expo-status-bar';
import { useAssets } from "expo-asset";
import { StorageAccessFramework } from 'expo-file-system';
import FormImagePicker from "../components/forms/FormImagePicker";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import * as ImagePicker from "expo-image-picker";
import ActivityIndicator from "../components/ActivityIndicator";
import constants from "../config/constants";
import { documentDirectory, readAsStringAsync } from "expo-file-system";
function TabletScreenOnline() {
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

     // if (index) {  readAsStringAsync(index[0].localUri).then((data) => {  setHtml(data); });  }
  useEffect(() => { 
    getPermissions();
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

  async function read(path){
    let result = null;
    console.log("will write file .... "+path+"/");
    try {
        result = await StorageAccessFramework.readAsStringAsync(path);
        //console.log(result); 
        var js="loadBuildtest("+result+")";
        webViewRef.current.injectJavaScript(js);
        console.log("result",result);   
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
    <Screen style={styles.screen}>
  {false && <AppWebView  
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
       else if (contents.includes("LoadFile")) {
        let result = null;
        console.log("In loading File ...........");
        read("file:///data/user/0/com.hebronline/files/TabletFiles/jsondata/BUILDINGS1.txt");
         
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
   <AppWebView source={{ uri: constants.CADASTRAL}} />
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
  );
}
export default TabletScreenOnline;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.dark,
  },
});
