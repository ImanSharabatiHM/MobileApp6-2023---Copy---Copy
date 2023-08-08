import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";

import Text from "./Text";
import colors from "../config/colors";

function OfflineNotice(props) {
  const netInfo = useNetInfo();
  //console.log("OKKKKDDJJDDJJFJJFJF",netInfo);
    if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>لا يوجد اتصال بالانترنت</Text>
      </View>
    );

   return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.danger,
    height: Constants.statusBarHeight + 20,
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%",
    top:10,
    zIndex: 1,
  },
  text: {
    color: colors.white,
    //fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 6,
  },
});

export default OfflineNotice;
