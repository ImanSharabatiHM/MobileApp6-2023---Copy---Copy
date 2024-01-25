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
import  BuildingsModalize  from "../components/BuildingsModalize";
import  PointModalize  from "../components/PointModalize";
import  SearchModalize  from "../components/SearchModalize";
import  SearchXYModalize  from "../components/SearchXYModalize";
import  LayersModalize  from "../components/LayersModalize";
import  IconTouchable  from "../components/IconTouchable";

import CardBuildDetails from "../components/CardBuildDetails";
import Card from "../components/CardCategory";
import useLocation from "../hooks/useLocation";

import { StatusBar } from 'expo-status-bar';
import { useAssets } from "expo-asset";
import { StorageAccessFramework } from 'expo-file-system';
import FormImagePicker from "../components/forms/FormImagePicker";
import * as ImagePicker from "expo-image-picker";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import authStorage from "./../auth/storage";
import CustomerApi from "../api/customer";
import ActivityIndicator from "../components/ActivityIndicator";
import constants from "../config/constants";
import { documentDirectory, readAsStringAsync } from "expo-file-system";
import TabletsApi from "../api/tablet";
import tabletApi from "./../api/tablet";
import SearchPlaceModalize from "../components/SearchPlaceModalize";

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
     const location = useLocation();

     const [loading, setLoading] = useState(true);
     const [msg, setMsg] = useState("");
     const modalizeRef = useRef(null);
     const modalizeRefPoint=useRef(null);
     const modalizeRefSearchBuild=useRef(null);
     const modalizeRefSearchPlace=useRef(null);
     const modalizeRefLayers=useRef(null);
     const modalizeRefCoords=useRef(null);


     const [viewerHeight, setViewerHeight] = useState(height);
     const [menueVisible, setMenueVisible] = useState(false);//!route.params.FromUnits
     const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
     const [pointCategoriesVisible, setPointsCategoriesVisible] = useState(true);//!route.params.FromUnits
     const [searchBuildingVisible, setSearchBuildingVisible] = useState(true);//!route.params.FromUnits
     const [searchXYVisible, setSearchXYVisible] = useState(true);//!route.params.FromUnits

     const [searchPlaceVisible, setSearchPlaceVisible] = useState(true);//!route.params.FromUnits
     const [layersVisible, setLayersVisible] = useState(true);//!route.params.FromUnits

     
     const [fromUnits, setFromUnits] = useState(false);
     const [B_ID, setB_ID] = useState(12);
     const [employeeTabletPermissions, setEmployeeTabletPermissions] = useState({ loading: true, data: null });
     const [building, setBuilding] = useState({ loading: false, data: null });
     const [visibleLayers, setVisibleLayers] = useState({ loading: false, data: [] });
     const [coords, setCoords] = useState(null);

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
     const getEmployeeTabletPermissions = async () => {
      setEmployeeTabletPermissions({loading:true,data:null});
    
      var token = await authStorage.getToken();
      const result = await CustomerApi.GetEmployeeTabletPermissions(token);
  
      if (!result.ok) { 
        setEmployeeTabletPermissions({loading:false,data:null});
       
        return;
      }
      //authStorage.storeTabletApp(result.data.APP_ID);
      setEmployeeTabletPermissions({loading:false,data:result.data.ResponseObject});
    };
     // if (index) {  readAsStringAsync(index[0].localUri).then((data) => {  setHtml(data); });  }
  useEffect(() => { 
    getEmployeeTabletPermissions();
    //getPermissions();
     loadHTMLFile();
  
  },
   []);
   async function onSelect(data) {
     if(data.Location)
    {
      console.log("will view location",data.Location,"   ",data.Proj);
      if(data.Proj=="P")
      webViewRef.current.injectJavaScript("ViewLocation1('"+data.Location+"',true)");
      else  webViewRef.current.injectJavaScript("ViewLocation1('"+data.Location+"')");
     }
  }
  async function GetLayersStatus()
  {
    setVisibleLayers({data:null,loading:true})
    webViewRef.current.injectJavaScript("GetVisibleLayers()");


  }
   
  async function onSelectLayer(data) {
    console.log(data);
    webViewRef.current.injectJavaScript("ChangeLayerVisible('"+data+"')")
   /* if(data.Location)getEmployeeTabletPermissions
   {
     console.log("will view location",data.Location,"   ",data.Proj);
     if(data.Proj=="P")
     webViewRef.current.injectJavaScript("ViewLocation1('"+data.Location+"',true)");
     else  webViewRef.current.injectJavaScript("ViewLocation1('"+data.Location+"')");
    }*/
 }


  
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
const getBuilding = async (B_ID) => {
  setBuilding({ loading: true, data: null });
  const result = await tabletApi.GetBuildingDescByBID(B_ID);
  if (!result.ok) {
   // setError(true);
    setBuilding({ loading: false, data:null });
    return;
  }
   let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);    
  setBuilding({ loading: false, data:data });
  setmainCategoriesVisible(true);
  modalizeRef.current.open();
};
const addPoint = async (coords) => {
 /* setBuilding({ loading: true, data: null });
  const result = await tabletApi.GetBuildingDescByBID(B_ID);
  if (!result.ok) {
   // setError(true);
    setBuilding({ loading: false, data:null });
    return;
  }
   let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);    
  setBuilding({ loading: false, data:data });*/

  setCoords(coords);
  setPointsCategoriesVisible(true);
  modalizeRefPoint.current.open();
};
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
        console.log(contents+"dd");
        setMsg(contents);
        if (contents.startsWith("loading")) {
          console.log(contents);
        } 
        else if(contents.includes("Location"))
        {
         var loc=(location?.longitude ? location?.longitude : "")+","+( location?.latitude ? location?.latitude : "");
         webViewRef.current.injectJavaScript("ViewLocation('"+loc+"')");
        }  
        else if(contents.startsWith("View-B-")) 
        {
          var contents=contents.replace("View-B-","");
          var arr=contents.split("-");
          console.log(arr[0]);
          setB_ID(arr[0]);
          getBuilding(arr[0]);         
          //props.navigation.navigate(routes.BUILDINGSPROC,{B_ID:arr[0],BNO:arr[1],STNO:arr[2],BLOCK:arr[3],PARCEL:arr[4]});
        }
        else if(contents.includes("TALABAT"))
        {
          props.navigation.navigate(routes.ALLTALABTS,{B_ID:B_ID,FromMap:true,onSelect:onSelect}); 

        } 
        else if(contents.includes("VISIBLE:"))
        {
          console.log(contents);
          contents=contents.replace("VISIBLE:","")
          layers=contents.split(",");
          setVisibleLayers({loading:false,data:layers});
          setLayersVisible(true); 
          modalizeRefLayers.current.open();


        }
        else if (contents.includes("READY"))
        {
            setMenueVisible(true);
        }
        else if(contents.includes("SEARCHB"))
        {
         setSearchBuildingVisible(true); 
         modalizeRefSearchBuild.current.open();
        }
        else if(contents.includes("SEARCHP"))
        {
         setSearchPlaceVisible(true); 
         modalizeRefSearchPlace.current.open();
        }
        else if(contents.includes("LAYERS"))
        {
         GetLayersStatus();
        }
        else if(contents.includes("SEARCH"))
        {
          props.navigation.navigate(routes.SEARCHCUST); 
        }
       
        else if(contents.includes("AddPoint"))
        {

          var coords=contents.replace("AddPoint-","");
          addPoint(coords);
          //console.log(contents);

        }
       else if (contents.includes("LoadFile")){
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
        {sendRequest(contents);}
       
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
 { menueVisible&&<View style={styles.menue}>
  
  <IconTouchable
    iconStyle={styles.icon}
    localIcon={false}
    size={60}
    onPress={()=>{ 
       modalizeRefCoords.current.open();
    }}
    iconColor={colors.primary}
    name={'longitude'} 
     />
    <IconTouchable
    iconStyle={styles.icon}
    localIcon={false}
    size={60}
    onPress={()=>{ 
      setSearchBuildingVisible(true); 
      modalizeRefSearchBuild.current.open();
    }}
    iconColor={colors.primary}
    name={'office-building'} 
     />
    <IconTouchable
    iconStyle={styles.icon}
    localIcon={false}
    size={60}
    onPress={()=>{
      setSearchPlaceVisible(true); 
      modalizeRefSearchPlace.current.open();
    }}
    iconColor={colors.primary}
    name={'map-marker'} 
     />

<IconTouchable
    iconStyle={styles.icon}
    localIcon={false}
    size={60}
    onPress={()=>{ 
      GetLayersStatus();
      //modalizeRefLayers.current.open();
    }}
    iconColor={colors.primary}
    name={'layers-triple'} 
    />
     <IconTouchable
    iconStyle={styles.icon}
    localIcon={false}
    size={60}
    onPress={()=>{ 
      props.navigation.navigate(routes.ALLTALABTS,{B_ID:-1,FromMap:true,onSelect:onSelect}); 
    }}
    iconColor={colors.primary}
    name={'file-find'} 
     />
    <IconTouchable
    iconStyle={styles.icon}
    localIcon={false}
    size={60}
    onPress={()=>{ 
      props.navigation.navigate(routes.SEARCHCUST); 

    }}
    iconColor={colors.primary}
    name={'account-search'} 
     />
        <IconTouchable
    iconStyle={styles.icon}
    localIcon={false}
    size={60}
    onPress={()=>{   
      modalizeRefPoint.current.open();
    }}
    iconColor={colors.primary}
    name={'map-marker-plus'} 
     />


    </View>  }   
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
    <ActivityIndicator visible={building.loading} /> 
        {!employeeTabletPermissions.loading&&mainCategoriesVisible&&<BuildingsModalize
         PERMISSIONS={employeeTabletPermissions?.data}
          modalizeRef={modalizeRef}
          B_ID={B_ID}
          B_NO={building.data?.B_NO}
          B_NAME={building.data?.B_NAME}
          B_BLOCK={building.data?.B_BLOCK}
          B_PARCEL={building.data?.B_PARCEL}
          B_STREET_NO={building.data?.B_STREET_NO}
          B_IMAGE={building.data?.B_IMAGE}         
          navigation={props.navigation}
          onSelect={onSelect}
          //adjustToContentHeight={true}
          //onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
          //onPress = { // async () => {modalizeRef.current.close();  } }
        />}
         {searchBuildingVisible&&<SearchModalize
          modalizeRef={modalizeRefSearchBuild}
          B_ID={B_ID}
          B_NO={building.data?.B_NO}
          B_NAME={building.data?.B_NAME}
          B_BLOCK={building.data?.B_BLOCK}
          B_PARCEL={building.data?.B_PARCEL}
          B_STREET_NO={building.data?.B_STREET_NO}
          B_IMAGE={building.data?.B_IMAGE}         
          navigation={props.navigation}
          onSelect={onSelect}
          //adjustToContentHeight={true}
          //onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
          //onPress = { // async () => {modalizeRef.current.close();  } }
        />}
          {searchXYVisible&&<SearchXYModalize
          modalizeRef={modalizeRefCoords}
          B_ID={B_ID}
          B_NO={building.data?.B_NO}
          B_NAME={building.data?.B_NAME}
          B_BLOCK={building.data?.B_BLOCK}
          B_PARCEL={building.data?.B_PARCEL}
          B_STREET_NO={building.data?.B_STREET_NO}
          B_IMAGE={building.data?.B_IMAGE}         
          navigation={props.navigation}
          onSelect={onSelect}
          //adjustToContentHeight={true}
          //onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
          //onPress = { // async () => {modalizeRef.current.close();  } }
        />}
          {layersVisible&&<LayersModalize
          modalizeRef={modalizeRefLayers}
          visible_layers={visibleLayers?.data}
          //B_ID={B_ID}       
          navigation={props.navigation}
          onSelect={onSelectLayer}
          //adjustToContentHeight={true}
          //onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
          //onPress = { // async () => {modalizeRef.current.close();  } }
        />}
         {searchPlaceVisible&&<SearchPlaceModalize
          modalizeRef={modalizeRefSearchPlace}
          B_ID={B_ID}
          B_NO={building.data?.B_NO}
          B_NAME={building.data?.B_NAME}
          B_BLOCK={building.data?.B_BLOCK}
          B_PARCEL={building.data?.B_PARCEL}
          B_STREET_NO={building.data?.B_STREET_NO}
          B_IMAGE={building.data?.B_IMAGE}         
          navigation={props.navigation}
          onSelect={onSelect}
          //adjustToContentHeight={true}
          //onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
          //onPress = { // async () => {modalizeRef.current.close();  } }
        />}
        {!employeeTabletPermissions.loading&&pointCategoriesVisible&&<PointModalize
          modalizeRef={modalizeRefPoint}
          PERMISSIONS={employeeTabletPermissions?.data}
          COORDS={coords}
          B_ID={B_ID}
          B_NO={building.data?.B_NO}
          B_NAME={building.data?.B_NAME}
          B_BLOCK={building.data?.B_BLOCK}
          B_PARCEL={building.data?.B_PARCEL}
          B_STREET_NO={building.data?.B_STREET_NO}
          B_IMAGE={building.data?.B_IMAGE}         
          navigation={props.navigation}
          onSelect={onSelect}
          //adjustToContentHeight={true}
          //onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
          //onPress = { // async () => {modalizeRef.current.close();  } }
        />}
        </>
  );
}
export default TabletScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.dark,
  },
  menue:{
     flexDirection:"row",
     backgroundColor:'rgba(200,200,200,.6)',
     height:50,padding:0,position:"absolute",bottom:0,right:0,width:'100%'

  },
  icon: {
    padding:0,
    marginTop:0,
    paddingVertical:5,
    paddingStart:2,
    paddingEnd:2,
    borderRadius:0,
    borderLeftColor:colors.primary,
    borderLeftWidth:.1,
    width:'100%',
    alignContent:"center",
    justifyContent: "flex-start",
    alignItems:"baseline",
    

  },
});
