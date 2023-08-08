import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";
import { ListItem, ListItemSeparator } from "./lists";
import Icon from "./Icon";

import Text from "./Text";
import colors from "../config/colors";

function CardBuildDetails({
  ADDRESS,
  B_ID,
  IMAGE,
  BLOCK,
  PARCEL,
  BNO,
  STNO,
  onPress, 
})
 {
  return (
    <TouchableWithoutFeedback onPress={onPress} >
    <View style={styles.mainContainer}>
    <View style={styles.card}>
      {(
        <Image
          style={[styles.image]}
       //   preview={{ uri: thumbnailUrl }}
         //  uri={{imageUrl}}
         source={IMAGE==""||IMAGE==null?require('../assets/def.jpg'):{uri:'data:image/png;base64,'+IMAGE}}

         // source={imageUrl.includes("def")?require('../assets/def.jpg'):{uri:imageUrl}}
        />
      )}
      
      </View>
      <View style={styles.detailsContainer}>
      {B_ID  && (
          <Text style={styles.title} numberOfLines={2}>
            الرقم التسلسلي  : {B_ID}
          </Text>
        )}
        {BLOCK  && (
          <Text style={styles.subTitle} numberOfLines={2}>
            الحوض: {BLOCK}
          </Text>
        )}
        {PARCEL  && (
          <Text style={styles.subTitle} numberOfLines={2}>
            القطعة: {PARCEL}
          </Text>
        )}

        {BNO  && (
          <Text style={styles.subTitle} numberOfLines={2}>
            البناء: {BNO}
          </Text>
          )}  
      {STNO  && (
          <Text style={styles.subTitle} numberOfLines={2}>
            الشارع: {STNO}
          </Text>
          )}  
          
      </View>
    </View>
 
  </TouchableWithoutFeedback>

 
  );
}

const styles = StyleSheet.create({
  card: {
    flex:1,
    borderRadius: 8,
    margin:5,
    width:"100%",
    //backgroundColor: colors.danger,
    overflow: "hidden",
  },
  detailsContainer: {
    flex:2,
    alignItems:"flex-start"
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    height: 1,
    width: "100%",
  },
  image: {
    // flex: 1,
    borderRadius: 10,
 
     width: '100%',
     height: "100%",
     resizeMode:"stretch",
   //  / transform: [{ rotate: '90deg' }]
     
   },
  subTitle: {
    color: colors.primary,
    fontFamily:"Cairo_700Bold",

    fontSize:14,

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
    fontSize:14,
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
  mainContainer: {
    overflow: "hidden",
    width:"100%",
    height:140,
    flexDirection:"row",
    marginLeft:15,
    marginTop:10,
  },
  txtPaid:
  {color:colors.twitter},

  txtUnPaid:
  {color:colors.youtube},
  
});

export default CardBuildDetails;
