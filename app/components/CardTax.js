import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Pressable } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

function CardTax({
  TAX_NAME,
  TAX_DATE,
  AMOUNT,
  CURN,
  DISCOUNT,
  LOCAL_AMOUNT,
  LOCAL_AMOUNT_AFTER_DISCOUNT,
  ID,
  onPress,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>

        <View style={styles.detailsContainer}>
          {TAX_NAME && (
            <Text style={styles.taxName} numberOfLines={2}>
              {TAX_NAME}
            </Text>
          )}
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          {TAX_DATE && (
            <Text style={styles.taxDate} numberOfLines={1}>
              {TAX_DATE}
            </Text>
          )}
          {AMOUNT && false && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {AMOUNT}{CURN}
            </Text>
          )}
          {LOCAL_AMOUNT && false && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {LOCAL_AMOUNT}
            </Text>
          )}
          {DISCOUNT && false && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {DISCOUNT}
            </Text>
          )}
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />

          {LOCAL_AMOUNT_AFTER_DISCOUNT && (
            <Text style={styles.taxFinalAmount} >
              {LOCAL_AMOUNT_AFTER_DISCOUNT}
            </Text>
          )}

          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <Icon name={"page-next"} iconColor={colors.darkNew} size={50} />

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 1,
    backgroundColor: colors.white,
    marginBottom: 1,
    overflow: "hidden",
    marginHorizontal: 1,
  },
  detailsContainer: {
    padding: 2,
    flexDirection: "row"
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    width: 1,
    height: "100%",
  },
  image: {
    width: "100%",
  },
  subTitle: {
    color: colors.secondary,
    // fontWeight: "bold",
  },
  statusTxt: {
    color: colors.danger,
    // fontWeight: "bold",
  },
  unitOwner: {
    color: colors.secondary,
    //  fontWeight: "bold",
  },
  unitUse: {
    color: colors.secondary,
    //fontWeight: "bold",
  },
  title: {
    textAlignVertical: "center",
    fontFamily: "Cairo_700Bold",
    fontSize: 12,
    marginBottom: 7,
  },
  taxName: {
    textAlignVertical: "center",
    color: colors.facebook,
    fontFamily: "Cairo_700Bold",
    width: "30%",
    textAlign: "center",
    paddingTop: 5,
    marginRight: 5,
    fontSize: 12,
  },
  taxDate: {
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,
    width: "30%",

  },
  taxFinalAmount: {
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,
    width: "26%",

  },
  txtPaid:
    { color: colors.twitter },

  txtUnPaid:
    { color: colors.youtube },

});

export default CardTax;
