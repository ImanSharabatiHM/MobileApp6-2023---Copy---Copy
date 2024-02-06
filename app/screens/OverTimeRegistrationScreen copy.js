import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import contentApi from "../api/content";
import complaintApi from "../api/complaint";
import customerApi from "../api/customer";
import employeesApi from "../api/employees";
 import Button from"../components/Button"
import employeeApi from "../api/employees";

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
import * as Location from 'expo-location';

import useLocation from "../hooks/useLocation";

import Screen from "../components/Screen";
import constants from "../config/constants";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import complaint from "../api/complaint";
import AppText from "../components/Text";
import authStorage from "../auth/storage";
import * as TaskManager from 'expo-task-manager';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import storage from "../auth/storage";
import { diff } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";

const validationSchema = Yup.object().shape({
 
    NOTES: Yup.string().required("سبب العمل الإضافي مطلوب"),
    
 
});
const LOCATION_TASK_NAME = 'background-location-task-track-EMPP';
 let foregroundSubscription = null
 //Insert Employee Location
 const InsertEmployeeLocation = async (x,y,type,token) => {
  var d=new Date();
  console.log("dddd",d);
  const result = await employeeApi.InsertEmployeeLocation(x,y,111,type,token,d);
   console.log(result);
 /* if (!result.ok) {      
      return;
    } */
  };

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data  
    //console.log(locations);
    const token = await authStorage.getToken();
    const trackID = await authStorage.getTrackID();

    const location = locations[0]
    if (location) {     
      var x=location.coords.longitude;
      var y=location.coords.latitude;
      var timestamp=location.timestamp;
      console.log("Location in background(", x,",",y,")..");
      //InsertEmployeeLocation(x,y,666,1,token);
      var d=new Date();
      var result = await employeeApi.InsertEmployeeLocation(x,y,trackID,1,token,d,timestamp);
      if(result.status==200)
       { console.log("Location was sent"); }
     else 
       console.log("Location was NOT SENT");

    }
  }
})
function OverTimeRegistrationScreen({ navigation }) {
  //const [trackID, setTrackId] = useState(null);
  const [notes, setNotes] = useState("");
  const [storedNotes, setStoredNotes] = useState("");

  const [position, setPosition] = useState(null);
  const [startEnabled, setStartEnabled] = useState(true);
  const [taskCompleted, setTaskCompleted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [initialTimer, setInitialTimer] = useState(0);
  const [token, setToken] = useState(0);
  const { user } = useAuth();
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);


  const [fromTxt, setFromTxt] = useState("");
  const [toTxt, setToTxt] = useState("");

  const getAlternateEmployees = useApi(customerApi.getAlternateEmployees);
  const getDeptProblemsApi = useApi(complaintApi.getComplaintDeptProblems);
  //const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [requiredNotesVisible, setRequiredNotesVisible] = useState(false);

  const [isDate, setIsDate] = useState(false);
  const [balance, setBalance] = useState({ loading: false, data: "رصيد الإجازات" });
  const [resetTimer, setResetTimer] = useState(false);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState((new Date).now);
  const [to, setTo] = useState((new Date).now);
  const [TotalTxt,setTotalTxt]=useState("");
  const [info, setInfo] = useState({allowed:false,Loading:false,message:"",done:false});
  const requestPermissions = async () => {
      setToken(token)
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted||true){ 
        //console.log("OKKK");  
        let backgroundPermissionRequest =await Location.requestBackgroundPermissionsAsync();
        console.log("requestPermissions background", backgroundPermissionRequest);

      }}

  const hasStartedWork = async () => {
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
      )  ;
      if(hasStarted)
      {
        console.log("already starteeeddddd!!!");
        const starttime = await authStorage.getStartTime();
        const storedNotes = await authStorage.getOverTimeNotes();

        var ff=new Date();
        var starttimed=new Date(starttime);
        console.log("stored starttime is "+starttime +"   Now "+ff);
        console.log("stored Notesss is ",JSON.stringify(storedNotes) );

        var diff=(ff-starttimed);
        console.log(ff-starttimed);
        setInitialTimer(diff);
        setSelectedDateFrom(new Date(starttime));
        setStoredNotes(storedNotes);
      }
    setHasStarted(hasStarted);
    setStartEnabled(!hasStarted);
    setTaskCompleted(!hasStarted);
    }

  const CheckOverTimeRequest = async () => {
    setInfo({ Loading: true, allowed:false,message:"",done:false });
     const token = await authStorage.getToken();
     const EmpNo=user.serialnumber;
     const result = await employeesApi.CheckOverTimeRequest(EmpNo,token,'01-MAY-2023');  
   
     //console.log("ressss",result);
    /*if (!result.ok) {
      setInfo({ Loading: false, allowed:false,message:"حدث خطأ أثناء ارسال الطلب"  });

       return;
    }*/
   // setInfo({ done:false,Loading: false, allowed:result.data.ResponseObject, message:!result.data.ResponseObject?"لا يوجد لديك إذن بالعمل الإضافي لهذا الشهر":"" });
  setInfo({done:false, Loading: false, allowed:true});

    //setInfo({ Loading: false, allowed:result.data.ResponseObject,message:result.data.Message });

  };
  const getTrackID = async () => {
   
    const token = await authStorage.getToken();

    const result = await employeesApi.GetTrackID(token);
  
    if (result.status!=200) {
      
      return;
    }
  
   //console.log(result);
    //console.log(result.data);
    //setTrackId(result.data);
    await authStorage.storeTrackID(result.data+"");
  };
  const removeStoredLocations = async () => {
   
    const token = await authStorage.getToken();

    const result = await employeesApi.removeStoredApiRequests();
  
   /* if (!result.ok) {
      
      return;
    }*/
  
   //console.log(result);
 
     
  };
  const sendStoredLocations = async () => {
   
    const token = await authStorage.getToken();

    const result = await employeesApi.sendStoredApiRequests(token);
  
   /* if (!result.ok) {
      
      return;
    }*/
  
   //console.log(result);
 
     
  };
    // Start location tracking in foreground
    const startForegroundUpdate = async () => {
      // Check if foreground permission is granted
      const { granted } = await Location.getForegroundPermissionsAsync();
      if (!granted) {
        console.log("location tracking denied froground");
        return
      }
  
      // Make sure that foreground location tracking is not running
      foregroundSubscription?.remove();
  
      // Start watching position in real-time
      foregroundSubscription = await Location.watchPositionAsync(
        {
          // For better logs, we set the accuracy to the most sensitive option
          accuracy: Location.Accuracy.Highest,
        },
        location => { 
          console.log(location.coords);
  
          setPosition(location.coords);
        }
      )
    }
  
    // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
      foregroundSubscription?.remove()
      setPosition(null)
    }
  
    // Start location tracking in background
    const startBackgroundUpdate = async () => {
      console.log(notes);
      if(notes=="")
      {
        setRequiredNotesVisible(true);
        return;
      }
      setStoredNotes(notes);
      setRequiredNotesVisible(false);
      requestPermissions();
      const token = await authStorage.getToken();
      console.log(token);
      setResetTimer(true);
      // Don't track position if permission is not granted
      const { granted } = await Location.getBackgroundPermissionsAsync()  
      if (!granted) {
        console.log("location tracking denied background")
        return
      }
  
      //console.log("OKK permissions!!");
      // Make sure the task is defined otherwise do not start tracking
      const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
      if (!isTaskDefined) {
        console.log("Task is not defined")
        return
      }
  
      console.log("background defined");
      // Don't track if it is already running in background
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
      )
      if (hasStarted) {
        console.log("Already started")
        return
      }
        setTotalTxt("");
        var d=new Date();
        console.log(d);
        setSelectedDateFrom(d);
        getTrackID();
        setSelectedDateTo(null);  
        setStartEnabled(false);
        setTaskCompleted(false);
        setHasStarted(true);
        const starttime = await authStorage.storeStartTime(d.toISOString());
        console.log(notes);
        const nn=await authStorage.storeOverTimeNotes(notes);

        console.log("Start time was stored!!");

        console.log(d.toLocaleTimeString());
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        // For better logs, we set the accuracy to the most sensitive option
        timeInterval:30000,  
        accuracy: Location.Accuracy.BestForNavigation,
         //deferredUpdatesInterval:30000,
         //deferredUpdatesDistance:3,

        // Make sure to enable this notification if you want to consistently track in the background
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "Location",
          notificationBody: "Location tracking in background",
          notificationColor: "#fff",
        },
        deferredUpdatesInterval: 30000

      })
    }
  
  
  
    // Stop location tracking in background
    const stopBackgroundUpdate = async () => {
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
      )
      if (hasStarted||true) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log("Location tacking stopped started on : "+selectedDateFrom.toLocaleTimeString());
        setStartEnabled(true);
        var end=new Date();
        setSelectedDateTo(end);
        setResetTimer(false);
        setTaskCompleted(true);
        changeTotal(end,selectedDateFrom);
       }
    }
  useEffect(() => { 
   //stopBackgroundUpdate();
   console.log("YESSS");
   //removeStoredLocations();
    sendStoredLocations();
    setLoading(true);
    CheckOverTimeRequest()
    setLoading(false);
    requestPermissions()
    hasStartedWork();
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    //getAlternateEmployees.request(user.serialnumber);
    //getEmpLeaveBalance();
    //console.log(getAlternateEmployees.data);
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

 const Reset=()=>
 {
  setStartEnabled(true);
  setTotalTxt("");

 }
 const changeTotal = (To,From) => {
  var d= ((To.valueOf()-From.valueOf())/(1000 * 60 * 60 * 24));
 // console.log("To : "+To+"      from :  "+From);
  var days=Math.floor(d+1);
  var txt="";
  if(isDate)
  {
    txt=days+"أيام ";
    setTotalTxt(txt);}
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
   
    if(totalTime>=60){
      
      
      ;hour=(((totalTime-min))/60);
    
    
    txt=min+"دقائق "+hour+" ساعات";
    setTotalTxt(txt);}
    else if(totalTime<60){
      ;hour=Math.ceil(totalTime)/60;
      txt=min+"دقائق ";
      setTotalTxt(txt);}
  }
 // console.log("Diff:  "+  Math.floor(d)+2);
   
 }
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
    

  setSelectedDateFrom(date);
  changeTotal(selectedDateTo,date);
  //moment(date).utcOffset(0, true).format()
  //var clearUTCDate = moment(date.toUTCString()).utcOffset(0, true).format() ;
  var h=date.getHours();
  var a=date.getUTCHours();
  var gmt=h-a;
  var newdate=new Date(date);
  newdate.setHours(h+gmt);
  //console.log( date.toISOString() + date+"             toiso   "+newdate.toISOString());
  setFromTxt(newdate.toISOString());
   
 
};
const handleConfirmTo = (date) => {
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
    console.log("In submitt")
    stopBackgroundUpdate();
    // / return;
    setProgress(0);
    setUploadVisible(true);
    const token = await authStorage.getToken();
    const trackID = await authStorage.getTrackID();
     var to=new Date();
    let requestToAdd = {       
        EMP_NO: request.EMP_NO,
        OVERTIME_MONTH:selectedDateFrom,
        OVERTIME_DATE:selectedDateFrom,
        NOTES:request.NOTES,
        FROM_TIME:selectedDateFrom,
        TO_TIME:to,
        TIME_OUT:selectedDateFrom,
        TRACK_ID:trackID

    };
    //console.log(requestToAdd);
      var result=null;
      result = await employeesApi.PostOverTimeDetails(requestToAdd,token, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
       
    //console.log(result);
    if (!result.ok) {
      setUploadVisible(false);
      setInfo({ Loading: false, allowed:false,message:"لم يتم تسجيل العمل الإضافي بنجاح!",done:true });
      setLoading(false);
      return;
    }
    else {       
      setLoading(false);
      setUploadVisible(false);
      setInfo({ Loading: false, allowed:false,message:"تم تسجيل العمل الإضافي بنجاح!!"+
      "\n"+
      "وقت البداية : "+selectedDateFrom +"\n"+
      "وقت النهاية : "+selectedDateTo +"\n"+
      "مجموع الوقت :"+TotalTxt

      
      ,done:true });

    }
    resetForm();
  };

  return (
    <>
      {info.Loading&&<ActivityIndicator visible={loading} />}

      {!info.Loading&&!info.allowed && (
        <Info
          numberOfLines={5}
          buttonText="تقديم طلب"
          buttonVisible={false}
          color={colors.primary}
          message={(info.message)
            //("لا يوجد لديك اذن للعمل الإضافي.\n بإمكانك الضغط على زر تقديم طلب للسماح بالعمل الإضافي" )
             
          }
          onPress={() =>{ navigation.navigate(routes.OVERTIME) }}
        />
      )}

    {!info.Loading&&info.done && (
        <Info
          numberOfLines={5}
          buttonText="تقديم طلب"
          buttonVisible={false}
          color={colors.primary}
          message={(info.message)
            //("لا يوجد لديك اذن للعمل الإضافي.\n بإمكانك الضغط على زر تقديم طلب للسماح بالعمل الإضافي" )
             
          }
          onPress={() =>{ navigation.navigate(routes.OVERTIME) }}
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
            EMP_NO: user.serialnumber,
            OVERTIME_DATE:"",
            Balance:"10",//balance?.data.LEAVE_DAYS+"يوم "+balance?.data?.LEAVE_HOURS+"ساعات "+balance.data?.LEAVE_MINTS+" دقائق",
            NOTES: storedNotes,
            FROM_TIME:from,
            TO_TIME:to,
            FromTxt:"",
            ToTxt:"",
            Total:""
          }}
          onSubmit={handleSubmit}
         // validationSchema={validationSchema}
        >
          <ScrollView>
          
         <View style={styles.section}>
         {false&&<FormRadioButtonGroup  handleChange1={handleChange1} name="RequestType" 
         items={[{ label: "إجازة", value: "1" }, { label: "إذن مغادرة", value: "2" }]} />
         }
         <Field
                name="CustName"

                
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={false}
                placeholder="اسم الموظف"
                style={[styles.nameFull]}
                editable={false} 
              /> 
        
  
              <Field
                keyboardType="number-pad"
                maxLength={9}
                name="EMP_NO"
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={false}
                placeholder="الرقم الوظيفي "
                style={[styles.name]}
                editable={false}
 

              />
               <Field
                name="Balance"
                placeholder={"مجموع ساعات العمل الإضافي لهذا الشهر "}
                showPlaceholder={true}
                style={[styles.name]}
                editable={false}
 
              />
                <Field                   
                  name="OVERTIME_DATE"
                  width={'100%'}
                  placeholder={ "التاريخ : "+new Date().toLocaleDateString()}
                  showPlaceholder={false}
                  editable={false}
                  style={styles.name}
                  mode={"date"}
                   contWidth={'100%'}
                   
                  />
                  <View style={[styles.dateSection]}>     
                 <Field
                  name="FROM_TIME"
                  width={'100%'}
                  value={selectedDateFrom?selectedDateFrom.toLocaleTimeString():"غير محدد"}
                  placeholder={"بداية الوقت"}
                  style={styles.name}
                  editable={false}
                  
                  />
                <Field
                   value={selectedDateTo?selectedDateTo.toLocaleTimeString():" غير محدد"}
                   name="FROM_TIME"
                   placeholder={"نهاية الوقت"}
                   style={styles.name}
                   editable={false}
                   width={'100%'}
                 />
                 </View>
               
              <Field
                name="Total"
                placeholder={TotalTxt==""?("مجموع الساعات"):TotalTxt}
                showPlaceholder={false}
                style={[styles.name]}
                editable={false}
              />
             
           
              {startEnabled&&<Field
                name="NOTES"
               // value={notes}
                multiline
                showPlaceholder={false}
                numberOfLines={3}
                placeholder={"سبب العمل الإضافي"}
                style={[styles.name]}
                onEndEditing={(e)=>{setNotes(e.nativeEvent.text);}}
              />}

             {!startEnabled&& <Field
                name="NOTES"
                 value={storedNotes}
                multiline
                editable={false}
                showPlaceholder={false}
                numberOfLines={3}
                placeholder={"سبب العمل ssالإضافي"}
                style={[styles.name]}
                
              />}
              {requiredNotesVisible&&<AppText style={[styles.warning,{textAlign:"left",marginTop:0,fontSize:12}]}>**سبب العمل الإضافي مطلوب.</AppText>}

              <Stopwatch
            laps
            //msecs
            startTime={initialTimer}

            stop={taskCompleted}
            start={hasStarted&&!startEnabled}
            //To start
            reset={taskCompleted}
            //To reset
            options={options}
            //options for the styling
            /*getTime={(time) => {
              console.log(time);
            }}*/
          />
            </View>
            <View style={styles.separator} />
      {!hasStarted&&<Button
        onPress={startBackgroundUpdate}
        title={startEnabled?"بدء العمل الإضافي":"تم البدء من ساعة "+"selectedDateFrom.toLocaleTimeString()"}
        color={startEnabled?"secondaryLight":"running"}
        enabled={startEnabled}
        buttonStyle={{width:'80%',marginHorizontal:'10%',height:60 }}
        textStyle={{fontSize:18}}

      />}  
       
      <View style={styles.separator} />
     {!taskCompleted&& <SubmitButton
        //onPress={stopBackgroundUpdate}
        title="إنهاء وتحويل للمسؤول  "
        enabled={!startEnabled}
        color={startEnabled?"secondaryLight":"danger"}
        buttonStyle={{width:'80%',marginHorizontal:'10%',height:60,backgroundColor:colors.danger }}
        textStyle={{fontSize:18}}

      />}
             {false&&taskCompleted&&hasStarted&&<SubmitButton buttonStyle={{width:'80%',marginHorizontal:'10%',height:60 ,backgroundColor:colors.secondaryLight}} title="تحويل الطلب للمسؤول" />}
          </ScrollView>
          
        </Form>}
      <AppText style={[styles.warning]}>** يُرجى العلم أنّه يتم تتبّع الموقع خلال ساعات العمل الإضافي.</AppText>
      </Screen>
    </>
  );
}
export default OverTimeRegistrationScreen;
const options = {
  container: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 15,
    width: '80%',
    
    alignItems: 'center',
    marginHorizontal:'10%',
    
   },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
}
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
    width: "51%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew, textAlign: "right",

  },
  nameFull: {
    width: "100%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew, textAlign: "right",
     writingDirection:"rtl",
    

  },

  warning: {
    marginTop:10,
    fontSize: 14,
    marginHorizontal:10,
    fontFamily: "Cairo_400Regular",
    color: colors.danger, textAlign: "center",

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
