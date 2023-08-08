import React from "react";
import  {useState,useEffect}  from 'react';
import { StyleSheet,View ,ScrollView} from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import contentApi from "../api/content";
import complaintApi from "../api/complaint";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import * as FileSystem from "expo-file-system";
import OfflineNotice from "../../app/components/OfflineNotice";


import useAuth from "../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";

import Screen from "../components/Screen";
import constants from "../config/constants";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import complaint from "../api/complaint";
import * as IntentLauncher from 'expo-intent-launcher';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as Network from 'expo-network';

const validationSchema = Yup.object().shape({
 
  ComplaintCustID: Yup.string().required("رقم الهوية مطلوب")
  .min(9, "يجب إدخال 9 أرقام")
  .max(9),
  //ComplaintDept: Yup.string().required("القسم"),
  //ComplaintDeptProblem: Yup.string().required("المشكلة الفرعية"),
  ComplaintCustName: Yup.string().required("اسم مقدم الطلب"),
  ComplaintAddr: Yup.string().required("العنوان"),
  ComplaintCustMobile:Yup.string().required("رقم هاتف مقدم الطلب"),
  ComplaintNotes:Yup.string().required("الملاحظات"),
  ComplaintImage: Yup.array(),

});

function ComplaintsScreen({ navigation }) {
  const { user } = useAuth();
  const getDeptApi = useApi(complaintApi.getComplaintDepts);
  const getDeptProblemsApi = useApi(complaintApi.getComplaintDeptProblems);
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const wifi = async () => {
    console.log("WIFI");
    startActivityAsync(ActivityAction.WIRELESS_SETTINGS);
    //IntentLauncher.startActivityAsync(IntentLauncherAndroid.ACTION_WIFI_SETTINGS);
}
  useEffect(() => {
   // getDeptApi.request();
    handleNetwork()
    getDeptApi.request("0");
    console.log(getDeptApi.data);
  }, []);
 

  const handleSubmit = async (complaint, { resetForm }) => {
    console.log(user);
    setProgress(0);
    setUploadVisible(true);
 console.log(complaint.ComplaintDept);
    let complaintToAdd = {    
      TYPE_ID : 1,
      CATEGORY_ID : complaint.ComplaintDept.value,//8,
      CATEGORY_SUB_ID : complaint.ComplaintDeptProblem.value,//50
      STATUS_ID : 0,
      LOCATION: (location?.latitude ? location?.latitude : "")+","+( location?.longitude ? location?.longitude : ""),     
      CONTACT_DETAILS : complaint.ComplaintCustName,
      NOTES : complaint.ComplaintNotes,
      USER_ID : complaint.ComplaintCustID,
      MOBILE_NO : complaint.ComplaintCustMobile,
      IMAGE : (await getBase64Images(complaint.ComplaintImage)).bytes,
      MAC : "sample string 18",
      DEVICE_ID : "sample string 12",
      DEVICE_NAME : "sample string 13dd",
      SERIAL : "sample string 14",
      CARRIER : "sample string 15",
      LATITUDE : location?.latitude,
      LONGITUDE : location?.longitude,
      ID_DOC_NO : 19.0,
      BUILDING_NO : 2.0,
      CONTACT_GENDER : 1.0,
      COMPANY_USER : "sample string 20",
      FILES : [ 
      ],    
    // LOCATION: location?.latitude ? location?.latitude : ""+","+ location?.longitude ? location?.longitude : "",     
    };

    console.log(JSON.stringify(complaintToAdd));
    const result = await complaintApi.createCM(complaintToAdd, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
    if (!result.ok) {
      console.log(result);

      setUploadVisible(false);
      setInfo({
         complaintStatus: "لم يتم تقديم الشكوى",
         complaintNo: "",  
        
      });
      setLoading(false);
      return;
    }
    else {

    if (result.data) {
      setInfo({
        complaintNo:result.data,
        complaintStatus: "قيد المتابعة",});
        setLoading(false);
    }}
    resetForm();
  };


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
    let imageToReturn= {bytes:""};

    for (const image of images) {
      var extension = image.substr(image.lastIndexOf(".") + 1);
      imageToReturn={
        dosyaCesidi: "image",
        dosyauzanti: "." + extension,
        //belgeTarihi: "01/01/2020",
        belgeSayisi: "1",
        bytes: await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        }),
      };
    }

    console.log(imageToReturn.bytes.length);
     return imageToReturn;
  };
 
  return (
    <>
    {info && (
      <Info
        numberOfLines={5}
        buttonText="أعد التقديم"
        buttonVisible={info.complaintNo !== "" ?false:true}
        color={colors.danger}
        message={ 
          (info.complaintNo !== "" ? (" . رقم الشكوى : " + info.complaintNo +"\n"+
          "حالة الشكوى : " +info.complaintStatus)
          : info.complaintStatus)
        }
        onPress={() => setInfo(null)}
      />
    )}
    {!isConnected && (
      <Info
        numberOfLines={2}
        buttonText="اتّصال بالشّبكة"
        buttonVisible={true}
        color={colors.danger}
        message={ 
          "لتتمكّن من استخدام الخدمة يرجى الاتّصال بشبكة الإنترنت"
        }
        onPress={() =>{console.log("ssss");wifi();}}
      />
    )}
    {isConnected&&<Screen style={styles.container}>    
    <UploadScreen
      onDone={() => {
        setUploadVisible(false);
      }}
      progress={progress}
      visible={uploadVisible}
    />
    <ActivityIndicator visible={loading} />

      <Form
        initialValues={{
          ComplaintImage:[],
          ComplaintDept:{label:'المرور',value:3},
          ComplaintDeptProblem:{label:'اعتداء\إغلاق رصيف',value:106},
          ComplaintCustName:user.name,
          ComplaintCustID:user.nameidentifier,
          ComplaintAddr:"",
          ComplaintCustMobile:user.mobilephone==""?"":user.mobilephone,
          ComplaintNotes:""          
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
      <ScrollView>
        <View style={styles.imagesection}>
          <FormImagePicker name="ComplaintImage" capture={true} />
        </View>
      <View style={styles.section}>
      <Picker
        items={          
          getDeptApi.data?.map(
          (Dept) => {
            return {label: Dept.NAME,value: Dept.ID };
                  })
                }
        name="ComplaintDept"
        placeholder="القسم"
        showPlaceholder={false}
        
        selectedItemChanged={(Dept) =>   
          getDeptProblemsApi.request(Dept.value)
       
        }
      />
      <Picker
        items={getDeptProblemsApi.data?.map(
          (DeptProblem) => {
            return {label: DeptProblem.NAME ,value: DeptProblem.ID };
                  })}
        name="ComplaintDeptProblem"
        placeholder="يرجى تحديد المشكلة"       
      />
        <Field
          name="ComplaintCustName"
          placeholder={"الاسم"}
          style={[styles.name]}
          showPlaceholder={false}
        />
        <Field
          keyboardType="number-pad"
          maxLength={9}
          name="ComplaintCustID"  
          //showPlaceholder={user.role=="Anonymous"}
          showPlaceholder={false}
          placeholder="رقم الهوية"
          style={[styles.name]}
        />
          <Field
          name="ComplaintAddr"
          placeholder="العنوان"
          showPlaceholder={false}
          style={[styles.name]}
        />
          <Field
           keyboardType="number-pad"
           name="ComplaintCustMobile"
          showPlaceholder={false}
          placeholder="رقم الهاتف المحمول"
          style={[styles.name]}
        />
        <Field
          name="ComplaintNotes"
          multiline
          showPlaceholder={false}
          numberOfLines={3}
          placeholder="ملاحظات"
          style={[styles.name]}
        />
        </View>
        <SubmitButton title="إرســـال" />
        </ScrollView>

      </Form>
    </Screen>}
    </>
  );
}
export default ComplaintsScreen;

const styles = StyleSheet.create({
  section: { marginHorizontal: "20%" ,width:"60%",fontSize:14,},
  Field: { 
  width:"50%",
  fontSize:14,
  fontFamily:"Cairo_400Regular",
  // /color: colors.black
},
name: { 
width:"100%",
fontSize:14,
fontFamily:"Cairo_400Regular",
color: colors.darkNew,  textAlign:"right",

},
  button:{width:"70%"},
  imagesection: { width:"100%" },

  container: {
    fontSize:10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
