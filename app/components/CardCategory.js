import {useRef, useState,React }from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";
import Info from "../components/Info";
import Message from "../components/Message";

import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import routes from "../navigation/routes";
import { AppModalize } from "../components/Modalize";
import { AppModal } from "../components/Modal";
import ActivityIndicator from "../components/ActivityIndicator";

import AppWebView from "../components/WebView";
import constants from "../config/constants";

import Text from "./Text";
import colors from "../config/colors";
import { Dimensions } from "react-native";
import AppText from "./Text";

const { width, height } = Dimensions.get("window");

function CardCategory({
  title,
  subTitle,
  imageUrl,
  unitOwner,
  unitUse,
  unitNo,
  unitId,
  unit,
  msg,
  navigation,
  imageHeight = 300,
  onPress,
  thumbnailUrl,
}) {
  const [navItem, setNavItem] = useState(false);
  const [taxVisible, settaxVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // imageUrl=imageUrl.
  const webmodalizeRef = useRef(null);
  const modalizeRef = useRef(null);
  const appmodalRef=useRef(null);
  const [viewerHeight, setViewerHeight] = useState(height);
  var x='../assets/icons/passive/'+{imageUrl}+'.png';
  const wkt="POLYGON ((159920.9557 103851.8817, 159924.1642 103858.298800001, 159923.73 103857.77, 159914.12 103862.109999999, 159914.96 103863.09, 159910.2 103864.67, 159907.95 103858.310000001, 159920.9557 103851.8817))";
  return (
    <>   
    <TouchableWithoutFeedback  onPress={onPress} >
    <View style={{ flex: 1, flexDirection: 'column', margin: 5,marginRight:5, backgroundColor: 'white',padding:5,marginBottom:7}}>
      <Text style={[styles.title]}>{title}</Text>
            <Image style={styles.imageThumbnail} 
            source={
              imageUrl=="electricityIcon"?             
              require('../assets/icons/passive/electricityIcon.png'):

              imageUrl=="waterIcon"?             
              require('../assets/icons/passive/waterIcon.png'):

              imageUrl=="sewageIcon"?            
              require('../assets/icons/passive/sewageIcon.png'):

              imageUrl=="taxIcon"?             
              require('../assets/icons/passive/taxIcon.png'):

              imageUrl=="industryIcon"?             
              require('../assets/icons/passive/industryIcon.png'):

              imageUrl=="streetsIcon"?             
              require('../assets/icons/passive/streetsIcon.png'):

              imageUrl=="buildingsIcon"?              
              require('../assets/icons/passive/buildingsIcon.png'): 

              imageUrl=="bannersIcon"?              
              require('../assets/icons/passive/bannersIcon.png'):

              imageUrl=="certificateIcon"?              
              require('../assets/icons/passive/certificateIcon.png'):""
            
            
            
            } />

          </View>
 
    </TouchableWithoutFeedback>

   
  </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    overflow: "hidden",
    width:"100%",
    flexDirection:"row",
    marginLeft:15,
    marginTop:10,
  },
  imageThumbnail: {
  // / justifyContent: 'center',
   //alignItems: 'center',
   width: '100%',
   resizeMode: "contain",
  },
  title:
  {
    textAlign:"center",
    fontFamily:"Cairo_600SemiBold",
    fontSize:14,
    marginTop:1
  },

  detailsContainer: {
    flex:2,
    alignItems:"flex-start"
  },
  card: {
    flex:1,
    borderRadius: 8,
    margin:5,
   // backgroundColor: colors.danger,
   // overflow: "hidden",
  },
 
  buttonTxt:
  {
    fontSize:12,
    padding:0,
    margin:0,
    color:colors.white
  },
  newUserButton: {
    // /backgroundColor:colors.transparent,
    width:"30%",
    height:40,
    marginHorizontal:5,
    marginVertical:4,
    paddingVertical:4

  },

  buttonsContainer: {
    padding: 4,
    flexDirection:"row"
  },
  absoluteFill: {
    backgroundColor: colors.white,
    opacity: 0.8,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
   // flex: 1,
   borderRadius: 10,

    width: '100%',
    height: "100%",
    resizeMode:"stretch",
  //  / transform: [{ rotate: '90deg' }]
    
  },
  subTitle: {
    color: colors.secondary,
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: colors.white,
  },
  
});

export default CardCategory;
