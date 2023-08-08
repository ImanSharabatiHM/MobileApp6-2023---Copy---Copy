import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions ,ScrollView} from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
import mailsApi from "../api/mails";
import SaveButton from "../components/SaveButton";
//import PDFReader from "rn-pdf-reader-js";
import PDFReader from '@hashiprobr/expo-pdf-reader';

import { ListItem, ListItemSeparator } from "../components/lists";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";
import FormDatePicker from "../components/forms/FormDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import TextInput from "../components/TextInput";
//import Pdf from "react-native-pdf";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Card from "../components/CardMail";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
import Info from "../components/Info";
import { View } from "react-native";
import routes from "../navigation/routes";
import authStorage from "./../auth/storage";
import ActivityIndicator from "../components/ActivityIndicator";
import { Form ,FormField as Field} from "../components/forms";
const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

const initialLayout = { width: Dimensions.get("window").width };
const { width, height } = Dimensions.get("window");

function AllMailsScreen({ navigation }) {
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

  const [fromDate, setFromDate] = useState(new Date(new Date().getFullYear(), 0, 1));
   

  const [belgeSonuc, setBelgeSonuc] = useState(null);
  const [mails, setMails] = useState({
    loading: false,
    data: null
    
  });
   const [error, setError] = useState(false);
  const [info, setInfo] = useState(null);
  const handleChange1 = async (MailsType ) => {
    if(MailsType == '1'){
      setAllMail('0');
       MailsType='0';}
      
    else {
      setAllMail('1'); 
      MailsType='1';
    }
     
    
      if(docType == '0'){//muth 
        getMails(MailsType,fromDate);        
      }
      else//doc
      {
        getMailsDocs(MailsType,fromDate);
      } 
   
 }

 const handleTypeChange = async (Type ) => {
  if(Type == '1'){
  setDocType('1');  
  getMailsDocs(allMail,fromDate);
}
  else {
    setDocType('0');
    getMails(allMail,fromDate);
  }
   
  
 
}
  const handleDoc = async (MuthNo) => {
    var token = await authStorage.getToken();
    //console.log(token);
    setCurrNo(MuthNo);
    setLoading(true);
    const result = await mailsApi.GetDocArchiveReport(token,MuthNo); 
     if (!result.ok) return;
     else  
      {        
        if(result.data)
        {  
        setBelge(result.data);   
        setLoading(false);
        //generatePdf(result.data,"Salaryiman");
      //  modalizeRef.current.open();
        }
    }
  };
  const handleMuth = async (MuthNo) => {
    var token = await authStorage.getToken();
    //console.log(token);
    setCurrNo(MuthNo);

    setLoading(true);
    const result = await mailsApi.GetMuthReport(token,MuthNo); 
     if (!result.ok) return;
     else  
      {        
        if(result.data)
        { //console.log( result.data);
        setBelge(result.data);   
        setLoading(false);
        //generatePdf(result.data,"Salaryiman");
      //  modalizeRef.current.open();
        }
    }
  };
  const handledata = async () => {
    //var d=dayjs((fromDate)-998640000).locale("ar").format('YYYY/MM/D');
    var d=dayjs((fromDate)).locale("ar").format('YYYY/MM/D');

    //console.log(d);
    getMails(allMail,d); 
    
  };
  const handleSubmit = async (request, { resetForm }) => {
 
    resetForm();
  };
  const getMails = async (NotDone,FromDate) => {
   setMails({ loading: true, data: null });
   var token = await authStorage.getToken();
   //dayjs(item.MDATE).locale("ar").format('dddd D-MM-YYYY')
   var MDate=FromDate;
   const result = await mailsApi.GetMuth(token,MDate,NotDone);
    console.log(result);
    if (!result.ok) { 
      setMails({ loading: false, data: null });
     
      setError(true);
      return;
    }
     var d=result.data.ResponseObject;
      d= d.sort((b, a) => b.MDATE<=a.MDATE);
     // console.log(d);
    setMails({ loading: false, data: d});
   
  };
  
  const handleChangeMailSub = (text) => {  
    if(text.length==0){     setFilteredTxt(text);
      setFiltered( {data:[],loading:false});return}
   // console.log(text); 
    let filteredres = text
    ? mails.data
    .filter(
      (item) =>
        item.SUBJECT.includes(text) 
       // service.description.includes(text)
    ):  [];
   // console.log(filteredres.length);
    setFilteredTxt(text);
    var data= filteredres.sort((b, a) => b.MDATE<=a.MDATE);

    setFiltered( {data:data,loading:true});
   
  
    };

  const getMailsDocs = async (NotDone,FromDate) => {
    setMails({ loading: true, data: null });
    var token = await authStorage.getToken();
    //dayjs(item.MDATE).locale("ar").format('dddd D-MM-YYYY')
    var MDate=FromDate;
    const result = await mailsApi.GetDocArchive(token,MDate,NotDone);
     if (!result.ok) { 
       setMails({ loading: false, data: null });
       setFiltered(mails);
       setError(true);
       return;
     }
      var d=result.data.ResponseObject;
        d= d.sort((a, b) => b.DOC_NO - a.DOC_NO)
      setMails({ loading: false, data: d});
      setFiltered(mails);
   };
  
  const onChangeDate = async (item) => {
    //console.log("sssdfiffee"+item);

    setFromDate(item);  // 
   getMails(allMail,item);

  }
  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    handledata();
  }, []);
  const renderItem = ({ item }) => (
   
      <Card
      nn={docType=='0'?"Muth"+item.MUTH_NO+"-"+0:"Doc"+item.DOC_NO+"-"+item.DOC_SERIAL+"-"+0}
   
      subTitle={docType=='0'?item.MAILTYPE:item.MAIN_CLASS_DESCRIBE }              
      location={docType=='0'?item.FROMEMPLOYEE:item.DOC_DEPARTMENT } 
      no={docType=='0'?item.MUTH_NO:item.DOC_NO} 
       //date={dayjs(item.MDATE).locale("ar").format('dddd D-MM-YYYY \nالساعة:  h:mm A' )}
      date={dayjs(docType=='0'?item.MDATE:item.DOC_DATE).locale("ar").format('dddd YYYY/MM/D')}
      subject={docType=='0'?item.SUBJECT:item.DOC_SUBJECT}     
      imageHeight={450}
      onPress={() =>{
        if(docType=='0')
        handleMuth(item.MUTH_NO);  
        else handleDoc(item.DOC_NO);  
        modalizeRef.current.open()
      } }
      
      />
   
  );
  return (
    <>
     <ActivityIndicator visible={mails.loading} />
     <Form             
          key={"RequestForm"}
          initialValues={{
             MailsType:'1',
             From:dayjs((fromDate)).locale("ar").format('YYYY/MM/D'),
             FromTxt:""  ,
             Type:'0',
          }}
          onSubmit={handleSubmit}
          //validationSchema={validationSchema}
        >  
        <ScrollView>
        <View style={styles.section}>
        <FormRadioButtonGroup handleChange1={handleTypeChange} name="Type" items={[{ label: "مذكّرات"    , value: '0' }, { label: "معاملات", value: '1' }]} />

        <FormRadioButtonGroup handleChange1={handleChange1} name="MailsType" items={[{ label: "بحاجة لمتابعة", value: '1' }, { label: "الكل", value: '0' }]} />
        <FormDatePicker
                  name="From"
                  dateflex={"row"}
                  placeholder={"من تاريخ:"}
                  style={styles.name}
                  mode={"date"}
                  handleConfirm={onChangeDate}
                  selectedDate={fromDate}
                  //onChangeDate={onChangeDate}
                  contWidth={"100%"}
                     
                 />
          {(true)&&<View style={[styles.txtSearch]}>
            <TextInput       
            showPlaceholder={false}
           containerStyle={styles.searchBox}
            textStyle={[styles.searchBoxText]}
            // autoFocus={true}
             onChangeText={handleChangeMailSub}
            placeholder= {"بحث عن موضوع"}
          />
          </View>}

       </View>
        </ScrollView>
      </Form>
     { (!mails.loading && mails.data?.length==0) && (
      <Info
        numberOfLines={5}
        buttonText={docType=='0'?"تحديث المذكرات":"تحديث المعاملات"}
        buttonVisible={false}
        color={colors.primary}
        message={ 
          docType=='0'?
          ("لا يوجد مذكرات.."):  ("لا يوجد معاملات..")
        }
        onPress={() => getMails(allMail,fromDate)}
      />
    )}
      <Screen style={styles.screen}> 
  
      {!mails.loading && true && mails.data?.length!=0 && (
              <FlatList
          data={filtered.data?.length>=0&&filteredTxt.length>0?filtered.data:mails.data}
          //keyExtractor={(item) => {docType=='0'?"Muth"+item.MUTH_NO:"Doc"+item.DOC_NO+"-"+item.DOC_SERIAL}}
          keyExtractor={(index) => 
          
               {index}
          }
          initialNumToRender={10}
          windowSize={300}
          maxToRenderPerBatch={300}
          updateCellsBatchingPeriod={200}
          renderItem={({ item }) => (
   
            <Card
            nn={docType=='0'?"Muth"+item.MUTH_NO+"-"+0:"Doc"+item.DOC_NO+"-"+item.DOC_SERIAL+"-"+0}
         
            subTitle={docType=='0'?item.MAILTYPE:item.MAIN_CLASS_DESCRIBE }              
            location={docType=='0'?item.FROMEMPLOYEE:item.DOC_DEPARTMENT } 
            no={docType=='0'?item.MUTH_NO:item.DOC_NO} 
             //date={dayjs(item.MDATE).locale("ar").format('dddd D-MM-YYYY \nالساعة:  h:mm A' )}
            date={dayjs(docType=='0'?item.MDATE:item.DOC_DATE).locale("ar").format('dddd YYYY/MM/D')}
            subject={docType=='0'?item.SUBJECT:item.DOC_SUBJECT}     
            imageHeight={450}
            onPress={() =>{
              if(docType=='0')
              handleMuth(item.MUTH_NO);  
              else handleDoc(item.DOC_NO);  
              modalizeRef.current.open()
            } }
            />         
        )}
        />
      )}
    </Screen>
    <AppModalize
        ref={modalizeRef}
        adjustToContentHeight ={true}
        title={docType=='0'?"تفاصيل المذكرة":"تفاصيل المعاملة"}
        /*onLayout={(layout) => {
          setViewerHeight(height);
        }}*/
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
              {false&&<Pdf uri={"http://www.hebron-city.ps/userfiles/server/%D8%AE%D8%B7%D8%A9%202022.pdf"}/>}
              {true&&<PDFReader            
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


export default AllMailsScreen;
