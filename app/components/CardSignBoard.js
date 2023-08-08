import {useRef, useState,React }from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";
import Info from "./Info";
import Message from "./Message";

import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import routes from "../navigation/routes";
import { AppModalize } from "./Modalize";
import { AppModal } from "./Modal";
import ActivityIndicator from "./ActivityIndicator";

import AppWebView from "./WebView";
import constants from "../config/constants";

import Text from "./Text";
import colors from "../config/colors";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

function CardSignBoard({
  CommercialName,
  imageUrl,
  Height,
  Width, 
  Notes,
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
  const wkt="POLYGON ((159920.9557 103851.8817, 159924.1642 103858.298800001, 159923.73 103857.77, 159914.12 103862.109999999, 159914.96 103863.09, 159910.2 103864.67, 159907.95 103858.310000001, 159920.9557 103851.8817))";
  return (
    <>
    < View style={styles.firstContainer}>
           {true&&<View style={styles.card}>
           {(<Image
            style={[styles.image]}
           source={imageUrl==""||imageUrl==null?require('../assets/def.jpg'):{uri:'data:image/png;base64,'+imageUrl}}
           //source={require('../assets/def.jpg')}
          />
        )}
        </View>}
        
 
        {true&&<View style={styles.detailsContainer}>
          {CommercialName && (
            <Text style={styles.title} numberOfLines={2}>
              الاسم التجاري: {CommercialName}
            </Text>
          )}
          { Height&& (
            <Text style={styles.subTitle} numberOfLines={2}>
             الأبعاد : {Height} * {Width} 
            </Text>
          )}        
        {Notes && (
            <Text style={styles.subTitle} numberOfLines={4}>
             ملاحظات: {Notes}
            </Text>
          )}            
        </View>}
      

      </View>
           </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    overflow: "hidden",
    width:"100%",
    height:150,
    flexDirection:"row",
    marginLeft:0,
    marginTop:10,
    backgroundColor:colors.lightDark
  },
  firstContainer: {
    overflow: "hidden",
    width:"100%",
    height:120,
    flexDirection:"row",
    marginLeft:0,
    marginTop:10,
    backgroundColor:colors.lightDark
  },
 
  card: { 
    flex:1,  
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 0,
    overflow: "hidden",
    marginHorizontal: 10,
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
  detailsContainer: {
    flex:2,
    alignItems:"flex-start",
    //padding: 20,
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
    marginTop:0,
    width: '100%',
    height: '100%',
    resizeMode:"stretch",
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 20,
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
  title: {
    marginBottom: 7,
  },
});

export default CardSignBoard;
