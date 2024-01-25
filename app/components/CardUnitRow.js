import {useRef, useState,React }from "react";
import { View, StyleSheet, TouchableWithoutFeedback, TouchableHighlight,FlatList } from "react-native";
import { Image } from "react-native";
import Info from "./Info";
import Message from "./Message";
import { ListItemSeparator } from "./lists";
import Card from "../components/CardUnit";
 
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
// /import { transparent } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

const { width, height } = Dimensions.get("window");

function CardUnitRow({
  title,
  DAMGE="N",
  group=1,
  unitArea,
  subTitle,
  imageUrl=null,
  unitOwner,
  unitUse,
  unitNo,
  unitId,
  SIGNBOARD_COUNT="0",
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
    console.log(result);
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
  const groupColors=["#FD9992","#FDAE92","#FDDB92","#F8F35A","#BEF85A","#4DF355","#4DF3BA","#4DF3E6","#438DB0",
  "#62A7EC","#A678F6","#D379EA","#9034D5","#E557F6","#F937CF","#ED7A26","#F0E40B","#00DF0C","#EC2652","#DA4B01","#ADDA01",
"#09AF8A","#0AC8ED","#88C17F","#D7C8FE","#F4DCFE","#FA97FF","#FD72DA","#B95A91","#FA5F6C","#3CA300","#06FFF0","#A6C097","#CAFFAB","#CCE4F6"]
  const wkt="POLYGON ((159920.9557 103851.8817, 159924.1642 103858.298800001, 159923.73 103857.77, 159914.12 103862.109999999, 159914.96 103863.09, 159910.2 103864.67, 159907.95 103858.310000001, 159920.9557 103851.8817))";
  return (
    <>   
    <TouchableHighlight underlayColor={colors.danger}   activeOpacity={0.6} onPress={onPress} >
      <View>
    <View style={[DAMGE=="N"?styles.headerFooterStyleMain:styles.headerFooterStyleDamge,{backgroundColor:groupColors[group%30]}]}> 
          {true&& <View style={[styles.headerItemSmall]}>
            <Button  
             buttonStyle={{marginTop:0,height:"100%",borderRadius:0}}
             color={"secondaryLight"}
             //color={colors.secondaryLight}
             iconName={!detailsVisible?'card-bulleted-outline':'close'}
             //textStyle={styles.buttonTxt}  
             //title={SIGNBOARD_COUNT+""}
             onPress={() => {
              setDetailsVisible(!detailsVisible);
              //getSignBoards(unitId);
              getUnitDetails(unitId);
              
            }}      
             />
          </View>}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {unitId && (
            <Text style={styles.headerItemSmall} numberOfLines={3}>
              {unitId}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
          {unitNo && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              {unitNo}
            </Text>
          )}
           <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
          {unitArea && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              {unitArea}
            </Text>
          )}
           <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
            {unitOwner&& (
            <Text style={styles.headerItem} numberOfLines={3}>
              {unitOwner}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {unitUse && (
            <Text style={styles.headerItem} numberOfLines={3}>
              {unitUse}
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
    width:"27%",
    textAlign:"center",
     fontSize:12,
   },
   headerItemSmall: {
    backgroundColor:colors.transparent,
      textAlignVertical:"center",
      color:colors.facebook,
      fontFamily:"Cairo_700Bold",
      width:"10%",
      textAlign:"center",
       fontSize:12,
     },
  headerFooterStyleMain: {
    flexDirection:"row",
    width: '100%',
    height: 45,
    backgroundColor: "#A1EE9B",
  },
  headerFooterStyleDamge: {
    flexDirection:"row",
    width: '100%',
    height: 45,
    backgroundColor: colors.white,
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

export default CardUnitRow;
