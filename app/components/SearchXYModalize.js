import React, { useEffect,useRef, forwardRef ,useState} from "react";
import { View, StyleSheet, Platform,FlatList,Dimensions,ScrollView } from "react-native";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "./forms";
import FormImagePicker from "./forms/FormImagePicker";
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

// function ({ children, title, subTitle })
function SearchXYModalize({B_ID,B_BLOCK,B_NO,B_STREET_NO,B_IMAGE,B_PARCEL,modalizeRef,navigation,onSelect})
{
    var { height, width } = Dimensions.get('window');
    height = height -30;
    //const modalizeRef = useRef(null);
    const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
    const [viewerHeight, setViewerHeight] = useState(height);

    const handleSubmit = async (data, { resetForm }) => {
      onSelect({ Location: data.X+","+data.Y,Proj:"P"  })
    }
  
    useEffect(() => {   
    }, []);
  
    return (
      <AppModalize
      ref={modalizeRef}
      title={"البحث عن الإحداثيات"}
      adjustToContentHeight={true}
      //onLayout={(layout) => { setViewerHeight(layout.height*.5); }}
      onPress = { 
        async () => {modalizeRef.current.close();         
     }}
    >
        <View style={{ height: mainCategoriesVisible ? '100%' : 0 ,backgroundColor:colors.white,marginTop:0}}>     
        <Form
        initialValues={{
          X:0,
          Y:0,         
        }}
        onSubmit={handleSubmit}
      //  / validationSchema={validationSchema}
      >
      <ScrollView>
       
      <View style={styles.section}>
      <Field
          keyboardType="number-pad"
          name="X"
          placeholder={"الإحداثي السيني"}
          style={[styles.name]}
          showPlaceholder={false}         
        />
         <Field
          keyboardType="number-pad"
          name="Y"
          placeholder={"الإحداثي الصادي"}
          style={[styles.name]}
          showPlaceholder={false}         
        />
        </View>
        <SubmitButton title="بحــث عن إحداثيات" />
        </ScrollView>

      </Form>
            </View>
    </AppModalize>    
    );
}

export default SearchXYModalize;
const styles = StyleSheet.create({
  section: { marginHorizontal: "10%", width: "50%", fontSize: 12, },
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
