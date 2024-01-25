import React, { useEffect, useState,useRef } from "react";
import { Linking, StyleSheet,ScrollView } from "react-native";
import FormDatePicker from "../components/forms/FormDatePicker";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import eDevletApi from "../api/edevlet";
import customerApi from "../api/customer";
import dayjs from "dayjs";
import routes from "../navigation/routes";
import "dayjs/locale/ar";
import Button from"../components/Button"
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";
import { Form ,FormField as Field,FormPicker as Picker} from "../components/forms";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import { FlatList } from "react-native";
import Info from "../components/Info";
import Icon from "../components/Icon";
import Card from "../components/CardTax";
import CardHeader from "../components/CardTaxHeader";
import CardTaxDetails from "../components/CardTaxDetails";
import Alertmsg from "../components/Alertmsg";
import contentApi from "../api/content";

import { AppModalize } from "../components/Modalize";

import icons from "../config/icons";
import { View } from "react-native-animatable";
import { Dimensions } from "react-native";
import useAuth from "./../auth/useAuth";
import authStorage from "./../auth/storage";
const { width, height } = Dimensions.get("window");
function TaxDetailsScreen({ navigation, route }) {
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
  const[showEPaymentFeature,setShowEPaymentFeature]=useState(false);

   const {user,setUser}=useAuth();
   const getUnits = async () => {
 
    setUnits({ loading: true, data: null });
     //const result = await getCustomerUnitsApi.request(user.nameidentifier);
  //const result = await customerApi.getUnitsWithTaxByUserID("852950427");GetUnitDescription
  //const result = await customerApi.GetUnitDescription("852950427");
  const result = await customerApi.GetUnitDescription(user.nameidentifier);
    if (!result.ok) {
      setError(true);
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
  const getUnitTaxes = async (U_ID,F_TYPE,T_DATE) => {
    setUnitTaxes({ loading: true, data: [] });
  
    // const result = await customerApi.GetCustomerFinancial(user.nameidentifier,F_TYPE);   
   const result = await customerApi.GetCustomerFinancial(user.nameidentifier,F_TYPE);   

    //const result = await customerApi.getPayeeTaxesByPayeeCode("852950427");   
    if (!result.ok) {
    //  / setError(true);
      setUnitTaxes({ loading: false, data:[] });
      return;
    }
  
    var fdata;
    //U_ID=-1;
    if(U_ID != -1)
     fdata=result.data.filter(
      (item) => item.UNIT === U_ID
    );
    else fdata=result.data;
   
    fdata=fdata.filter(  (item) => (new Date(item.TAX_DATE)).getTime()>= T_DATE.getTime()  );
    let data = fdata.sort(function (a, b) { return (new Date(b.TAX_DATE)).getTime() - (new Date(a.TAX_DATE)).getTime(); }) ;//.slice(0, 5);
    setUnitTaxes({ loading: false, data });
  };
  
  useEffect(() => {
    //console.log(route.params.U_ID)
    getShowEPaymentFeature();
    getUnits();

    getUnitTaxes(route.params.U_ID,1,fromDate);
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    //getNobetciEczaneApi.request("ss");
  }, []);
  const handleChange1 = async (TaxType ) => {
    setTaxType(TaxType);
    getUnitTaxes(U_ID,TaxType,fromDate)
 }
 const getShowEPaymentFeature = async () => {
  const result = await contentApi.ShowEPaymentFeature();

  if (!result.ok) {
    setShowEPaymentFeature(0);
    setError(true);
    return;
  }
   //console.log(result);

  setShowEPaymentFeature(result.data);
   

};
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
        { <View style={[styles.buttonClose,{flexDirection:"column"}]}>
            <Button  
             buttonStyle={{marginTop:5,height:'80%',width:'95%',marginHorizontal:5}}
             color={"secondaryLight"}
             textStyle={styles.buttonTxt} title="الملخّص المالي" 
             onPress={() => navigation.navigate(routes.TAXTOTAL,{U_ID:-1})}      
             />
              {showEPaymentFeature&&<Button  
             buttonStyle={{marginTop:5,height:'80%',width:'95%',marginHorizontal:5}}
             color={"secondaryLight"}
             textStyle={styles.buttonTxt} title="الدفع الإلكتروني" 
             onPress={() => navigation.navigate(routes.PAYMENT,{U_ID:-1})}      
             />}
          </View>}
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

      <Screen style={styles.screen}> 
      {!unitTaxes.loading && unitTaxes.data.length==0 && (
          <Info
          buttonText={"رجوع للوحدة"}
            buttonVisible={false}
            message={
              "لا يوجد رسوم "+ (U_ID !=-1?"على الوحدة ":"")
            }
           onPress={() => navigation.pop(1)}
          />
        )}
       <CardHeader
            TAX_NAME={"اسم الرسم"}
            TAX_DATE={"التاريخ"}
             LOCAL_AMOUNT_AFTER_DISCOUNT={"القيمة بعد الخصم"}            
                       />
                        <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
        {(true&&<FlatList
          data={unitTaxes.data}
          keyExtractor={(item,index) => item.UNIT+"-"+index}
          renderItem={({ item }) => (
            <Card
            TAX_NAME={item.TAX_NAME}
            TAX_DATE={dayjs(item.TAX_DATE).locale("ar").format('D/MM/YYYY' )}
            AMOUNT={item.AMOUNT}
            CURN={item.CURN}
            DISCOUNT={item.DISCOUNT}
            LOCAL_AMOUNT={item.LOCAL_AMOUNT}
            LOCAL_AMOUNT_AFTER_DISCOUNT={item.LOCAL_AMOUNT_AFTER_DISCOUNT+ '₪'} 
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
export default TaxDetailsScreen;
