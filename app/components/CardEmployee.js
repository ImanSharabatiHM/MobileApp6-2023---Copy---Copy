import {useRef, useState,React }from "react";
import { View, StyleSheet, TouchableWithoutFeedback ,Linking} from "react-native";
import { Image } from "react-native";
import Info from "../components/Info";
import Message from "../components/Message";
  import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
import icons from "../config/icons";

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

function CardEmployee({
  imageUrl,
  unit,
  msg,
  navigation,
  imageHeight = 300,
  onPress,
  thumbnailUrl,
  Mobile,
  Name,
  ID,
  notes  
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
 
      {taxVisible&&false && <Message
      isVisible = { true }
      title={navItem.msg}
      onPress={ ()=>{settaxVisible(false);}}
      buttonTitle ={ "إغلاق"}/>} 
         

      
      <AppModalize
        ref={modalizeRef}
        title={navItem.title}
        adjustToContentHeight={true}
        onLayout={(layout) => { setViewerHeight(layout.layout.height*.9); }}
        onPress = { 
          async () => {modalizeRef.current.close();         
       }}
      >
          <View style={{ height: viewerHeight*.9 }}>
          <ActivityIndicator visible={loading} />
          {taxVisible && (
            <Info
              buttonVisible={true}
              buttonText="تفاصيل"
              message={navItem.msg}
              numberOfLines={8}
              notFound={false}
             
            />
            
          )}
        </View>
      </AppModalize>

    <TouchableWithoutFeedback >
    < View style={styles.firstContainer}>
    <View style={styles.mainContainer}>
       
       
          <View style={styles.card}>
           {(<Image
            style={[styles.image]}
         //   preview={{ uri: thumbnailUrl }}
           //  uri={{imageUrl}}
           source={imageUrl==""||imageUrl==null?require('../assets/def.jpg'):{uri:'data:image/png;base64,'+imageUrl}}

          // source={imageUrl.includes("def")?require('../assets/def.jpg'):{uri:imageUrl}}
          />
        )}
        </View>
        
 
        <View style={styles.detailsContainer}>
          
          {Name && (
            <Text style={styles.title} numberOfLines={2}> الاسم: {Name} </Text>
          )}
          

     
        
        {ID && (
            <Text style={styles.subTitle} numberOfLines={2}>الرقم الوظيفي: {ID}</Text>
          )}

        {notes && (
            <Text style={styles.subTitle} numberOfLines={2}>الدائرة: {notes}</Text>
          )}

          {Mobile && (
            <Text style={styles.mobile} numberOfLines={2}>
              <MaterialCommunityIcons
            style={styles.actionButtonIcon}
            name="phone-in-talk"
            onPress={() =>   {  Linking.openURL("tel://" + Mobile); }}
           />          المحمول: {Mobile} </Text>
          )}
          
        </View>
      

      </View>
      {false && <View style={styles.buttonsContainer}>
        <Button 
      textStyle={[styles.buttonTxt]}
      buttonStyle={[styles.newUserButton]}
      onPress={async (items) => {
       var item={route:constants.MAPLOCATIONURL,title:"موقع الوحدة"};
        setNavItem(item);
        webmodalizeRef.current.open();       
       } }
      title="تفاصيل الموقع" />



      {false&&<Button 
      textStyle={[styles.buttonTxt]}
      buttonStyle={[styles.newUserButton]}
      onPress={() =>   { navigation.navigate(routes.REQUESTS,{item:unit,FromUnits:true}) } }
      title="تقديم طلب" />
      }
       
       
       
       {false&& <Button 
      textStyle={[styles.buttonTxt]}
      buttonStyle={[styles.newUserButton]}
      /*onPress={async() => {
        console.log(JSON.stringify(unit)+"sss");
        var waste="النفايات: "+unit.TAX.TAX_Waste+"شيكل . \n";
        var heraf="الحرف والصناعات: "+unit.TAX.TAX_HERAF+"دينار . \n";
        var maaref="المعارف: "+unit.TAX.TAX_MAAREF+"دينار . \n";
        var lafetat="اللافتات: "+unit.TAX.TAX_YAFTAT+"دينار . \n";
        var water="المياه: "+unit.TAX.TAX_WATER+"شيكل . \n";
        msg=waste+heraf+maaref+lafetat+water;
        var item={route:constants.MAPLOCATIONURL,title:"الرسوم المترتبة على الوحدة",msg:msg};
         setNavItem(item);
         settaxVisible(true);
         modalizeRef.current.open();       
        } }*/
        onPress={() =>   { navigation.navigate(routes.TAXDETAILS,{U_ID:unit.U_ID}) } }
      title="الرسوم" />}
         
       
        </View>}

        </View>
    </TouchableWithoutFeedback>

    <AppModalize
        ref={webmodalizeRef}
        title={navItem.title}
        onPress = { 
          async () => {webmodalizeRef.current.close();         
       }}
      >
        <AppWebView
          source={{       
            //uri: constants.MAPLOCATIONURL+"?wkt="+unit.WKT,
            uri:constants.POSTALURL
          
          }}
          scrollEnabled={true}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={true}
        />
      </AppModalize>
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
    backgroundColor:colors.white
  },
  firstContainer: {
    overflow: "hidden",
    width:"100%",
     borderRadius:8,
    flexDirection:"column",
    marginLeft:0,
    marginTop:10,
    backgroundColor:colors.white
  },
 
  card: { 
    flex:1,  
    width:"100%",
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
  drawerItem: {
    backgroundColor: colors.danger,
   // paddingVertical: 5,
    //alignSelf:"flex-start",
    writingDirection: "rtl",
  },
  drawerTextStyle: {
    color: colors.facebook,
   // alignSelf: "flex-start",
    //fontWeight: "bold",
    fontSize: 14,
  },
  subTitle: {
    padding:6,
    color: colors.facebook,
   // fontWeight: "bold",
  },
  unitOwner: {
    color: colors.facebook,
  //  fontWeight: "bold",
  },
  unitUse: {
    color: colors.facebook,
    //fontWeight: "bold",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: colors.facebook,
    paddingRight:5,
  },
  title: {
    marginBottom: 7,
    color: colors.dark,

  },
  mobile: {
    marginBottom: 7,
    color: colors.facebook,

  },
});

export default CardEmployee;
