import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../../config/colors";

function ListItemSeparator({ seperatorStyle }) {
  return <View style={[styles.separator, seperatorStyle]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.backgroundColor,
  },
});

export default ListItemSeparator;
