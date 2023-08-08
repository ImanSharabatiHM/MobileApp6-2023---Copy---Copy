import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";

import Text from "./Text";
import colors from "../config/colors";

function CardTaxDetails({
  ADDRESS,
  BLOCK,
  UNIT,
  PARCEL,
  TAX_NAME,
  TAX_DATE,
  AMOUNT,
  CURN,
  AMT_REM_AFTER_DISC,
  DISCOUNT,
  LOCAL_AMOUNT,
  DISCOUNT_LOCAL,
  LOCAL_AMOUNT_AFTER_DISCOUNT,  
  onPress, 
})
 {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
       

        <View style={styles.detailsContainer}>
          {TAX_NAME && (
            <Text style={styles.taxNameL} numberOfLines={2}>
              {TAX_NAME}
            </Text>
          )}
              {TAX_DATE && (
            <Text style={styles.taxName} numberOfLines={1}>
             تاريخ الاستحقاق: {TAX_DATE} 
            </Text>
            
          )}
          
          {ADDRESS!="" && (
            <Text style={styles.taxName} numberOfLines={6}>
             العنوان: {ADDRESS} 
            </Text>
            )}
          <ListItemSeparator  seperatorStyle={styles.seperatorStyleTable} />
      
          {BLOCK!="" && (
            <Text style={styles.taxFinalAmount} numberOfLines={2}>
               الحوض: {BLOCK}  /  القطعة: {PARCEL}   {UNIT!="0"?'/   رقم الوحدة: '+UNIT:''}
            </Text>
          )}
           {AMOUNT!="" && (
            <Text style={styles.taxFinalAmount} numberOfLines={2}>
             القيمة  قبل الخصم : {CURN} {AMOUNT}
            </Text>
          )}
           {DISCOUNT!="" && (
            <Text style={styles.taxFinalAmount} numberOfLines={2}>
             قيمة الخصم: {CURN} {DISCOUNT}
            </Text>
          )}

{AMT_REM_AFTER_DISC!="" && (
            <Text style={styles.taxFinalAmount} numberOfLines={2}>
              القيمة بعد الخصم  : {CURN} {AMT_REM_AFTER_DISC}
            </Text>
          )}
          
           {LOCAL_AMOUNT!="" && (
            <Text style={styles.taxFinalAmount} numberOfLines={2}>
             القيمة قبل الخصم بالشيكل: {LOCAL_AMOUNT}
            </Text>
          )}
          {DISCOUNT_LOCAL!="" && (
            <Text style={styles.taxFinalAmount} numberOfLines={2}>
             قيمة الخصم بالشيكل : {DISCOUNT_LOCAL}
            </Text>
          )}
           {LOCAL_AMOUNT_AFTER_DISCOUNT!="" && (
            <Text style={styles.taxFinalAmount} numberOfLines={2}>
            القيمة  بعد الخصم بالشيكل: {LOCAL_AMOUNT_AFTER_DISCOUNT}
            </Text>
          )}
           
      
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 1,
    backgroundColor: colors.white,
    marginBottom: 1,
    overflow: "hidden",
    marginHorizontal: 1,
  },
  detailsContainer: {
    padding: 2,
    flexDirection:"column"
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    height: 1,
    width: "100%",
  },
  image: {
    width: "100%",
  },
  subTitle: {
    color: colors.secondary,
   // fontWeight: "bold",
  },
  statusTxt: {
    color: colors.danger,
   // fontWeight: "bold",
  },
  unitOwner: {
    color: colors.secondary,
  //  fontWeight: "bold",
  },
  unitUse: {
    color: colors.secondary,
    //fontWeight: "bold",
  },
  title: {
    textAlignVertical:"center",
    fontFamily:"Cairo_700Bold",
    fontSize:12,
    marginBottom: 7,
  },
  taxName: {
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    textAlign:"auto",
    paddingTop:5,
    marginRight:5,
    fontSize:14,
  },
  taxNameL: {
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    textAlign:"auto",
    paddingTop:5,
    marginRight:5,
    fontSize:16,
  },
  taxDate: {
    textAlign:"center",
    fontFamily:"Cairo_600SemiBold",
    fontSize:14,

  },
  taxFinalAmount: {
    textAlignVertical:"center",
     textAlign:"auto",
     fontFamily:"Cairo_600SemiBold",
    fontSize:14,
    marginTop:7,


 
  },
  txtPaid:
  {color:colors.twitter},

  txtUnPaid:
  {color:colors.youtube},
  
});

export default CardTaxDetails;
