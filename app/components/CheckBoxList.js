import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import CheckBox from "../components/CheckBox";
import constants from "../config/constants";
import { ListItemSeparator } from "./lists";

function CheckBoxList({ values, onChange }) {
  const [checkBoxes, setCheckBoxes] = useState([]);

  const toggleCheckBox = (id) => {
    let checks = checkBoxes;
    if (checks && checks.includes(id)) {
      checks = checks.filter((check) => check !== id);
    } else {
      checks = checks.concat(id);
    }
    setCheckBoxes(checks);
    onChange(checks);
  };

  return (
    <View>
      {values?.map((value) => (
        <>
          <CheckBox
           // key={constants.UUIDV4}
           key={value.id} 
           checked={checkBoxes.includes(value.id)}
            onPress={() => toggleCheckBox(value.id)}
            preTitle={value.preTitle}
            preSubTitle={value.subTitle}
            title={value.title}
            rightInfo={value.preSubTitle}
          />
          <ListItemSeparator />
        </>
      ))}
    </View>
  );
}
export default CheckBoxList;

const styles = StyleSheet.create({});
