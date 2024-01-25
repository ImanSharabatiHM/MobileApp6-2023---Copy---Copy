import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import AppText from "./Text";

function AppTextInput({
  IconComponent,
  icon,
  editable=true,
  paddingVertical = 15,
  containerStyle,
  textStyle,
  width = "100%",
  showPlaceholder = true,
  visible,
  ...otherProps
}) {
  return (
    <View    style={showPlaceholder ? { marginTop: 10,marginStart:10} : {marginStart:10}}>
      {showPlaceholder && (
        <AppText style={[styles.placeholder]}>{otherProps.placeholder}</AppText>
      )}
      <View
        style={[{ paddingVertical, width }, styles.container, containerStyle]}
    
      >
        {IconComponent}
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={defaultStyles.colors.medium}
            style={styles.icon}
          />
        )}
        <TextInput
        visible={visible}
          placeholderTextColor={
            !showPlaceholder ? defaultStyles.colors.secondary : "transparent"
          }
          editable={editable}
          placeholder={otherProps.placeholder}
          style={[styles.textInput,{fontSize:14}]}
          {...otherProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    // borderRadius: 25,
    borderBottomWidth: 1,
    fontFamily:"Cairo_400Regular",
    borderBottomColor: defaultStyles.colors.backgroundColor,
    flexDirection: "row",
    width: "100%",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    color: colors.black,
    fontSize: 12,
    fontFamily:"Cairo_400Regular",
    width: "100%",
  },
  placeholder: {
    color: defaultStyles.colors.secondaryLight,
    fontSize: 12,
    fontFamily:"Cairo_400Regular",
    textTransform: "uppercase",
  },
});

export default AppTextInput;
