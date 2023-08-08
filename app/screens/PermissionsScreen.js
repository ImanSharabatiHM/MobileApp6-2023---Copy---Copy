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
import { useFormikContext } from "formik";

import useLocation from "../hooks/useLocation";

import Screen from "../components/Screen";
import constants from "../config/constants";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import complaint from "../api/complaint";
import AppText from "./../components/Text";
import authStorage from "./../auth/storage";

const validationSchema = Yup.object().shape({

  ComplaintCustID: Yup.string().required("رقم الهوية مطلوب")
    .min(9, "يجب إدخال 9 أرقام")
    .max(9),
    ComplaintCustName: Yup.string().required("اسم مقدم الطلب"),
    LeaveReason: Yup.string().required("الملاحظات"),
 
});

function PermissionsScreen({ navigation }) {
  const { user } = useAuth();
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());


  const [fromTxt, setFromTxt] = useState("");
  const [toTxt, setToTxt] = useState("");

  const getAlternateEmployees = useApi(customerApi.getAlternateEmployees);
  const getDeptProblemsApi = useApi(complaintApi.getComplaintDeptProblems);
  //const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [balance, setBalance] = useState({ loading: false, data: "رصيد الإجازات" });

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(Date.now);
  const [to, setTo] = useState(Date.now);
  const [TotalTxt,setTotalTxt]=useState("");
  const [info, setInfo] = useState(null);
  const getEmpLeaveBalance = async () => {
    setBalance({ loading: true, data: "رصيد الإجازات" });
    const token = await authStorage.getToken();

    const result = await customerApi.GetEmpLeaveBalance(user.serialnumber,token);
  
  console.log(result);
    if (!result.ok) {
      setBalance({ loading: false, data:"رصيد الإجازات" });
      return;
    }
  
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    setBalance({ loading: false, data :data});
  };
  useEffect(() => { 
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    getAlternateEmployees.request(user.serialnumber);
    getEmpLeaveBalance();
    console.log(getAlternateEmployees.data);
  }, []);
  const handleChange1 = async (RequestType ) => {
     if(RequestType ==1){
      setIsDate(true);
      setFrom((new Date()));
      setTo((new Date()));  
      // setFrom(dayjs(((new Date()).now)).locale("ar").format('YYYY/MM/DD'));
      //setTo(dayjs(((new Date()).now)).locale("ar").format('YYYY/MM/DD'));
      setSelectedDateTo(new Date());
      setSelectedDateFrom(new Date());
    
    }
     else {
      setFrom((new Date()));
      setTo((new Date()));  
      setSelectedDateTo(new Date());
      setSelectedDateFrom(new Date());

      setIsDate(false);
     }
     setTotalTxt("");

     //setFieldValue("From", "");            

    
  }
  const FindDifference = async ( ) => {
   
   console.log("Diffff   "+d.valueOf()/(1000 * 60 * 60 * 24));
 }
 const changeTotal = (To,From) => {
  var d= ((To.valueOf()-From.valueOf())/(1000 * 60 * 60 * 24));
 // console.log("To : "+To+"      from :  "+From);
  var days=Math.floor(d+1);
  if(isDate)
  {setTotalTxt(days+"أيام ");}
  else
  {
    var totalTime=(To.getTime()-From.getTime())/1000;
    
    totalTime=Math.ceil(totalTime/60);
    totalTime=totalTime%(24*60);
    var min,hour,days;
    min=Math.floor(totalTime%60);
    hour=totalTime/60;
    hour=hour%24;
   // console.log("minnsss"+min+"hourrsss" +hour);
   
    if(totalTime>=60){;hour=(((totalTime-min))/60);setTotalTxt(min+"دقائق "+hour+" ساعات" );}
    else if(totalTime<60){;hour=Math.ceil(totalTime)/60;setTotalTxt(min+"دقائق " );}
  }
 // console.log("Diff:  "+  Math.floor(d)+2);
   
 }
 const handleFirstFrom = (date) => {
  if(!isDate){
    var d=new Date();
     date.setDate(d.getDate());
     date.setMonth(d.getMonth());
     date.setFullYear(d.getFullYear());
    }
 else
{
  date.setHours(8);
  date.setMinutes(0);
  date.setSeconds(0);

}
    

  setSelectedDateFrom(date);
 // changeTotal(selectedDateTo,date);
  //moment(date).utcOffset(0, true).format()
  //var clearUTCDate = moment(date.toUTCString()).utcOffset(0, true).format() ;
  var h=d.getHours();
  console.log("h"+h);
  var a=d.getUTCHours();
  var gmt=h-a;
  var newdate=new Date(date);
  newdate.setHours(h+gmt);
  console.log( date.toISOString() + date+"             fromiso   "+newdate.toISOString());
  setFromTxt(newdate.toISOString());
   
 
};
 const handleConfirmFrom = (date) => {
  if(!isDate){
    var d=new Date();
     date.setDate(d.getDate());
     date.setMonth(d.getMonth());
     date.setFullYear(d.getFullYear());
    }
 else
{
  date.setHours(8);
  date.setMinutes(0);
  date.setSeconds(0);

}
   setFrom(date); 

  setSelectedDateFrom(date);
  changeTotal(selectedDateTo,date);
  //moment(date).utcOffset(0, true).format()
  //var clearUTCDate = moment(date.toUTCString()).utcOffset(0, true).format() ;
  var h=date.getHours();
  var a=date.getUTCHours();
  var gmt=h-a;
  var newdate=new Date(date);
  newdate.setHours(h+gmt);
 // console.log( date.toISOString() + date+"             fromiso   "+newdate.toISOString());
  setFromTxt(newdate.toISOString());
   
 
};
const handleConfirmTo = (date) => {
  console.log("OKK");
 if(!isDate){
var d=new Date();
 date.setDate(d.getDate());
 date.setMonth(d.getMonth());
 date.setFullYear(d.getFullYear());
 


}
else
{
  date.setHours(14);
  date.setMinutes(0);
  date.setSeconds(0);

}
setTo(date);
  setSelectedDateTo(date);
  changeTotal(date,selectedDateFrom);
  var h=date.getHours();
  var a=date.getUTCHours();
  var gmt=h-a;
  var newdate=new Date(date);
  newdate.setHours(h+gmt);
  //console.log( date.toISOString() + date+"             toiso   "+newdate.toISOString());
  setToTxt(newdate.toISOString());
 
 
};
  const handleSubmit = async (request, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const token = await authStorage.getToken();
    console.log(from +"     "+to);
    var From1=new Date(from);
    var To1=new Date(to);
    console.log(From1);

  var h=From1.getHours();
  var a=From1.getUTCHours();
  var gmt=h-a;
  //var newdate=new Date(date);
  From1.setHours(h+gmt);
  To1.setHours(To1.getHours()+gmt);
    let requestToAdd = {       
        AlterEmpNo: request.AlterEmpNo.value,
        LeaveReason: request.LeaveReason,
        FromDate: From1,
        ToDate: To1,//"2022-11-01T12:09:03.1501945+03:00"
    };
   console.log(requestToAdd);
   //return;
     var result=null;
    if(!isDate){
       result = await customerApi.createHourLeave(requestToAdd,token, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    }); }
    else
    { result = await customerApi.createDayLeave(requestToAdd,token, (progress) => {
       setProgress(progress);
       if (progress == 1) setLoading(true);
     });
    }
    
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

      if (result.data.httpStatus==200) {
        setInfo({
          complaintNo: "",
          complaintStatus: "قيد المتابعة",
        });
        setLoading(false);
        console.log(requestToAdd);
      }
      else
      if (result.data.httpStatus==400) {
        setUploadVisible(false);
        setInfo({
          complaintNo:"" ,//result.data,
          complaintStatus: result.data.ResponeMessage,
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
       
        {!balance.loading&& balance.data&&<Form        
          key={"RequestForm"}
          initialValues={{
            CustName: user.name,
            EmpNo: user.serialnumber,
            Balance:balance?.data.LEAVE_DAYS+"يوم "+balance?.data?.LEAVE_HOURS+"ساعات "+balance.data?.LEAVE_MINTS+" دقائق",
            AlterEmpNo: "",
            LeaveReason: "",
            RequestType:"2",
            From:from,
            To:to,
            FromTxt:"",
            ToTxt:""
          }}
          onSubmit={handleSubmit}
          //validationSchema={validationSchema}
        >
          <ScrollView>
         <View style={styles.section}>
         {true&&<FormRadioButtonGroup  handleChange1={handleChange1} name="RequestType" 
         items={[{ label: "إجازة", value: "1" }, { label: "إذن مغادرة", value: "2" }]} />
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
                  getAlternateEmployees?.data?.map(
                    (emp) => {
                      return { label: emp.EmpName, value: emp.EmpNo };
                    })
                }
                style={[styles.name]}
                name="AlterEmpNo"
                placeholder="الموظف البديــل"
                showPlaceholder={false}
                selectedItemChanged={(Dept) =>
                  getDeptProblemsApi.request(Dept.value)

                }
              />}
  
              <Field
                keyboardType="number-pad"
                maxLength={9}
                name="EmpNo"
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={false}
                placeholder="الرقم الوظيفي "
                style={[styles.name]}
                editable={false}

              />
               <Field
                name="Balance"
                placeholder={"رصيد الإجازات"}
                showPlaceholder={false}
                style={[styles.name]}
                editable={false}
              />
              <View style={styles.dateSection}>
                <FormDatePicker
                  selectedDate={selectedDateFrom}
                  name="From"
                  placeholder={isDate?"بداية دوام يوم":"من ساعة"}
                  style={styles.name}
                  mode={isDate?"date":"time"}
                  handleConfirm={handleConfirmFrom}
                  />
                <FormDatePicker
                  selectedDate={selectedDateTo}
                  name="To"
                  placeholder={isDate?"نهاية دوام يوم":"إلى ساعة"}
                  mode={isDate?"date":"time"}
                  handleConfirm={handleConfirmTo}

                 />
              </View>
              
              <Field
                name="Total"
                placeholder={TotalTxt==""?(isDate?"عدد الأيام":"مجوع الوقت"):TotalTxt}
                showPlaceholder={false}
                style={[styles.name]}
                editable={false}
              />
              {false&&<Field
                name="FromTxt"
                placeholder={"من"}
                showPlaceholder={false}
                style={[styles.name]}
                editable={false}
              />}
             { false&&<Field
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
                placeholder={isDate?"سبب الإجازة":"سبب إذن المغادرة"}
                style={[styles.name]}
              />
            </View>
            <SubmitButton buttonStyle={{width:'80%',marginHorizontal:'10%'}} title="تحويل الطلب للمسؤول" />
          </ScrollView>
        </Form>}
      </Screen>
    </>
  );
}
export default PermissionsScreen;

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
