import React, { useEffect, useState,useRef } from "react";
import { Linking, StyleSheet,ScrollView } from "react-native";
import FormDatePicker from "../components/forms/FormDatePicker";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";

import * as Print from 'expo-print';
import AppWebView from "../components/WebView";
import { WebView } from 'react-native-webview';

import eDevletApi from "../api/edevlet";
import customerApi from "../api/customer";
import dayjs from "dayjs";
import routes from "../navigation/routes";
import "dayjs/locale/ar";
import Button from"../components/Button"
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";
import { Form ,FormField as Field,FormPicker as Picker, FormField} from "../components/forms";
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
import contentApi from "../api/content";

import icons from "../config/icons";
import { View } from "react-native-animatable";
import { Dimensions } from "react-native";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";
import { TokenError, TokenResponse } from "expo-auth-session";
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
function TaxEPaymentScreen({ navigation, route }) {
  const getNobetciEczaneApi = useApi(eDevletApi.getNobetciEczaneler);
  const [unitTaxes, setUnitTaxes] = useState({ loading: false, data: [] });
  const [U_ID, setU_ID] = useState(route.params.U_ID);
  const modalizeRef = useRef(null);
  const modalizeRefwv = useRef(null);
  const[VoucherNo,setVoucherNo]=useState(null);
  const [viewerHeight, setViewerHeight] = useState(height);
  const [fromDate, setFromDate] = useState(new Date(new Date().getFullYear()-9, 0, 1));
  const [taxItem, setTaxItem] = useState({});
  const [taxType, setTaxType] = useState(1);
  const [units, setUnits] = useState({ loading: false, data: null });
  const [msgVisible, setmsgVisible] = useState(false);
  const [msgTitle, setmsgTitle] = useState("");
  const [payToken,setPayToken]=useState("");
  const [payTotal,setPayTotal]=useState(0);

   const {user,setUser}=useAuth();
   const [selectedPrinter, setSelectedPrinter] = React.useState();
   const[PaymentLink,setPaymentLink]=useState("");
   const[PaymentReference,setPaymentReference]=useState("");
   const[Voucher,setVoucher]=useState(null);
   const[PaymentLinkVisible,setPaymentLinkVisible]=useState(false);
   const[showEPaymentFeature,setShowEPaymentFeature]=useState(false);


    
   const getShowEPaymentFeature = async () => {
    const result = await contentApi.ShowEPaymentFeature();

    if (!result.ok) {
      setShowEPaymentFeature(0);
      //setError(true);
      return;
    }
    console.log(result);

    setShowEPaymentFeature(result.data);
     

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


  const GetFees= async()=>{
    var fees=[];
   // var totalAmount=0;
    unitTaxes.data.forEach(function(obj){
      if(obj.PAY)
      fees.push(obj.FEE_ID+"");//console.log("ffff" + obj.PAY);}
     // totalAmount=totalAmount+obj.AMOUNT;
      });
      console.log(fees);
      return fees;
  }
  const CheckVisaPayment=async()=>
  {
    console.log("Will check");
    const res= await customerApi.CheckVisaPayment(PaymentReference,payToken);
    console.log(res);
  }
  const handleChange1 = async (TaxType ) => {
    setTaxType(TaxType);
    getUnitTaxes(U_ID,TaxType,fromDate)
 }
  const GetenrateLink=async()=>
  {
    const token=await authStorage.getToken();
    const fees=await GetFees();
    const PayTokenRes= await customerApi.GeneratePaymentToken(token);
    var PayToken= PayTokenRes.data.ResponseObject;
    setPayToken(PayToken);
    console.log(user.nameidentifier,PayToken);
    const link= await customerApi.GeneratePaymentLink(PayToken,{
      CustomerID:user.nameidentifier,Amount:payTotal,Fees:fees,Notes:"test"
       },(progress) => {
        //setProgress(progress);
       // if (progress == 1) setLoading(true);
      });
      console.log(link);

      setPaymentLink(link.data.ResponseObject.PaymentLink);
      setPaymentReference(link.data.ResponseObject.PaymentReference);
      setVoucherNo(link.data.ResponseObject.VoucherNo);
      modalizeRefwv.current.open();
      //setPaymentLinkVisible(true);
    console.log(link.data.ResponseObject.PaymentLink);
    console.log(link.data.ResponseObject.PaymentReference);



  }
  const getUnitTaxes = async (U_ID,F_TYPE,T_DATE) => {
    setUnitTaxes({ loading: true, data: [] });
   console.log("Will get unit");
    const token=await authStorage.getToken();
    //const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU1NTU1NSIsImV4cCI6MTY4MTQyMjU3NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.zty_zAVQezQ1cSI172DxwWMf2IeEPeXdo6ZIwecCupU";
    const PayTokenRes= await customerApi.GeneratePaymentToken(token);
     var PayToken= PayTokenRes.data.ResponseObject;
     setPayToken(PayToken);
    //token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQ0NDQ0NCIsImV4cCI6MTY3NjI4ODE3MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.q_Zocy_aGZMNNJJTEdcbOgF2DMBSlNRyzBb-sz_wik0";
  
    // const result = await customerApi.GetCustomerFinancial(user.nameidentifier,F_TYPE);   
  
    const result = await customerApi.GetFeesByCustomerID(user.nameidentifier,showEPaymentFeature?PayToken:token,F_TYPE);   
   console.log(result);
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
      (item) => item.UNIT_ID === U_ID
    );
    else fdata=result.data.ResponseObject;
   
    fdata=fdata.filter(  (item) => (new Date(item.TAX_DATE)).getTime()>= T_DATE.getTime()  );
    let data = fdata.sort(function (a, b) { return (new Date(b.TAX_DATE)).getTime() - (new Date(a.TAX_DATE)).getTime(); }) ;//.slice(0, 5);
    data.forEach(function(obj){
      obj.PAY=false;
      });

    setUnitTaxes({ loading: false, data });
    //console.log(data);
  };
  const GetPaymentVoucher=async(VoucherNo)=>
  {
    //console.log(user.nameidentifier,payToken);
    const res= await customerApi.GetPaymentVoucher(VoucherNo,payToken);
    //console.log(res);
    if (!result.ok) {
      //  / setError(true);
       setVoucher(null);
        return;
      }
      setVoucher(data.ResponseObject);

  }
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
    // console.log(res);
     clearAll();
   };
  useEffect(() => {

    getShowEPaymentFeature();    //console.log(route.params.U_ID)
    getUnits();
    getUnitTaxes(route.params.U_ID,1,fromDate);
   // PrintPaymentVoucher(23023702);
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    
    //  /getNobetciEczaneApi.request("ss");
  }, []);
 const onNavigationStateChange = state => {

    // /console.log("State: "+JSON.stringify(state));
    const { url } = state;
    const { loading } = state;
    const callback_url = 'CheckVisaPayment';// to be changed
    if (!url) return;
    if(url === 'https://api.lahza.io/close') {
      CheckVisaPayment();
      PrintPaymentVoucher(VoucherNo);

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
      if(PAY&&obj.IS_PAYABLE&&!obj.IS_FREEZ)
      {
        t=t+obj.REM_LOC_AMT;
      }
      else { t=t-obj.REM_LOC_AMT;}
      console.log(t);
      setPayTotal(t);
      break;   
    }

}     
}

const SelectAll = async (PAY) => {
  var data=unitTaxes.data;
  setUnitTaxes({ loading :true,data:[]});
  const result = await customerApi.GetFeesByCustomerID(0,"",taxType);   
  var t=0;
  var len=data.length;
  for(var i=0;i<len;i++)
  {
    var obj=data[i];
   // if(ID==obj.FEE_ID)
   if(!obj.IS_PAYABLE|| obj.IS_FREEZ)continue;
   data[i].PAY=PAY;//console.log("ffff" + obj.PAY);}
   if(PAY)
    {
      t=t+obj.REM_LOC_AMT;
    }
    else
    {
    
    }
    //console.log(t +"dd"+obj.PAY);
} 
  console.log(t);
  setPayTotal(t);
    setUnitTaxes({ loading :false,data:data});  
}
 const onChangeDate = async (item) => {
  //console.log("sssdfiffee"+item +"  "+(new Date(item))+"    "+fromDate);

  setFromDate(new Date(item));  // 
  //console.log("sssdfiffee"+item +"  "+(new Date(item))+"    "+fromDate);
  getUnitTaxes(U_ID,taxType,new Date(item));
//  /getMails(allMail,item);

}
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
      
      { <View style={[styles.buttonClose]}>
           
                 {true&&<Button  
             
             buttonStyle={{marginTop:5,height:'65%',width:'99%',marginRight:5}}
             color={"secondaryLight"}
             textStyle={styles.buttonTxt} title="الملخص المالي" 
             onPress={
               
                () => navigation.navigate(routes.TAXTOTAL,{U_ID:-1})   

                //GetenrateLink();
               // navigation.navigate(routes.TAXTOTAL,{U_ID:-1})
           
            }     
             />}
            { false&&<Button  
             buttonStyle={{marginTop:5,height:'65%',width:'49%'}}
             color={"secondaryLight"}
             textStyle={styles.buttonTxt} title="طباعة" 
             onPress={
              () => 
              {
              //  selectPrinter()
               print()
                /*RNZebraBluetoothPrinter.enableBluetooth().then((res) => {
                  console.log(res)
                });
                RNZebraBluetoothPrinter.isEnabledBluetooth().then((res) => {
                  console.log(result)
                });*/
              }
            }      
             />}
          </View>}
      <Form             
          key={"RequestForm"}
          initialValues={{
             TaxType:1,
             TOTAL:0,
             From:dayjs((fromDate)).locale("ar").format('YYYY/MM/D'),
             FromTxt:"",
             U_IDTxt:U_ID==-1?"الكل":{"U_ID":U_ID}

          }}
          //onSubmit={handleSubmit}
          //validationSchema={validationSchema}
        >  
               <ScrollView>

        <View style={styles.section}>
         <FormRadioButtonGroup handleChange1={handleChange1} name="TaxType"  
        items={[{key:1, label: "غير مدفوع", value: 1 }, {key:2, label: "مدفوع", value: 2 }
      , { key:3,label: "مجدول", value: 3 }, {key:4, label: "مجمّد", value: 4 }//{ label: "الكل", value: 5 }
        ]}/>
                
       {true&&<Picker
      
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
                   <FormField       
       name={"TOTAL"}
       value={"مجموع الرسوم المحددة"+" = "+Math.round((payTotal*10))/10+'₪'}
       width={'100%'}
       //showPlaceholder={user.role=="Anonymous"}
       showPlaceholder={false}
       placeholder={"مجموع الرسوم المحددة"+" = "+payTotal +"₪"}
       style={[styles.totalTextStyle]}
       
      />
       </View>
       </ScrollView>
       </Form>     
        {false && (//getNobetciEczaneApi.error &&
          <Info
            buttonVisible={true}
            message="لقد حدث خطأ غير متوقع"
            onPress={() => getNobetciEczaneApi.request()}
          />
        )}
<ActivityIndicator visible={unitTaxes.loading} /> 
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
            handleChange={SelectAll}
            LOCAL_AMOUNT_AFTER_DISCOUNT={taxType==2?"المدفوع":"بعد الخصم"}/>}
             <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />     
        {(!PaymentLinkVisible&&!unitTaxes.loading&&
        <FlatList
          data={unitTaxes.data}
          keyExtractor={(item,index) => item.UNIT_ID+"-"+index}
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
        />
        )}
         {(showEPaymentFeature&&!PaymentLinkVisible&&!unitTaxes.loading&&unitTaxes.data.length>0&& <View style={[styles.buttonPay]}>
         <Button          
         buttonStyle={{marginTop:5,height:'75%',width:'72%',marginHorizontal:'12%'}}
         color={"primary"}
         textStyle={styles.buttonTxt} title="دفع الكتروني" 
         onPress={() => {GetenrateLink();
           // navigation.navigate(routes.TAXTOTAL,{U_ID:-1})
          }}     
         /> 
        </View>)}
   
          {}
      </Screen>
      <AppModalize
        ref={modalizeRefwv}
        title={"الدفع الإلكتروني"}
        onPress = { 
          async () => {
            CheckVisaPayment();
            modalizeRefwv.current.close();         
       }}
      >
        <AppWebView
          source={{ uri: PaymentLink,
           }}
        />
      </AppModalize>
      <AppModalize
        ref={modalizeRef}
        title={"تفاصيل الرسم"}
        adjustToContentHeight={true}
      //  / onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
        onPress = { 
          async () => {modalizeRef.current.close();         
       }}
      >
          <View style={{ height: viewerHeight*.8 }}>
          <ActivityIndicator visible={false} />
          <CardTaxDetails
          ADDRESS={taxItem?.LOCATION==""?"غير معرّف":taxItem.LOCATION}
           BLOCK={taxItem?.BLOCK_NO+''}
          PARCEL={taxItem?.PARCEL_NO+''}
           UNIT={taxItem?.UNIT_ID==""?"غير معرّف":taxItem.UNIT_ID}
            TAX_NAME={taxItem.TAX_NAME+""}
            TAX_DATE={dayjs(taxItem.TAX_DATE).locale("ar").format('D/MM/YYYY' )}
            AMOUNT={taxItem.AMT+''}
            CURN={taxItem.CURRENCY_ID+""}
            AMT_REM_AFTER_DISC={taxItem.AMT_REM_AFTER_DISC+""}
            DISCOUNT={taxItem.DISC+''}
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
  buttonPay: {
    width: "100%",
    height:50,
    alignSelf: "center",
    flexDirection:"row",
    backgroundColor:colors.white
 
  },
  buttonClose: {
    width: "95%",
    height:50,
    alignSelf: "center",
    marginBottom:7,
    flexDirection:"row"
 
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
    fontFamily:'Cairo_700Bold',

  },
  totalTextStyle: {
    color: colors.danger,
    fontFamily:'Cairo_700Bold',

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
export default TaxEPaymentScreen;
