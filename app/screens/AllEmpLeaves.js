import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions ,ScrollView} from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
import mailsApi from "../api/mails";
import SaveButton from "../components/SaveButton";
//import PDFReader from "rn-pdf-reader-js";
import { ListItem, ListItemSeparator } from "../components/lists";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";
import FormDatePicker from "../components/forms/FormDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import TextInput from "../components/TextInput";

import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Card from "../components/CardLeave";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
import Info from "../components/Info";
import { View } from "react-native";
import routes from "../navigation/routes";
import authStorage from "../auth/storage";
import ActivityIndicator from "../components/ActivityIndicator";
import { Form ,FormField as Field, FormPicker as Picker} from "../components/forms";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import content from "../api/content";

const initialLayout = { width: Dimensions.get("window").width };
const { width, height } = Dimensions.get("window");
const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

function AllEmpLeaves({ navigation }) {
  const modalizeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [viewerHeight, setViewerHeight] = useState(height);
  const {user}=useAuth();
  const [proje, getProje] = useState(null);
  const [currNo, setCurrNo] = useState(null);

  const [belge, setBelge] = useState(null);
  const [allMail, setAllMail] = useState('0');
  const [docType, setDocType] = useState('0');
  const [filtered, setFiltered] = useState([]);
  const [filteredTxt, setFilteredTxt] = useState("");

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState((new Date()));
  const [showAll, setShowAll] = useState(0);
  const [isAttendanceMonitor, setIsAttendanceMonitor] = useState(false);
  const [query, setQuery] = useState('');

  

  const [belgeSonuc, setBelgeSonuc] = useState(null);
  const [mails, setMails] = useState({
    loading: false,
    data: null
    
  });

  const [leaves, setLeaves] = useState({
    loading: false,
    data: null
    
  });
   const [error, setError] = useState(false);
  const [info, setInfo] = useState(null);
  const [alternateEmployees,setAlternateEmployees]=useState({data:[],loading:true})//= useApi(customerApi.getAlternateEmployees);


 const handleTypeChange = async (Type ) => {

 
}
const getIsAttendanceMonitor = async () => {
  var token = await authStorage.getToken();
  var radtok="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkwNzk0NjI5NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLYsdi22YjYp9mGINi52YjYr9ipINi52KjYr9in2YTZhNmHINix2YrYp9mGIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiSE1Vc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiIxMzciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdHJlZXRhZGRyZXNzIjoi2K7ZhNipINmF2YbYp9i5IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RhdGVvcnByb3ZpbmNlIjoi2KfZhNiu2YTZitmEIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6ItmB2YTYs9i32YrZhtmKIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwNTk4OTM5MzEyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaG9tZXBob25lIjoiMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InJhZHdhbl9yeW5AeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9ncm91cHNpZCI6IjAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlncm91cHNpZCI6IiIsImV4cCI6MTkzNTEyMzk5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.0Hq3Y_3W05LJ7RVVyrR1zYOk0M_28kfgz_PHzxE19hg";

  //console.log(token);
  setLoading(true);
  const result = await customerApi.IsAttendanceMonitor(token); 
   if (!result.ok) return;
   console.log(result);
   var f=result.data?1:0;
   setIsAttendanceMonitor(f);
   if(f)
    setAlternateEmployees({loading:false,data:[{"EmpName":"جميع الموظفين","EmpNo":"2"},{"EmpName":"إجازاتي","EmpNo":"0"}]});
    else setAlternateEmployees({loading:false,data:[{"EmpName":"الموظفين التابعين للمدير","EmpNo":"1"},{"EmpName":"إجازاتي","EmpNo":"0"}]});
 
  
};
  const handledata = async () => {
    getIsAttendanceMonitor();
   // getAlternateEmployees.request(user.serialnumber);
       //console.log(getAlternateEmployees.data);
    //var d=dayjs((fromDate)-998640000).locale("ar").format('YYYY/MM/D');
    var fromD=dayjs((fromDate)).locale("ar").format('YYYY/MM/D');
    var toD=dayjs((toDate)).locale("ar").format('YYYY/MM/D');

    //console.log(d);
   // getMails(allMail,d); 
    getEmployeeLeaves(showAll,fromD,toD);
  };
  const handleSubmit = async (request, { resetForm }) => {
 
    resetForm();
  };
  
  const getEmployeeLeaves = async (ShowAll,FromDate,ToDate) => {
    setLeaves({ loading: true, data: null });
    var token = await authStorage.getToken();
     var tokenosama="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijk0MjQ5Njk3NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLYp9iz2KfZhdmHICDZhdit2YXYryDZitin2LPYsSDYudi32Kcg2K_ZiNmK2YMgIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiSE1Vc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiIxNDY1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RyZWV0YWRkcmVzcyI6ItmE2YjYstmHIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RhdGVvcnByb3ZpbmNlIjoi2KfZhNiu2YTZitmEIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6ItmB2YTYs9i32YrZhtmKIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwNTk1MjAwOTkwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaG9tZXBob25lIjoiMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Im9zYW1hQGhlYnJvbi1jaXR5LnBzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9ncm91cHNpZCI6Ijc1IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9wcmltYXJ5Z3JvdXBzaWQiOiLYudmK2LXZiSAtINmE2YjYstinIC0g2YXYr9ix2LPYqSDYsdio2LnZiiDYp9mE2LTYsdmK2YEiLCJleHAiOjE5MzQyNTkxMDEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0In0.qkW5pXgW7-mOTzfgG6heV3UXFbTIgS3RCDxFSScus3s";
    var radtok="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkwNzk0NjI5NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLYsdi22YjYp9mGINi52YjYr9ipINi52KjYr9in2YTZhNmHINix2YrYp9mGIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiSE1Vc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiIxMzciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdHJlZXRhZGRyZXNzIjoi2K7ZhNipINmF2YbYp9i5IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RhdGVvcnByb3ZpbmNlIjoi2KfZhNiu2YTZitmEIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6ItmB2YTYs9i32YrZhtmKIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwNTk4OTM5MzEyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaG9tZXBob25lIjoiMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InJhZHdhbl9yeW5AeWFob28uY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9ncm91cHNpZCI6IjAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlncm91cHNpZCI6IiIsImV4cCI6MTkzNTEyMzk5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.0Hq3Y_3W05LJ7RVVyrR1zYOk0M_28kfgz_PHzxE19hg";
     //dayjs(item.MDATE).locale("ar").format('dddd D-MM-YYYY')
    //var MDate=FromDate;
    const result = await customerApi.GetEmployeesLeaves(ShowAll,FromDate,ToDate,token);
     if (!result.ok) { 
       setLeaves({ loading: false, data: null });
      // console.log(result);
       setError(true);
       return;
     }
     //console.log(result);
      var d=result.data.ResponseObject;
      // d= d.sort((b, a) => b.MDATE<=a.MDATE);
      // console.log(d);
     setLeaves({ loading: false, data: d});
     setFiltered({loading:false,data:d})
    
   };
  const handleChangeMailSub = (text) => {
 
    setFilteredTxt(text); 

    if(text.length==0){ 
      setFiltered( {data:leaves.data,loading:false});
      return;}
    //console.log(text); 
    let filteredres = text
    ? leaves.data
    .filter(
      (item) =>
        item.LEAVE_EMP.includes(text) 
       // service.description.includes(text)
    )
    :  [];
      setLoading(true);
     setFiltered( {data:filteredres
     ,loading:false});

 
  
    };

 
  const onChangeDate = async (item) => {
    //console.log("sssdfiffee"+item);

    setFromDate(item);  // 
   getEmployeeLeaves(showAll,item,toDate);

  }
  const onChangeEmp = async (item) => {
    console.log(item);

    setShowAll(item.value);  // 
    getEmployeeLeaves(item.value,fromDate,toDate);

  }
  const onChangeDateTo = async (item) => {
    //console.log("sssdfiffee"+item);

    setToDate(item);  // 
    getEmployeeLeaves(showAll,fromDate,item);

  } 
 
  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    handledata();
  }, []);
 
 
  return (
    <>
     <ActivityIndicator visible={leaves.loading} />
     <Form             
          key={"RequestForm"}
          initialValues={{
             MailsType:'1',
             From:dayjs((fromDate)).locale("ar").format('YYYY/MM/D'),
             FromTxt:""  ,
             To:dayjs((toDate)).locale("ar").format('YYYY/MM/D'),
             ToTxt:""  ,
             Type:'0',
             EmpNo:  { label: "إجازاتي", value: "0" },

          }}
          onSubmit={handleSubmit}
          //validationSchema={validationSchema}
        >  
        <ScrollView>
        <View style={styles.section}>
        <FormRadioButtonGroup handleChange1={handleTypeChange} name="Type" items={[{ label: "إجازات"    , value: '0' }, { label: "أذونات مغدرة", value: '1' },{ label: "الكل", value: '2' }]} />

        {true&&<Picker
                items={
                  !alternateEmployees.loading&&alternateEmployees?.data?.map(
                    (emp) => {
                      return { label: emp.EmpName, value: emp.EmpNo };
                    })
                }
                style={[styles.name]}
                name="EmpNo"
                placeholder="الموظف "
                showPlaceholder={false}
                selectedItemChanged={(Emp) =>
                  onChangeEmp(Emp)
                 // getDeptProblemsApi.request(Dept.value)
 
                }
              />}
  
        <View style={[{flexDirection:"row"}]}>
        <FormDatePicker
                  name="From"
                  dateflex={"row"}
                  placeholder={"من تاريخ:"}
                  style={styles.name}
                  mode={"date"}
                  handleConfirm={onChangeDate}
                  selectedDate={fromDate}
                  //onChangeDate={onChangeDate}
                  contWidth={"47%"}
                     
                 />
                  <FormDatePicker
                  name="To"
                  dateflex={"row"}
                  placeholder={"إلى تاريخ:"}
                  style={styles.name}
                  mode={"date"}
                  handleConfirm={onChangeDateTo}
                  selectedDate={toDate}
                  //onChangeDate={onChangeDate}
                  contWidth={"47%"}
                     
                 /></View>
                 
          {(true)&&<View style={[styles.txtSearch]}>
            <TextInput       
            showPlaceholder={false}
           containerStyle={styles.searchBox}
            textStyle={[styles.searchBoxText]}
            // autoFocus={true}
             onChangeText={handleChangeMailSub}
           // onChangeText={handleSearch}
            placeholder= {"بحث عن موظف"}
          />
          </View>}

       </View>
        </ScrollView>
      </Form>
     { (!leaves.loading && leaves.data?.length==0) && (
      <Info
        numberOfLines={5}
        buttonText={"تحديث"}
        buttonVisible={false}
        color={colors.primary}
        message={ 
        "لا يوجد بيانات"
        }
        onPress={() => getEmployeeLeaves(showAll,fromDate,toDate)}
      />
    )}
      <Screen style={styles.screen}> 
  
      {!leaves.loading && true && leaves.data?.length!=0 && (
              <FlatList
          data={filtered.data}
          extraData={filtered.loading}
        // data={leaves.data} 
         //keyExtractor={(item) => {docType=='0'?"Muth"+item.MUTH_NO:"Doc"+item.DOC_NO+"-"+item.DOC_SERIAL}}
          keyExtractor={(item) => {item.LEAVE_NO}}
         initialNumToRender={10}
        windowSize={10}
          maxToRenderPerBatch={300}
        updateCellsBatchingPeriod={200}
        renderItem={({ item }) => (
          <Card
          nn={item.LEAVE_EMP}
          ALTERNATE_EMP={item.ALTERNATE_EMP}
          BOSS_CONFIRMED={item.BOSS_CONFIRMED}
          BOSS_DECISION={item.BOSS_DECISION}
          DURATION={item.DURATION}
          EMP_SHIFT_END={item.EMP_SHIFT_END}
          EMP_SHIFT_START={item.EMP_SHIFT_START}
          FROM_DATE={dayjs(item.FROM_DATE).locale("ar").format('dddd YYYY/MM/D - hh:mm')} 
          TO_DATE={dayjs(item.TO_DATE).locale("ar").format('dddd YYYY/MM/D - hh:mm')}
    
          LEAVE_DATE={dayjs(item.LEAVE_DATE).locale("ar").format('dddd YYYY/MM/D - hh:mm')}  
          LEAVE_EMP={item.LEAVE_EMP}
          LEAVE_NO={item.LEAVE_NO}
          subTitle={item.LEAVE_EMP }              
          EMP_JOB_LOCATION={item.EMP_JOB_LOCATION} 
           //date={dayjs(item.MDATE).locale("ar").format('dddd D-MM-YYYY \nالساعة:  h:mm A' )}
          LEAVE_REASON={item.LEAVE_REASON}     
         // imageHeight={450}
          /*onPress={() =>{
            if(docType=='0')
            handleMuth(item.MUTH_NO);  
            else handleDoc(item.DOC_NO);  
            modalizeRef.current.open()} }*/
          
          />
        )}
       //   renderItem={renderItem}
        />
      )}
    </Screen>
    <AppModalize
        ref={modalizeRef}
        title={docType=='0'?"تفاصيل المذكرة":"تفاصيل المعاملة"}
        onLayout={(layout) => {
          setViewerHeight(layout.layout.height);
        }}
        onPress={() => {
            //setBelge(null);
            //setBelgeSonuc(null);
            modalizeRef.current.close();

          }}
      >
        <View style={{ height: viewerHeight }}>
          <ActivityIndicator visible={loading} />
          {belgeSonuc && (
            <Info
              buttonVisible={true}
              buttonText="حسنا"
              message={belgeSonuc}
              numberOfLines={8}
              onPress={() => {
                setModalVisible(false);
                setBelge(null);
                setBelgeSonuc(null);
              }}
            />
          )}

          {belge && !loading && (
            <>
              <SaveButton file={belge} name={docType=='0'?"تفاصيل المذكرة-"+currNo:"تفاصيل المعاملة-"+currNo  } />
              
              <PdfReader 
              //url="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
              url={{
                base64: 'data:application/pdf;base64,'+belge,
             }}
              
              />

              {false&&<PDFReader            
                 source={{
                   base64: 'data:application/pdf;base64,'+belge,
                }}               
              />}
              <ListItemSeparator />
            </>
          )}
        </View>
      </AppModalize>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  section: 
  { padding:10,
   width: "100%",
  fontSize: 14,
  //alignItems:"flex-start",
 },
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
  searchBoxText: {
    fontSize: 1,
    color: colors.lightBlue,
    fontFamily:'Cairo_400Regular'
    
    //fontWeight: "normal",
  },
  txtSearch: {
    width: "100%",
    color:colors.danger,
    alignSelf: "flex-start",
    bottom:5,
  },
  searchBox: {
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    backgroundColor: colors.white,
    borderRadius: 8,
    top:5,
    height: 50,
    paddingHorizontal: 6,
    paddingVertical: 0,
    marginVertical: 0,
    shadowColor: colors.darkNew,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },

});


export default AllEmpLeaves;
