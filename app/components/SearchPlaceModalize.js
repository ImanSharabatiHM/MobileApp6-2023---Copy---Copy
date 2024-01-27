import React, { useEffect,useRef, forwardRef ,useState} from "react";
import { View, StyleSheet, Platform,FlatList,Dimensions,ScrollView } from "react-native";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
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
import CardCategory from "./CardCategory";
import tabletApi from "../api/tablet";
import * as Yup from "yup";
import FormRadioButtonGroup from "../components/forms/FormRadioButtonGroup";

// function ({ children, title, subTitle })
function SearchPlaceModalize({B_ID,B_BLOCK,B_NO,B_STREET_NO,B_IMAGE,B_PARCEL,modalizeRef,navigation,onSelect})
{
    var { height, width } = Dimensions.get('window');
    height = height -30;
    //const modalizeRef = useRef(null);
    const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
    const [viewerHeight, setViewerHeight] = useState(height);
    const [building, setBuilding] = useState({ loading: false, data: null });
    const [streets, setStreets] = useState({ loading: false, data: null });
    const [landmarks, setLandMarks] = useState({ loading: false, data: null });
    const [areas, setAreas] = useState({ loading: false, data: null });

    const [location, setLocation] = useState({ loading: false, data: {longtitude:"0",latitude:"0"} });
    const [searchType, setSearchType] = useState(1);//!route.params.FromUnits
    const getAreasApi = useApi(tabletApi.getComplaintDepts);
    const getLandMarksApi = useApi(tabletApi.getComplaintDepts);


    
    const handleSubmit = async (data, { resetForm }) => {
      setLocation({data:null,loading:false})
      if(data.Type==1) await GetStreetCoordinatesBySTNO("100");
      else if(data.Type==2) await GetStreetCoordinatesBySTNO("100");
      else if(data.Type==3) await GetCoordinatesByLandMark("100");
     // else if(data.UID) await GetBuildingCoordinatesByUID(data.UID);
      //else if(data.BNO && data.STNO) await GetBuildingCoordinatesByBNO(data.BNO,data.STNO);
      //else if(data.PARCEL && data.BLOCK) await GetCoordinatesByParcel(data.BLOCK,data.PARCEL);
      resetForm()

    }
    const GetBuildingCoordinatesByBNO=async(BNO,STNO)=>
    {
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetBuildingCoordinatesByBNO(BNO,STNO);
        if (!result.ok) {
          setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
          return;
          }
        let data = result.data.ResponseObject;
        setLocation({ loading: false,data: {longtitude:data.longtitud,latitude:data.latitud}  });
        onSelect({ Location: data.longtitud+","+data.latitud,Proj:"P" });
    }
    const GetStreetCoordinatesBySTNO=async(STNO)=>
    {
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetStreetCoordinatesBySTNO(STNO);
        if (!result.ok) {
          setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
          return;
          }
        let data = result.data.ResponseObject;
        setLocation({ loading: false,data: {longtitude:data.longtitud,latitude:data.latitud}  });
        onSelect({ Location: data.longtitud+","+data.latitud,Proj:"P" });
    }
    const GetBuildingCoordinatesByUID=async(UID)=>
    {
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetBuildingCoordinatesByUID(UID);
        if (!result.ok) {
          setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
          return;
          }
        //console.log(B_ID,result);
        let data = result.data.ResponseObject;//.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
        setLocation({ loading: false,data: {longtitude:data.longtitud,latitude:data.latitud}  });
        //console.log(location);
        onSelect({ Location: data.longtitud+","+data.latitud,Proj:"P" });
    }
    const GetBuildingCoordinates=async(BID)=>
    {
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetBuildingCoordinates(BID);
        if (!result.ok) {
          setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
          return;
          }
        //console.log(B_ID,result);
        let data = result.data.ResponseObject;//.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
        setLocation({ loading: false,data: {longtitude:data.longtitud,latitude:data.latitud}  });
        //console.log(location);
        onSelect({ Location: data.longtitud+","+data.latitud,Proj:"P" });
    }
    const handleChange1 = async (Type) => {
        setSearchType(Type);
    }
    const GetCoordinatesByParcel=async(BLOCK,PARCEL)=>
    {
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetCoordinatesByParcel(BLOCK,PARCEL);
        if (!result.ok) {
          setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
          return;
          }
        //console.log(B_ID,result);
        let data = result.data.ResponseObject;//.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
        setLocation({ loading: false,data: {longtitude:data.longtitud,latitude:data.latitud}  });
        //console.log(location);
        onSelect({ Location: data.longtitud+","+data.latitud,Proj:"P" });
    }
    const GetCoordinatesByBlock=async(ID)=>
    {
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetCoordinatesByBlock(ID);
        if (!result.ok) {
          setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
          return;
          }
        //console.log(B_ID,result);
        let data = result.data.ResponseObject;//.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
        setLocation({ loading: false,data: {longtitude:data.longtitud,latitude:data.latitud}  });
        //console.log(location);
        onSelect({ Location: data.longtitud+","+data.latitud,Proj:"P" });
    }
    const GetCoordinatesByLandMark=async(OBJECTID)=>
    {
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetCoordinatesByLandMark(OBJECTID);
        if (!result.ok) {
          setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
          return;
          }
        //console.log(B_ID,result);
        let data = result.data.ResponseObject;//.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
        setLocation({ loading: false,data: {longtitude:data.longtitud,latitude:data.latitud}  });
        //console.log(location);
        onSelect({ Location: data.longtitud+","+data.latitud,Proj:"P" });
    }
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
    const getSrteets = async () => {
 
      setStreets({ loading: true, data: null });
      const result = await tabletApi.GetStreetsNames();
      if (!result.ok) {
       // setError(true);
        setStreets({ loading: false, data:null });
        return;
      }
      ///console.log(result);
      let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);    
      setStreets({ loading: false, data });
    };
    const getAreas = async () => {
 
      setAreas({ loading: true, data: null });
      const result = await tabletApi.GetAreasNames();
      if (!result.ok) {
       // setError(true);
       setAreas({ loading: false, data:null });
        return;
      }
      ///console.log(result);
      let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);    
      setAreas({ loading: false, data });
    };
    const getLandMarks = async () => {
 
      setLandMarks({ loading: true, data: null });
      const result = await tabletApi.GetLandMarks();
      //console.log(result);
      if (!result.ok) {
       // setError(true);
       setLandMarks({ loading: false, data:null });
        return;
      }
      ///console.log(result);
      let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);    
      setLandMarks({ loading: false, data });
    };
    useEffect(() => {
      getSrteets();
      getLandMarks();
      getAreas();   
    }, []);
  
    return (
      <AppModalize
      ref={modalizeRef}
      title={"اذهب إلى"}
      adjustToContentHeight={true}
      //onLayout={(layout) => { setViewerHeight(layout.height*.5); }}
      onPress = { 
        async () => {modalizeRef.current.close();         
     }}
    >
        <View style={{ height: mainCategoriesVisible ? '100%' : 0 ,backgroundColor:colors.white,marginTop:0}}>
          {false&&<CardBuildDetails
            BNO={B_NO+''}
            STNO={B_STREET_NO+''}
            BLOCK={B_BLOCK+''}
            PARCEL={B_PARCEL+''}
            IMAGE={B_IMAGE}//{item.img}
            B_ID={B_ID}
              />}
        <Form
        initialValues={{
          Street:{label:' ',value:-1},
          Landmark:{label:' ',value:-1},
          Area:{label:' ',value:-1},
          Type:1,  
        }}
        //onSubmit={handleSubmit}
      >
      <ScrollView>
      <View style={styles.section}>
      {true&&<FormRadioButtonGroup  handleChange1={handleChange1} name="Type" 
         items={[{ label: "شارع", value: "1" }, { label: "منطقة",value: "2" },{ label: "اسم موقع",value: "3" }]} />
         }
      {searchType==1&&<Picker
        items={          
        streets.data?.map(
          (street) => {
            return {label: street.NAME,value: "str"+street.STNO };
                  }) 
                }
        name="Street"
        placeholder="اسم الشارع"
        waterPicker={true}
        showPlaceholder={false}
        onnectedFieldName={"Street"}
        searchPlaceHolder={"بحث عن شارع"}
        
        selectedItemChanged={(street) =>   
          {
            console.log(street);
            GetStreetCoordinatesBySTNO(street.value.replace("str",""));
          }     
        }
      />}
      {searchType==2&&<Picker
        items={          
        areas.data?.map(
          (area) => {
            return {label: area.BLOCK+"-"+ area.BLOCKNAME,value: area.OBJECTID };
                  }) 
                }
        name="Area"
        placeholder="اسم  المنطقة"
        waterPicker={true}
        showPlaceholder={false}
        onnectedFieldName={"Area"}
        searchPlaceHolder={"بحث عن منطقة"}
        
        selectedItemChanged={(area) =>   
          {
            console.log(area);
            GetCoordinatesByBlock(area.value);
          }     
        }
      />}
       {searchType==3&&<Picker
        items={          
        landmarks.data?.map(
          (landmark) => {
            return {label: landmark.ANAME,value: landmark.OBJECTID };
                  }) 
                }
        name="LandMark"
        placeholder="اسم المكان"
        waterPicker={true}
        showPlaceholder={false}
        onnectedFieldName={"LandMark"}
        searchPlaceHolder={"بحث عن مكان"}     
        selectedItemChanged={(landmark ) =>   
          {
            GetCoordinatesByLandMark(landmark.value)
          }     
        }
      />}   
        </View>
        {false&&<SubmitButton title="البحـــث" />}
        </ScrollView>

      </Form>
      </View>
    </AppModalize>    
    );
}

export default SearchPlaceModalize;
const styles = StyleSheet.create({
  section: { marginHorizontal: "10%", width: "80%", fontSize: 12, },
  Field: {
    width:"49%",
    fontSize: 12,
    fontFamily: "Cairo_400Regular",
    textAlign: "right",
    direction:"rtl",
  },
  Field2: {
    width:"49%",
    fontSize: 12,
    direction:"rtl",
    fontFamily: "Cairo_400Regular",
    textAlign: "right",
    marginStart:10,

  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    height: 1,
    width: "100%",
  },
  name: {
    fontSize: 12,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew,
    textAlign: "right",
    marginStart:10,
    flex:1,
    width:'100%'
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
