import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function CardInfoPerson({
  title,
  subTitle,
  imageUrl,
  imageHeight = 200,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback >
      <View style={styles.card}>
        {imageUrl && (
          <Image
            style={[styles.image, { height:imageHeight }]}
            
            preview={{ uri: thumbnailUrl }}
            source={
              imageUrl==1?
              require('../assets/1.jpg'):
              imageUrl==2?
              require('../assets/2.jpg'):
              imageUrl==3?
              require('../assets/3.jpg'):
              imageUrl==4?
              require('../assets/4.jpg'):
              imageUrl==5?
              require('../assets/5.jpg'):
              imageUrl==6?
              require('../assets/6.jpg'):
              imageUrl==7?
              require('../assets/7.jpg'):
              imageUrl==8?
              require('../assets/8.jpg'):
              imageUrl==9?
              require('../assets/9.jpg'):
              imageUrl==10?
              require('../assets/10.jpg'):
              imageUrl==11?
              require('../assets/11.jpg'):
              imageUrl==12?
              require('../assets/12.jpg'):
              imageUrl==13?
              require('../assets/13.jpg'):
              imageUrl==14?
              require('../assets/14.jpg'):
              imageUrl==15?
              require('../assets/15.jpg'):
              imageUrl           
            }

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

export default CardInfoPerson;
