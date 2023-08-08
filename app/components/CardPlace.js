import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function CardPlace({
  title,
  subTitle,
  imageUrl,
  base64,
  date,
  status,
  notes,
  imageHeight = 300,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {(imageUrl) && (
          <Image
            style={[styles.image, { height: imageHeight }]}
           // tint="light"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
             source={{uri:imageUrl}}
          />
        )}

        <View style={styles.detailsContainer}>
          {title && (
            <Text style={styles.title} numberOfLines={3}>
             {title}
            </Text>
          )}

          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </Text>
          )}
           {date && (
            <Text style={styles.subTitle} numberOfLines={2}>
             تاريخ الشكوى  : {date}
            </Text>
          )}
           {status && (
            <Text style={styles.statusTxt} numberOfLines={2}>
             الموقع : {status}
            </Text>
          )}
           {notes && (
            <Text style={styles.subTitle} numberOfLines={2}>
             نص الشكوى: {notes}
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
    color:colors.danger,
    fontFamily:"Cairo_700Bold",
    fontSize:19,
    marginBottom: 7,
  },
});

export default CardPlace;
