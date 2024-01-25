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

// function ({ children, title, subTitle })
function SearchModalize({B_ID,B_BLOCK,B_NO,B_STREET_NO,B_IMAGE,B_PARCEL,modalizeRef,navigation,onSelect})
{
    var { height, width } = Dimensions.get('window');
    height = height -30;
    //const modalizeRef = useRef(null);
    const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
    const [viewerHeight, setViewerHeight] = useState(height);
    const [building, setBuilding] = useState({ loading: false, data: null });
    const [location, setLocation] = useState({ loading: false, data: {longtitude:"0",latitude:"0"} });

    
    const handleSubmit = async (data, { resetForm }) => {
      setLocation({data:null,loading:false})
      if(data.BID) await GetBuildingCoordinates(data.BID);
      else if(data.UID) await GetBuildingCoordinatesByUID(data.UID);
      else if(data.ServiceNo) await GetBuildingCoordinatesByService(data.ServiceNo);
      else if(data.BNO && data.STNO) await GetBuildingCoordinatesByBNO(data.BNO,data.STNO);
      else if(data.PARCEL && data.BLOCK) await GetCoordinatesByParcel(data.BLOCK,data.PARCEL);
      resetForm()

    }
    const GetBuildingCoordinatesByBNO=async(BNO,STNO)=>
    {
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetBuildingCoordinatesByBNO(BNO,STNO);
        console.log(result);
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
    const GetBuildingCoordinatesByService=async(ServiceNo)=>
    {
      console.log("ddddddddd");
        setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
        const result = await tabletApi.GetBuildingCoordinatesByWaterService(ServiceNo);
        console.log(result);
        if (!result.ok) {
          setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
          return;
          }
        console.log(B_ID,result);
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
      title={"البحث عن بناء"}
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
          BID:null,
          UID:null,
          BNO:null,
          STNO:null,
          BLOCK:null,
          PARCEL:null,
          ServiceNo:null,
        }}
        onSubmit={handleSubmit}
      >
      <ScrollView>
      <View style={styles.section}>
        <Field
          keyboardType="number-pad"
          name="BID"
          placeholder={"رقم البناء التسلسلي"}
          style={[styles.name]}
          width={'100%'}
          showPlaceholder={true}         
        /> 
         <Field
          keyboardType="number-pad"
          name="UID"
          placeholder={"رقم الوحدة"}
          style={[styles.name]}
          showPlaceholder={true}
        />  
         <Field
          keyboardType="number-pad"
          name="ServiceNo"
          placeholder={"رقم خدمة المياه"}
          style={[styles.name]}
          showPlaceholder={true}
        />  
 <View style={{flexDirection:"row",width:"100%"}}>
       <View style={[styles.Field]}>
         <Field
          name="STNO"
          placeholder="الشارع"
          showPlaceholder={true}
          style={[styles.name]}
         /></View>
        <View style={[styles.Field2]}>
        <Field
          keyboardType="number-pad"
          name="BNO"  
          showPlaceholder={true}
          placeholder="البناء"
          style={[styles.name]}
         /></View>
         
          </View>
<View style={{flexDirection:"row",width:"100%"}}>
        <View style={[styles.Field]}>
        <Field
          keyboardType="number-pad"
          name="BLOCK"  
          showPlaceholder={true}
          placeholder="الحوض"
          style={[styles.name]}
         /></View>
         <View style={[styles.Field2]}>
         <Field
          name="PARCEL"
          placeholder="القطعة"
          showPlaceholder={true}
          style={[styles.name]}
         /></View>
          </View>
        </View>
        <SubmitButton title="بحــث عن بنــاء" />
        </ScrollView>

      </Form>
      </View>
    </AppModalize>    
    );
}

export default SearchModalize;
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
