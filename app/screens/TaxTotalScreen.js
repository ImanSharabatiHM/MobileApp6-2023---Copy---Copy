import React, { useEffect, useState,useRef } from "react";
import { Linking, StyleSheet,ScrollView } from "react-native";
import FormDatePicker from "../components/forms/FormDatePicker";
import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import eDevletApi from "../api/edevlet";
import customerApi from "../api/customer";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import Button from"../components/Button"
import routes from "../navigation/routes";

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
import CardTaxTotal from "../components/CardTaxTotal";

import { AppModalize } from "../components/Modalize";

import icons from "../config/icons";
import { View } from "react-native-animatable";
import { Dimensions } from "react-native";
import useAuth from "../auth/useAuth";
import authStorage from "../auth/storage";
const { width, height } = Dimensions.get("window");
function TaxTotalScreen({ navigation, route }) {
  const getNobetciEczaneApi = useApi(eDevletApi.getNobetciEczaneler);
  const [totalTaxes, setTotalTaxes] = useState({ loading: false, data:null});
  const [U_ID, setU_ID] = useState(route.params.U_ID);
  const modalizeRef = useRef(null);
  const [viewerHeight, setViewerHeight] = useState(height);
   const [taxItem, setTaxItem] = useState({});

   const {user,setUser}=useAuth();
 
  const getTotalTaxes = async () => {
    setTotalTaxes({ loading: true, data: [] });
  
    // const result = await customerApi.GetCustomerFinancial(user.nameidentifier,F_TYPE);   
   const result = await customerApi.GetCustomerFinancialTotals(user.nameidentifier);   

    //const result = await customerApi.getPayeeTaxesByPayeeCode("852950427");   
    if (!result.ok) {
    //  / setError(true);
      setTotalTaxes({ loading: false, data:null});
      return;
    }
     var fdata;
  
    fdata=result;

   // console.log(fdata);

     let data = fdata.data;
     setTaxItem(fdata.data);
    setTotalTaxes({ loading: false, data });
  };
 
  
  useEffect(() => {
    //console.log(route.params.U_ID)
    getTotalTaxes();
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    //  /getNobetciEczaneApi.request("ss");
  }, []);
 
  
  return (
    <>
      <ActivityIndicator visible={totalTaxes.loading} /> 
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
          ADDRESS={totalTaxes.ADDRESS}
          BLOCK={taxItem.BLOCK}
          PARCEL={taxItem.PARCEL}
          UNIT={taxItem.UNIT}
            TAX_NAME={taxItem.TAX_NAME}
            TAX_DATE={dayjs(taxItem.TAX_DATE).locale("ar").format('D/MM/YYYY' )}
            AMOUNT={taxItem.AMOUNT}
            CURN={taxItem.CURN}
            DISCOUNT={taxItem.DISCOUNT}
            LOCAL_AMOUNT={taxItem.LOCAL_AMOUNT}
            LOCAL_AMOUNT_AFTER_DISCOUNT={taxItem.LOCAL_AMOUNT_AFTER_DISCOUNT+ '₪'} 
            />

        </View>
      </AppModalize>
 
        {false && (//getNobetciEczaneApi.error &&
          <Info
            buttonVisible={true}
            message="لقد حدث خطأ غير متوقع"
            onPress={() => getNobetciEczaneApi.request()}
          />
        )}
        {!totalTaxes.loading && totalTaxes.data==null && (
          <Info
          buttonText={"رجوع للوحدة"}
            buttonVisible={false}
            message={
              "لا يوجد رسوم "+ (U_ID !=-1?"على الوحدة ":"")
            }
           onPress={() => navigation.pop(1)}
          />
        )}
      <Screen style={styles.screen}> 
      {!totalTaxes.loading&&taxItem!=null&&<CardTaxTotal
          MUJAMAD_SUM_LOCAL={taxItem.MUJAMAD_SUM_LOCAL+ ' ₪'}
          MUJAMAD_SUM_LOCAL_DISCOUNT={taxItem.MUJAMAD_SUM_LOCAL_DISCOUNT+ ' ₪'}
          MUJDWAL_SUM_LOCAL={taxItem.MUJDWAL_SUM_LOCAL+ ' ₪'}
          MUJDWAL_SUM_LOCAL_DISCOUNT={taxItem.MUJDWAL_SUM_LOCAL_DISCOUNT+ ' ₪'}
         PAID_SUM_LOCAL={taxItem?.PAID_SUM_LOCAL+ ' ₪'}
         PAID_SUM_LOCAL_DISCOUNT={taxItem.PAID_SUM_LOCAL_DISCOUNT + ' ₪'}
         UNPAID_SUM_LOCAL={taxItem.UNPAID_SUM_LOCAL+ ' ₪'}
          UNPAID_SUM_LOCAL_DISCOUNT={taxItem.UNPAID_SUM_LOCAL_DISCOUNT + ' ₪' }     
            />
      }
        <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
        { <View style={[styles.buttonClose]}>
            <Button  
             buttonStyle={{marginTop:0}}
             color={"primary"}
             textStyle={styles.buttonTxt} title="التفاصيل" 
             onPress={() => navigation.navigate(routes.TAXDETAILS,{U_ID:-1})}      
             />
          </View>}
        </Screen>
     </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
  },
  buttonClose: {
    marginTop:10,
    width: "80%",
    height:"11%",
    alignSelf: "center",
 
  },
  buttonTxt: {
    color:colors.white,
    fontSize:17.5,
    alignContent:"center",
    alignItems:"center",
    textAlign:"center"
    
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
  section: { marginHorizontal: 3, width: "100%", fontSize: 14, },

});
export default TaxTotalScreen;
