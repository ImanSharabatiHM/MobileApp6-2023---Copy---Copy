import React from "react";
import  {useState,useEffect}  from 'react';
import { StyleSheet,View ,ScrollView} from "react-native";
import * as Yup from "yup";
import contentApi from "../api/content";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import * as FileSystem from "expo-file-system";
import RequestApi from "../api/request";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";

import useAuth from "../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";

import Screen from "../components/Screen";
import constants from "../config/constants";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import complaint from "../api/complaint";
import FormOneImagePicker from "../components/forms/FormOneImagePicker";

const validationSchema = Yup.object().shape({
 
  CustID: Yup.string().required("رقم الهوية مطلوب")
  .min(9, "يجب إدخال 9 أرقام")
  .max(9),
  //CustName: Yup.string().required("اسم مقدم الطلب"),
  //CustMobile:Yup.string().required("رقم هاتف مقدم الطلب"),
 
});

function UpdateInfoScreen({ navigation }) {

  const { user } = useAuth();
  const getWaterAreasApi = useApi(contentApi.getWaterAreas);

  //const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);



  const handleSubmit = async (Request, { resetForm }) => {
    console.log(user);
    setProgress(0);
    setUploadVisible(true);
    let RequestToAdd = { 
      CUST_NO: Request.CustID,
      CUST_NAME:Request.CustName,
      CITY:Request.CustCity,
      STREET:Request.CustSTREET,
      MOBILE:Request.CustMobile,
      EMAIL:Request.CustMail,
      CUST_JOB:Request.CustJob,
      STREET:Request.CustStreet,
       waterarea:Request.CustWater        
       };

    const result = await RequestApi.createRequestUpdate(RequestToAdd, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
    console.log(JSON.stringify(result)+"  \n\n "+JSON.stringify(RequestToAdd));
    if (!result.ok) {
      setUploadVisible(false);
      setInfo({
         RequestStatus: "لم يتم تقديم الطلب",
         RequestNo: "",  
      });
      setLoading(false);
      return;
    }
    else {

    if (result.data=="Success") {
      setInfo({
        //RequestNo:"111111",
        RequestStatus: "طلبك قيد المتابعة..",});
        setLoading(false);
    }}
    resetForm();
  };


   
 
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

     return imageToReturn;
  };
  const handleChange1 = async (RequestType ) => {
     if(RequestType =="0"){}
        else { }
  }
 
  useEffect(() => {
    getWaterAreasApi.request();
   }, []);
  
  return (
    <>
    {info && (
      <Info
        numberOfLines={5}
        buttonText="أعد التقديم"
        buttonVisible={true}
        color={colors.primary}
        message={ 
          (info.RequestNo !== "" ? (" . رقم الطلب : " + info.RequestNo +"\n"+
          "حالة الطلب : " +info.RequestStatus)
          : info.RequestStatus)
        }
        onPress={() => setInfo(null)}
      />
    )}
    <Screen style={styles.container}>
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
          CustName:user.name,
          CustGenderType:"0",
          CustID:user.nameidentifier,
          CustCity:"",
          CustJob:user.role=="HMUser"?"موظف في بلدية الخليل":"",
          CustStreet:user.streetaddress,
          CustMobile:user.mobilephone,
          CustMail:user.emailaddress, 
          CustWater:{label: user.primarygroupsid,value: (getWaterAreasApi.data.filter(Place => Place.Area ==user.primarygroupsid)).length>0?getWaterAreasApi.data.filter(Place => Place.Area ==user.primarygroupsid)[0]:0},         
         
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
      <ScrollView>
    
      <View style={styles.section}>
      <FormRadioButtonGroup handleChange1= {handleChange1}  name="CustGenderType" items={[{ label: "ذكر", value: '0' }, { label: "أنثى", value: '1' }]} />

      <Field
          keyboardType="number-pad"
          maxLength={9}
          editable={false}
          name="CustID"  
          //showPlaceholder={user.role=="Anonymous"} // handleChange1={handleTypeChange}
          showPlaceholder={true}
          placeholder="رقم الهوية"
          style={[styles.id]}
        />
        <Field
          name="CustName"
          placeholder={"الاسم"}
          style={[styles.name]}
          showPlaceholder={true}
        />
        <Field
          name="CustJob"
          placeholder={"المهنة"}
          style={[styles.name]}
          showPlaceholder={true}
        />
        

          <Field
          name="CustCity"
          placeholder="المدينة"
          showPlaceholder={true}
          style={[styles.name]}
        />
        
        <Field
          name="CustStreet"
          placeholder="الشـارع"
          showPlaceholder={true}
          style={[styles.name]}
        />
          <Field
           keyboardType="number-pad"
           name="CustMobile"
           showPlaceholder={true}
           placeholder="رقم الهاتف المحمول"
          style={[styles.name]}
        />
          <Field
 
           name="CustMail"
          showPlaceholder={true}
          placeholder="عنوان البريد الإلكتروني"
          style={[styles.name]}
        />
              <Picker
        items={          
          getWaterAreasApi.data?.map(
            (Place) => {
              return {label: Place.Area,value: Place.ID };
                    })
                }
        name="CustWater"
        waterPicker={true}
        placeholder="خط توزيع المياه"
        showPlaceholder={false}
      
      />

        </View>
        <SubmitButton title="إرسال طلب التعديــل" />
        </ScrollView>

      </Form>
    </Screen>
    </>
  );
}
export default UpdateInfoScreen;

const styles = StyleSheet.create({
  section: { marginHorizontal: "10%" ,width:"80%",fontSize:12,marginTop:20},
  Field: { 
  width:"50%",
  fontSize:12,
  fontFamily:"Cairo_400Regular",
  // /color: colors.black
},
name: { 
width:"100%",
fontSize:14,
padding:0,
top:0,
fontFamily:"Cairo_400Regular",
color: colors.darkNew,
textAlign:"right"

},
id: { 
  width:"100%",
  fontSize:14,
  fontFamily:"Cairo_600SemiBold",
  color: colors.danger,
  textAlign:"right"
  },
  button:{width:"70%"},
  imagesection: { width:"100%" },

  container: {
    fontSize:10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
