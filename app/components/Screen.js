import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Platform } from "react-native";
import { StyleSheet, SafeAreaView, View } from "react-native";
// import colors from "../config/colors";
// const { width, height } = Dimensions.get("window");
// const { width: swidth, height: sheight } = Dimensions.get("screen");

function Screen({ children, style }) {
  // console.log("window width", width, "height", height);
  // console.log("screen width", swidth, "height", sheight);
  return (
    <SafeAreaView style={[styles.screen]}>
      <View style={[styles.view, style]}>{children}</View>
      {/* <LinearGradient
        colors={[colors.transparent, colors.white]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.linearGradient}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    height: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    // ...StyleSheet.absoluteFillObject,
  },
  screen: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
