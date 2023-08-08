import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import Hamburger from "../../navigation/header/Hamburger";
import LogoTitle from "../../navigation/header/LogoTitle";
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

function Header({ navigation, y, sticky }) {
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
  //console.log("Headr.js",notificationCount);
  return (
    <>
      {sticky && (
        <Animated.View
          style={[styles.stickyContainer, { opacity: stickyOpacity }]}
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
          <Hamburger
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          <LogoTitle logoStyle={{ width: 64, height: 64 }} />
          {<HeaderButton
            icon="bell"
            size={30}
            onPress={() => navigation.navigate(routes.NOTIFICATIONS)}
            badgeCount={notificationCount+"."}
          />}
            {false&&<HeaderButton
            icon="login"
            size={30}
            onPress={() => navigation.navigate(routes.LOGINHM)}
            badgeCount={notificationCount+"."}
          />}
        </Animated.View>
      )}
      {!sticky && (
        <Animated.View style={[styles.container, { opacity }]}>
          <Hamburger
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
          <LogoTitle logoStyle={{ width: 90, height: 90 }} />
          { <HeaderButton
            icon="bell"
            size={30}
            onPress={() => navigation.navigate(routes.NOTIFICATIONS)}
            badgeCount={notificationCount+"."}
          />}
          {false&& <HeaderButton
            icon="login"
            size={30}
            onPress={() => navigation.navigate(routes.LOGINHM)}
            badgeCount={notificationCount+"."}
          />}
        </Animated.View>
      )}
    </>
  );
}
export default Header;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
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
    top: BUTTON_HEIGHT / 2 - MIN_HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    // backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    //fontWeight: "400",
  },
});
