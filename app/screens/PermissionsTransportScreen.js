import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import contentApi from "../api/content";
import complaintApi from "../api/complaint";
import customerApi from "../api/customer";
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

const validationSchema = Yup.object().shape({

  ComplaintCustID: Yup.string().required("رقم الهوية مطلوب")
    .min(9, "يجب إدخال 9 أرقام")
    .max(9),
    ComplaintCustName: Yup.string().required("اسم مقدم الطلب"),
    LeaveReason: Yup.string().required("الملاحظات"),
 
});

function PermissionsTransportScreen({ navigation }) {

  const { user } = useAuth();
  const getAlternateEmployees = useApi(customerApi.getAlternateEmployees);
  const getDeptProblemsApi = useApi(complaintApi.getComplaintDeptProblems);

  //const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [isDate, setIsDate] = useState(false);

  const [progress, setProgress] = useState(0);
  const [currentLocaVissible, setCurrentLocaVissible] = useState(false);
  const [toLocaVissible, setToLocaVissible] = useState(false);

  const [loading, setLoading] = useState(false);currentLocaVissible
  const [from, setFrom] = useState(Date.now);
  const [remainTime, setRemainTime] = useState("المتبقي لموعد الانطلاق..");

  const [to, setTo] = useState(null);
  const [locations, setLocation] = useState({
    data:[
      {locationID: 1, locationName:'المبنى الرئيسي'},
      {locationID: 2, locationName:'المركز الكوري'},
      {locationID: 3, locationName:'اسعاد الطفولة'},
      {locationID: 4, locationName:'الصالة الرياضية'},
      {locationID: 5, locationName:'طارق بن زياد'},
      {locationID: 6, locationName:'موقع آخر'},
    ],
    loading:false}


  );

  const [info, setInfo] = useState(null);

  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    getAlternateEmployees.request(user.serialnumber);

    console.log(getAlternateEmployees.data);
  }, []);
  const handleChange1 = async (RequestType ) => {
     if(RequestType ==1)setIsDate(true);
     else setIsDate(false); 

     setFrom(null);
     setTo(null);
  }
  const FindDifference = async ( ) => {
   console.log("sssdfiffee");
 }
 const onChangeDate = async (item) => {
  //console.log("sssdfiffee"+item);
  //console.log(item);
 // console.log(dayjs(item).locale("ar").format('hh-mm'))
//var x=new Date("2022-09-06T23:22:10.724Z");
 // setRemainTime("المتبقي لموعد الانطلاق: "+x.getTime()+"" +item) // 

}
  const handleSubmit = async (request, { resetForm }) => {
    console.log(request.AlterEmpNo);
    setProgress(0);
    setUploadVisible(true);

    let requestToAdd = {       
        AlterEmpNo: request.AlterEmpNo.value,
        LeaveReason: request.LeaveReason,
        //FromDate: request.From,
        //ToDate: request.To
         FromDate: request.FromTxt,//"2022-08-21T12:09:03.1501945+03:00",
         ToDate: request.ToTxt//"2022-08-21T12:09:03.1501945+03:00"
    };
    
    var token = await authStorage.getToken();
    var result=null;
    if(!isDate){
       result = await customerApi.createHourLeave(requestToAdd,token, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });}
    else
    { result = await customerApi.createDayLeave(requestToAdd,token, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
    }
    
    console.log(result);
    if (!result.ok) {
      setUploadVisible(false);
      setInfo({
        complaintStatus:isDate? "لم يتم تقديم طلب الإجازة":"لم يتم تقديم إذن المغادرة",
        complaintNo: "",
      });
      setLoading(false);
      return;
    }
    else {

      if (result.data) {
        setInfo({
          complaintNo: result.data,
          complaintStatus: "قيد المتابعة",
        });
        setLoading(false);
      }
    }
    resetForm();
  };

  return (
    <>
      {info && (
        <Info
          numberOfLines={5}
          buttonText="أعد التقديم"
          buttonVisible={true}
          color={colors.primary}
          message={
            ("حالة الطلب : " + info.complaintStatus)
             
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
          key={"RequestForm"}
          initialValues={{
            CustName: user.name,
            EmpNo: "1",
            AlterEmpNo: "",
            LeaveReason: "",
            RequestType:"2",
            FromPosition: { label: 'المبنى الرئيسي', value: 1 },
            From:dayjs((from)+1800000).locale("ar").format('h:mm A'),
            To:dayjs((from)+7200000).locale("ar").format('h:mm A'),
            TransDate:dayjs(from).locale("ar").format('dddd YYYY/MM/D'),
            FromTxt:"",
            ToTxt:""
          }}
          onSubmit={handleSubmit}
          //validationSchema={validationSchema}
        >
          <ScrollView>
         <View style={styles.section}>
         {false&&<FormRadioButtonGroup  handleChange1={handleChange1} name="RequestType" items={[{ label: "إجازة", value: "1" }, { label: "إذن مغادرة", value: "2" }]} />
          }
         <Field
                keyboardType="number-pad"
                name="CustName"
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={false}
                placeholder="اسم الموظف"
                style={[styles.name]}
                editable={false}

              /> 
             {true&&<Picker
                items={
                  locations?.data?.map(
                    (location) => {
                      return { label: location.locationName, value: location.locationID };
                    })
                }
                style={[styles.name]}
                name="FromPosition"
                placeholder="الموقع الحالي"
                showPlaceholder={false}
                selectedItemChanged={(location) =>
                  {if(location.value==6)setCurrentLocaVissible(true);
                    else setCurrentLocaVissible(false);
                  }

                }
              />}
               {currentLocaVissible&&<Field
                name="FromPositionTxt"
                placeholder="أدخل الموقع الحالي"
                showPlaceholder={true}
                style={[styles.specificLocation]}
               //editable={false}
              />}
               {true&&<Picker
                items={
                  locations?.data?.map(
                    (location) => {
                      return { label: location.locationName, value: location.locationID };
                    })
                }
                style={[styles.name]}
                name="ToPosition"
                placeholder="الذهاب إلى"
                showPlaceholder={false}
                selectedItemChanged={(location) =>
                  {if(location.value==6)setToLocaVissible(true);
                  else setToLocaVissible(false);}

                }
              />}
              {toLocaVissible&&<Field
                name="ToPositionTxt"
                placeholder="ادخل اين تريد الذهاب"
                showPlaceholder={true}
                style={[styles.specificLocation]}
               //editable={false}
              />}
  
              {true&&<Field
                keyboardType="number-pad"
                maxLength={9}
                name="EmpNo"
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={true}
                placeholder="عدد المسافرين"
                style={[styles.name]}

              />}
              <FormDatePicker
                  contWidth={"100%"}
                  name="TransDate"
                  placeholder={"تاريخ التنقّل"}
                  dateFormat={'dddd YYYY/MM/D'}
                 // style={styles.name}
                  mode={ "date"}
                 />
               

              <View style={styles.dateSection}>
                <FormDatePicker
                  name="From"
                  placeholder={isDate?"بداية الإجازة":"من ساعة"}
                  style={styles.name}
                  mode={isDate?"date":"time"}
                  onChangeDate={onChangeDate}

                 />
               
                <FormDatePicker
                  name="To"
                  placeholder={isDate?"نهاية الإجازة":"إلى ساعة"}
                  mode={isDate?"date":"time"}
                  
                 />
               
                 </View>
                 {false&&<Field
                name="بعد "
                //placeholder=" وقت الانطلاق بعد 15 دقيقة"
                placeholder={remainTime}
                showPlaceholder={false}
                style={[styles.name]}
               editable={false}
              />}

              {false&&<Field
                name="FromTxt"
                placeholder={"من"}
                showPlaceholder={false}
                style={[styles.name]}
                editable={false}
              />}
             { false &&<Field
                name="ToTxt"
                placeholder={"من"}
                showPlaceholder={false}
                style={[styles.name]}
                editable={false}
                onChangeText={FindDifference}
              />}
              <Field
                name="LeaveReason"
                multiline
                showPlaceholder={false}
                numberOfLines={3}
                placeholder={isDate?"سبب الإجازة":"الغرض من السفر"}
                style={[styles.name]}
              />
            </View>
            <SubmitButton buttonStyle={{width:'80%',marginHorizontal:'10%'}} title="تحويل الطلب " />
          </ScrollView>
        </Form>
      </Screen>
    </>
  );
}
export default PermissionsTransportScreen;

const styles = StyleSheet.create({
  section: { marginHorizontal: "10%", width: "80%", fontSize: 14, },
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
  specificLocation: {
    width: "100%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.danger, textAlign: "right",

  },
  total: {
    padding:10,
    width: "100%",
    fontSize: 16,
    fontFamily: "Cairo_600SemiBold",
    color: colors.danger, textAlign: "justify",

  },
  button: { width: "70%" },
  imagesection: { width: "100%" },

  container: {
    fontSize: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
});
