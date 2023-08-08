import React,{useState,useEffect } from "react";
import { StyleSheet,Platform ,Text,Dimensions ,View} from "react-native";
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import Button from"../components/Button"
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import { StorageAccessFramework } from 'expo-file-system';
import routes from "../navigation/routes";

import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import colors from "../config/colors";
import { StatusBar } from 'expo-status-bar';
import { useAssets } from "expo-asset";
import { documentDirectory, readAsStringAsync } from "expo-file-system";
import { color } from "react-native-reanimated";
function TabletAdminScreen(props) {
//  console.log("DDOODOODOD"+FileSystem.documentDirectory);
  //console.log(FileSystem.cacheDirectory);
  //console.log(FileSystem.bundleDirectory.getInfoAsync());


  var { height, width } = Dimensions.get('window');
  height = height ;
  const [docsList, setDocsList] = useState([]);
  const[writePath,setWritePath]=useState("");
  const[filePath,setFilePath]=useState("");
  const [updatesPath,setUpdatesPath]=useState("content://com.android.externalstorage.documents/tree/primary%3ATablets%2F");
  const [tabletsDirPath,setTabletsDirPath]=useState("content://com.android.externalstorage.documents/tree/primary%3ATablets%2F");

  const [app,setApp]=useState('GIS');
  const [rUrl,serrUrl]=useState('http://10.11.16.101/Tablets/');//('http://10.11.20.9/GIS-App-Website/');
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
  const downloadFiles = async(fileName) => {
    let remoteUrl =rUrl+app+"/" +fileName;
    let localPath = tabletDir+fileName;
    FileSystem.downloadAsync(remoteUrl, localPath).then(({uri}) => {
      Linking.openURL(uri);    
      getAllFilesInDirectory();
     });
 }
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
 async function createFile(parent,fileName){
  let result = null;
  console.log("will create file .... "+parent+"/"+fileName);
  try {
      result = await StorageAccessFramework.createFileAsync(parent,"/"+fileName,"text/plain");
  } catch(e) {
      console.log(e);
  }
  setFilePath(result);
  writeFile(result,"")
}
 const createUpdatesFile=async()=>
 {const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
   if (permissions.granted) {  
     // Gets SAF URI from response
     const uri = permissions.directoryUri;
    console.log(uri);
     const  filesList = await StorageAccessFramework.readDirectoryAsync(uri);
     setWritePath(uri);
     updateFiles.forEach((fileName) => {
      var a=ensureFileExists(fileName,filesList);
      if(!a)
      createFile(uri,fileName); 
  });
   
   } 
}
 const downloadFile = async(dir,filename) => {
  let remoteUrl = rUrl+app+'/'+dir+'/'+filename;
   if(dir=='tiles' && filename!="tiles.txt")
   remoteUrl = rUrl+'TILES/'+filename;  console.log(remoteUrl);
  let localPath = tabletDir+dir+'/'+filename;
  console.log(remoteUrl+"           "+localPath);

  await FileSystem.downloadAsync(remoteUrl, localPath).then(({uri}) => {
  console.log(localPath+"     was downloaded...");
   });
}

const downloadSingleFile = async(dir,filename) => {
  let remoteUrl = rUrl+app+'/'+dir+filename;
  let localPath = tabletDir+dir+filename;
  await ensureDirExists('');
  FileSystem.downloadAsync(remoteUrl, localPath).then(({uri}) => {
   //console.log("From:   "+remoteUrl+"    To:    "+uri);
   //console.log("Downloaded  :   "+localPath) 
   });
}

async function readFile(path,dir){
  let result = null;
  console.log("will read file .... "+path+dir+"/"+dir+".txt");
  try {
      result = await FileSystem.readAsStringAsync(path+dir+"/"+dir+".txt");
  } catch(e) {
      console.log(e);
  }
  let Files= result.split(/\r?\n/);
  console.log(Files.length);
  await DownLoadAllFilesInDir(Files,dir)
 
}
 async function ensureDirExists(dir) {
  const dirInfo = await FileSystem.getInfoAsync(tabletDir+dir);
  if (!dirInfo.exists) {
  console.log("The tablet dir not existed, creating...");
  await FileSystem.makeDirectoryAsync(tabletDir+dir, { intermediates: true });
  if(dir!='')downloadFile(dir,dir+".txt");

 }
 else 
   if(dir!='')downloadFile(dir,dir+".txt");
}

 function ensureFileExists(filename,filesList) {
  var f=false;
  filesList.forEach((file) => {
  // console.log("ddd"+file+"    "+filename+"  "+file.includes(filename));
     if(file.includes(filename)){f= true;}
});
return f;
}

async function ensureTilesDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(tabletDir+'tiles');
  if (!dirInfo.exists) {
 // console.log("The tablet dir not existed, creating...");
  await FileSystem.makeDirectoryAsync(tabletDir+'tiles', { intermediates: true }); 
   downloadFile("tiles","tiles.txt");

  }
  else  downloadFile("tiles","tiles.txt");
 const dirInfo1 = await FileSystem.getInfoAsync(tabletDir+'tiles/19');
  if (!dirInfo1.exists) {
  //console.log("The tablet dir not existed, creating..."+tabletDir+'tiles/19');
  await FileSystem.makeDirectoryAsync(tabletDir+'tiles/19', { intermediates: true });
  
  
  }
 // for(var i=313177;i<=314176;i++)//2023

   for(var i=313176;i<=313331;i++)//2020
  {     
     const dirInfo2 = await FileSystem.getInfoAsync(tabletDir+'tiles/19/'+i);
  if (!dirInfo2.exists) {
  //console.log("The tablet dir not existed, creating..."+tabletDir+'tiles/19/'+i);
  await FileSystem.makeDirectoryAsync(tabletDir+'tiles/19/'+i, { intermediates: true });
    
  
  }

  }
}


async function DownLoadAllFilesInDir(FilesList,dir)
{
  FilesList.forEach((file) => {
    downloadFile(dir,file);  
});
}

async function checkAllDirs()
{//getAllFilesInDirectory();
  dirsList.forEach((dir) => {
  ensureDirExists(dir);});
 
 }


async function DownLoadAllFilesInApp()
{ 
dirsList.forEach((dir) => {
  if(dir!='' && dir !='tiles')
     readFile(tabletDir,dir);
});
}
async function DownLoadِTiles()
{ 
  readFile(tabletDir,'tiles'); 
}
 

 
     
      
 useEffect(() => { 
  //getAllFilesInDirectory();
 // checkAllDirs();
   }, []);

 
 
    const getAllFilesInDirectory = async() => {
   let dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'TabletFiles');
   // let dir = await FileSystem.readDirectoryAsync('http://10.11.20.9/GIS-App-Website/js');

  
   let ddd=[];
    dir.forEach((val) => {
      console.log(val);

      //ddd.push(FileSystem.documentDirectory  + val);
 });

   dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'TabletFiles/Tiles');
   // let dir = await FileSystem.readDirectoryAsync('http://10.11.20.9/GIS-App-Website/js');

  
     dir.forEach((val) => {
      console.log(val);
      
      //ddd.push(FileSystem.documentDirectory  + val);
 });
 
   // await setDocsList(ddd);
 }
   return (
    <Screen style={styles.screen}>
      <View style={{alignSelf:"center",width:'80%'}}>
      <Form
       initialValues={
        {"App":{ label: 'نظم المعلومات الجغرافية', value: 'GIS' },
          "URL":rUrl }}>
     

              {true&&<Picker
                items={[{ label: 'نظم المعلومات الجغرافية', value: 'GIS' },
                { label: 'الإخطارات', value: 'WARNINGS' },
                { label: 'اليافطات', value: 'YAFTAT' },
                { label: 'المياه', value: 'WATER' },
                { label: 'صيانة المياه', value: 'WATER-M' },
                { label: 'الأبنية', value: 'BUILDINGS' },
                { label: 'الزراعة', value: 'FARMING' },
                { label: 'الرخص', value: 'LICS' },
                { label: 'الصرف الصحي', value: 'SEWER' },
                { label: 'المخالفات', value: 'INFRACTIONS' },
                { label: 'القائمة السوداء', value: 'BLACKLIST' },
                { label: 'التصوير', value: 'CAMERA' },

              ]
               }
                selectedItemChanged={(App) =>   
                  {
                   console.log(App.value);
                   setApp(App.value);
                 //  / scrollToIndexUnit(unit.label);      
                 }}
                style={[styles.name]}
                name="App"
                placeholder="التطبيق"
                showPlaceholder={false}
                
              />}

              <Field
                name="URL"
                showPlaceholder={true}
                placeholder={"موقع البيانات"}
                style={[styles.name]}
                onChangeT={(url) =>   
                  {
                   console.log(url);
                   serrUrl(url);
                 }}
                
              />
  </Form></View>
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="تنزيل الصفحة الرئيسية" 
             onPress={() => downloadSingleFile('','index.html')}      
             />
          </View>
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="إنشاء ملفات التحديث" 
             onPress={() => createUpdatesFile()

            }      
             />
          </View>
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="فحص مجلدات التطبيق" 
             onPress={() => checkAllDirs()}      
             />
          </View>
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="تنزيل ملفات التطبيق " 
             onPress={() => DownLoadAllFilesInApp()}      
             />
          </View>
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="فحص مجلدات الصورة الجوية " 
             onPress={() =>  
              ensureTilesDirExists()}      
             />
          </View>  
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="تنزيل الصورة الجوية " 
             onPress={() => DownLoadِTiles()
               }      
             />
          </View> 
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
             color={"primary"}
             textStyle={styles.buttonTxt} title="الصفحة الرئيسية" 
             onPress={() =>props.navigation.navigate(routes.TABLET)

               }      
             />
          </View> 
           
         
    </Screen>
  );
}
export default TabletAdminScreen;

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
    fontSize:18.5,
    color:colors.instagram

  },
  buttonTxt: {
    color:colors.white,
    fontSize:17.5,
    alignContent:"center",
    alignItems:"center",
    textAlign:"center"
    
   },
});
