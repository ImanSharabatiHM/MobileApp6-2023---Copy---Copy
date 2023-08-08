import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

function CardWater({
  title,
  subTitle,
  imageUrl,
  date,
  color,
  status,
  notes,
  imageHeight = 300,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card,{backgroundColor:color}]}>
        {imageUrl && (
          <Image
            style={[styles.image, { height: imageHeight }]}
            tint="dark"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
          />
        )}

        <View style={styles.detailsContainer}>
        <MaterialCommunityIcons
            style={styles.actionButtonIcon}
            name="water"
          />
                     
        {date && (
            <Text style={styles.date}>
            {date} 
            </Text>
            
          )
          }
        

     

          {true&&(
            <Text style={[styles.subTitle]} numberOfLines={2}>
              مناطق التوزيع:
            </Text>
          )}
     

           {notes && (
            <Text style={styles.notes} numberOfLines={8}>
             {notes}.
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

    fontSize:15,
    fontFamily:'Cairo_600SemiBold',
    color: colors.secondary,
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

export default CardWater;
