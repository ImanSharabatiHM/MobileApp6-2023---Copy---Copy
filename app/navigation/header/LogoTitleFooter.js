import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../../config/colors";
import AppText from "./../../components/Text";

function LogoTitleFooter({ logoStyle }) {
  return (
    <View style={styles.container}>
        {true&&<AppText
          style={[{ color:colors.white}, styles.title]}
          numberOfLines={1}>
        برمجة وتصميم دائرة تكنولوجيا المعلومات - بلدية الخليل-2024      
        </AppText>}
    </View>
  );
}
export default LogoTitleFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    //color: "red",
    padding:0,
    fontSize: 10,
    textAlign: "center",
    //fontWeight: "400",
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
});
