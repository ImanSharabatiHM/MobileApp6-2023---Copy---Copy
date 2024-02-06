import {useRef, useState,React }from "react";
import { View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight,FlatList } from "react-native";
import { Image } from "react-native";
import Info from "./Info";
import Message from "./Message";
import { ListItemSeparator } from "./lists";
import Card from "./CardTalabDetails";
 
import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import routes from "../navigation/routes";
import { AppModalize } from "./Modalize";
import { AppModal } from "./Modal";
import ActivityIndicator from "./ActivityIndicator";
import authStorage from "../auth/storage";
import tabletApi from "../api/tablet";

import AppWebView from "./WebView";
import constants from "../config/constants";

import Text from "./Text";
import colors from "../config/colors";
import { Dimensions } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { color } from "react-native-reanimated";
// /import { transparent } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

const { width, height } = Dimensions.get("window");

function CardTalabRow({
  TALAB_NO,
  TALAB_DATE,
  TALAB_NAME,
  CUST_NAME,
  ODD=false,
  TALAB,
  onPress,
 }) {
  const [navItem, setNavItem] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const [taxVisible, settaxVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signBorads, setSignBorads] = useState({ loading: false, data: null });
  const [unitDetails, setUnitDetails] = useState({ loading: false, data: null });


  const getUnitDetails = async (UnitID) => {
    setSignBorads({ loading: false, data: [{"title":"sss"}] });

  }
  const getSignBoards = async (UnitID) => {
    const token = await authStorage.getToken();
    setSignBorads({ loading: true, data: null });
    const result = await tabletApi.GetSignBoards(UnitID, token);
   // console.log(result);
    if (!result.ok) {
      // setError(true);
      setSignBorads({ loading: false, data: null });
      return;
    }
   // console.log(result);
    let data = result.data;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    let newSign = {
      SerialNo:0,
      TYPE_ID: 1,
      CommercialName: "يافطة جديدة",   
      UseID: 1,
      UnitID: "",
      Width: 0,
      Height: 0,
      Notes: "", 
      IsDeleted :0,
      Image:null,
      // LOCATION: location?.latitude ? location?.latitude : ""+","+ location?.longitude ? location?.longitude : "",     
    };
   //data =[newSign].concat(data);

    setSignBorads({ loading: false, data });
  };
  const webmodalizeRef = useRef(null);
  const modalizeRef = useRef(null);
  const appmodalRef=useRef(null);
  const [viewerHeight, setViewerHeight] = useState(height);
  const wkt="POLYGON ((159920.9557 103851.8817, 159924.1642 103858.298800001, 159923.73 103857.77, 159914.12 103862.109999999, 159914.96 103863.09, 159910.2 103864.67, 159907.95 103858.310000001, 159920.9557 103851.8817))";
  return (
    <>   
    <TouchableHighlight underlayColor={colors.danger}   activeOpacity={0.6} onPress={onPress} >
      <View>
    <View style={ODD==-1?styles.headerFooterStyleHeader:ODD?styles.headerFooterStyleMain:styles.headerFooterStyleDamge}> 
          {true&& <View style={[styles.headerItemSmall]}>
            <Button  
             buttonStyle={{marginTop:0,height:"100%",borderRadius:0}}
             color={"secondaryLight"}
             //color={colors.secondaryLight}
             iconName={ODD==-1?'':!detailsVisible?'card-bulleted-outline':'close'}
             //textStyle={styles.buttonTxt}  
             //title={SIGNBOARD_COUNT+""}
             onPress={() => {
              if(ODD!=-1)
              setDetailsVisible(!detailsVisible);
              //getSignBoards(unitId);
              //getUnitDetails(TALAB_NO);
              
            }}      
             />
          </View>}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {TALAB_NO && (
            <Text style={styles.headerItemSmall} numberOfLines={3}>
              {TALAB_NO}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
          {TALAB_DATE && (
            <Text style={styles.headerItemDate} numberOfLines={1}>
              {TALAB_DATE}
            </Text>
          )}
           <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
            {TALAB_NAME&& (
            <Text style={styles.headerItem} numberOfLines={3}>
              {TALAB_NAME}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {CUST_NAME && (
            <Text style={styles.headerItem} numberOfLines={3}>
              {CUST_NAME}
            </Text>
          )}      
           <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
   
      </View>
      <View>
      <ListItemSeparator  seperatorStyle={styles.seperatorStyleTableHor} />
      </View>
      </View>
    </TouchableHighlight>
    {detailsVisible&&<View>    
     { (                 
            <Card
            imageHeight={50}
            subTitle={"جاري العمل لإضافة المعلومات اللازمة........."}
            talab={TALAB}    
            talabno={TALAB_NO}         
            />
           
        
      )}               

    </View>
}
   
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
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    width: 1,
    height: "100%",
  },
  seperatorStyleTableHor: {
    backgroundColor: colors.secondary,
    width: 1,
    width: "100%",
  },
  headerItem: {
  backgroundColor:colors.transparent,
    textAlignVertical:"center",
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    width:"24%",
    textAlign:"center",
     fontSize:12,
   },
   headerItemSmall: {
    backgroundColor:colors.transparent,
      textAlignVertical:"center",
      color:colors.facebook,
      fontFamily:"Cairo_700Bold",
      width:"15%",
      textAlign:"center",
       fontSize:12,
     },
     headerItemDate: {
      backgroundColor:colors.transparent,
        textAlignVertical:"center",
        color:colors.facebook,
        fontFamily:"Cairo_700Bold",
        width:"20%",
        textAlign:"center",
         fontSize:12,
       },
  headerFooterStyleMain: {
    flexDirection:"row",
    width: '100%',
    height: 45,
    backgroundColor: "#B5D7FF",
  },
  headerFooterStyleHeader: {
    flexDirection:"row",
    width: '100%',
    height: 45,
    backgroundColor: colors.light,
  },
  headerFooterStyleDamge: {
    flexDirection:"row",
    width: '100%',
    height: 45,
    backgroundColor: "#FFF",
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

export default CardTalabRow;
