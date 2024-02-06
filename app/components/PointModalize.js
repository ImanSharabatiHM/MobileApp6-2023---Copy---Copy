import React, { useEffect,useRef, forwardRef ,useState} from "react";
import { View, StyleSheet, Platform,FlatList,Dimensions } from "react-native";
import colors from "../config/colors";
import routes from "../navigation/routes";
import { AppModalize } from "./Modalize";
import * as Device from "expo-device";
import { Constants } from "expo-camera";
import { ListItem, ListItemSeparator } from "./lists";
import CardCategory from "./CardCategory";
import tabletApi from "../api/tablet";
import {ScrollView } from "react-native";

import * as Yup from "yup";     
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import AddCarCounterForm from "../screens/TabletScreens/AddCarCounterForm";
import AddStreetSignForm from "../screens/TabletScreens/AddStreetSignForm";

import AddBumpForm from "../screens/TabletScreens/AddBumpForm"
import constants from "../config/constants";
        


// function ({ children, title, subTitle })
function PointModalize({B_ID,B_BLOCK,B_NO,B_STREET_NO,B_IMAGE,B_PARCEL,PERMISSIONS,COORDS,modalizeRef,navigation,onSelect})
{
    var { height, width } = Dimensions.get('window');
    height = height -30;
    //const modalizeRef = useRef(null);
    const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
    const [viewerHeight, setViewerHeight] = useState(height);
    const [building, setBuilding] = useState({ loading: false, data: null });

    const [deviceType, setDeviceType] = useState(null);
    const [selectedCategory,setSelectedCategory]=useState(false);
      const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight / 2; // Cover half of the screen
    const [mainCategories, setMainCategories] = useState({
      loading: false, data:
        [   
          { TalabCode: 'SIGNBOARD', TextAr: 'يافطات', ImageName: "bannersIcon",Visible:PERMISSIONS?.ADD_SIGNBORD },
          { TalabCode: 'FARM', TextAr: 'مزروعات', ImageName: "farmIcon" ,Visible:PERMISSIONS?.ADDPOINT_FARM},
          { TalabCode: 'CARCOUNT', TextAr: 'عداد', ImageName: "parkcount" ,Visible:PERMISSIONS?.ADDPOINT_CARCOUNTER},
          { TalabCode: 'STREETSIGN', TextAr: 'إشارة', ImageName: "strssignIcon" ,Visible:PERMISSIONS?.ADDPOINT_STREETSIGN},
          { TalabCode: 'ADDPUMP', TextAr: 'مطبّ', ImageName: "humpIcon",Visible:PERMISSIONS?.ADDPOINT_STREETPUMP },
          { TalabCode: 'CONTAINER', TextAr: 'حاوية', ImageName: "wasteIcon" ,Visible:PERMISSIONS?.ADDPOINT_CONTAINER},
          { TalabCode: 'ADDWATERKEY', TextAr: 'مفتاح ', ImageName: "waterIcon" ,Visible:0},
          { TalabCode: 'ADDPUBP', TextAr: 'مضخة', ImageName: "watercount",Visible:0 },
          { TalabCode: '8', TextAr: 'عمود كهرباء', ImageName: "electricityIcon" ,Visible:0},
          { TalabCode: 'ADDLANDMARK', TextAr: 'موقع', ImageName: "sewageIcon" ,Visible:0},
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
      console.log("B_IDDDDDDDDDDDD",B_ID);
      getBuilding();
   
    }, []);
  
    return (
      <AppModalize
      ref={modalizeRef}
      title={"إضافة النقطة إلى:"}
      transparent={true}
     // modalHeight={90}
     closeOnOverlayTap={true}
     //modalHeight={modalHeight}


      adjustToContentHeight={true}
   // onLayout={(layout) => { setViewerHeight(layout.height*.5); }}
      onPress = { 
        async () => {
          setSelectedCategory(null);
          modalizeRef.current.close(); 
          
          console.log(mainCategories);       
     }}
    >
      <View>
         <View style={{flex:1,backgroundColor:colors.secondaryLight}}>        
           <ListItemSeparator  seperatorStyle={styles.seperatorStyleTable} />          
          {mainCategories.data && mainCategoriesVisible  && (
            <FlatList
            scrollEnabled={false}
              numColumns={5}
              data={mainCategories.data.filter((item) => item.Visible === 1)}
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
                    //modalizeRef.current.close(); 
                    console.log(item.TalabCode,routes[item.TalabCode]);
                    setSelectedCategory(item.TalabCode);
  
                   if(false&& routes[item.TalabCode])
                   {
                      modalizeRef.current.close();
                     
                      navigation.navigate(routes[item.TalabCode],{COORDS:COORDS});
                    }                                        
                  }}
                  imageUrl={item.ImageName}//{item.img}
                />
              )}
            />
          )}
          </View>  
           {selectedCategory=="CARCOUNT"&&<AddCarCounterForm
           COORDS={COORDS}
           />}
           {selectedCategory=="STREETSIGN"&&<AddStreetSignForm
            COORDS={COORDS}
           />}
           {selectedCategory=="ADDPUMP"&&<AddBumpForm
            COORDS={COORDS}
           />}
           </View>
    </AppModalize>    
    );
}

export default PointModalize;
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
