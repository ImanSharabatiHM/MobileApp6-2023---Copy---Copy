import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import Hamburger from "../../navigation/header/Hamburger";
import LogoTitleFooter from "../../navigation/header/LogoTitleFooter";

import HeaderButton from "../../navigation/header/Button";
import colors from "../../config/colors";
import useAuth from "../../auth/useAuth";
import { BUTTON_HEIGHT } from "./SearchButton";
import Animated from "react-native-reanimated";
import routes from "../../navigation/routes";
import useNotificationsCount from "../../notification/useNotificationsCount";

const { height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;

export const MIN_HEADER_HEIGHT = 70 + Constants.statusBarHeight;
// export const MAX_HEADER_HEIGHT = height * (1 - 1 / φ);
export const MAX_HEADER_HEIGHT = MIN_HEADER_HEIGHT + BUTTON_HEIGHT + 230;
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;

const { interpolateNode, Extrapolate } = Animated;

function Footer({ navigation, y, sticky }) {
  const { notificationCount } = useNotificationsCount();
  const { user, logInWithUser } = useAuth();

  const stickyOpacity = interpolateNode(y, {
    inputRange: [HEADER_DELTA - 5, HEADER_DELTA - 2],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const textOpacity = interpolateNode(y, {
    inputRange: [HEADER_DELTA - 8, HEADER_DELTA - 4],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolateNode(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, HEADER_DELTA - 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
   
  });
  return (
    <>
      { (
        <Animated.View
          style={[styles.stickyContainer,{ opacity: stickyOpacity }]} 
        >
          <Image
            style={{
              ...StyleSheet.absoluteFillObject,
              width: "100%",
              height: MIN_HEADER_HEIGHT,
              resizeMode: "cover",
            }}
            source={require("../../assets/background.jpg")}
          />
          <LogoTitleFooter logoStyle={{ width: 64, height: 64 }}/>
        </Animated.View>
      )}
 
    </>
  );
}
export default Footer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 9,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    zIndex: 1,
  },
  stickyContainer: {
    position: "absolute",
    bottom: 0,//BUTTON_HEIGHT / 2 - MIN_HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: 20,//MIN_HEADER_HEIGHT,
    // backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  //  / paddingBottom: Constants.statusBarHeight,
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    //fontWeight: "400",
  },
});
