import React,{ useState,useRef } from "react";
import {  SafeAreaView } from "react-native";
import { Alert, Modal, Pressable, View, Text, StyleSheet, Linking} from "react-native";
import { Image } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./Text";
import { StatusBar } from "react-native";

function Alertmsg({ children, onPress, onPress2, isVisible, title, buttonTitle,buttonTitle2,imageUrl,imageHeight=300 ,ref,has2Btn=false,icon=null}) {
  const [modalVisible, setModalVisible] = useState(isVisible);
  return (  
      <Modal
        animationType="slide"
        transparent={imageUrl?false:true}
        visible={modalVisible}
         onRequestClose={ 
          //Alert.alert("Modal has been closed.");
onPress }
      >
     {imageUrl && (
      <View style={[styles.modalView]}>
          <Image
          source={{uri: imageUrl}}
          style={[ styles.image]} />
           <Pressable
              style={[styles.button, styles.buttonClose,{margin:20}]}
              onPress={onPress}
            >
              <Text style={styles.textStyle}>{buttonTitle}</Text>
            </Pressable>
          </View>
        )}
       { !imageUrl && <View style={[styles.modalView]}>     
             <Text style={styles.modalText}>{title}</Text>
             <View style={[{flexDirection:"row"}]}> 
             { has2Btn&&<Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress2}
            >
              <Text style={styles.textStyle}>{buttonTitle2}
              {icon&&<MaterialCommunityIcons
            style={styles.actionButtonIcon}
            name={icon}
            size={20}
           
            // onPress={() =>   {  Linking.openURL("tel://" + Mobile); }}
           />}
              
              </Text>
            </Pressable>}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPress}
            >
              <Text style={styles.textStyle}>{buttonTitle}</Text>
            </Pressable>
           
            </View>
          </View>}
      
      </Modal>
     
   );
}
export default Alertmsg;


const styles = StyleSheet.create({
  centeredView: {
    marginTop:"20%",
    backgroundColor:"yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    top:0,
    marginTop:"30%",
    height:"50%",
    resizeMode:"contain",
  },
  modalView: {
    
    margin: 20,
    marginTop:"50%",
    backgroundColor: "#dee1e3",
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
    elevation: 2,
    marginEnd:30
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
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

