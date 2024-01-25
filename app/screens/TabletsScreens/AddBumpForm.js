import React, { useEffect,useRef, forwardRef ,useState} from "react";
import { View, StyleSheet, Platform,FlatList,Dimensions } from "react-native";
import colors from "../../config/colors";
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
        

// function ({ children, title, subTitle })
function AddBumpForm({COORDS,navigation,onSelect})
{
    var { height, width } = Dimensions.get('window');
    height = height -30;
    const [viewerHeight, setViewerHeight] = useState(height);
 
    const [deviceType, setDeviceType] = useState(null);
    const [info, setInfo] = useState(null);

    const handleDeviceType = async () => {
      let dType = await Device.getDeviceTypeAsync();
      setDeviceType(dType);
    };
   
    useEffect(() => {
     
    }, []);
    const validationSchema = Yup.object().shape({
        Type: Yup.string().required("نوع المطب").min(2, "نوع المطب مطلوب")
        .max(9),     
      });
      const handleSubmit = async (Bump, { resetForm }) => {
        //const token = await authStorage.getToken();
        let Feature = {
          type:"Point",
          table:"STREETSBUMP",
          PropsObj:{Type:Bump.Type+"0"},
          pCoordinate:COORDS      
         };
    
        const result = await tabletApi.InsertFeature(Feature.type,Feature.table,Feature.PropsObj,Feature.pCoordinate);
        console.log(result);
        if (!result.ok) {
          setUploadVisible(false);
          setInfo({
            Status: "إضافة مطب   ",
          });
          // setLoading(false);
          return;
        }
        else {   
        //  setLoading(false);
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
          <View style={{flex:1,backgroundColor:colors.lightDark}}>
          <Form
          initialValues={{
            signBoardImage: [],
            Type:"",
            Notes:"",    
          }}
         onSubmit={handleSubmit}
         //validationSchema={validationSchema}
        >
          <ScrollView>
            {false&&<View style={styles.imagesection}>
              <FormImagePicker name="signBoardImage" capture={true}  />
            </View>}
            <View style={styles.section}>         
              <Field
                name="Type"
                placeholder={"النوع"}
                style={[styles.name]}
                showPlaceholder={true}
                //value={selectedSignBoard.CommercialName}
              />           
              <Field
                name="Notes"
                multiline
                showPlaceholder={false}
                numberOfLines={3}
                placeholder="ملاحظات"
                style={[styles.name]}
              />             
            </View>
            {<SubmitButton title={"إضافة مطبّ" }/>}
          </ScrollView>
        </Form>
        </View>
        </View> 
    );
}

export default AddBumpForm;
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
