import React, { useEffect, useState,useRef } from "react";
import { Linking, StyleSheet,ScrollView } from "react-native";
import FormDatePicker from "../components/forms/FormDatePicker";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import * as Print from 'expo-print';
import AppWebView from "../components/WebView";
import { WebView } from 'react-native-webview';
import * as Yup from "yup";
import VerificationCode from "../components/Code Field/VerificationCode";
import BaseVerificationCode from "../components/Code Field/BaseVerificationCode";
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
import AppText from "../components/Text";
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
function TaxAgentScreen({ navigation, route }) {
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
   const[payColor,setPayColor]=useState("light"); 
   const[payAmount,setPayAmount]=useState(0);
   const [authorized,setAuthorized]=useState(false)
   const [verificationVisible,setVerificationVisible]=useState(false)

   const[printEnabled,setPrintEnabled]=useState(false); 
   const[payEnabled,setPayEnabled]=useState(false); 
   const[loading,setLoading]=useState(false); 


   const [custId, setCustId] = useState(null);
   const {user,setUser}=useAuth();
   const [selectedPrinter, setSelectedPrinter] = React.useState();
   const[PaymentLink,setPaymentLink]=useState("");
   const[PaymentReference,setPaymentReference]=useState("");
   const[Voucher,setVoucher]=useState(null);
   const[VoucherNo,setVoucherNo]=useState(null);
   const [ctoken]=useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijk0OTc5MDMyMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLZitin2LPYsSAg2YbYuNin2YUgINmF2K3ZhdivINin2YXZitmGINin2YTYrNi52KjYsdmKICIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkhNVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDkvMDkvaWRlbnRpdHkvY2xhaW1zL2FjdG9yIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvc2VyaWFsbnVtYmVyIjoiMjE1NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N0cmVldGFkZHJlc3MiOiLYsdin2LMg2KfZhNis2YjYsdipICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N0YXRlb3Jwcm92aW5jZSI6Itin2YTYrtmE2YrZhCAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9jb3VudHJ5IjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIwNTk3OTI5MjE4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaG9tZXBob25lIjoiMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZ3JvdXBzaWQiOiIwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9wcmltYXJ5Z3JvdXBzaWQiOiIiLCJleHAiOjE5NTE4MDY2ODAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0In0.W1EPcCGPSitGxABAijOQDHsz8-5hOgqVlvIK7fhzPdo");

    
   const[PaymentLinkVisible,setPaymentLinkVisible]=useState(false);
   const getCustomer = async (newText=null) => {
  
    setLoading(true);
    //const result = await customerApi.getUnitsWithTaxByUserID("852950427");
    var token = await authStorage.getToken();
 
    var id=custId
    //if(newText!=null)id=newText;

   const result = await customerApi.GetCustomerNameByID2(id,token); 
     // console.log(result);

     if (!result.ok) {
        setLoading(false);
       //setError(true);
       //setUnits({ loading: false, data:null });
       return;
     } 
     //console.log(result);
   
     let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    // setUnits({ loading: false, data:data });
   
    setLoading(false);
      setCustName(data);
   };
   const PrintPaymentVoucher=async(VoucherNo)=>
  {
    // console.log("In print Payments "+VoucherNo);
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
    setPayColor("light");
    setPayEnabled(false);

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
    const token=await authStorage.getToken();

    const PayTokenRes= await customerApi.GenerateCollectionToken(token);//ctokrn
    //console.log(PayTokenRes);
    var PayToken= PayTokenRes.data.ResponseObject;
     setPayToken(PayToken);
   // console.log(user.nameidentifier,payToken);
    const result= await customerApi.PostPaymentByCustomerID2(PayToken,{
      CUSTOMER_ID:custId,Amount:Math.round(payTotal),Fees:fees,Notes:"test",TransactionId:mtransId
       },(progress) => {
        //setProgress(progress);
       // if (progress == 1) setLoading(true);
      });
     // console.log(result);
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
    if (!result.ok) {
      //  / setError(true);
        setTransId(0); 
        return;
      }
      PostPaymentByCustomerID2(result.data.ResponseObject);
     console.log("Trans ID :"+result.data.ResponseObject);

      setTransId(result.data.ResponseObject);
  }
  
  const GenerateCollectionToken=async()=>
  {

    const token=await authStorage.getToken();

    const PayTokenRes= await customerApi.GenerateCollectionToken(token);//ctoken
    if(!PayTokenRes.ok)
    {
      return;
    }
    //console.log(PayTokenRes);
    var PayToken= PayTokenRes.data.ResponseObject;
    // console.log("Generate Collectio Token from  "+token+"  =   "+PayToken);
    setPayToken(PayToken);
  }
  const GetFeesByCustomerID = async (C_ID,U_ID,T_DATE) => {
    const token=await authStorage.getToken();
   //const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU1NTU1NSIsImV4cCI6MTY4MTQyMjU3NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.zty_zAVQezQ1cSI172DxwWMf2IeEPeXdo6ZIwecCupU";
 
    setUnitTaxes({ loading: true, data: [] });
    //token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ0NDQ0NCIsImV4cCI6MTY3NjI4ODE3MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.q_Zocy_aGZMNNJJTEdcbOgF2DMBSlNRyzBb-sz_wik0";
  
    // const result = await customerApi.GetCustomerFinancial(user.nameidentifier,F_TYPE); 
  //  console.log(payToken); 
     const result = await customerApi.GetFeesByCustomerID(C_ID,token,1);   
  // console.log(result);
  //const result = await customerApi.GetFeesByCustomerID("904479599",token);   

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
  setPrintEnabled(true);
  for(var i=0;i<len;i++)
  {
    var obj=unitTaxes.data[i];
    if(ID==obj.FEE_ID){
    obj.PAY=PAY;//console.log("ffff" + obj.PAY);}
    if(PAY&&obj.IS_PAYABLE&&!obj.IS_FREEZ)
    {
      t=t+obj.AMT_REM_AFTER_DISC;
    }
    else { t=t-obj.AMT_REM_AFTER_DISC;}
    console.log(t);
    if(t>0)  {setPayColor("secondaryLight");setPayEnabled(true); }   
    else {setPayColor("light");  setPayEnabled(false); } 

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

const sendVerificationCode=async(Data, { resetForm }) => {
  setLoading(true);
   var token = await authStorage.getToken();
  const result = await customerApi.SendVerificationCode(Data.CustID,token);
  if (!result.ok) {
    setLoading(false);
   // console.log(result);
    //setUploadVisible(false);
 
   //setLoading(false);
    return;
  }
  setVerificationVisible(true);
   setLoading(false);



}

const handleVerifyCode = async (code) => {
  var token = await authStorage.getToken();
  setAuthorized(true);
    getCustomer(custId);
    setVerificationVisible(false);
    GetFeesByCustomerID(custId,-1,fromDate);
    return;
  const result = await customerApi.VerifyCode(custId,code,token);
  console.log("WillVerify");
  console.log(code);
  console.log(result);
  if (!result.ok) {
    setLoading(false);
    
    //setUploadVisible(false);
 
   //setLoading(false);
    return;
  }
  if (result.data !="0")
   { setAuthorized(true);
    getCustomer(custId);
    setVerificationVisible(false);
    GetFeesByCustomerID(custId,-1,fromDate);

  
  }  


   setLoading(false);



}
const handleSubmit = async (Data, { resetForm }) => {
  //console.log(user);
  setLoading(true);
  var token = await authStorage.getToken();
  const result = await customerApi.ResetCustPassword(Data.CustID,token);

 

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
      <ActivityIndicator visible={loading} />
      {verificationVisible&&<BaseVerificationCode  onChangeCode={handleVerifyCode}/>}
      {!authorized&& <Form
        initialValues={{
          CustName:custName,
          CustID:custId,
          CustMobile:"",
           //PayAmount:payTotal         
        }}
        onSubmit={sendVerificationCode}
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
                //getCustomer(newText);
                //console.log(newText);
                //GetFeesByCustomerID(newText,-1,fromDate);


              }
              else {setCustName("");setPrintEnabled(false);}
            
            
            }
          }

 
          //showPlaceholder={user.role=="Anonymous"} // handleChange1={handleTypeChange}
          showPlaceholder={true}
          placeholder="رقم الهوية"
          width={'100%'}
          style={[styles.payAmountField]}
          //onDone={newText => setCustId(newText)}
          //onEndEditing={getCustomer}
        />
         {false&&<Field
           name="CustName"
          value={custName}
          placeholder={"الاسم"}
          editable={false}
          style={[styles.name]}
          showPlaceholder={true}
        />}
            

        </View>
       {true&& <SubmitButton title="إرسال كود التحقق  " />}
        </ScrollView>

      </Form> }
      {authorized&&<Form             
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
        { false&&<View style={[styles.buttonClose]}>
              {false&&<Button  
              enabled={payEnabled}  
             buttonStyle={{marginTop:5,height:'67%',width:'49%',padding:0,borderRadius: 10,
            }}
             color={payColor}//"secondaryLight"
             textStyle={styles.buttonTxt} title={" دفع    "  + Math.round(payAmount) +"  شيكل"}
             onPress={
              () => {
                PayFees();
               // navigation.navigate(routes.TAXTOTAL,{U_ID:-1})
            }
            }      
             />}
             { false&&<Button
              enabled={printEnabled}  
             buttonStyle={{marginTop:5,height:'67%',width:'49%',padding:0,borderRadius: 10,marginStart:10,}}
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

      {false&&<Field
          keyboardType="number-pad"
          maxLength={9}
          editable={true}
          name="PayAmount"
          onChangeText={
           
            value => {
               console.log(value);
               setPayAmount(value);
            }
          }

 
          //showPlaceholder={user.role=="Anonymous"} // handleChange1={handleTypeChange}
          showPlaceholder={true}
          placeholder="المبلغ المراد دفعه"
          style={[styles.payAmountField]}
        //  onDone={newText => setCustId(newText)}
         // onEndEditing={getCustomer}

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
       </Form> }
     {authorized&& <Form
        initialValues={{
          CustName:custName,
          CustID:custId,
          CustMobile:"",
          TOTAL:payAmount,
          //PayAmount:payTotal         
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
                //console.log(newText);
               // GetFeesByCustomerID(newText,-1,fromDate);


              }
              else {setCustName("");setPrintEnabled(false);}
            
            
            }
          }

 
          //showPlaceholder={user.role=="Anonymous"} // handleChange1={handleTypeChange}
          showPlaceholder={true}
          placeholder="رقم الهوية"
          width={'100%'}
            style={[styles.payAmountField]}
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
          {false&& <Field   
      editable={false}
       name={"TOTAL"}
       value={"مجموع الرسوم المحددة"+" = "+Math.round((payTotal*10))/10+'₪'}
       width={'100%'}
       //showPlaceholder={user.role=="Anonymous"}
       showPlaceholder={false}
       placeholder={"مجموع الرسوم المحددة"+" = "+payTotal +"₪"}
       style={[styles.totalTextStyle]}
       
      />}

        </View>
       {false&& <SubmitButton title="إرسال طلب التعديــل" />}
        </ScrollView>

      </Form> }
        
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
      {authorized&& PaymentLinkVisible==false&&!unitTaxes.loading && unitTaxes.data.length==0 && (
          <Info
          buttonText={"رجوع للوحدة"}
            buttonVisible={false}
            message={
              "لا يوجد رسوم "+ (U_ID !=-1?"على الوحدة ":"")
            }
           onPress={() => navigation.pop(1)}
          />
        )}
      {authorized&& !PaymentLinkVisible&&<CardHeader
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
            VIEWCHECK={item.IS_PAYABLE==1 && item.IS_FREEZ==0?true:false}
            ID={item.FEE_ID}
            PAY={item.PAY}
            TAX_NAME={item.TAX_NAME+"  "}
            TAX_DATE={dayjs(item.TAX_DATE).locale("ar").format('D/MM/YYYY' )}
            AMOUNT={item.AMT+ '₪'}
            CURN={item.CURRENCY_ID+' '}
            DISCOUNT={item.DISC_LOC + '₪'}
            LOCAL_AMOUNT={item.REM_LOC_AMT+'₪'}
            LOCAL_AMOUNT_AFTER_DISCOUNT={taxType==1?item.REM_LOC_AMT_AFTER_DISC+ '₪':(item.AMT+" " +item.CURRENCY_ID+"")} 
            onPress={() => {
                setTaxItem(item);
                //console.log(item);
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
          <View style={{ height: viewerHeight*.9 }}>
          <ActivityIndicator visible={false} />
          <CardTaxDetails
          ADDRESS={taxItem?.LOCATION==""?"غير معرّف":taxItem.LOCATION}
           BLOCK={taxItem?.BLOCK_NO+''}
          PARCEL={taxItem?.PARCEL_NO+''}
           UNIT={taxItem?.UNIT_ID==""?"غير معرّف":taxItem.UNIT_ID}
            TAX_NAME={taxItem?.TAX_NAME+" "+(taxItem?.WATER_SERVICE_NO!=0?"/رقم الخدمة: "+taxItem?.WATER_SERVICE_NO:"")}
            TAX_DATE={dayjs(taxItem.TAX_DATE).locale("ar").format('D/MM/YYYY' )}
            AMOUNT={taxItem?.AMT+''}
            CURN={taxItem?.CURRENCY_ID+""}
            AMT_REM_AFTER_DISC={taxItem.AMT_REM_AFTER_DISC+""}
            DISCOUNT={taxItem?.DISC+''}
            DISCOUNT_LOCAL={taxItem.DISC_LOC+'₪'}            
            LOCAL_AMOUNT={taxItem.REM_LOC_AMT+'₪'}
            LOCAL_AMOUNT_AFTER_DISCOUNT={taxItem.REM_LOC_AMT_AFTER_DISC+ '₪'} 
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
  payAmountField:
  {
    //backgroundColor:colors.instagram,
    textAlign:"right",
    width:'100%',
    padding:10,
    fontSize:14

  },
  buttonClose: {
    flexDirection:"row",
    marginTop:0,
    width: "95%",
    height:50,
    alignSelf: "center",
    marginBottom:0,
 
  },
  totalTextStyle: {
    color: colors.danger,
    fontFamily:'Cairo_700Bold',

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
export default TaxAgentScreen;
