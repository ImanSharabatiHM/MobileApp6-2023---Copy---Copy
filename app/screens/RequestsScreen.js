import React from "react";
import  {useState,useEffect}  from 'react';
import { StyleSheet,View ,ScrollView,FlatList} from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import contentApi from "../api/content";
import RequestApi from "../api/request";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import * as FileSystem from "expo-file-system";
import { Button,Pressable,Text  } from "react-native";
import useAuth from "../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import FormImagePicker from "../components/forms/FormOneImagePicker";
import Card from "../components/CardCategory";

import Screen from "../components/Screen";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import customerApi from "../api/customer";
import * as Network from 'expo-network';



function RequestsScreen({ navigation,route }) {

  const { user } = useAuth();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [mainCategoriesVisible, setmainCategoriesVisible] = useState(!route.params.FromUnits);
  const [isConnected, setIsConnected] = useState(true);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState({TalabCode:0,TextAr:"-",NoOfDays:0});

  const [units, setUnits] = useState({ loading: false, data: null });
  const [subCategories, setSubCategories] = useState({ loading: false, data: []});
  const [requiredDocs, setRequiredDocs] = useState({ loading: false, data: null});
  const [fromUnits, setFromUnits] = useState(route.params.FromUnits);
  const [categories, setCategories] = useState({ loading: false, data: null

  });
const [mainCategories, setMainCategories] = useState({ loading: false, data: 
   [
                  
  {TalabCode:'1',TextAr:'كهرباء', ImageName:"electricityIcon"},
  {TalabCode:'2',TextAr:'مياه', ImageName:"waterIcon"},
  {TalabCode:'3',TextAr:'أبنية', ImageName:"buildingsIcon"},
  {TalabCode:'4',TextAr:'صرف صحي', ImageName:"sewageIcon"},
  {TalabCode:'5',TextAr:'حرف وصناعات', ImageName:"industryIcon"},
  {TalabCode:'6',TextAr:'الرسوم والضرائب', ImageName:"taxIcon"},
  {TalabCode:'7',TextAr:'الطرق', ImageName:"streetsIcon"},
  {TalabCode:'8',TextAr:'الإعلانات واليافطات', ImageName:"bannersIcon"},
  {TalabCode:'9',TextAr:'شهادات', ImageName:"certificateIcon"},
]  });
 async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const wifi = async () => {
    console.log("WIFI");
    startActivityAsync(ActivityAction.WIRELESS_SETTINGS);
    //IntentLauncher.startActivityAsync(IntentLauncherAndroid.ACTION_WIFI_SETTINGS);
}
const getUnits = async () => {
  setUnits({ loading: true, data: null });
//const result = await customerApi.getUnitsWithTaxByUserID("852950427");
const result = await customerApi.GetUnitDescription(user.nameidentifier);
  if (!result.ok) {
    //setError(true);
    setUnits({ loading: false, data:null });
    return;
  } 

  let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
  setUnits({ loading: false, data:data });
};
const getRequiredDocs= async (TALAB_CODE) => {
  setRequiredDocs({ loading: true, data: null });
   //const result = await getCustomerUnitsApi.request(user.nameidentifier);
 const result = await RequestApi.GetNeededDocumentsByTalabCode(TALAB_CODE);
 console.log(result);

  if (!result.ok) {
   // setError(true);
   setRequiredDocs({ loading: false, data:null });
    return;
  }
  let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
  console.log(data);
  setRequiredDocs({ loading: false, data:data });
};
const getCategories = async () => {
  setCategories({ loading: true, data: null });
  const result = await RequestApi.GetMainRequests();


  if (!result.ok) {
    setCategories({ loading: false, data:null });
    return;
  }

  let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
 console.log(data);

  setCategories({ loading: false, data :data});
};
const getSubCategories = async (code) => {
  setSubCategories({ loading: true, data: [] });
 // const result = await getCustomerUnitsApi.request(user.nameidentifier);
  const result = await RequestApi.GetSubRequests(code);


  if (!result.ok) {
    //setError(true);
    setSubCategories({ loading: false, data:[] });
    return;
  }

  let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
  setSubCategories({ loading: false, data :data});
};
  useEffect(() => {
  handleNetwork();
  getUnits();
  getCategories();
    
  }, []);

  
  const validationSchema = Yup.object().shape({
 
    RequestCustID: Yup.string().required("رقم الهوية مطلوب")
    .min(9, "يجب إدخال 9 أرقام")
    .max(9),
    
    
 
    UnitNo:!fromUnits?Yup.object().nullable().required("*رقم الوحدة مطلوب"):"",
      RequestUnitNo:fromUnits?Yup.string().required("رقم الوحدة*"):"",
    //UnitNo:!fromUnits?Yup.string().required("رقم الوحدة*"):"",
  
    RequestCustMobile:Yup.string().required("رقم هاتف مقدم الطلب*"),
    RequestNotes:Yup.string().required("الملاحظات*"),
    RequestImages0txt: requiredDocs.data?.length>0? Yup.string().required("المرفق مطلوب*"):"",
     RequestImages1txt: requiredDocs.data?.length>1? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages2txt: requiredDocs.data?.length>2? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages3txt: requiredDocs.data?.length>3? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages4txt: requiredDocs.data?.length>4? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages5txt: requiredDocs.data?.length>5? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages6txt: requiredDocs.data?.length>6? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages7txt: requiredDocs.data?.length>7? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages8txt: requiredDocs.data?.length>8? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages9txt: requiredDocs.data?.length>9? Yup.string().required("المرفق مطلوب*"):"",
    RequestImages10txt: requiredDocs.data?.length>10? Yup.string().required("المرفق مطلوب*"):"",
   


  
  });

  const handleSubmit = async (Request, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    var l=requiredDocs.data.length;
    let images=[];
    if(Request.RequestImages0.length>0)Request.RequestImages.push(Request.RequestImages0[0]);
    if(Request.RequestImages1.length>0)Request.RequestImages.push(Request.RequestImages1[0]);
    if(Request.RequestImages2.length>0)Request.RequestImages.push(Request.RequestImages2[0]);
    if(Request.RequestImages3.length>0)Request.RequestImages.push(Request.RequestImages3[0]);
    if(Request.RequestImages4.length>0)Request.RequestImages.push(Request.RequestImages4[0]);
    if(Request.RequestImages5.length>0)Request.RequestImages.push(Request.RequestImages5[0]);
    if(Request.RequestImages6.length>0)Request.RequestImages.push(Request.RequestImages6[0]);

    if(Request.RequestImages7.length>0)Request.RequestImages.push(Request.RequestImages7[0]);
    if(Request.RequestImages8.length>0)Request.RequestImages.push(Request.RequestImages8[0]);
    if(Request.RequestImages9.length>0)Request.RequestImages.push(Request.RequestImages9[0]);
    if(Request.RequestImages10.length>0)Request.RequestImages.push(Request.RequestImages10[0]);

   
    
    //Request.RequestCode
    /*let RequestToAdd = {   
      UNIT_NO: FromUnits ? Request.RequestUnitNo:Request.RequestUnitNo,
      NOTES: Request.RequestNotes  +" رقم الهاتف: "+Request.RequestCustMobile,
      PAYEE_CODE: Request.RequestCustID,
      TALAB_CODE: Request.RequestCode.value,  
      B_NO:unit.BUILDING_NO, 
      STREET_NO: unit.U_STREET_NO,
      PIECE_CODE:unit.B_PARCEL,
      HOD_CODE:unit.B_BLOCK ,
        
       };
*/
var unitno=fromUnits?(Request.RequestUnitNo):(Request.UnitNo.U_ID);
let RequestToAdd = {   
  UnitNo: unitno,
  NOTES: Request.RequestNotes  +" رقم الهاتف: "+Request.RequestCustMobile,
  PayeeCode: Request.RequestCustID,
  TalabCode: Request.RequestCode.value,  
  Attachments :  await getBase64Images(Request.RequestImages)    

 //Attachments :  await getBase64Images(Request.RequestImages0[0])    
   };

   console.log(RequestToAdd);
    const result = await RequestApi.PostNewTalab(RequestToAdd, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
    if (!result.ok) {
      setUploadVisible(false);
      setInfo({ RequestStatus: result.data.Message,
         RequestNo: "",  
      });
      setLoading(false);
      return;
    }
    else {

    if (result.data) {
      setInfo({
        RequestNo:result.data,
        RequestStatus: "قيد المتابعة",});
        setLoading(false);
    }}
    resetForm();
  };

  const viewTalabInfo = () => {
    console.log(selectedRequest);
    navigation.navigate(routes.SERVICEINFO,{item:selectedRequest});

  }
  const getRequestsByCode=(TalabCode)=>
  {
    var service=categories.data.filter(
      (item) => item.TalabCode === TalabCode
    );
    return service[0];
  }

  
  const scrollToIndex = (NAME) => {
    var filtered = categories.data.findIndex(item =>
      item.TextAr.includes(NAME),
    );
      //console.log(filtered);
     /* setSelectedIndex(filtered);
      if (filtered<0){
        setmsgVisible(true);
        setmsgTitle("المنطقة التي تبحث عنها غير موجودة!");
        return;}
      let searchIndex =filtered;
      flatListRef.scrollToIndex({animated: true, index: searchIndex});
      */
     } 
     const scrollToIndexUnit = (NAME) => {
      var filtered = units.data.findIndex(item =>
        item.U_ID.includes(NAME),
      );
        //console.log(filtered);
       /* setSelectedIndex(filtered);
        if (filtered<0){
          setmsgVisible(true);
          setmsgTitle("المنطقة التي تبحث عنها غير موجودة!");
          return;}
        let searchIndex =filtered;
        flatListRef.scrollToIndex({animated: true, index: searchIndex});
        */
       } 
       const getBase64Images = async (images) => {
        let imagesToReturn = [];
         
    
        for (let i = 0; i < images.length; i++) {
          var extension = images[i].substr(images[i].lastIndexOf(".") + 1);
          imagesToReturn.push({
            FILE_NAME:requiredDocs.data[i]+"-"+user.nameidentifier,
            FILE_EXT: "." + extension,
             
            FILE_BYTES: await FileSystem.readAsStringAsync(images[i], {
              encoding: FileSystem.EncodingType.Base64,
            }),
          });
        }
    
        return imagesToReturn;
      };
 
 
  return (
    <>
    {info && (
      <Info
        numberOfLines={5}
        buttonText="أعد التقديم"
        buttonVisible={false}
        color={colors.danger}
        message={ 
          (info.RequestNo !== "" ? (" . رقم الطلب : " + info.RequestNo +"\n"+
          "حالة الطلب : " +info.RequestStatus)
          : info.RequestStatus)
        }
        onPress={() => setInfo(null)}
      />
    )}
    <Screen style={styles.container}>
      <View style={{height:mainCategoriesVisible?"100%":0}}>
      {mainCategoriesVisible && <Info
        numberOfLines={7}
        buttonText="استمرار"
        buttonVisible={true}
        secondbuttonVisible={true}
        secondbuttonText={"إلغاء"}
        color={colors.primaryDark}
        
        notFound={false}
        message={ 
          ("يعتبر الطلب المقدم من قبلك طلب رسمي سيتم التعامل معه وفق الأصول والنظام ويحمل التوقيع الالكتروني الخاص بك تحت المسؤولية الخاصة بذلك.")
        }
        onPress={() => setmainCategoriesVisible(false)}
        secondonPress={() => navigation.popToTop()}
      />}

    {true&&mainCategoriesVisible && !fromUnits && (
        <FlatList
        numColumns={3}
          data={mainCategories.data}
          keyExtractor={(item) => "mainc"+item.TalabCode}
          renderItem={({ item }) => (
            <Card
             // s={modalizeRef}
              unit={item}
              navigation={navigation}
              title={"aa"}
              imageHeight={250}
              onPress={() => {
                setmainCategoriesVisible(false);
                console.log("ddd");
            // modalizeRef.current.open();
              }}
              imageUrl= {item.ImageName}//{item.img}
            />
          )}
        />
      )}</View>
      
    <UploadScreen
      onDone={() => {
        setUploadVisible(false);
      }}
      progress={progress}
      visible={uploadVisible}
    />
    <ActivityIndicator visible={loading} />

     { isConnected&&<Form
        initialValues={{
          RequestImages:[],
          RequestImages0:[],
          RequestImages1:[],
          RequestImages2:[],
          RequestImages3:[],
          RequestImages4:[],
          RequestImages5:[],
          RequestImages6:[],
          RequestImages7:[],
          RequestImages8:[],
          RequestImages9:[],
          RequestImages10:[],
          RequestImages11:[],
          RequestImages:[],
          RequestImages0txt:"",
          RequestImages2txt:"",
          RequestImages3txt:"",
          RequestImages4txt:"",
          RequestImages5txt:"",
          RequestImages6txt:"",
          RequestImages7txt:"",
          RequestImages8txt:"",
          RequestImages9txt:"",
          RequestImages10txt:"",
          RequestImages11txt:"",


          
          RequestCustName:user.name,
          RequestCustID:user.nameidentifier,
          RequestUnitNo:route.params.item?.U_ID+"",//unit.UNIT_NO,
          RequestCustMobile:user.mobilephone==""?"":user.mobilephone,
          UnitNo:"",
          RequestNotes:""  ,
          SubRequestCode:{label:"",value:""},  
          RequestCode:{label:"اختر نوع الطلب",value:0}        
      
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
      <ScrollView>
     { false&&<View style={styles.imagesection}>  
            <FormImagePicker  name={"RequestImages"} />                            
        </View>}
      <View style={styles.section}>
     {false&& <Picker
        items={categories.data?.map(
          (category) => { return {label: category.TextAr,value: category.TalabCode };}
          )}
        name="RequestCode"
        placeholder="نوع الطلب"
        showPlaceholder={false}
         
      />}
      <View style={{flexDirection:"row"}}>
        <View style={{flex:4}}>
       <Picker
      waterPicker={true}
        items={          
          categories?.data?.map(
          (category,index) => {
              return {label: category.TextAr.replace(/\\/g,''),value: category.TalabCode };
                  })
                }
        name="RequestCode"
        width={"100%"}
        placeholder="نوع الطلب"
        showPlaceholder={true}
        searchPlaceHolder={"بحث عن نوع الطلب"}
        selectedItemChanged={(category) =>   
         {

          setSelectedRequest(getRequestsByCode(category.value));
          getRequiredDocs(category.value);
         getSubCategories(category.value+"nn");
          scrollToIndex(category.label);      
        }}
      />
       </View> 
           <View style={[styles.buttonClose,{flex:1,marginStart:5}]}>
          <Pressable  visible={true} style={styles.buttonClose} onPress={viewTalabInfo}     >
        <Text style={styles.buttonTxt}>{" معلومات الطلب"}</Text>
        </Pressable>
  </View>
  </View>
     {subCategories?.data?.length!=0&&!subCategories?.loading&&<Picker
      waterPicker={true}
        items={          
          subCategories?.data?.map(
          (category,index) => {
              return {label: category.TextAr,value:index};
                  })
                }
        name="SubRequestCode"
        width={"100%"}
        placeholder="نوع الطلب الفرعي"
        showPlaceholder={true}
        searchPlaceHolder={"بحث عن نوع الطلب"}
        selectedItemChanged={(category) =>   
         {
          //scrollToIndex(category.label );      
        }}
      />}




  {!fromUnits&&<Picker
      
      unitsPicker={true}
      navigation={navigation}
        items={          
        units.data
                }
        name={"UnitNo"}
        editable={false}
        width={"100%"}
        placeholder="رقم الوحدة"
        showPlaceholder={true}
        searchPlaceHolder={"بحث عن رقم الوحدة"}
        selectedItemChanged={(unit) =>   
         {
        //  / scrollToIndexUnit(unit.label);      
        }}
      />}
        <Field        
          editable={false} 
          name="RequestCustName"
          placeholder={"الاسم"}
          style={[styles.name]}
          showPlaceholder={false}
        />
        <Field
          keyboardType="number-pad"
          maxLength={9}
          name="RequestCustID"
          editable={false}  
          //showPlaceholder={user.role=="Anonymous"}
          showPlaceholder={false}
          placeholder="رقم الهوية"
          style={[styles.name]}
        />
         { fromUnits &&<Field
          name="RequestUnitNo"
          placeholder="رقم الوحدة"
          showPlaceholder={false}
          style={[styles.name]}
          editable={false}
        />}
          <Field
           keyboardType="number-pad"
           name="RequestCustMobile"
          showPlaceholder={false}
          placeholder="رقم الهاتف المحمول"
          style={[styles.name]}
        />
                <Field
          name="RequestNotes"
          multiline
          showPlaceholder={false}
          numberOfLines={3}
          placeholder="ملاحظات"
          style={[styles.name]}
        />
           <Field
           showPlaceholder={true}
           editable={false}
          placeholder="**الوثائق المطلوبة"
          style={[styles.name,{backgroundColor:colors.danger}]}
        /> 

 {<View style={[styles.imagesection,{margin:0,padding:0}]}>
    {true&&<FlatList
          scrollEnabled={false}
          numColumns={1}
          style={{marginBottom:0,paddingBottom:0}}
          data={requiredDocs?.data}
          keyExtractor={(item,index) => item}
          renderItem={({ item,index }) => (
            <View style={{flexDirection:"row",padding:0,margin:0}}>
              <View style={{flex:5}}>
            <Field   
            editable={false} 
            value={""}
            name={"RequestImages"+index+"txt"}
            placeholder={item}
            style={[styles.name]}
            showPlaceholder={true}
          />
          </View>
          <View style={{flex:1}}>
             <FormImagePicker  style={{width:'100%',borderRadius:7}} name={"RequestImages"+index} attach = 'true' request={true}/></View>
            </View>
          )}
        />}
                  
        </View>}
        </View>
        
        <SubmitButton enabled={selectedRequest.TalabCode!=0?true:false} title={"إرســـال"} />
        </ScrollView>

      </Form>}
    </Screen>
    </>
  );
}
export default RequestsScreen;

const styles = StyleSheet.create({
  section: { marginHorizontal: "10%" ,width:"80%",fontSize:12,},
  Field: { 
  width:"50%",
  fontSize:12,
  fontFamily:"Cairo_400Regular",
  textAlign:"right",
  // /color: colors.black
},
name: { 
width:"100%",
fontSize:12,
fontFamily:"Cairo_400Regular",
color: colors.darkNew,
textAlign:"right",

},
buttonClose: {
 // bottom:5,
 // width: "20%",
 borderRadius: 10,
 justifyContent: "center",
 alignItems: "center",
 padding: 5,
 width: "100%",
  alignSelf:"center",
  backgroundColor:colors.primary
},
buttonTxt: {
  fontSize:10,
  fontFamily:"Cairo_400Regular",
  color: colors.white,
  textAlign:"center",
  
 },
  button:{width:"70%"},
  imagesection: { width:"99%",flexDirection:"column" },

  container: {
    fontSize:10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
