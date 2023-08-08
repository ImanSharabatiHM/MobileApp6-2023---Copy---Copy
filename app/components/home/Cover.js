import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Animated from "react-native-reanimated";
import colors from "../../config/colors";
import { HEADER_DELTA, MAX_HEADER_HEIGHT } from "./Header";
import { BUTTON_HEIGHT } from "./SearchButton";
import contentApi from "../../api/content";

const { interpolateNode, Extrapolate } = Animated;

function Cover({ y }) {
  const [settings, setSettings] = useState(null);

  const scale = interpolateNode(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [4, 1],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = interpolateNode(y, {
    inputRange: [-64, 0, HEADER_DELTA],
    outputRange: [0, 0.2, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const getSettings = async () => {
    const result = await contentApi.GetContactInformation();
    if (!result.ok) {
      return;
    }
    setSettings(result.data);
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Image
        style={styles.image}
        source={
          settings && settings.cover
            ? { uri: settings.cover }
            : require("../../assets/background.jpg")
        }
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: colors.primary,
          opacity,
        }}
      />
    </Animated.View>
  );
}
export default Cover;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
    resizeMode: "cover",
  },
});
