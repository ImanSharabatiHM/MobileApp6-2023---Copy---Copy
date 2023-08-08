import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import AppText from "./Text";
import colors from "../config/colors";
import { Button,Pressable  } from "react-native";

function Info({
  color=colors.danger,
  message,
  buttonText = "Tekrar Deneyin",
  buttonVisible,
  secondbuttonText = "Tekrar Deneyin",
  secondbuttonVisible=false,
  onPress,
  secondonPress,
  containerStyle,
  notFound=true,
  ...otherProps
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.messageContainer}>
        <AppText
          style={[styles.text,{ color } ]}
          numberOfLines={5}
          {...otherProps}
        >
          {message}
        </AppText>
        <View style={{flexDirection:"row",alignContent:"center",marginTop:15}}>
        <Pressable    style={[styles.button,{height:!buttonVisible?0:45}]}   onPress={onPress}  >
        <Text visible={buttonVisible} style={styles.btnText}>{buttonText}</Text>
        </Pressable>
        <Pressable    style={[styles.button,{height:!secondbuttonVisible?0:45,width:!secondbuttonVisible?0:190,}]}   onPress={secondonPress}  >
        <Text visible={secondbuttonVisible} style={styles.btnText}>{secondbuttonText}</Text>
        </Pressable></View>
        {notFound &&
        <LottieView
          style={{ width: 200 }}
          autoPlay
          loop={false}
          source={require("../assets/animations/notfound.json")}
        />}
      </View>
    </View>
  );
}
export default Info;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 190,
    backgroundColor: colors.primaryNew,
    marginRight:6,
  },
  messageContainer: {
    flex: 1,
    marginHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.danger,
    textAlign:"center",
    fontSize: 18,
    marginBottom: 10,
    fontFamily:'Cairo_400Regular'
  },
  btnText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
    fontFamily:'Cairo_400Regular'
  },
});
