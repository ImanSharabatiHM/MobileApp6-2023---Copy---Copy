import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {WebView} from 'react-native-webview';
import PDFReader from '@hashiprobr/expo-pdf-reader';

//import PDFReader from "rn-pdf-reader-js";
import { ScrollView } from "react-native";
import Constants from "expo-constants";
import customerApi from "../api/customer";
import { generatePdf } from "../utility/saveAs";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
import eDevletApi from "../api/edevlet";
import Info from "../components/Info";
import ActivityIndicator from "../components/ActivityIndicator";
import SaveButton from "../components/SaveButton";
import { Dimensions } from "react-native";
import { AppModalize } from "../components/Modalize";
import { View } from "react-native";

const { width, height } = Dimensions.get("window");
import useAuth from "./../auth/useAuth";
import authStorage from "./../auth/storage";
const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

function SalaryScreen({ navigation, route }) {
  const tahsilat = {};
  const [viewerHeight, setViewerHeight] = useState(height);
  const modalizeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [belge, setBelge] = useState(null);
  const [salaryDetails, setSalaryDetails] = useState({Loading:false,data:null});

  const [belgeSonuc, setBelgeSonuc] = useState(null);
  const [month, setMonth] = useState(null);

  const {user,setUser}=useAuth();

  const handleMakbuz = async () => {
    var token = await authStorage.getToken();
    //console.log(token);
    if(belge){return;}
    
    setLoading(true);
    const result = await customerApi.getSalaryByEmpNo(user.serialnumber,token); 
     if (!result.ok) return;
    /*if (result.data.tahsilatDekontIndirC?.sonucKodu !== "0000") {
      setBelgeSonuc(result.data.tahsilatDekontIndirC?.sonucAciklamasi);
    } else setBelge(result.data.tahsilatDekontIndirC?.dekont);
*/
    /*if (result.data) {
        setBelgeSonuc(result.data);
      } */
      else  
      {
        //   
        
        if(result.data)
        {
             
         
        setBelge(result.data);   
        setLoading(false);
        //generatePdf(result.data,"Salaryiman");
      //  modalizeRef.current.open();
        }
    }
  };
  const handleSalaryDetails = async () => {
    var token = await authStorage.getToken();
   // console.log(token);
    if(belge){return;}
    
    setSalaryDetails({Loading:true,data:null});
    const result = await customerApi.GetLastSalarySlipDetails(user.serialnumber,token); 
     if (!result.ok) return;
    /*if (result.data.tahsilatDekontIndirC?.sonucKodu !== "0000") {
      setBelgeSonuc(result.data.tahsilatDekontIndirC?.sonucAciklamasi);
    } else setBelge(result.data.tahsilatDekontIndirC?.dekont);
*/
    /*if (result.data) {
        setBelgeSonuc(result.data);
      } */
      else  
      {        
        console.log(result.data);             
        setSalaryDetails({Loading:false, data:result.data});   
        setMonth(dayjs(result.data.SALARY_MONTH).locale("ar").format('M-YYYY') );
        console.log(result.data.BANK_ACCT!=null);
         // /generatePdf(result.data,"Salaryiman");
         //  modalizeRef.current.open();
         
    }
  };
  const [, updateState] = useState(null);
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    handleMakbuz();
    handleSalaryDetails();
    setTimeout(() => {
      forceUpdate();
    }, 1000);
  }, []);

  return (
    <>
      <ActivityIndicator visible={salaryDetails.Loading} />
         {!salaryDetails.Loading && salaryDetails?.data &&salaryDetails.data.BANK_ACCT==null&& (
      <Info
        numberOfLines={2}
        buttonText="اتّصال بالشّبكة"
        buttonVisible={false}
        color={colors.danger}
        message={"قسيمة الراتب قيد الإعداد، سيصلك إشعار في حال صدورها"}
        
      />
    )}
       <Screen style={styles.screen}>
        {!salaryDetails.Loading && salaryDetails?.data &&salaryDetails.data.BANK_ACCT!=null&& (
          <><ScrollView>
              <ListItemSeparator />
              {salaryDetails.data?.EMP_TYPE!==null? <ListItem
                title={"الفئة"}
                rightInfo={salaryDetails.data?.EMP_TYPE}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}
              <ListItemSeparator />
              {salaryDetails.data?.EMP_TYPE!==null? <ListItem
                title={"النوع"}
                rightInfo={salaryDetails.data?.EMP_TYPE}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}<ListItemSeparator />
              {salaryDetails.data?.LEAVE_DAYS!==null?<ListItem
                title={"رصيد الإجازات "}
                rightInfo={salaryDetails.data.LEAVE_DAYS +"أيام "+salaryDetails.data.LEAVE_HOURS+"  ساعات"+ salaryDetails.data.LEAVE_MINTS +"دقائق "}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}
              <ListItemSeparator />
              {salaryDetails.data?.WORKING_DAYS!==null?<ListItem
                title={"عدد أيام العمل"}
                rightInfo={salaryDetails.data?.WORKING_DAYS}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}<ListItemSeparator />
              {salaryDetails.data?.SALARY_TOTAL!==null?<ListItem
                title={"الراتب الإجمالي"}
                rightInfo={salaryDetails.data?.SALARY_TOTAL}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}
              <ListItemSeparator />
              {salaryDetails.data?.P_TOTAL!==null?<ListItem
                title={"الإضافات"}
                rightInfo={salaryDetails.data?.P_TOTAL+"₪"}//{dayjs(tahsilat.tahsilatTarihi).format("DD/MM/YYYY")}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}
              <ListItemSeparator />
             {salaryDetails.data?.M_TOTAL!==null? <ListItem
                title={"الخصومات"}
                rightInfo={salaryDetails.data?.M_TOTAL+"₪"}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}
              <ListItemSeparator />
              {salaryDetails.data?.SALARY_MONTH!==null? <ListItem
                title={"السنة / الشهر"}
                rightInfo={dayjs((salaryDetails.data?.SALARY_MONTH)).locale("ar").format('M/YYYY') }
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}
              <ListItemSeparator />           
              { salaryDetails.data?.BANK_ACCT!==null ?<ListItem
                title={"رقم الحساب"}
                rightInfo={salaryDetails.data?.BANK_ACCT}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />:null}
              <ListItemSeparator />

             { salaryDetails.data?.F_TOTAL!==null ? <ListItem
                title={"الراتب الصافي"}
                rightInfo={salaryDetails.data?.F_TOTAL + "₪"}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyleBold}
              />:null}
              <ListItemSeparator />
             {false&& <ListItem
                title={"شرح"}
                subTitle={"ssss"}
                listStyle={styles.listItem}
                textStyle={styles.listTextStyle}
              />}
            </ScrollView>
            <ListItemSeparator />
            <ListItem
              listStyle={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
              title={"حفظ قسيمة الراتب"}
              IconComponent={
                <Icon name="content-save" backgroundColor={colors.secondary} />
              }
              onPress={() =>  generatePdf(belge,"Salary-"+month) }
              renderChevron
            />
             <ListItemSeparator />
            <ListItem
              listStyle={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
              title={"عرض قسيمة الراتب"}
              IconComponent={
                <Icon name="qrcode" backgroundColor={colors.secondary} />
              }
              onPress={() => modalizeRef.current.open() }
              renderChevron
            />
            <ListItemSeparator />
          </>
        )}
      </Screen>
 
      <AppModalize
        ref={modalizeRef}
        adjustToContentHeight ={true}
        title="قسيمة الراتب"
        /*onLayout={(layout) => {
          setViewerHeight(layout.layout.height);
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
              <SaveButton file={belge} name={"Salary-" +month } />
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
export default SalaryScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 5,
    backgroundColor: colors.white,
  },
  buttonTextStyle: {
    color: colors.primary,
  },
  listItem: {
    backgroundColor: colors.white,
  },
  listTextStyle: {
    color: colors.darkNew,
  },
  screen: {
    backgroundColor: colors.backgroundColor,
  },
  listTextStyleBold: {
    color: colors.danger,
    fontFamily:'Cairo_700Bold',
  },
  seperatorStyle: {
    backgroundColor: colors.backgroundColor,
  },
});
