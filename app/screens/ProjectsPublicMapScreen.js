import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import colors from "../config/colors";
import constants from "../config/constants";

function ProjectsPublicMapScreen() {
  return (
    <Screen style={styles.screen}>
      <AppWebView source={{ uri: constants.PROJECTPUBLICMAP }} />
    </Screen>
  );
}
export default ProjectsPublicMapScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.dark,
  },
});
