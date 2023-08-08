import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native";
import AppText from "../../Text";

export const Slide = (props) => {
  const {
    details,
    title,
    subTitle,
    item,
    date,
    deviceType,
    imageUrl,
    onPress,
    height,
    titleStyle,
  } = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress({ title, subTitle, imageUrl, details })}
    >
      <View style={styles.slide} height={title?height*1.45:height}>
        <Image
          style={[styles.image, { height: deviceType === 1 ? 350 : 400 }]}
          source={{ uri: imageUrl }}
        />

        <View style={styles.detailsContainer}>
          {title&&<AppText style={[styles.title, titleStyle]} numberOfLines={3}>
            {title}
          </AppText>}
          {subTitle&&<AppText style={styles.subTitle} numberOfLines={1}>
            {subTitle}
          </AppText>}
          {date&&<AppText style={styles.date} numberOfLines={1}>
            {date}
          </AppText>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
