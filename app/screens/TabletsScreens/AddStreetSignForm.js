import React, { useEffect,useRef, forwardRef ,useState} from "react";
import { View, StyleSheet, Platform,FlatList,Dimensions } from "react-native";
import colors from "../../config/colors";
import FormRadioButtonGroup from "../../components/forms/FormRadioButtonGroup";
import routes from "../../navigation/routes";
import * as Device from "expo-device";
import { Constants } from "expo-camera";
import { ListItem, ListItemSeparator } from "../../components/lists";
import CardCategory from "../../components/CardCategory";
import tabletApi from "../../api/tablet";
import {ScrollView } from "react-native";
import Info from "../../components/Info";

import * as Yup from "yup";     
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../../components/forms";
import FormImagePicker from "../../components/forms/FormImagePicker";
 
import constants from "../../config/constants";
import { color } from "react-native-reanimated";
        

// function ({ children, title, subTitle })
function AddStreetSignForm({COORDS,navigation,onSelect})
{
    var { height, width } = Dimensions.get('window');
    height = height -30;
    const [viewerHeight, setViewerHeight] = useState(height);
 
    const [deviceType, setDeviceType] = useState(null);
    const [info, setInfo] = useState(null);
    const handleChange1 = async (TaxType ) => {
      //setTaxType(TaxType);
     // getUnitTaxes(U_ID,TaxType,fromDate)
   }
    const handleDeviceType = async () => {
      let dType = await Device.getDeviceTypeAsync();
      setDeviceType(dType);
    };
   
    useEffect(() => {
     
    }, []);
    const validationSchema = Yup.object().shape({
      HIEGHT: Yup.string().required("الارتفاع مطلوب").min(1, "الارتفاع مطلوب")
        .max(9),     
      });
      const handleSubmit = async (Sign, { resetForm }) => {
        //const token = await authStorage.getToken();
        let Feature = {
          type:"Point",
          table:"TRAFFICSINGS",
          PropsObj:{
            TYPE:Sign.TYPE,
            PLACE:Sign.PLACE,
            STATE:Sign.STATE,
            HIEGHT:parseInt(Sign.HIEGHT),    
            DETAILS:Sign.DETAILS
          },
          pCoordinate:COORDS      
         };
         const result = await tabletApi.InsertFeature(Feature.type,Feature.table,Feature.PropsObj,Feature.pCoordinate);
         if (!result.ok) {
          setUploadVisible(false);
          setInfo({
            Status: "إضافة إشارة مرور   ",
          });
          return;
        }
        else {   
          if (result.data) {
            setInfo({
              Status: result.data,
            });
          }
        }
       resetForm();
        
      };
    return ( 
      
      <View> 
      {true&&info!==null && (
        <View style={{flex:1,backgroundColor:colors.lightDark}}>
        <Info
        containerStyle={{top:0,backgroundColor:colors.white}}
          numberOfLines={6}
          buttonText={"إضافة جديدة"}
          buttonVisible={true}
          color={colors.danger}
          message={
            info.Status
          }
          onPress={() => {setInfo(null);}}
        /></View>
      )}
         {info==null&& <View style={{flex:1,backgroundColor:colors.lightDark}}>
          <Form
          initialValues={{
            signBoardImage: [],
            TYPE:1,
            PLACE:1,
            STATE:1,
            HIEGHT:1,    
            DETAILS:null
          }}
         onSubmit={handleSubmit}
         validationSchema={validationSchema}
        >
          <ScrollView>
            {false&&<View style={styles.imagesection}>
              <FormImagePicker name="signBoardImage" capture={true}  />
            </View>}
            <View style={styles.section}>  
            <FormRadioButtonGroup  handleChange1={handleChange1} name="TYPE"  title={"النوع"}
        items={[{key:1, label: "إرشادية", value: 1 }, {key:2, label: "تحذيرية", value: 2 }
      , { key:3,label: "إشارة ضوئية", value: 3 }//{ label: "الكل", value: 5 } , {key:4, label: "مجمّد", value: 4 }
        ]}/>      
        <FormRadioButtonGroup handleChange1={handleChange1} name="PLACE"  title={"الموقع"}
        items={[{key:1, label: "الرصيف", value: 1 }, {key:2, label: "الشارع", value: 2 }
      , { key:3,label: "الدوار", value: 3 },{key:4, label: "الجزيرة", value: 4 }//{ label: "الكل", value: 5 } , 
        ]}/>     
                <FormRadioButtonGroup handleChange1={handleChange1} name="STATE"  title={"الحالة"}
        items={[{key:1, label: "جديدة", value: 1 }, {key:2, label: "قديمة", value: 2 }
      , { key:3,label: "بحاجة إلى تغيير", value: 3 }//{ label: "الكل", value: 5 } , 
        ]}/>  
             <Field
                name="HIEGHT"
                keyboardType="number-pad"
                showPlaceholder={false}
                placeholder="الارتفاع"
                style={[styles.name]}
              />  
              <Field
                name="DETAILS"
                multiline
                showPlaceholder={false}
                numberOfLines={3}
                placeholder="التفاصيل"
                style={[styles.name]}
              />                       
            </View>
            {<SubmitButton title={"إضافة إشارة مرور" }/>}
          </ScrollView>
        </Form>
        </View>}
        </View> 
    );
}

export default AddStreetSignForm;
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
    fontSize: 14,
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
