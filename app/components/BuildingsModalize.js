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
import CardBuildDetails from "./../components/CardBuildDetails";
import { ListItem, ListItemSeparator } from "./../components/lists";
import CardCategory from "./../components/CardCategory";
import tabletApi from "./../api/tablet";

// function ({ children, title, subTitle })
function BuildingsModalize({B_ID,B_BLOCK,B_NO,B_STREET_NO,B_IMAGE,B_PARCEL,PERMISSIONS={},modalizeRef,navigation,onSelect})
{
    var { height, width } = Dimensions.get('window');
    height = height -30;
    //const modalizeRef = useRef(null);
    const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
    const [viewerHeight, setViewerHeight] = useState(height);
    const [building, setBuilding] = useState({ loading: false, data: null });


    const [deviceType, setDeviceType] = useState(null);
    const [mainCategories, setMainCategories] = useState({
      loading: false, data:
        [
          { TalabCode: 'SIGNBOARD', TextAr: 'يافطات', ImageName: "bannersIcon",Visible:PERMISSIONS?.ADD_SIGNBORD},
          { TalabCode: 'TAKEIMAGE', TextAr: 'تصوير', ImageName: "cameraIcon" ,Visible:PERMISSIONS?.TAKE_IMAGE},
          { TalabCode: 'BUILDINGUNITS', TextAr: 'وحدات', ImageName: "buildingsIcon" ,Visible:PERMISSIONS?.VIEW_UNITS},
          { TalabCode: 'WATERSERVICES', TextAr: 'المياه', ImageName: "waterIcon",Visible:PERMISSIONS?.VIEW_WSERVICES },
          { TalabCode: 'TALABTS', TextAr: 'الطلبات', ImageName: "industryIcon" ,Visible:PERMISSIONS?.VIEW_BTALABAT},
          { TalabCode: 'BLACKLIST', TextAr: 'القائمة السوداء', ImageName: "streetsIcon",Visible:PERMISSIONS?.ADD_BLACKLIST }, 
          { TalabCode: 'UNITWARNING', TextAr: 'إخطاراات', ImageName: "warningIcon",Visible:PERMISSIONS?.ADD_UNIT_WARNING }, 
          { TalabCode: 'ELECTRICSERVICES', TextAr: 'الكهرباء', ImageName: "electricityIcon",Visible:PERMISSIONS?.ADD_UNIT_WARNING }, 

          { TalabCode: '6', TextAr: 'الرسوم', ImageName: "taxIcon" ,Visible:0},
          { TalabCode: '8', TextAr: 'كهرباء', ImageName: "electricityIcon" ,Visible:0},
          { TalabCode: '9', TextAr: 'مخالفات', ImageName: "certificateIcon" ,Visible:0},
          { TalabCode: '10', TextAr: 'صرف', ImageName: "sewageIcon" ,Visible:0},
        ]
    });
    const handleDeviceType = async () => {
      let dType = await Device.getDeviceTypeAsync();
      setDeviceType(dType);
    };
    const getBuilding = async () => {
 
      setBuilding({ loading: true, data: null });
      const result = await tabletApi.GetBuildingDescByBID(B_ID);
      if (!result.ok) {
       // setError(true);
        setBuilding({ loading: false, data:null });
        return;
      }
      ///console.log(result);
      let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);    
      setBuilding({ loading: false, data });
    };
    useEffect(() => {
      console.log("B_IDDDDDDDDDDDD",B_ID,PERMISSIONS);

      getBuilding();

    }, []);
  
    return (
      <AppModalize
      ref={modalizeRef}
      title={"معلومات البناء"}
      adjustToContentHeight={true}
      //onLayout={(layout) => { setViewerHeight(layout.height*.5); }}
      onPress = { 
        async () => {modalizeRef.current.close();         
     }}
    >
        <View style={{ height: mainCategoriesVisible ? '100%' : 0 ,backgroundColor:colors.white,marginTop:0}}>
          <CardBuildDetails
            BNO={B_NO+''}
            STNO={B_STREET_NO+''}
            BLOCK={B_BLOCK+''}
            PARCEL={B_PARCEL+''}
            IMAGE={B_IMAGE}//{item.img}
            B_ID={B_ID}
              />
           <ListItemSeparator  seperatorStyle={styles.seperatorStyleTable} />
          {mainCategories.data && mainCategoriesVisible  && (
            <FlatList
            scrollEnabled={false}
              numColumns={5}
              data={mainCategories.data.filter((item) => item.Visible === 1)}
              
              /*data={mainCategories.data.filter((item) => {
                return item.Visible==1
            })}*/
              keyExtractor={(item) => "mainc" + item.TalabCode}
              renderItem={({ item }) => (
                <CardCategory
                  // s={modalizeRef}
                  unit={item}
                  navigation={navigation}
                  title={item.TextAr}
                  imageHeight={50}
                  onPress={() => {
                    //setmainCategoriesVisible(false);
                    modalizeRef.current.close();           
                   if(item.TalabCode=="ALLTALABTS" || item.TalabCode=="TALABATS")//TalabatScreen
                    {
                      modalizeRef.current.close();
                      navigation.navigate(routes[item.TalabCode],{B_ID:B_ID,onSelect:onSelect}); 
                    }
                   else 
                    {
                      navigation.navigate(routes[item.TalabCode],{B_ID:B_ID});
                    }

                  }}
                  thumbnailUrl={"http://10.11.20.9/php/ImagesHeraf/1-197-0.jpg"}
                  imageUrl={item.ImageName}//{item.img}
                />
              )}
            />
          )}
       
          </View>
    </AppModalize>    
    );
}

export default BuildingsModalize;
const styles = StyleSheet.create({
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
