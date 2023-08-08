import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "../../config/colors";
import { Feather } from "@expo/vector-icons";
import AppText from "../Text";

export const BUTTON_HEIGHT = 64;
export const BUTTON_WIDTH = "100%";

function SearchButton({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.button}>
        <Feather name="search" size={24} color={colors.secondaryLight} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppText style={styles.label} numberOfLines={1}>
          كيف يمكنني مساعدتك؟
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default SearchButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: colors.white,
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderRadius: 8,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    color: colors.secondary,
    fontSize: 18,
    textAlign: "center",
    //fontWeight: "500",
  },
});
