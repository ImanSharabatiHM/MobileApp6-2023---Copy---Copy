import React from "react";
import { Modal, SafeAreaView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./Text";
import { StatusBar } from "react-native";

function AppModal({ children, onPress, isVisible, title, subTitle }) {
  return (
    <>
      <Modal visible={isVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer} >
          <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onPress}>
              <MaterialCommunityIcons
                name="close"
                color={colors.dark}
                size={35}
              />
            </TouchableOpacity>
            <AppText style={styles.headerTitle} numberOfLines={3}>
              {title}
            </AppText>

          </View>
          {subTitle && (
            <AppText style={styles.headerSubTitle} numberOfLines={1}>
              {subTitle}
            </AppText>
          )}
          <View style={styles.contentContainer}>{children}</View>
        </SafeAreaView>
      </Modal>
      <StatusBar style="light" />
    </>
  );
}
export default AppModal;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    //fontWeight: "700",
    fontSize: 25,
    color: colors.dark,
    marginRight: 20,
    flex: 1,
  },
  headerSubTitle: {
    fontSize: 15,
    color: colors.primary,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  contentContainer: {
    // paddingHorizontal: 10,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
  },
});
