import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { ListItem, ListItemSeparator } from "./lists";
import Icon from "./Icon";

import Text from "./Text";
import colors from "../config/colors";

function CardTaxTotal({
  MUJAMAD_SUM_LOCAL = 0,
  MUJAMAD_SUM_LOCAL_DISCOUNT = 0,
  MUJDWAL_SUM_LOCAL = 0,
  MUJDWAL_SUM_LOCAL_DISCOUNT = 0,
  PAID_SUM_LOCAL,
  PAID_SUM_LOCAL_DISCOUNT,
  UNPAID_SUM_LOCAL,
  UNPAID_SUM_LOCAL_DISCOUNT,
  onPress,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {<View style={styles.detailsContainer}>
          {<Text style={styles.taxFinalAmount} numberOfLines={1}>مجموع المجمّد: {MUJAMAD_SUM_LOCAL}</Text>}
          {<Text style={styles.taxFinalAmount} numberOfLines={1}>مجموع المجمّد بعد الخصم  : {MUJAMAD_SUM_LOCAL_DISCOUNT}</Text>}
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />

          {<Text style={styles.taxFinalAmount} numberOfLines={1}>مجموع المجدول: {MUJDWAL_SUM_LOCAL}</Text>}
          {<Text style={styles.taxFinalAmount} numberOfLines={2}>مجموع المجدول بعد الخصم :  {MUJDWAL_SUM_LOCAL_DISCOUNT}</Text>}
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} /> 
          {<Text style={styles.taxFinalAmount} >مجموع الغير مدفوع : {UNPAID_SUM_LOCAL}</Text>}
          {<Text style={styles.taxFinalAmount} >مجموع الغير مدفوع بعد الخصم:  {UNPAID_SUM_LOCAL_DISCOUNT}</Text>}
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          {<Text style={styles.taxFinalAmount}> مجموع المدفوع:  {PAID_SUM_LOCAL}</Text>}
          {<Text style={styles.taxFinalAmount} >مجموع المدفوع بعد الخصم:  {PAID_SUM_LOCAL_DISCOUNT}</Text>}
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />

        </View>}
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
    flexDirection: "column"
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    height: 1,
    width: "100%",
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
    color: colors.facebook,
    fontFamily: "Cairo_700Bold",
    textAlign: "auto",
    paddingTop: 5,
    marginRight: 5,
    fontSize: 14,
  },
  taxNameL: {
    color: colors.facebook,
    fontFamily: "Cairo_700Bold",
    textAlign: "auto",
    paddingTop: 5,
    marginRight: 5,
    fontSize: 16,
  },
  taxDate: {
    textAlign: "center",
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,

  },
  taxFinalAmount: {
    textAlignVertical: "center",
    textAlign: "auto",
    fontFamily: "Cairo_700Bold",
    fontSize: 16,
    color:colors.facebook,
    marginTop: 5,
    marginBottom: 10,




  },
  txtPaid:
    { color: colors.twitter },

  txtUnPaid:
    { color: colors.youtube },

});

export default CardTaxTotal;
