import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function Card({
  title,
  subTitle,
  imageUrl,
  imageHeight = 200,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {imageUrl && (
          <Image
            style={[styles.image, { height:imageHeight }]}
            
            preview={{ uri: thumbnailUrl }}
            source={{uri:imageUrl}}
          />
        )}

        <View style={styles.detailsContainer}>
          {title && (
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          )}

          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
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
    //fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
    //fontWeight: "700",
  },
});

export default Card;
