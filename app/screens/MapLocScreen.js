import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import colors from "../config/colors";
import constants from "../config/constants";

function MapLocScreen() {
  return (
    <Screen style={styles.screen}>
      <AppWebView source={{ uri: constants.MAPLOCATIONURL }} />
    </Screen>
  );
}
export default MapLocScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.dark,
  },
});
