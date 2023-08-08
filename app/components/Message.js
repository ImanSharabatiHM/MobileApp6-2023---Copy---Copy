import React,{ useState,useRef } from "react";
import {  SafeAreaView } from "react-native";
import { Alert, Modal, Pressable, View, Text, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./Text";
import { StatusBar } from "react-native";

function Message({ children, onPress, isVisible, title, buttonTitle ,ref}) {
  const [modalVisible, setModalVisible] = useState(isVisible);
  return (  
     <View style={styles.centeredView}>
      <Modal
         animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          //setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress }
            >
              <Text style={styles.textStyle}>{buttonTitle}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
     
    </View>  
   );
}
export default Message;


const styles = StyleSheet.create({
  centeredView: {
    marginTop:"80%",
    backgroundColor:"transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontFamily:"Cairo_700Bold",
  //  / fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontFamily:"Cairo_700Bold",

    marginBottom: 15,
    textAlign: "center"
  }
});

