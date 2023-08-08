import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import AppText from "../../components/Text";

function HeaderButton({ badgeCount, icon, onPress, size = 30 }) {
  console.log("Headerbton",badgeCount);
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingVertical: 10 }}>
      <MaterialCommunityIcons name={icon} size={size} style={styles.icon} />
      {badgeCount > 0 && (
        <View
          style={{
            backgroundColor: colors.danger,
            borderRadius: 50,
            width: 18,
            height: 18,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            right: size / 1.3,
            top: size / 4,
            padding: 0,
          }}
        >
          <AppText
            numberOfLines={1}
            style={{ color: colors.white, fontSize: 10 }}
          >{badgeCount}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
}
export default HeaderButton;

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
    paddingLeft: 15,
    // marginBottom: 0,
    // marginTop: 7,
    color: colors.white,
  },
});
