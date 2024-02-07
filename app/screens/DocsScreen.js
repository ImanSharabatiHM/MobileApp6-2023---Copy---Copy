import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions ,ScrollView} from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
import mailsApi from "../api/mails";
import dayjs from "dayjs";
import SaveButton from "../components/SaveButton";
//import PDFReader from "rn-pdf-reader-js";
import { ListItem, ListItemSeparator } from "../components/lists";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";
import FormDatePicker from "../components/forms/FormDatePicker";

import "dayjs/locale/ar";
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
import MyPDFReader from "../components/MyPDFReader";
import ActivityIndicator from "../components/ActivityIndicator";
import { Form ,FormField as Field} from "../components/forms";
const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

const initialLayout = { width: Dimensions.get("window").width };
const { width, height } = Dimensions.get("window");

function DocsScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [viewerHeight, setViewerHeight] = useState(height);
  const {user}=useAuth();
  const [proje, getProje] = useState(null);
  const [belge, setBelge] = useState(null);
  const [allMail, setAllMail] = useState('0');
  const [fromDate, setFromDate] = useState(new Date(new Date().getFullYear(), 0, 1));

  const [belgeSonuc, setBelgeSonuc] = useState(null);
  const [mails, setMails] = useState({
    loading: false,
    data: null
    
  });
   const [error, setError] = useState(false);
  const [info, setInfo] = useState(null);
  const handleChange1 = async (MailsType ) => {
    if(MailsType == '1'){setAllMail('0'); MailsType='0';}
    else {setAllMail('1'); MailsType='1';}
    getMails(MailsType,fromDate);
    
   
 }
  const handleDoc = async (MuthNo) => {
    var token = await authStorage.getToken();
    //console.log(token);
    
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
  const handledata = async () => {
    var d=dayjs((fromDate)).locale("ar").format('YYYY/MM/D');
  //  / console.log(d);
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
   const result = await mailsApi.GetDocArchive(token,MDate,NotDone);
    if (!result.ok) { 
      setMails({ loading: false, data: null });
      setError(true);
      return;
    }
     var d=result.data.ResponseObject;
    // console.log(d);
      d= d.sort((a, b) => b.DOC_NO - a.DOC_NO)
      //console.log(d);
    setMails({ loading: false, data: d});
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
  return (
    <>
     <ActivityIndicator visible={mails.loading} />
     <Form             
          key={"RequestForm"}
          initialValues={{
             MailsType:'1',
             From:dayjs((fromDate)).locale("ar").format('YYYY/MM/D'),
             FromTxt:""  
          }}
          onSubmit={handleSubmit}
          //validationSchema={validationSchema}
        >  
        <ScrollView>
        <View style={styles.section}>
        <FormRadioButtonGroup handleChange1={handleChange1} name="MailsType" items={[{ label: "بحاجة لمتابعة", value: '1' }, { label: "الكل", value: '0' }]} />
        <FormDatePicker
                  name="From"
                  placeholder={"من تاريخ:"}
                  style={styles.name}
                  mode={"date"}
                  onChangeDate={onChangeDate}
                  contWidth={"100%"}

                     
                 />

       </View>
        </ScrollView>
      </Form>
     { (!mails.loading && mails.data?.length==0) && (
      <Info
        numberOfLines={5}
        buttonText="تحديث المعاملات"
        buttonVisible={true}
        color={colors.primary}
        message={ 
          ("لا يوجد معاملات..")
        }
        onPress={() => getMails(allMail,fromDate)}
      />
    )}
      <Screen style={styles.screen}> 
  
      {!mails.loading && true && mails.data?.length!=0 && (
              <FlatList
          data={mails.data}
          keyExtractor={(item) => "Doc"+item.DOC_NO+"-"+item.DOC_SERIAL}
          renderItem={({ item }) => (
            <Card
            subTitle={item.MAIN_CLASS_DESCRIBE }              
            location={item.DOC_DEPARTMENT} 
           //date={dayjs(item.MDATE).locale("ar").format('dddd D-MM-YYYY \nالساعة:  h:mm A' )}
            date={dayjs(item.DOC_DATE).locale("ar").format('dddd YYYY/MM/D')}
            subject={item.DOC_SUBJECT}     
            imageHeight={450}
            onPress={() =>{
              
              handleDoc(item.DOC_NO);  
              modalizeRef.current.open()} }
            
            />
          )}
        />
      )}
    </Screen>
    <AppModalize
        ref={modalizeRef}
        title="تفاصيل المعاملة"
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
              <SaveButton file={belge} name={"salary111"  } />
              
              <MyPDFReader            
                 source={{
                   base64: 'data:application/pdf;base64,'+belge,
                }}               
              />
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
  section: { marginHorizontal: "10%", width: "80%", fontSize: 14, },
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
});


export default DocsScreen;
