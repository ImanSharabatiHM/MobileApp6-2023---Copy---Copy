import {React,useState} from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Pressable } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { ListItem, ListItemSeparator } from "./lists";
import Icon from "./Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

function CardEmployeePermission({
  PERMISSION,
  PERMISSION_AR,
  PERMISSION_ID,
  CHECKED,
  VIEWCHECK=true,
  onPress,
  handleChange,
}) {
  const [checked, setChecked] = useState(CHECKED);
// console.log("PAYCHECKED: "+PAYChecked);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>

        <View style={styles.detailsContainer}>
         { VIEWCHECK&&<Pressable onPress={() => {handleChange(PERMISSION,checked==1?0:1);setChecked(checked==1?0:1);}} >
            <MaterialCommunityIcons
              name={checked==1 ? 'checkbox-marked' : 'checkbox-blank-outline'} size={40} color="#000" />
          </Pressable>
         }
          { !VIEWCHECK&&<Pressable >
            <MaterialCommunityIcons
              name={'flag-checkered'} size={40} color="#ccc" />
          </Pressable>
         }
          {PERMISSION_ID && true && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {PERMISSION_ID}{checked}
            </Text>
          )}
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          {PERMISSION_AR && (
            <Text style={styles.taxName} numberOfLines={2}>
              {PERMISSION_AR}
            </Text>
          )}
          <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          {PERMISSION && (
            <Text style={styles.taxDate} numberOfLines={1}>
              {PERMISSION}
            </Text>
          )}
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
    width: "25%",
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
    width: "25%",

  },
  taxFinalAmount: {
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "Cairo_600SemiBold",
    fontSize: 14,
    width: "23%",

  },
  txtPaid:
    { color: colors.twitter },

  txtUnPaid:
    { color: colors.youtube },

});

export default CardEmployeePermission;
