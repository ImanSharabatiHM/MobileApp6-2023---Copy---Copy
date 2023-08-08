import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { View } from "react-native";
import Text from "./Text";

function CheckBox({
  checked,
  color = colors.primary,
  image,
  listStyle,
  onPress,
  preSubTitle,
  preTitle,
  size = 30,
  style,
  textStyle,
  title,
  rightInfo,
  ...props
}) {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <View style={[styles.container, listStyle]}>
        <MaterialCommunityIcons
          size={size}
          color={color}
          name={checked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
        />
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          {preTitle && (
            <Text style={[styles.title, textStyle]} numberOfLines={1}>
              {preTitle}
            </Text>
          )}
          {preSubTitle && (
            <Text style={[styles.title, textStyle]} numberOfLines={2}>
              {preSubTitle}
            </Text>
          )}
          <Text style={[styles.title, textStyle]} numberOfLines={1}>
            {title}
          </Text>
          {rightInfo && (
          <Text style={[styles.rightInfo, textStyle]} numberOfLines={2}>
            {rightInfo}
          </Text>
        )}
          
        </View>
        {false&&rightInfo && (
          <Text style={[styles.rightInfo, textStyle]} numberOfLines={4}>
            {rightInfo}
          </Text>
        )}
      
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  rightInfo: {
    color: colors.primary,
    fontSize: 16,
    marginLeft:1,
    textAlignVertical:"top",
    marginTop:-18
    //fontWeight: "bold",
  },
  title: {
    //fontWeight: "bold",
    color: colors.darkNew,
  },
});

export default CheckBox;
