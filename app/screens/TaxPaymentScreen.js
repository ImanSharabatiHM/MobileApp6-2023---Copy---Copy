import React, { useEffect, useState,useRef } from "react";
import { Linking, StyleSheet,ScrollView } from "react-native";
import FormDatePicker from "../components/forms/FormDatePicker";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import * as Print from 'expo-print';
import AppWebView from "../components/WebView";
import { WebView } from 'react-native-webview';
import * as Yup from "yup";
 
import eDevletApi from "../api/edevlet";
import customerApi from "../api/customer";
import dayjs from "dayjs";
import routes from "../navigation/routes";
import "dayjs/locale/ar";
import Button from"../components/Button"
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";
import { Form ,SubmitButton,FormField as Field,FormPicker as Picker} from "../components/forms";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import { FlatList } from "react-native";
import Info from "../components/Info";
import Icon from "../components/Icon";
import Card from "../components/CardTaxPay";
import CardHeader from "../components/CardTaxHeaderPay";
import CardTaxDetails from "../components/CardTaxDetails";
import Alertmsg from "../components/Alertmsg";
//import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import { AppModalize } from "../components/Modalize";

import icons from "../config/icons";
import { View } from "react-native-animatable";
import { Dimensions } from "react-native";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";
import { TokenError } from "expo-auth-session";
const { width, height } = Dimensions.get("window");
const html="<html dir=\"rtl\" lang=\"ar\">"+
"    <head>" +
"        <style>" +
"            td {height: 55;}" +
"        </style>" +
"    </head>" +
"    <body>"+
"        <table style=\"font-size:13px;border-collapse: collapse; table-layout:fixed;\" width=\"100%\" border=\"1\">" +
"            <tr>" +
"                <td style=\"font-size:12px;\" colspan=\"3\">" +
"                    <img src=\"file:///android_asset/logo.png\" alt=\"img\" width=\"42\"/>" +
"بلديّة الخليل - إشعار إحضار قراءة                    " +
"                </td>" +
"            </tr>" +
"            <tr>" +
"                <td colspan=\"3\">الاسم: SERVICE_NAME</td>" +
"            </tr>" +
"            <tr>" +
"                <td>رقم الخدمة: SERVICE_NO</td>" +
"                <td colspan=\"2\">العنوان: ADDRESS</td>" +
"            </tr>" +
"            <tr>" +
"                <td colspan=\"2\">رقم الهويّة/المكلّف: CUST_NO</td>" +
"                <td>التّاريخ: DATE</td>" +
"            </tr>" +
"            <tr>" +
"                <td>المنطقة: AREA</td>" +
"                <td colspan=\"2\">الجهاز/القارىء: READER/DEVICE_NO</td>" +
"            </tr>" +
"            <tr>" +
"                <td>رقم الدّورة: PERIOD_NO</td>" +
"                <td colspan=\"2\">نوع الخدمة: SERVICE_TYPE</td>" +
"            </tr>" +
"            <tr>" +
"                <td style=\"font-size:12px;\" colspan=\"3\"><bold>نعلمكم أن موظّف البلديّة حضر ولم يتمكّن من قراءة العدّاد التابع لخدمتكم، نرجو منكم إحضار القراءة للبلديّة</bold></td>" +
"            </tr>" +
"        </table>"  +
"    </body>"+
"</html>";;
function TaxPaymentScreen({ navigation, route }) {
  const getNobetciEczaneApi = useApi(eDevletApi.getNobetciEczaneler);
  const [unitTaxes, setUnitTaxes] = useState({ loading: false, data: [] });
  const [U_ID, setU_ID] = useState(route.params.U_ID);
  const modalizeRef = useRef(null);
  const [viewerHeight, setViewerHeight] = useState(height);
  const [fromDate, setFromDate] = useState(new Date(new Date().getFullYear()-9, 0, 1));
  const [taxItem, setTaxItem] = useState({});
  const [taxType, setTaxType] = useState(1);
  const [units, setUnits] = useState({ loading: false, data: null });
  const [msgVisible, setmsgVisible] = useState(false);
  const [msgTitle, setmsgTitle] = useState("");
  const [payToken,setPayToken]=useState("");
  const [payTotal,setPayTotal]=useState(0);
  const [custName, setCustName] = useState("");
  const [transId, setTransId] = useState(0);
   const[printColor,setPrintColor]=useState("light"); 
   const[printEnabled,setPrintEnabled]=useState(false); 

   const [custId, setCustId] = useState(null);
   const {user,setUser}=useAuth();
   const [selectedPrinter, setSelectedPrinter] = React.useState();
   const[PaymentLink,setPaymentLink]=useState("");
   const[PaymentReference,setPaymentReference]=useState("");
   const[Voucher,setVoucher]=useState(null);
   const[VoucherNo,setVoucherNo]=useState(null);
   const [ctoken]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg1MDEyMDA2NCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLYtNin2K_ZiiDZhdin2YfYsSDZgdmH2YXZiiDYstix2YgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJITVVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcy9hY3RvciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjExNDciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdHJlZXRhZGRyZXNzIjoi2YjYp9iv2Yog2KfYqNmIINin2YPYqtmK2YTZhyAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdGF0ZW9ycHJvdmluY2UiOiIg2KfZhNiu2YTZitmEICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2NvdW50cnkiOiLZgdmE2LPYt9mK2YbZiiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDU5NzA1MjMxNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2hvbWVwaG9uZSI6IjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2dyb3Vwc2lkIjoiMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcHJpbWFyeWdyb3Vwc2lkIjoiIiwiZXhwIjoxOTQzOTUwOTU3LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdCJ9.LfFmfl2efP0jmY7J0kdNh3Gbbyn9vFw0kJLVq0C1EZo");

    
   const[PaymentLinkVisible,setPaymentLinkVisible]=useState(false);
   const getCustomer = async (newText=null) => {
  
    //const result = await customerApi.getUnitsWithTaxByUserID("852950427");
    var token = await authStorage.getToken();
 
    var id=custId
    if(newText!=null)id=newText;

   const result = await customerApi.GetCustomerNameByID2(id,token);
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
   const PrintPaymentVoucher=async(VoucherNo)=>
  {
     console.log("In print Payments "+VoucherNo);
    const result= await customerApi.PrintPaymentVoucher(VoucherNo,payToken);
    //console.log(result);
    if (!result.ok) {
      //  / setError(true);
       setVoucher(null);
       setPrintColor("light");
       setPrintEnabled(false);

        return;
      }
     setVoucher(result.data);
     setPrintEnabled(true);
     setPrintColor("secondaryLight");


  }
   const print = async () => {
     // On iOS/android prints the given html. On web prints the HTML from the current page.
    // console.log('data:application/pdf;base64,'+Voucher);
    const res= await Print.printAsync({
      uri:'data:application/pdf;base64,'+Voucher,
      //  html,
       //printerUrl: selectedPrinter?.url, // iOS only
     });
     console.log(res);
     clearAll();
   };
   const clearAll = async () => {
    setPrintEnabled(false);
    setUnitTaxes({ loading: false, data: [] });
    setPayTotal(0);
    setCustId("");
    setCustName("");
    

   }
   const printToFile = async () => {
     // On iOS/android prints the given html. On web prints the HTML from the current page.
     const { uri } = await Print.printToFileAsync({ html });
     console.log('File has been saved to:', uri);
     await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
   };
 
   const selectPrinter = async () => {
     const printer = await Print.selectPrinterAsync(); // iOS only
     setSelectedPrinter(printer);
   };
     const getUnits = async () => {
 
    setUnits({ loading: true, data: null });
    const result = await customerApi.GetUnitDescription(user.nameidentifier);
    if (!result.ok) {
      //setError(true);
      setUnits({ loading: false, data:null });
      return;
    }
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    
    //data=[{
    //  "U_ID": -1,
    //},data];
    // /console.log(data);
    data =[{U_ID:-1}].concat(data);
    setUnits({ loading: false, data });
  };


  const PayFees=async()=>
  {

    //var fees=GetFees();
    GenerateTransID();

     

  }

  const PostPaymentByCustomerID2=async(mtransId)=>
  {
    const fees=await GetFees();
    const PayTokenRes= await customerApi.GenerateCollectionToken(ctoken);
    console.log(PayTokenRes);
    var PayToken= PayTokenRes.data.ResponseObject;
     setPayToken(PayToken);
    console.log(user.nameidentifier,payToken);
    const result= await customerApi.PostPaymentByCustomerID2(PayToken,{
      CUSTOMER_ID:custId,Amount:payTotal,Fees:fees,Notes:"test",TransactionId:mtransId
       },(progress) => {
        //setProgress(progress);
       // if (progress == 1) setLoading(true);
      });
      console.log(result);
      if(result.data.ResponseObject)
      {
      var v_NO=result.data.VoucherNo;
      console.log(v_NO,result);
      
      setVoucherNo(v_NO);
      PrintPaymentVoucher(v_NO);
       } // 
       //PrintPaymentVoucher(v_NO);

      //setPaymentLink(link.data.ResponseObject.PaymentLink);
     // setPaymentReference(link.data.ResponseObject.PaymentReference);
    //  setPaymentLinkVisible(true);
   // console.log(link.data.ResponseObject.PaymentLink);
   // console.log(link.data.ResponseObject.PaymentReference);



  }


  const GetFees= async()=>{
    var fees=[];
   // var totalAmount=0;
    unitTaxes.data.forEach(function(obj){
      if(obj.PAY)
      fees.push(obj.FEE_ID);//console.log("ffff" + obj.PAY);}
     // totalAmount=totalAmount+obj.AMOUNT;
      });
     // console.log(fees);
      return fees;
  }
  const CheckVisaPayment=async()=>
  {
    //console.log(user.nameidentifier,payToken);
    const res= await customerApi.CheckVisaPayment(PaymentReference,payToken);
    console.log(res);
  }
  const GenerateTransID=async()=>
  {
    //console.log(user.nameidentifier,payToken);
    const result= await customerApi.GenerateTransID(payToken);
    console.log(result);
    if (!result.ok) {
      //  / setError(true);
        setTransId(0); 
        return;
      }
      PostPaymentByCustomerID2(result.data.ResponseObject);

      setTransId(result.data.ResponseObject);
  }
  
  const GenerateCollectionToken=async()=>
  {

    const PayTokenRes= await customerApi.GenerateCollectionToken(ctoken);
    if(!PayTokenRes.ok)
    {
      return;
    }
    console.log(PayTokenRes);
    var PayToken= PayTokenRes.data.ResponseObject;
    console.log(PayToken);
    setPayToken(PayToken);
  }
  const GetFeesByCustomerID = async (C_ID,U_ID,T_DATE) => {
    const token=await authStorage.getToken();
   //const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU1NTU1NSIsImV4cCI6MTY4MTQyMjU3NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.zty_zAVQezQ1cSI172DxwWMf2IeEPeXdo6ZIwecCupU";
 
    setUnitTaxes({ loading: true, data: [] });
    //token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ0NDQ0NCIsImV4cCI6MTY3NjI4ODE3MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.q_Zocy_aGZMNNJJTEdcbOgF2DMBSlNRyzBb-sz_wik0";
  
    // const result = await customerApi.GetCustomerFinancial(user.nameidentifier,F_TYPE);   
  const result = await customerApi.GetFeesByCustomerID(C_ID,payToken);   
   
  //const result = await customerApi.GetFeesByCustomerID("904479599",token);   

  //console.log(result);
    //const result = await customerApi.getPayeeTaxesByPayeeCode("852950427");   
    if (!result.ok) {
    //  / setError(true);
      setUnitTaxes({ loading: false, data:[] });
      return;
    }
  
    var fdata;
    //U_ID=-1;
    if(U_ID != -1)
     fdata=result.data.ResponseObject.filter(
      (item) => item.UNIT === U_ID
    );
    else fdata=result.data.ResponseObject;
   
    fdata=fdata.filter(  (item) => (new Date(item.TAX_DATE)).getTime()>= T_DATE.getTime()  );
    let data = fdata.sort(function (a, b) { return (new Date(b.TAX_DATE)).getTime() - (new Date(a.TAX_DATE)).getTime(); }) ;//.slice(0, 5);
    data.forEach(function(obj){
      obj.PAY=false;
      });
    setUnitTaxes({ loading: false, data });
  //  console.log(data);
  };
  const getUnitTaxes = async (U_ID,F_TYPE,T_DATE) => {
    const token=await authStorage.getToken();
   //const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU1NTU1NSIsImV4cCI6MTY4MTQyMjU3NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.zty_zAVQezQ1cSI172DxwWMf2IeEPeXdo6ZIwecCupU";
    //const PayTokenRes= await customerApi.GeneratePaymentToken(token);
  //  var PayToken= PayTokenRes.data.ResponseObject;
   // console.log(PayToken);
   // setPayToken(PayToken);
    setUnitTaxes({ loading: true, data: [] });
    //token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ0NDQ0NCIsImV4cCI6MTY3NjI4ODE3MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.q_Zocy_aGZMNNJJTEdcbOgF2DMBSlNRyzBb-sz_wik0";
  
    // const result = await customerApi.GetCustomerFinancial(user.nameidentifier,F_TYPE);   
  const result = await customerApi.GetFeesByCustomerID(user.nameidentifier,payToken);   
   
  //const result = await customerApi.GetFeesByCustomerID("904479599",token);   

   console.log(result);
    //const result = await customerApi.getPayeeTaxesByPayeeCode("852950427");   
    if (!result.ok) {
    //  / setError(true);
      setUnitTaxes({ loading: false, data:[] });
      return;
    }
  
    var fdata;
    //U_ID=-1;
    if(U_ID != -1)
     fdata=result.data.ResponseObject.filter(
      (item) => item.UNIT === U_ID
    );
    else fdata=result.data.ResponseObject;
   
    fdata=fdata.filter(  (item) => (new Date(item.TAX_DATE)).getTime()>= T_DATE.getTime()  );
    let data = fdata.sort(function (a, b) { return (new Date(b.TAX_DATE)).getTime() - (new Date(a.TAX_DATE)).getTime(); }) ;//.slice(0, 5);
    data.forEach(function(obj){
      obj.PAY=false;
      });
    setUnitTaxes({ loading: false, data });
  //  console.log(data);
  };
  
  useEffect(() => {
    //console.log(route.params.U_ID)
    //getUnits();
   // getUnitTaxes(route.params.U_ID,1,fromDate);
   GenerateCollectionToken();
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    //  /getNobetciEczaneApi.request("ss");
  }, []);
 const onNavigationStateChange = state => {

    console.log("State: "+JSON.stringify(state));
    const { url } = state;
    const { loading } = state;
    const callback_url = 'CheckVisaPayment';// to be changed
    if (!url) return;
    if(url === 'https://api.lahza.io/close') {
      CheckVisaPayment();
      setPaymentLink("https://api.lahza.io/close");
      setPaymentLinkVisible(false);
    }
};
  const handleChange = async (ID,PAY ) => {
    console.log("ID "+ID+"   "+PAY+"   ");
    var t=payTotal;
    var len=unitTaxes.data.length;
    for(var i=0;i<len;i++)
    {
      var obj=unitTaxes.data[i];
      if(ID==obj.FEE_ID){
      obj.PAY=PAY;//console.log("ffff" + obj.PAY);}
      if(PAY)
      {
        t=t+obj.AMT;
      }
      else
      {
      t=t-obj.AMT;}
      console.log(t);
      setPayTotal(t);
      break;   
    }

}     
}
 const onChangeDate = async (item) => {
  //console.log("sssdfiffee"+item +"  "+(new Date(item))+"    "+fromDate);

  setFromDate(new Date(item));  // 
  //console.log("sssdfiffee"+item +"  "+(new Date(item))+"    "+fromDate);
  getUnitTaxes(U_ID,taxType,new Date(item));
//  /getMails(allMail,item);

}
const validationSchema = Yup.object().shape({
 
  CustID: Yup.string().required("رقم الهوية مطلوب")
  .min(9, "يجب إدخال 9 أرقام")
  .max(9),
  //CustName: Yup.string().required("اسم مقدم الطلب"),
  //CustMobile:Yup.string().required("رقم هاتف مقدم الطلب"),
 
});
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

  return (
    <>
         {msgVisible && <Alertmsg
     isVisible={msgVisible}
     imageUrl={"http://maps.hebron-city.ps/MapBuildings/1.jpg"}
      title={msgTitle}
      onPress={() => {
        setmsgVisible(false);}}
      buttonTitle={"إغلاق"}
     
   />} 
      <ActivityIndicator visible={unitTaxes.loading} />
      <Form             
          key={"RequestForm"}
          initialValues={{
             TaxType:1,
             From:dayjs((fromDate)).locale("ar").format('YYYY/MM/D'),
             FromTxt:"",
             U_IDTxt:U_ID==-1?"الكل":{"U_ID":U_ID}

          }}
          //onSubmit={handleSubmit}
          //validationSchema={validationSchema}
        >  
               <ScrollView>

        <View style={styles.section}>
        { <View style={[styles.buttonClose]}>
            {true&&<Button  
             
             buttonStyle={{marginTop:5,height:'65%'}}
             color={"secondaryLight"}
             textStyle={styles.buttonTxt} title={"  دفع الرسوم المحددة  "  + payTotal +"  شيكل"}
             onPress={
              () => {
                PayFees();
               // navigation.navigate(routes.TAXTOTAL,{U_ID:-1})
            }
            }      
             />}
            { true&&<Button
              enabled={true}  
             buttonStyle={{marginTop:5,height:'62%'}}
             color={printColor}//"secondaryLight"
             textStyle={styles.buttonTxt} title="طباعة" 
             onPress={
              () => 
              {
              //  selectPrinter()
               print()  
              /*RNZebraBluetoothPrinter.isEnabledBluetooth().then((res) => {
                  console.log(result)
                }); 
                 RNZebraBluetoothPrinter.enableBluetooth().then((res) => {
                  console.log(res)
                });
              */
              }
            }      
             />}
          </View>}
       
                
       {false&&<Picker
      
      unitsPicker={true}
      navigation={navigation}
      items={ units.data }
        name={"U_IDTxt"}
        editable={false}
        width={"100%"}
        placeholder="رقم الوحدة"
        showPlaceholder={true}
        searchPlaceHolder={"بحث عن رقم الوحدة"}
        selectedItemChanged={(unit) =>   
         {
          setU_ID(unit.U_ID);
          getUnitTaxes(unit.U_ID,taxType,fromDate);
        //  / scrollToIndexUnit(unit.label);      
        }}
      />}

<FormDatePicker
                  name="From"
                  placeholder={"من تاريخ:"}
                  mode={"date"}
                  selectedDate={fromDate}
                  handleConfirm={onChangeDate}
                  onChangeDate={onChangeDate}
                  contWidth={"100%"}                     
                 />
       </View>
       </ScrollView>
       </Form> 
      <Form
        initialValues={{
          CustName:custName,
          CustID:custId,
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
          onChangeText={
            newText => {
              setCustId(newText);
              if(newText.length==9){
                getCustomer(newText);
                GetFeesByCustomerID(newText,-1,fromDate);


              }
              else {setCustName("");setPrintEnabled(false);}
            
            
            }
          }

 
          //showPlaceholder={user.role=="Anonymous"} // handleChange1={handleTypeChange}
          showPlaceholder={true}
          placeholder="رقم الهوية"
          style={[styles.id]}
        //  onDone={newText => setCustId(newText)}
         // onEndEditing={getCustomer}

        />
         <Field
          name="CustName"
          value={custName}
          placeholder={"الاسم"}
          editable={false}
          style={[styles.name]}
          showPlaceholder={true}
        />
          {false&&<Field
           keyboardType="number-pad"
           name="CustMobile"
           showPlaceholder={true}
           placeholder="رقم الهاتف المحمول"
          style={[styles.name]}
        />}

        </View>
       {false&& <SubmitButton title="إرسال طلب التعديــل" />}
        </ScrollView>

      </Form> 
        
        {false && (//getNobetciEczaneApi.error &&
          <Info
            buttonVisible={true}
            message="لقد حدث خطأ غير متوقع"
            onPress={() => getNobetciEczaneApi.request()}
          />
        )}

      <Screen style={styles.screen}> 
      {PaymentLinkVisible==true&&<WebView source={{ uri: PaymentLink }} 
      onNavigationStateChange={onNavigationStateChange}
      setSupportMultipleWindows={false}
      /*onShouldStartLoadWithRequest={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      mixedContentMode={'always'}*/
      />}
      {PaymentLinkVisible==false&&!unitTaxes.loading && unitTaxes.data.length==0 && (
          <Info
          buttonText={"رجوع للوحدة"}
            buttonVisible={false}
            message={
              "لا يوجد رسوم "+ (U_ID !=-1?"على الوحدة ":"")
            }
           onPress={() => navigation.pop(1)}
          />
        )}
      {!PaymentLinkVisible&&<CardHeader
            TAX_NAME={"اسم الرسم"}
            TAX_DATE={"التاريخ"}
            LOCAL_AMOUNT_AFTER_DISCOUNT={"بعد الخصم"}/>}
             <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
        {(!PaymentLinkVisible&&true&&<FlatList
          data={unitTaxes.data}
          keyExtractor={(item,index) => item.UNIT+"-"+index}
          renderItem={({ item }) => (
            <Card
            handleChange={handleChange}
            ID={item.FEE_ID}
            Pay={item.PAY}
            TAX_NAME={item.TAX_NAME}
            TAX_DATE={dayjs(item.TAX_DATE).locale("ar").format('D/MM/YYYY' )}
            AMOUNT={item.AMT+ '₪'}
            CURN={item.CURRENCY_ID}
            DISCOUNT={item.DISC_LOC + '₪'}
            LOCAL_AMOUNT={item.LOCAL_AMOUNT}
            LOCAL_AMOUNT_AFTER_DISCOUNT={item.AMT_REM_AFTER_DISC+ '₪'} 
            onPress={() => {
                setTaxItem(item);
                console.log(item);
                 modalizeRef.current.open();
              }}
             
            // base64={'data:image/png;base64,'+item.IMAGE}
            //  /imageUrl= {"http://10.11.20.9/php/ImagesHeraf/10-282-0a5-3.jpg"}
            />
          )}
          ItemSeparatorComponent={() => (
            <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          )}
        />)}
       {false&&<FlatList
          data={
            unitTaxes?.data
            
          }
          keyExtractor={(item,index) => item.UNIT+"-"+index}
          renderItem={({ item,index }) => (
            <ListItem
              key={index+"TAX"}
              preTitle={item.LOCAL_AMOUNT_AFTER_DISCOUNT}
              title={ item.TAX_NAME}
              subTitle={item.TAX_DATE}
              listStyle={styles.listItem}
              textStyle={styles.listTextStyle}
              onPress={() => {
               // Linking.openURL("tel://+90" + item.LOCAL_AMOUNT_AFTER_DISCOUNT);
              }}
              IconRightComponent={
                <Icon name={"currency-ils"} iconColor={colors.darkNew} size={20} />
              }
            />
          )}
          ItemSeparatorComponent={() => (
            <ListItemSeparator seperatorStyle={styles.seperatorStyle} />
          )}
        />}
      </Screen>
      <AppModalize
        ref={modalizeRef}
        title={"تفاصيل الرسم"}
        adjustToContentHeight={true}
        onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
        onPress = { 
          async () => {modalizeRef.current.close();         
       }}
      >
          <View style={{ height: viewerHeight*.8 }}>
          <ActivityIndicator visible={false} />
          <CardTaxDetails
          ADDRESS={taxItem?.ADDRESS==""?"غير معرّف":taxItem.ADDRESS}
           BLOCK={taxItem?.BLOCK+''}
          PARCEL={taxItem?.PARCEL+''}
           UNIT={taxItem?.UNIT==""?"غير معرّف":taxItem.UNIT}
            TAX_NAME={taxItem.TAX_NAME+""}
            TAX_DATE={dayjs(taxItem.TAX_DATE).locale("ar").format('D/MM/YYYY' )}
            AMOUNT={taxItem.AMOUNT+''}
            CURN={taxItem.CURN+""}
            DISCOUNT={taxItem.DISCOUNT+''}
            LOCAL_AMOUNT={taxItem.LOCAL_AMOUNT+''}
            LOCAL_AMOUNT_AFTER_DISCOUNT={taxItem.LOCAL_AMOUNT_AFTER_DISCOUNT+ '₪'} 
            />

        </View>
      </AppModalize>
     </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
  },
  buttonClose: {
    marginTop:0,
    width: "95%",
    height:50,
    alignSelf: "center",
    marginBottom:30,
 
  },
  buttonTxt: {
    color:colors.white,
    fontSize:14,
    alignContent:"center",
    alignItems:"center",
    textAlign:"center",
    fontFamily:'Cairo_600SemiBold',
    
   },
  listTextStyle: {
    color: colors.darkNew,
  },
  seperatorStyle: {
    backgroundColor: colors.backgroundColor,
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
  },
  screen: {
    backgroundColor: colors.backgroundColor,
  },
  section: { marginHorizontal: 3, width: "100%", fontSize: 14},

});
export default TaxPaymentScreen;
