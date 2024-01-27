import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import authApi from "../../api/auth";
import contentApi from "../../api/content";
import customerApi from "../../api/customer";
import tabletApi from "../../api/tablet";
import authStorage from "../../auth/storage";
import Alertmsg from "../../components/Alertmsg";

import complaintApi from "../../api/complaint";
import UploadScreen from "../UploadScreen";
import colors from "../../config/colors";
import * as FileSystem from "expo-file-system";
import OfflineNotice from "../../components/OfflineNotice";
import FormRadioButtonGroup from "../../components/forms/FormRadioButtonGroup";
import FormSwitch from "../../components/forms/FormSwitch";


import useAuth from "../../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../../components/forms";
import FormImagePicker from "../../components/forms/FormImagePicker";
import useLocation from "../../hooks/useLocation";

import Screen from "../../components/Screen";
import constants from "../../config/constants";
import routes from "../../navigation/routes";
import ActivityIndicator from "../../components/ActivityIndicator";
import Info from "../../components/Info";
import complaint from "../../api/complaint";
import * as IntentLauncher from 'expo-intent-launcher';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as Network from 'expo-network';
import { color } from "react-native-reanimated";
import AppFormSwitch from "../../components/forms/FormSwitch";

import * as ImagePicker from "expo-image-picker";

function AddImageScreen({ navigation, route }) {
  const { user } = useAuth();
  const {operation,setOperation}=useState(1);//1 add 2 update 3 delete
  const getDeptProblemsApi = useApi(complaintApi.getComplaintDeptProblems);
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [msgVisible, setmsgVisible] = useState(false);
  const [msgTitle, setmsgTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [units, setUnits] = useState({ loading: false, data: null });
  const [U_ID, setU_ID] = useState("");
  const [B_ID, setB_ID] = useState(route.params.B_ID);
  const [signBorads, setSignBorads] = useState({ loading: false, data: null });
  
  const [selectedSignBoard, setSelectedSignBoard] = useState({  TYPE_ID: 1,
    SerialNo:0,
    CommercialName: "يافطة جديدة",   
    UseID: 1,
    UnitID: "",
    Width: 0,
    Height: 0,
    Notes: "", 
    IsDeleted :0,
    Image:null});


    const validationSchema = Yup.object().shape({

      // UnitID: Yup.string().required("رقم الهوية مطلوب") .min(9, "يجب إدخال 9 أرقام") .max(9),
      CommercialName: Yup.string().required("الاسم التجاري") ,
      //Width: !isDeleted?Yup.string().required("عرض اليافطة"):,
     // Height: !isDeleted?Yup.string().required(" طول اليافطة"):{},
    
    
      signBoardImage: Yup.array(),
    
    
    });
  const [isForBuild, setIsForBuild] = useState(true);
  const [useID, setUseID] = useState(1);

  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const wifi = async () => {
    console.log("WIFI");
    startActivityAsync(ActivityAction.WIRELESS_SETTINGS);
    //IntentLauncher.startActivityAsync(IntentLauncherAndroid.ACTION_WIFI_SETTINGS);
  }
  
  const AddBuildingImage = async (image,BID) => {
     
    setProgress(0);
    setUploadVisible(true);
    const token = await authStorage.getToken();
    console.log(token);
    let img = {    
      Image:image ,
      BID: BID
      //Image: (await getBase64Images(signBoard.signBoardImage)).bytes,
    };

     
    const result = await tabletApi.AddBuildingImage(token, img, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
    if (!result.ok) {
      console.log(result);
      setUploadVisible(false);     
      setLoading(false);
      setmsgVisible(true); 
      setmsgTitle(result.data.ResponseObject);    
      return;
    }
    else {
      console.log(result);
      if (result.data) {
        setmsgVisible(true); 
        setmsgTitle(result.data.ResponseObject); 
        setLoading(false);
      }
    }
    //resetForm();
  };
  async function Capture (imagename)
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
      //var path=imgsPath+imgname+".jpg";
      //console.log(result.assets[0].base64);
      AddBuildingImage(result.assets[0].base64,imagename);
      
      //navigation.goBack();
      //createImage(imgsPath,imgname+".jpg",result.base64)  
    }
    else{      navigation.goBack();
    }
    } catch (error) {
      console.log("Error capturing image", error);
    }
  }
  useEffect(() => {
     Capture(B_ID);
  }, []);




  /*const getBase64Images = async (images) => {
    let imagesToReturn = [];

    for (const image of images) {
      var extension = image.substr(image.lastIndexOf(".") + 1);
      imagesToReturn.push({
        dosyaCesidi: "image",
        dosyauzanti: "." + extension,
        //belgeTarihi: "01/01/2020",
        belgeSayisi: "1",
        dosya: await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        }),
      });
    }

    return imagesToReturn;
  };*/
  const getBase64Images = async (images) => {
    let imageToReturn = { bytes: "" };

    for (const image of images) {
      var extension = image.substr(image.lastIndexOf(".") + 1);
      imageToReturn = {
        dosyaCesidi: "image",
        dosyauzanti: "." + extension,
        //belgeTarihi: "01/01/2020",
        belgeSayisi: "1",
        bytes: await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        }),
      };
    }

    // console.log(imageToReturn.bytes.length);
    return imageToReturn;
  };

  return (
    <>
         {msgVisible && <Alertmsg
     isVisible={msgVisible}
      title={msgTitle}
      has2Btn={false}
      icon={"whatsapp"}
      buttonTitle2={"تواصل"}
      onPress2={() => Linking.openURL('http://api.whatsapp.com/send?phone=+97022228121')}
      onPress={() => {
        setmsgVisible(false);
        navigation.goBack();
      }}
      buttonTitle={"إغلاق"}
     
   />} 
    </>
  );
}
export default AddImageScreen;

const styles = StyleSheet.create({
  section: { marginHorizontal: "10%", width: "80%", fontSize: 14, },
  Field: {
    width: "50%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    // /color: colors.black
  },
  dateSection: {
    width: "100%",
    flexDirection: 'row', fontSize: 14
  },
  nameh: {
    width: "51%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew, textAlign: "right",
    

  },
  name: {
    width: "100%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew, textAlign: "right",

  },
  button: { width: "70%" },
  imagesection: { width: "100%" },

  container: {
    fontSize: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
