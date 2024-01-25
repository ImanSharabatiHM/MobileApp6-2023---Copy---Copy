import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import authApi from "../../api/auth";
import contentApi from "../../api/content";
import customerApi from "../../api/customer";
import tabletApi from "../../api/tablet";
import authStorage from "../../auth/storage";

import complaintApi from "../../api/complaint";
import UploadScreen from "../UploadScreen";
import colors from "../../config/colors";
import * as FileSystem from "expo-file-system";
import OfflineNotice from "../../components/OfflineNotice";
import FormRadioButtonGroup from "../../components/forms/FormRadioButtonGroup";
import FormSwitch from "../../components/forms/FormSwitch";


import useAuth from "../../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../../components/forms";
import FormImagePicker from "../../components/forms/FormImagePicker";
import useLocation from "../../hooks/useLocation";

import Screen from "../../components/Screen";
import constants from "../../config/constants";
import routes from "../../navigation/routes";
import ActivityIndicator from "../../components/ActivityIndicator";
import Info from "../../components/Info";
import complaint from "../../api/complaint";
import * as IntentLauncher from 'expo-intent-launcher';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as Network from 'expo-network';
import { color } from "react-native-reanimated";
import AppFormSwitch from "../../components/forms/FormSwitch";



function AddCarCounterScreen({ navigation, route }) {
  const { user } = useAuth();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const[open,setOpen]=useState(false);
  const[loading,setLoading]=useState(false);
  const[coords,setCoords]=useState(route.params.COORDS);
  const [info, setInfo] = useState(null);

  
  const [isConnected, setIsConnected] = useState(true);
  const [units, setUnits] = useState({ loading: false, data: null });
  const validationSchema = Yup.object().shape({
      CounterNO: Yup.string().required("رقم العداد").min(2, "رقم العداد مطلوب")
      .max(9),     
    });
  const [isForBuild, setIsForBuild] = useState(false);
  const [useID, setUseID] = useState(1);

  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const wifi = async () => {
    startActivityAsync(ActivityAction.WIRELESS_SETTINGS);
    //IntentLauncher.startActivityAsync(IntentLauncherAndroid.ACTION_WIFI_SETTINGS);
  }
  




  useEffect(() => {
    handleNetwork();
  }, []);


  const handleSubmit = async (Counter, { resetForm }) => {
    setUploadVisible(true);
    const token = await authStorage.getToken();
    let Feature = {
      type:"Point",
      table:"COUNTERTRAFFIC",
      PropsObj:{NO:Counter.CounterNO},
      pCoordinate:coords      
     };

    const result = await tabletApi.InsertFeature(Feature.type,Feature.table,Feature.PropsObj,Feature.pCoordinate);
    if (!result.ok) {
      setUploadVisible(false);
      setInfo({
        Status: "إضافة عداد سيارات ",
      });
       setLoading(false);
      return;
    }
    else {   
      setLoading(false);
      setUploadVisible(false);
      if (result.data) {
        setInfo({
          Status: result.data,
        });
      }
    }
   resetForm();
    
  };

  const getBase64Images = async (images) => {
    let imageToReturn = { bytes: "" };

    for (const image of images) {
      var extension = image.substr(image.lastIndexOf(".") + 1);
      imageToReturn = {
        dosyaCesidi: "image",
        dosyauzanti: "." + extension,
        //belgeTarihi: "01/01/2020",
        belgeSayisi: "1",
        bytes: await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        }),
      };
    }

    // console.log(imageToReturn.bytes.length);
    return imageToReturn;
  };

  return (
    <>
      {info && (
        <Info
          numberOfLines={5}
          buttonText="إضافة جديدة"
          buttonVisible={true}
          color={colors.danger}
          message={
            info.Status
          }
          onPress={() => {setInfo(null);}}
        />
      )}
      {!isConnected && (
        <Info
          numberOfLines={2}
          buttonText="اتّصال بالشّبكة"
          buttonVisible={true}
          color={colors.danger}
          message={
            "لتتمكّن من استخدام الخدمة يرجى الاتّصال بشبكة الإنترنت"
          }
          onPress={() => {  wifi(); }}
        />
      )}
      {isConnected && <Screen style={styles.container}>
        {false&&<UploadScreen
          onDone={() => {
            setUploadVisible(false);
          }}
          progress={progress}
          visible={uploadVisible}
        />}
        <ActivityIndicator visible={units.loading} />
        <Form
          initialValues={{
            signBoardImage: [],
            CounterNO:null,
            Notes:"",    
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            {false&&<View style={styles.imagesection}>
              <FormImagePicker name="signBoardImage" capture={true}  />
            </View>}
            <View style={styles.section}>         
              <Field
                name="CounterNO"
                placeholder={"رقم العداد"}
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
            {<SubmitButton title={"إضافة عداد سيارات" }/>}
          </ScrollView>
        </Form>
      </Screen>}
    </>
  );
}
export default AddCarCounterScreen;

const styles = StyleSheet.create({
  section: { marginHorizontal: "10%", width: "80%", fontSize: 14, },
  Field: {
    width: "50%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    // /color: colors.black
  },
  dateSection: {
    width: "100%",
    flexDirection: 'row', fontSize: 14
  },
  nameh: {
    width: "51%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew, textAlign: "right",
    

  },
  name: {
    width: "100%",
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew, textAlign: "right",

  },
  button: { width: "70%" },
  imagesection: { width: "100%" },

  container: {
    fontSize: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
