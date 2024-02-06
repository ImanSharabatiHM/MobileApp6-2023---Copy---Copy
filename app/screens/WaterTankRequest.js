import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import contentApi from "../api/content";
import complaintApi from "../api/complaint";
import customerApi from "../api/customer";
import requestApi from "../api/request";
import { Alert } from "react-native";
import Alertmsg from "../components/Alertmsg";

import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import * as FileSystem from "expo-file-system";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";

import useAuth from "../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import FormDatePicker from "../components/forms/FormDatePicker";

import useLocation from "../hooks/useLocation";
 
import Screen from "../components/Screen";
import constants from "../config/constants";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import complaint from "../api/complaint";
import AppText from "../components/Text";
import authStorage from "../auth/storage";
import { useFormikContext } from "formik";





const validationSchemaCode = Yup.object().shape({

  CustID: Yup.string().required("رقم الهوية مطلوب")
    .min(9, "يجب إدخال 9 أرقام")
    .max(9),
   
});

function WaterTankRequest({ navigation }) {

  const { user } = useAuth();
  const getAlternateEmployees = useApi(customerApi.getAlternateEmployees);
  const getDeptProblemsApi = useApi(complaintApi.getComplaintDeptProblems);
  const [custName, setCustName] = useState("");
  const [custId, setCustId] = useState(null);
 
  //const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [ready, setReady] = useState(true);
  const [units, setUnits] = useState({ loading: false, data: null });

  const [progress, setProgress] = useState(0);
  const [currentLocaVissible, setCurrentLocaVissible] = useState(true);
 
  const [loading, setLoading] = useState(false); 
  const [isFloor, setIsFloor] = useState(false); 
  const [isMsgVisible, setIsMsgVisible] = useState(false); 

  
  const [totalPrice, settotalPrice] = useState(0);



  const [info, setInfo] = useState(null);
  const validationSchema = Yup.object().shape({

    MobileNo: Yup.string().required(" رقم التواصل مطلوب"),
    Level: Yup.string().required("الطابق"),
    Location:currentLocaVissible&& Yup.string().required("يرجى تحديد العنوان أو اختيار وحدة")
});
  const getUnits = async () => {
    setUnits({ loading: true, data: null });
  //const result = await customerApi.getUnitsWithTaxByUserID("852950427");
  const result = await customerApi.GetUnitDescription(user.nameidentifier);
    if (!result.ok) {
      //setError(true);
      setUnits({ loading: false, data:null });
      return;
    } 
  
    let dataa = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    dataa.push({U_ID:"0"});
    console.log(dataa);
    setUnits({ loading: false, data: dataa });
  };
  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    getUnits();
    getAlternateEmployees.request(user.serialnumber);

    console.log(getAlternateEmployees.data);
  }, []);
  const handleFloor = () => {
  setIsMsgVisible(true);
  };
  const handleChange1 = async (Type ) => {
   
      if(Type ==2){
        //setIsFloor(true); 
       }
     else 
     {//setIsFloor(false); 
     }
    // setFrom(null);
    // setTo(null);
  }
  
 

const getCustomer = async (id) => {
  
  //const result = await customerApi.getUnitsWithTaxByUserID("852950427");
  var token = await authStorage.getToken();
 var result = await customerApi.GetCustomerNameByID(id,token);

   if (!result.ok) {
     setCustName("");
     return;
   } 

   let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
   setCustName(data);
 };
 const handleSubmitCode = async (request, { resetForm }) => {
  console.log(request.AlterEmpNo);
  setProgress(0);
  setUploadVisible(true);
  var token = await authStorage.getToken();

  let requestToAdd = {       
      CustID:request.CustID
  };
  
  const result=await requestApi.RequestMobileAuthCode(requestToAdd.CustID,token);
  console.log(result);
  if (!result.ok) {
    setUploadVisible(false);
    setInfo({
      complaintStatus:isDate? "لم يتم تقديم طلب الإجازة":"لم يتم تقديم إذن المغادرة",
      complaintNo: "",
    });
    setLoading(false);
    setReady(false);
    return;
  }
  else {

    if (result.data) {
      setUploadVisible(false);

      setInfo({
        complaintNo: result.data,
        complaintStatus: "تم إرسال رمز التحقق إلى رقم ******002",
      });
      setLoading(false);
      setReady(true);
    }
  }
  resetForm();
};
  const handleSubmit = async (request, { resetForm }) => {
     
    setProgress(0);
    setUploadVisible(true);
    let requestToAdd = {       
     // AuthCode: request.AuthCode,
      UnitID:request.UnitID.U_ID,
    //  CustID: request.CustID,
      Border: request.Border,
      Location: request.Location?request.Location:"0",
      MobileNo: request.MobileNo,
     // TankCount:request.TankCount,
      EmptyWaterLocation: request.EmptyWaterLocation,
      Notes: request.Notes,
      Level: request.Level
    };
    console.log(requestToAdd);
    var token = await authStorage.getToken();
   const result=await requestApi.RequestWaterTank(token,requestToAdd, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
     
 
    console.log(result);
    if (!result.ok) {
      setUploadVisible(false);
      setInfo({
        complaintStatus:isDate? " لم يتم تقديم طلب تنك":"لم يتم تقديم طلب تنك",
        complaintNo: "",
      });
      setLoading(false);
      return;
    }
    else {

      if (result.data.HttpStatus==200) {
        setInfo({
          complaintNo: "",
          complaintStatus: result.data.ResonseObj,
        });
        setLoading(false);
      }
      else
      
       {
        setInfo({
          complaintNo: "",
          complaintStatus: result.data.ResonseObj,
        });
        setLoading(false);
      }

    }
    resetForm();
  };

  return (
    <>
     {isMsgVisible && <Alertmsg
     onPress2={()=>{setIsMsgVisible(false);}}
     buttonTitle2={"إكمال"}
     isVisible={isMsgVisible}      
     title={"في حالة التفريغ بالخزانات يحتوي التنك 5 أكواب! "}
     has2Btn={true}
      onPress={() => {
        setIsMsgVisible(false);}}
      buttonTitle={"إغلاق"}
      style={styles.alert}
     
   />}
      {info && (
        <Info
          numberOfLines={5}
          buttonText="متابعة طلب تنك مياه  "
          buttonVisible={false}
          color={colors.primary}
          message={
            ("حالة الطلب : " + info.complaintStatus)
             
          }
          onPress={() => {setInfo(null);
            //setCustName("");
        }}
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
        {!ready&&<Form
        initialValues={{
          CustName:custName,
          CustID:"",
          CustMobile:"",         
        }}
        onSubmit={handleSubmitCode}
        validationSchema={validationSchemaCode}
      >
      <ScrollView>
    
      <View style={styles.section}>
      <Field
          keyboardType="number-pad"
          maxLength={9}
          editable={true}
          name="CustID"
          onChangeText={newText => {                        
           // console.log("sss"+newText);
          if((newText+"").length==9){setCustId(newText);getCustomer(newText);
          }
          else setCustName("");
          }}
          //showPlaceholder={user.role=="Anonymous"} // handleChange1={handleTypeChange}
          showPlaceholder={true}
          placeholder="رقم هوية مقدم الطلب"
          style={[styles.id]}
         //onDone={newText => setCustId(newText)}
         //onEndEditing={getCustomer}
        />
         <Field
          name="CustName"
          value={custName}
          placeholder={"الاسم"}
          editable={false}
          style={[styles.name]}
          showPlaceholder={true}
        />
         { false&&<Field
           keyboardType="number-pad"
           name="CustMobile"
           showPlaceholder={true}
           placeholder="رقم الهاتف المحمول"
          style={[styles.name]}
        />}

        </View>
        <SubmitButton title="إرسال  رمز التأكيد  " />
        </ScrollView>

      </Form>}
       {ready&& <Form        
          key={"RequestForm"}
          initialValues={{
            CustID:user.nameidentifier,
            CustName: user.name,
            Location: "",
            MobileNo: user.mobilephone,
            EmptyWaterLocation: "1",
            TankCount:0,
            Notes:"",
            Level:1,
            Border: "1",
            UnitID:{U_ID:"0"}
             
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
         <View style={styles.section}>
         
          {false&&<Field
          keyboardType="number-pad"
          maxLength={9}
          editable={false}
          name="CustID"
          //value={custId}

          onChangeText={newText => {                        
           // console.log("sss"+newText);
          if((newText+"").length==9){setCustId(newText);getCustomer(newText);
          }
          else setCustName("");
          }}
          //showPlaceholder={user.role=="Anonymous"} // handleChange1={handleTypeChange}
          showPlaceholder={true}
          placeholder="رقم هوية مقدم الطلب"
          style={[styles.id]}
         //onDone={newText => setCustId(newText)}
         //onEndEditing={getCustomer}
        />}
         <Field
          name="CustName"
          //value={custName}
          placeholder={"الاسم"}
          editable={false}
          style={[styles.specificLocation]}
          showPlaceholder={true}
        />
          
        {false&&<Field
          name="AuthCode"      
          placeholder={"رمز التأكيد (تم ارسال sms)"}
          editable={true}
          style={[styles.name]}
          showPlaceholder={true}
        />}
          <Field
          name="MobileNo"      
          placeholder={"رقم التواصل"}
          editable={true}
          keyboardType="number-pad"

          style={[styles.name]}
          showPlaceholder={true}
        /> 
       
        {true&&<Picker
        unitsPicker={true}
        navigation={navigation}
        items={units.data}
        name={"UnitID"}
        editable={false}
        width={"100%"}
        placeholder="رقم الوحدة"
        showPlaceholder={true}
        searchPlaceHolder={"بحث عن رقم الوحدة"}
        selectedItemChanged={(unit) =>   
         {
        console.log(unit.U_ID);
        if(unit.U_ID==0)
        {
          setCurrentLocaVissible(true);
        }
        else setCurrentLocaVissible(false);
             
        }}
      />}
       {currentLocaVissible&&<Field
                name="Location"
                placeholder="العنوان"
                showPlaceholder={true}
                style={[styles.name]}
               //editable={false}
          />}
            {true&&<FormRadioButtonGroup title={"مكان التفريغ"}  handleChange1={handleChange1} name="EmptyWaterLocation" 
         items={[{ label: "(سعة التنك 10 أكواب)بئر", value: "1" }]} />
         }
             {isFloor&&<Field
             //, { label: "خزانات", value: "2" }
                keyboardType="number-pad"
                maxLength={2}
                name="Level"
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={true}
                placeholder="الطابق"
                style={[styles.name]}

              />}
               
        {true&&<FormRadioButtonGroup  handleChange1={handleChange1} title={"الموقع"} name="Border" 
         items={[{ label: "داخل حدود البلدية", value: "1" }, { label: "خارج حدود البلدية", value: "2" }]} />
         }
        
              
                
  
              {false&&<Field
                keyboardType="number-pad"
                maxLength={2}
                name="TankCount"
                
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={true}
                placeholder="عدد التنكات"
                style={[styles.name]}
              />}
                {false&&<Field
                keyboardType="number-pad"
                maxLength={2}
                name="TankPrice"
                value={totalPrice}
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={false}
                placeholder="المبلغ المطلوب"
                style={[styles.price]}
              />}        
              <Field
                name="Notes"
                multiline
                showPlaceholder={false}
                numberOfLines={3}
                placeholder={"ملاحظات"}
                style={[styles.name]}
              />
            </View>
            <SubmitButton buttonStyle={{width:'80%',marginHorizontal:'10%'}} title="تحويل الطلب " />
          </ScrollView>
        </Form>}
</Screen>
    </>
  );
}
export default WaterTankRequest;

const styles = StyleSheet.create({
 
  section: { marginHorizontal: "10%", width: "80%", fontSize: 14, },
  alert:{
    width:"50%",
    height:"50%"
  },
  Field: {
    width: "50%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    // /color: colors.black
  },
  dateSection: {     width: "100%",
  flexDirection: 'row', fontSize: 14 },

  name: {
    width: "100%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew, textAlign: "right",

  },
  price: {
    width: "100%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.youtube, textAlign: "right",

  },
  specificLocation: {
    width: "100%",
    fontSize: 14,
    fontFamily: "Cairo_600SemiBold",
    color: colors.danger, textAlign: "right",

  },
  total: {
    padding:10,
    width: "100%",
    fontSize: 16,
    fontFamily: "Cairo_600SemiBold",
    color: colors.danger, textAlign: "justify",

  },
  id: { 
    width:"100%",
    fontSize:14,
    fontFamily:"Cairo_600SemiBold",
    color: colors.danger,
    textAlign:"right"
    },
  button: { width: "70%" },
  imagesection: { width: "100%" },

  container: {
    fontSize: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
});
