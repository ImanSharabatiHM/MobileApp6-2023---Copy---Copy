
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions ,View} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import customerApi from "../api/customer";
import contentApi from "../api/content";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Alertmsg from "../components/Alertmsg";

import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Card from "../components/CardWater";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import HeaderButton from "../navigation/header/Button";

import { AppModalize } from "../components/Modalize";
import  Button  from "../components/Button";
import useAuth from "../auth/useAuth";

const initialLayout = { width: Dimensions.get("window").width };
import ActivityIndicator from "../components/ActivityIndicator";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import complaintApi from "../api/complaint";
import AppButton from "../components/Button";

function WaterScheduleScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const [proje, getProje] = useState(null);
  const [water, setWater] = useState(null);
  const getWaterAreasApi = useApi(contentApi.getWaterAreas);
  const { user,waterPipe,setWaterPipe} = useAuth();
  const [progress, setProgress] = useState(0);

  const getWaterScheduleApi = useApi(contentApi.getWaterSchedule);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [msgVisible, setmsgVisible] = useState(false);
  const [msgTitle, setmsgTitle] = useState("");
  const [error, setError] = useState(false);


  const getWaterSchedule = async () => {
    setLoading(true);
    setWater({ loading: true, data: null });
    const result =  getWaterScheduleApi.request();
    const staticmembers= [{"PLAN_DATE":"2022-05-16T00:00:00",
    "DESCRIPTION":"ابو كتيلا - جهة اليمين - قصر ابو عطوان-السيدة سارة المنطقة المرتفعة -جبل جوهر المرتفع ، محيط مدرسة اسامة -خلة حاضور المنخفضة خلف المسجد الابراهيمي-لمبوع اسكان الملك عبدالله"},
    {"PLAN_ID":"W1","PLAN_DATE":"2022-05-17T00:00:00","DESCRIPTION":"الزاهد - بئر الحمص - الغرفة التجارية - عين القرنة - حارة جابر - حارة السلايمة - البلدة القديمة - مسجد الابراهيمي الشريف-حارة الجعبري - الراس-طلعة مصنع الجنيدي شارع اليرزة - المقاطعة - الاجهزة الامنية-لمبوع المنطقة المرتفعة"},
    {"PLAN_ID":"W2","PLAN_DATE":"2022-05-18T00:00:00","DESCRIPTION":"الزاهد - بئر الحمص - الغرفة التجارية - عين القرنة - حارة جابر - حارة السلايمة - البلدة القديمة - المسجد الابراهيمي-شارع السلام - الانصار - زقاق طايشة - مربعة سبتة-طريق العمارة - قرن الثور-لمبوع من دوار الامير حتى ديوان الهيموني - عمارة سدر"},
    {"PLAN_ID":"W3","PLAN_DATE":"2022-05-19T00:00:00","DESCRIPTION":"خلة حاضور المرتفعة - المحول - شارع الطلاب - شارع ابو عياش-لمبوع - طريق المستشفى الاهلي القديمة-ما حول خزان خلة بطرخ - قبر الخاروف - مدرسة رشدية - عمارة الاسراء - الحرس من شرطة الحرس حتى فرن صالح-واد المغير - الحرايق - خربة الحرايق"},
    {"PLAN_ID":"W4","PLAN_DATE":"2022-05-20T00:00:00","DESCRIPTION":"تل ارميدة - بير شاهين جبل سنداس - الكرنتينا - المشروع-سنجر - عين ننقر - الحسبة الجديدة - مفرق التحرير-فرش الهوى - بئر عركة-قشقلة - جبل جنيد المرتفع - شارع الشهيد نادر زاهدة"},
    {"PLAN_ID":"W5","PLAN_DATE":"2022-05-21T00:00:00","DESCRIPTION":"حارة الشيخ المرتفعة - مستشفى عالية - منطقة ما حول خزان حبايل الرياح - الاسكان الفلسطيني - شارع الشهيد اكرم الهيموني-خلة ابو عصا - جبل برغوث-ضاحية الزيتون - منطقة مستشفى حمدان - دخلة غرناطة-فرش الهوى - المنطرة"},
    {"PLAN_ID":"W6","PLAN_DATE":"2022-05-22T00:00:00","DESCRIPTION":"البصة المنخفضة - وادي الجوز-القاعات الماسية - خلة ابو عصا المرتفعة-فرش الهوى - المنطقة المرتفعة-واد الغروس - عين بني سليم - قيزون المنخفضة من محبس اعسيلة حتى منشار جابر"},
    {"PLAN_ID":"W7","PLAN_DATE":"2022-05-23T00:00:00","DESCRIPTION":"البويرة - بيت عينون-القواعة - حارة ابو سنينة المرتفعة - مسجد البراء - قب الجانب-جبل شريف - طلعة مسجد حمزة-فرش الهوى - محيط محكمة الصلح سابقا"},
    {"PLAN_ID":"W8","PLAN_DATE":"2022-05-24T00:00:00","DESCRIPTION":"ابو دعجان المنخفض-الزاهد - بئر الحمص - الغرفة التجارية - عين القرنة - حارة جابر - حارة السلايمة - البلدة القديمة - المسجد الابراهيمي-زقاق الهيش - شارع العدل - دخلة مدرسة السيدة سارة - المنشر - كلية الرحمة سابقا-منطقة دوار الرحمة - الثغرة - محيط صالة غانم - طريق السبع - الشرعية للبنين"},
    {"PLAN_ID":"W9","PLAN_DATE":"2022-05-25T00:00:00","DESCRIPTION":"ابو دعجان المرتفع-ابو رمان المرتفع - مسجد المرابطون - ابو رمان المنخفض معهد البوليتكنك - مركز كعوش-عين سارة كاملة حتى فرن صالح - طلعة مسجد الحسين-مغارة الزقيعة - خلة ابو مجنونة"},
    {"PLAN_ID":"W10","PLAN_DATE":"2022-05-26T00:00:00","DESCRIPTION":"ابو دعجان المرتفع-الحاووز الاول - طلعة ابو شامة - الظهارة - مسجد احمد بن حنبل-باب الزاوية - شارع الملك فيصل - دوار الصحة والمنارة - وادي التفاح القديم والجديد - عين خير الدين - التدريب المهني-ضاحية الحسينية - محيط سيدنا ابراهيم - مدرسة السراحنة"},
    {"PLAN_ID":"W11","PLAN_DATE":"2022-05-27T00:00:00","DESCRIPTION":"الجوانية -العماير - فرن الرشيد - واد الهرية - مصنع نيروخ - خلة انفيسة - اول طريق اسكان البلدية -دويربان-منطقة ما حول خزان ابو نعير - ديوان سلطان - مسجد عثمان بن عفان-البوابير-عمران الاطرش-دخلة عمرو - طريق جبل الرحمة"},
    {"PLAN_ID":"W12","PLAN_DATE":"2022-05-28T00:00:00","DESCRIPTION":"بئر المحجر - من دوار بئر المحجر حتى كازية الشرق الاوسط-عيصى ، لوزا ، مدرسة ربعي شريف -وادي الهرية حتى مفرق العجوري - دخلة ابو عفيفة - الايمان -القصراوي"},
    {"PLAN_ID":"W13","PLAN_DATE":"2022-05-29T00:00:00","DESCRIPTION":"صالة الغزالي - قيزون المرتفعة من منشار جابر حتى عطا بالي - محيط مسجد زهرة - قيزون المنخفضة -طريق المستشفى الاهلي الجديدة -طلعة ديوان مجاهد كاملة - واد الكرم "}];   

    if(!result.ok)
    {
     //setError(true);
     // setWater({ loading: false, data:staticmembers });
      setLoading(false);

      return;

    }
       setWater({ loading: false, data:result.data });
       setLoading(false);

      return;

  };

  const handleWater = async () => {
    getWaterSchedule();
  }
  const getItemLayout = (data, index) => (
    { length: 50, offset: 50 * index, index }
  )
  const handleSaveWater = async (data) => {
      var result;
       result = await contentApi.UpdateCustomerWaterArea(user.nameidentifier,data.WaterArea.value);      
       if (!result.ok) {
         setmsgVisible(true);
         setmsgTitle("حدث خطأ!");
         console.log(msgVisible+"dddd",result);
        //setError(true);
         return;
       
      }
      else
      {
       setmsgVisible(false);
      //To setUser
      setmsgVisible(true);
      setWaterPipe(data.WaterArea.label);
      setmsgTitle("تم تحديث بياناتك بنجاح !");
      }
 
   }

 const scrollToIndex = (area) => {
  var filtered = getWaterScheduleApi.data.findIndex(item =>
    item.DESCRIPTION.includes(area),
  );
    //console.log(filtered);
    setSelectedIndex(filtered);
    if (filtered<0){
      setmsgVisible(true);
      setmsgTitle("المنطقة التي تبحث عنها غير موجودة!");
      return;}
    let searchIndex =filtered;
    flatListRef.scrollToIndex({animated: true, index: searchIndex});
    
   }


  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    getWaterAreasApi.request();
    handleWater();
    //console.log(JSON.stringify(getWaterAreasApi.data),"ssssssssssss");

  }, []);

  return (
    <>
      <Screen style={styles.screen}>
        
      <View style={styles.section}>
      <Form
      initialValues={{
        ComplaintImage:[],
        WaterArea:"",
      }}
      onSubmit={handleSaveWater}
      
      >

      <Picker
      waterPicker={true}
        items={          
          getWaterAreasApi.data?.map(
          (Place) => {
            return {label: Place.Area,value: Place.ID };
                  })
                }
        name="WaterArea"
        width={"100%"}
        placeholder="بحث عن منطقة"
        showPlaceholder={true}
        selectedItemChanged={(Place) =>   
         {
          scrollToIndex(Place.label );      
        }}
      />
      {user.role != "Anonymous" &&<View style={[styles.buttonClose]}>
            <SubmitButton buttonStyle={styles.buttonClose} textStyle={styles.buttonTxt}
             title="حفظ المنطقة"             
             />
  </View>}
      </Form>
        </View>
        
      {getWaterScheduleApi?.data && (
        <FlatList
        ref={(ref) => { flatListRef = ref; }}
          //getItemLayout={getItemLayout}
          //initialScrollIndex={50}
          data={getWaterScheduleApi.data}
          keyExtractor={(item,index) => "W"+index+Math.random()}
          renderItem={({ item,index }) => (
            <Card
            date={dayjs(item.PLAN_DATE).locale("ar").format('D-MM-YYYY  / dddd' )}
            color = {index == selectedIndex ? colors.seperator:colors.white} 
            notes={item.DESCRIPTION}     
            imageHeight={450}
            onPress={() => {
                //getUnit(item);
               // modalizeRef.current.open();
              }}
             // thumbnailUrl ={item.img}
              //imageUrl= {item.img}
            />
          )}
        />
      )}
    <ActivityIndicator visible={loading}/>
    </Screen>
    
      <AppModalize
        ref={modalizeRef}
        //title={proje?.projectTitle["#cdata-section"]}
      >
        <AppWebView
          source={{
            html:
              "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
              proje?.projectContent["#cdata-section"].split("<br>").join(""),
          }}
        />
      </AppModalize>
      {msgVisible && <Alertmsg
     isVisible={msgVisible}
      title={msgTitle}
      onPress={() => {
        setmsgVisible(false);}}
      buttonTitle={"إغلاق"}
     
   />} 
    </>
    
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  section: { marginHorizontal: "5%" ,width:"90%",fontSize:14,},
  Field: { 
  width:"50%",
  fontSize:16,
  padding:30,
  fontFamily:"Cairo_400Regular",
  // /color: colors.black
},

  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
  buttonClose: {
    bottom:5,
    borderRadius:10,
    width: "80%",
    alignSelf:"center",
  },
  buttonTxt: {
    color:colors.white,
    fontSize:16
    
   },
});


export default WaterScheduleScreen;
