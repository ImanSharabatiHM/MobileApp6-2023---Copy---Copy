import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Platform,
} from "react-native";

import colors from "../config/colors";
import AppText from "./Text";

function CardInfo({
  title,
  subTitle,
  date,
  lines=1,
  imageUrl,
  imageHeight = 50,
  imageWidth = 60,
  onPress,
  cardStyle,
  detailStyle,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, cardStyle]}>
        {imageUrl && (
          <Image
            style={[styles.image, { height: imageHeight, width: imageWidth }]}
            source={imageUrl=="1"? require('../assets/1.jpg'):imageUrl}
          />
        )}

        <View style={[styles.detailsContainer, detailStyle]}>
          {title && (
            <AppText style={styles.title} numberOfLines={3}>
              {title}
            </AppText>
          )}

          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={lines}>
              {subTitle}
            </AppText>
          )}
          
           {date && (
            <AppText style={styles.date} numberOfLines={1}>
              {date}
            </AppText>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: colors.white,
    overflow: "hidden",
    padding: 15,
  },
  image:
  {
    resizeMode:'cover'

  },
  detailsContainer: {
    paddingLeft: 15,
    flex: 1,
  },
  subTitle: {
    color: colors.white,
    // fontSize: Platform.OS === "android" ? 18 : 18,
    fontSize: 15,
    //fontWeight: "600",
  },
  date: {
    color: colors.darkNew,
    // fontSize: Platform.OS === "android" ? 18 : 18,
    fontSize: 12,
    //fontWeight: "600",
  },
  title: {
    fontSize: Platform.OS === "android" ? 15 : 15,
    //fontWeight: "700",
    fontFamily:'Cairo_600SemiBold',
    color: colors.white,
  },
});

export default CardInfo;
