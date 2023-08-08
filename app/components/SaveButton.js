import React from "react";
import { StyleSheet } from "react-native";
import colors from "../config/colors";
import { generatePdf } from "../utility/saveAs";
import Icon from "./Icon";
import { ListItem } from "./lists";

function SaveButton({ file, name }) {
  return (
    <ListItem
      listStyle={styles.buttonStyle}
      textStyle={styles.buttonTextStyle}
      title={"مشاركة"}
      IconComponent={
        <Icon name="content-save" backgroundColor={colors.secondary} />
      }
      onPress={async () => {
        await generatePdf(file, name,false);
      }}
      renderChevron
    />
  );
}
export default SaveButton;

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: "flex-end",
    // marginHorizontal: 5,
    backgroundColor: colors.white,
  },
  buttonTextStyle: {
    color: colors.primary,
  },
});
