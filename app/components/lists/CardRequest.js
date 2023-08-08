import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";

function CardRequest({
  title,
  subTitle,
  imageUrl,
  base64,
  date,
  status,
  notes,
  unitno,
  imageHeight = 300,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {(imageUrl||base64) && (
          <Image
            style={[styles.image, { height: imageHeight }]}
            tint="light"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
            source={{uri:base64}}
          />
        )}

        <View style={styles.detailsContainer}>
          {title && (
            <Text style={styles.title} numberOfLines={2}>
              نوع الطلب: {title}
            </Text>
          )}

          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </Text>
          )}
          {unitno && (
            <Text style={styles.subTitle} numberOfLines={2}>
              رقم الطلب: {unitno}
            </Text>
          )}
           {date && (
            <Text style={styles.subTitle} numberOfLines={2}>
             تاريخ الطلب: {date}
            </Text>
          )}
           {status && (
            <Text style={styles.statusTxt} numberOfLines={2}>
             حالة الطلب: {status}
            </Text>
          )}
           {notes!=="-" && (
            <Text style={styles.subTitle} numberOfLines={2}>
             ملاحظات: {notes}
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
    fontFamily:"Cairo_700Bold",
    marginBottom: 7,
  },
});

export default CardRequest;
