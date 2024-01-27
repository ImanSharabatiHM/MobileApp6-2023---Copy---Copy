import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

function CardWaterTax({
  UnPaid,
  Paid,
  Scheduled, 
  imageUrl,
  date,
  color,
  imageHeight = 300,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card,{backgroundColor:color}]}>
        <View style={styles.detailsContainer}>
          {UnPaid&&(
            <Text style={[styles.subTitle]} numberOfLines={2}>
               مجموع الغير مدفوع : {UnPaid} ₪ 
            </Text>
          )}
     

           {Paid && (
            <Text style={styles.subTitle} numberOfLines={8}>
             مجموع المدفوع: {Paid} ₪ 
            </Text>
          )}

          {Scheduled && (
            <Text style={styles.subTitle} numberOfLines={8}>
             مجموع المجدول: {Scheduled} ₪
            </Text>
          )}    
     
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
  },
  date:{
    marginTop:-30,
    textAlign:"left",
    color:colors.danger,
    
    

  },
  absoluteFill: {
    backgroundColor: colors.darkNew,
    opacity: 0.1,
    marginTop:10,
 
  },
  actionButtonIcon: {
    fontSize: 30,
    height: 30,
    color: colors.twitter,
  },
  subTitle: {
    marginTop:5,
    fontSize:16,
    fontFamily:'Cairo_700Bold',
    color: colors.dark,
   // fontWeight: "bold",
  },
  notes: {
    marginTop:5,
    fontSize:14,
    color: colors.secondary,
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
    marginBottom: 7,
  },
});

export default CardWaterTax;
