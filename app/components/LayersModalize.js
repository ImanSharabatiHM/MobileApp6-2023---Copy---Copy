import React, { useEffect,useRef, forwardRef ,useState} from "react";
import { View, StyleSheet, Platform,FlatList,Dimensions } from "react-native";
import { Portal } from "react-native-paper";
import colors from "../config/colors";
import { useCombinedRefs } from "../utility/use-combined-refs";
import routes from "../navigation/routes";
import AppText from "./Text";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "./carousel/Carousel";
import { AppModalize } from "./Modalize";
import * as Device from "expo-device";
import { Constants } from "expo-camera";
import constants from "../config/constants";
import CardBuildDetails from "./CardBuildDetails";
import { ListItem, ListItemSeparator } from "./lists";
import CardLayer from "./CardLayer";
import tabletApi from "../api/tablet";
import authStorage from "./../auth/storage";
import { color } from "react-native-reanimated";

// function ({ children, title, subTitle })
function LayersModalize({B_ID,B_BLOCK,B_NO,B_STREET_NO,B_IMAGE,B_PARCEL,modalizeRef,navigation,onSelect,visible_layers})
{
    var { height, width } = Dimensions.get('window');
    height = height -30;
    //const modalizeRef = useRef(null);
    const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
    const [viewerHeight, setViewerHeight] = useState(height);
    const [building, setBuilding] = useState({ loading: false, data: null });
    const [Layers, setLayers] = useState({ loading: false, data: null });

    const GetLayersForEmp = async () => {
    const token = await authStorage.getToken();
      setLayers({ loading: true, data: null });
      const result = await tabletApi.GetLayersForEmp(token);
      console.log(result);
      if (!result.ok) {
       // setError(true);
        setLayers({ loading: false, data:null });
        return;
      }
      let data = result.data ;
      setLayers({ loading: false, data });
    };
    useEffect(() => {
      console.log("dddddddd");
      GetLayersForEmp();
      //console.log(visible_layers);
      const d=visible_layers[0];
     // console.log(d+"ssssssssssss");
     //console.log(visible_layers?.includes("PARCELS"))
   
    }, []);
  
    return (
      <AppModalize
      ref={modalizeRef}
      title={"الطبقــات"}
      adjustToContentHeight={true}
      //onLayout={(layout) => { setViewerHeight(layout.height*.5); }}
      onPress = { 
        async () => {modalizeRef.current.close();         
     }}
    >
      <View style={{ height: mainCategoriesVisible ? '100%' : 0 ,backgroundColor:colors.white,marginTop:0}}>
      {true&&!Layers.loading&&Layers?.data && mainCategoriesVisible  && (
            <FlatList
            scrollEnabled={false}
              numColumns={5}
              data={Layers?.data}
              keyExtractor={(item) => "Layer" + item.NAME}
              renderItem={({ item }) => (
                <CardLayer
                  // s={modalizeRef}
                  visible={visible_layers?.includes(item.NAME)?1:2}
                  unit={item}
                  navigation={navigation}
                  title={item.NAME_AR}
                  imageHeight={50}
                  onPress={() => {
                    console.log("fffffffffffff");
                    onSelect(item.NAME);
                    //setmainCategoriesVisible(false);
                    //modalizeRef.current.close();       
                   // navigation.navigate(item.TalabCode,{COORDS:COORDS});
                   // navigation.navigate("SignBoard",{COORDS:COORDS});                                        
                                        
                  }}
                  thumbnailUrl={"http://10.11.20.9/php/ImagesHeraf/1-197-0.jpg"}
                  imageUrl={item.NAME}//{item.img}
                />
              )}
            />
          )}
       
          </View>
    </AppModalize>    
    );
}

export default LayersModalize;
const styles = StyleSheet.create({
  drawerItem: {
    backgroundColor: colors.white,
    paddingVertical: 5,
    //alignSelf:"flex-start",
    writingDirection: "rtl",
  },
  drawerTextStyle: {
    color: colors.facebook,
    alignSelf: "flex-start",
    //fontWeight: "bold",
    fontSize: 20,
  },
  section: { marginHorizontal: "10%", width: "80%", fontSize: 12, },
  Field: {
    width: "50%",
    fontSize: 12,
    fontFamily: "Cairo_400Regular",
    textAlign: "right",
    // /color: colors.black
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    height: 1,
    width: "100%",
  },
  name: {
    width: "100%",
    fontSize: 12,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew,
    textAlign: "right",

  },
  buttonClose: {
    // bottom:5,
    // width: "20%",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "80%",
    alignSelf: "center",
    backgroundColor: colors.primary
  },
  buttonTxt: {
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.white,
    textAlign: "right",

  },
  button: { width: "70%" },
  imagesection: { width: "99%", flexDirection: "column" },

  container: {
    backgroundColor:colors.white,
    height: '70%' ,
    top:'15%',
    bottom:'15%',
    maxHeight:600,
     //height:300,
    fontSize: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
