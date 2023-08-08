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


import { ProgressBar } from 'react-native-paper';


import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import colors from "../config/colors";
import { StatusBar } from 'expo-status-bar';
import { useAssets } from "expo-asset";
import { documentDirectory, readAsStringAsync } from "expo-file-system";
import { color } from "react-native-reanimated";
function UploadTabletScreen() {
  //console.log(FileSystem.documentDirectory);
  //console.log(FileSystem.cacheDirectory);
  //console.log(FileSystem.bundleDirectory.getInfoAsync());


  var { height, width } = Dimensions.get('window');
  height = height;
  const [docsList, setDocsList] = useState([]);
  const [filePath, setFilePath] = useState("");
  var rNum = 0;
  //const Jimp = require("jimp");

  var p = 0;
  const [app, setApp] = useState('GIS');
  const [rUrl, serrUrl] = useState('http://10.11.20.9');//('http://10.11.20.9/GIS-App-Website/');
  const tabletDir = FileSystem.documentDirectory + 'TabletFiles/';
  const [writePath, setWritePath] = useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F_updates.txt");
  const [imgsPath, setImgsPath] = useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F");

  const [picsPath, setPicsPath] = useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F_pics.txt");
  const [updatesPath, setUpdatesPath] = useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F_updates.txt");
  const [backupPath, setBackupPath] = useState("content://com.android.externalstorage.documents/tree/primary%3ATablets/document/primary%3ATablets%2F_backup.txt");
  const [uploadVisible, setUploadVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [allRequestsNum, setAllRequestsNum] = useState(0);
  const [doneRequestsNum, setDoneRequestsNum] = useState(0);
  const countRef = useRef()

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const maintabletDir = '';
  const jsDir = 'js';
  const cssDir = 'css';
  const scssDir = 'css';
  const metadateDir = 'metadata';
  const svgsDir = 'svgs';
  const spritesDir = 'sprites';
  const webfontsDir = 'webfonts';
  const fontsDir = 'fonts';
  const imgsDir = 'imgs';
  const lessDir = 'less';
  const tilesDir = 'tiles';
 
  const jsondateDir = 'jsondata';
  const dirsList = [maintabletDir, jsDir, cssDir, scssDir, metadateDir, svgsDir, spritesDir, webfontsDir, fontsDir, imgsDir, lessDir, jsondateDir];
  const updateFiles = ['updates', 'backup', 'logs', 'pics'];
  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }

  async function readFile(filePath) {
    let result = null;
    //console.log("will read file .... "+path+dir+"/"+dir+".txt");
    try {
      result = await FileSystem.readAsStringAsync(filePath);
    } catch (e) {
      console.log(e);
    }
    return result;

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
  const sendPic = async (url) => {
   // console.log(url);
    var parts = url.split("&&&");
    //var base64data = await FileSystem.readAsStringAsync(parts[0], {encoding:FileSystem.EncodingType.Base64});//FileSystem.EncodingType.Base64
   var base64data=await StorageAccessFramework.readAsStringAsync(parts[0], {encoding:FileSystem.EncodingType.Base64});
    //s const buffer = Buffer.from(base64data, "base64");
    /*Jimp.read(buffer, (err, res) => {
      if (err) throw new Error(err);
      res.quality(5).writeAsync(parts[0]);
    });*/
    try {
    // const resss = await StorageAccessFramework.readAsStringAsync(parts[0], {encoding:FileSystem.EncodingType.Base64});
  } catch(e) {
      console.log(e);
  }
    // console.log(parts[1]+"   "+parts[0]); 
    var pic={'image':parts[1],'uri':base64data,'heraf':'t'};//65536
    console.log("Length :"+base64data.length);
 //const result = await TabletsApi.sendPic(pic ,(progress) => {

  const result = await TabletsApi.sendPici(pic.image,pic.uri
     /*,(progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(false);
    }*/
     );
  /*  const result = await TabletsApi.sendPici(parts[1],base64data
      /*,(progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(false);
    });*/
    //console.log(result);
    if (!result.ok) {
     console.log(JSON.stringify(result));
   //console.log((result));
      // /  setUploadVisible(false);
      setLoading(false);
      setInfo({
        RequestStatus: "لم يتم الارسال",
        RequestNo: "",
      });
      // setError(true);
      return;
    }
    else {console.log("OK:  "+parts[1],result.data);
      // console.log(result);
     // console.log(JSON.stringify(result));
    }
  };
  async function UploadUpdates() {
    var fileTxt = await readFile(updatesPath);
    var urls = fileTxt.split(/\r?\n/);
    //setUploadVisible(true);
    setLoading(true);

    countRef.current = 0;
    setProgress(countRef.current);
    rNum = 0;
    var all = urls.length;
    urls.forEach((url) => {
      rNum = rNum + 1;
      p = rNum / all;
      if (url != "") {
        countRef.current = rNum / all;
        setProgress(countRef.current);
        sendRequest(url);
      }
      else {
        countRef.current = rNum / all;

        setProgress(countRef.current);
      }
      if (countRef.current == 1) setUploadVisible(true);
      setLoading(false);

    });
  }
  async function UploadPics() {
    var fileTxt = await readFile(picsPath);
    var urls = fileTxt.split(/\r?\n/);
    //setUploadVisible(true);
    setLoading(true);

    countRef.current = 0;
    setProgress(countRef.current);
    rNum = 0;
    var all = urls.length;
    if(all===0)console.log("no pics!");
    urls.forEach((url) => {
      rNum = rNum + 1;
      p = rNum / all;
      if (url != "") {
        countRef.current = rNum / all;
        setProgress(countRef.current);
        sendPic(url);
      }
      else {
        countRef.current = rNum / all;

        setProgress(countRef.current);
      }
      if (countRef.current == 1) setUploadVisible(true);
      setLoading(false);

    });  }
  async function UploadLogs() {
  }

  useEffect(() => {
    handleNetwork();
    console.log(progress);
    //if(!loading)setProgress(0);
  }, [countRef.current]);

  return (

    <Screen style={styles.screen}>
      {info && (
        <Info
          numberOfLines={5}
          buttonText="أعد التقديم"
          buttonVisible={false}
          color={colors.danger}
          message={
            (info.RequestNo !== "" ? (" . رقم  : " + info.RequestNo + "\n" +
              "حالة  : " + info.RequestStatus)
              : info.RequestStatus)
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
              "URL": rUrl
            }}>
          <Field
            name="URL"
            showPlaceholder={true}
            placeholder={"رابط الخدمة "}
            style={[styles.name]}
            onChangeT={(url) => {
              console.log(url);
              serrUrl(url);
            }}

          />
          
        </Form></View>
      <View style={[styles.buttonClose]}>
        <Button buttonStyle={styles.buttonClose}
          color={"primary"}
          textStyle={styles.buttonTxt} title="ترحيل التحديثات "
          onPress={() => UploadUpdates()}
        />
      </View>
      <View style={[styles.buttonClose]}>
        <Button buttonStyle={styles.buttonClose}
          color={"primary"}
          textStyle={styles.buttonTxt} title="ترحيل الصور"
          onPress={() => UploadPics()

          }
        />
      </View>
      <View style={[styles.buttonClose]}>
        <Button buttonStyle={styles.buttonClose}
          color={"primary"}
          textStyle={styles.buttonTxt} title="ترحيل الحركات"
          onPress={() => UploadLogs()}
        />
      </View>
      <View style={styles.ProgressBar}>
        <Progress.Bar
          color={colors.primary}
          progress={progress}
          useNativeDriver
          width={width * .9}
        />
      </View>
    </Screen>
  );
}
export default UploadTabletScreen;

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
    fontSize: 18.5,
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
