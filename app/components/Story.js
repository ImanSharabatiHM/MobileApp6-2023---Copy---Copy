import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../config/colors";
import AppText from "./Text";

const { width } = Dimensions.get("window");
const storyWidth = (width - 40) / 3;

function Story({ avatar, deviceType, onPress, title }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          { width: deviceType === 1 ? storyWidth : 100 },
        ]}
      >
        <View style={styles.avatar}>
          <Image
            source={{ uri: avatar }}
            style={[
              styles.image,
              {
                width: deviceType === 1 ? storyWidth - 20 : 60,
                height: deviceType === 1 ? storyWidth - 50 : 60,
                backgroundColor: colors.white,
              },
            ]}
          />
        </View>
        <AppText
          style={[styles.text, { width: deviceType === 1 ? storyWidth-4 : 100 }]}
          numberOfLines={2}
        >
          {title}
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,

    overflow: "hidden",
    padding: 3,
  },
  container: {
    paddingVertical: 5,
    // marginRight: 20,
    // backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: Platform.OS === "android" ? 14 : 15,
    // /fontWeight: "500",
    color: colors.white,
    marginTop: 2,
    paddingHorizontal: 2,
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 0.2,
    // textShadowColor: colors.darkNew,
  },
});

export default Story;
