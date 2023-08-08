import React from "react";
import  {useState,useEffect}  from 'react';
import { StyleSheet,View ,ScrollView} from "react-native";
import * as Yup from "yup";
import contentApi from "../api/content";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import * as FileSystem from "expo-file-system";
import RequestApi from "../api/request";
import customerApi from "../api/customer";
import authStorage from "./../auth/storage";

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

function UpdateCustScreen({ navigation }) {

  const { user } = useAuth();

  //const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [custName, setCustName] = useState("");
  const [custId, setCustId] = useState(null);


  const handleSubmit = async (Request, { resetForm }) => {
    console.log(user);
    setLoading(true);
    var token = await authStorage.getToken();

    //setUploadVisible(true);
    let RequestToAdd = { 
      CustNo: Request.CustID,
      MobileNo:Request.CustMobile
       };

    const result = await customerApi.ResetCustPassword(RequestToAdd,token);
    //console.log(JSON.stringify(result)+"  \n\n "+JSON.stringify(RequestToAdd));
    if (!result.ok) {
      console.log(result);
      //setUploadVisible(false);
      setInfo({
         RequestStatus: "لم يتم تقديم الطلب",
         RequestNo: "",  
      });
     setLoading(false);
      return;
    }
    else {

      {
      setInfo({
        RequestNo:"",
        RequestStatus: "تم تحديث البيانات",});
        setLoading(false);
    }}
    resetForm();
    setCustName('');
  };


const getCustomer = async () => {
  
   //const result = await customerApi.getUnitsWithTaxByUserID("852950427");
   var token = await authStorage.getToken();

  const result = await customerApi.GetCustomerNameByID(custId,token);
    if (!result.ok) {
      console.log(result);
      //setError(true);
      //setUnits({ loading: false, data:null });
      return;
    } 
    console.log(result);
  
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
   // setUnits({ loading: false, data:data });
  
    console.log(custId);
    setCustName(data);
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
          CustName:custName,
          CustID:"",
          CustMobile:"",         
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
      <ScrollView>
    
      <View style={styles.section}>
      <Field
          keyboardType="number-pad"
          maxLength={9}
          editable={true}
          name="CustID"
          onChangeText={newText => setCustId(newText)}

 
          //showPlaceholder={user.role=="Anonymous"} // handleChange1={handleTypeChange}
          showPlaceholder={true}
          placeholder="رقم الهوية"
          style={[styles.id]}
        //  onDone={newText => setCustId(newText)}
          onEndEditing={getCustomer}

        />
         <Field
          name="CustName"
          value={custName}
          placeholder={"الاسم"}
          editable={false}
          style={[styles.name]}
          showPlaceholder={true}
        />
          <Field
           keyboardType="number-pad"
           name="CustMobile"
           showPlaceholder={true}
           placeholder="رقم الهاتف المحمول"
          style={[styles.name]}
        />

        </View>
        <SubmitButton title="إرسال طلب التعديــل" />
        </ScrollView>

      </Form>
    </Screen>
    </>
  );
}
export default UpdateCustScreen;

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
