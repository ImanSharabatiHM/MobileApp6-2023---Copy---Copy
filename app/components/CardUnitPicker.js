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

const { width, height } = Dimensions.get("window");

function CardUnitPicker({
  title,
  subTitle,
  imageUrl=null,
  unitOwner,
  unitUse,
  unitNo,
  unitId,
  all=false,
  other=false,
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
  const wkt="POLYGON ((159920.9557 103851.8817, 159924.1642 103858.298800001, 159923.73 103857.77, 159914.12 103862.109999999, 159914.96 103863.09, 159910.2 103864.67, 159907.95 103858.310000001, 159920.9557 103851.8817))";
  return (
    <>   
    <TouchableWithoutFeedback onPress={onPress} >
      <View style={styles.mainContainer}>
      <View style={styles.card}>
        {(
          <Image
            style={[styles.image]}
         //   preview={{ uri: thumbnailUrl }}
           //  uri={{imageUrl}}
           source={imageUrl==""||imageUrl==null?require('../assets/def.jpg'):{uri:'data:image/png;base64,'+imageUrl}}

           // source={imageUrl.includes("def")?require('../assets/def.jpg'):{uri:imageUrl}}
          />
        )}
        
        </View>
        <View style={styles.detailsContainer}>
          {title && !all && (
            <Text style={styles.title} numberOfLines={2}>
              الموقع: {title}
            </Text>
          )}

          {subTitle&& !all && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </Text>
          )}
        
        {unitOwner && !all && (
            <Text style={styles.subTitle} numberOfLines={2}>
             المالك: {unitOwner}
            </Text>
          )}

        {unitUse && !all && (
            <Text style={styles.subTitle} numberOfLines={2}>
             الاستخدام: {unitUse}
            </Text>
          )}
          {unitNo && !all && (
            <Text style={styles.subTitle} numberOfLines={2}>
             رمز الوحدة: {unitNo}
            </Text>
          )}
             {unitId && all && (
              
              <Text style={styles.allTitle} numberOfLines={2}>
              </Text>
            )}
             {unitId && all && (
              
              <Text style={styles.allTitle} numberOfLines={2}>
              </Text>
            )}
            {unitId && all && (
              
            <Text style={styles.allTitle} numberOfLines={6}>
             جميع الوحدات
            </Text>
          )}
           {unitId && other && (
              
              <Text style={styles.allTitle} numberOfLines={6}>
                  وحدة أخرى
              </Text>
            )}

             {unitId && !all&&!other && (
            <Text style={styles.subTitle} numberOfLines={2}>
             رقم الوحدة: {unitId}
            </Text>
          )}
        </View>

      
      </View>
    </TouchableWithoutFeedback>

   
  </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    overflow: "hidden",
    width:"100%",
    height:140,
    flexDirection:"row",
    marginLeft:15,
    marginTop:10,
  },
  detailsContainer: {
    flex:2,
    alignItems:"flex-start"
  },
  card: {
    flex:1,
    borderRadius: 8,
    margin:5,
    width:"100%",
    //backgroundColor: colors.danger,
    overflow: "hidden",
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
  allTitle: {
    color: colors.danger,
    fontSize: 20,
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

export default CardUnitPicker;
