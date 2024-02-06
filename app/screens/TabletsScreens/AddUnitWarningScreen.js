import React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import authApi from "../../api/auth";
import contentApi from "../../api/content";
import customerApi from "../../api/customer";
import tabletApi from "../../api/tablet";
import authStorage from "../../auth/storage";
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import complaintApi from "../../api/complaint";
import UploadScreen from "./../UploadScreen";
import colors from "../../config/colors";
import * as FileSystem from "expo-file-system";
import OfflineNotice from "../../../app/components/OfflineNotice";
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



function AddUnitWarningScreen({ navigation, route }) {
  const { user } = useAuth();
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);

  const {operation,setOperation}=useState(1);//1 add 2 update 3 delete
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
   const[open,setOpen]=useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [warningID, setWarningID] = useState(0);

  const [isConnected, setIsConnected] = useState(true);
  const [units, setUnits] = useState({ loading: false, data: null });
  const [U_ID, setU_ID] = useState("");
  const [B_ID, setB_ID] = useState(route.params.B_ID);
  const [warningTypes, setWarningTypes] = useState({ loading: false, data: null });
  const [selectedUnitWarning, setSelectedUnitWarning] = useState({  ID: 0,
    WarningTypeID: 2,
    UnitID: 789,
    Notes: "", 
    IsDeleted :0,
    Image:null});
   const [selectedWarningType, setSelectedWarningType] = useState({  ID: 1,
    WARNING_TYPE:"حرف وصناعات"});
    const validationSchema = Yup.object().shape({
      Notes: Yup.string().required("الملاحظات") ,    
      unitWarningImage: Yup.array().required("الصورة"),
    
    
    });
    const [isForBuild, setIsForBuild] = useState(false);
  const [useID, setUseID] = useState(1);
  const print = async () => {
    try {
      var deviceAddress="48:A4:93:A1:92:8D";

     // var res= await RNZebraBluetoothPrinter.connectDevice(deviceAddress);
      //console.log(res)
      const token = await authStorage.getToken();

      res=await tabletApi.GetWarningFile(token,warningID);
      var zpl=res.data;
      //console.log(zpl);
      res= await RNZebraBluetoothPrinter.pairedDevices();
      var p= await RNZebraBluetoothPrinter.print(deviceAddress,zpl);
      //console.log(p);
      // Close the connection (optional)  
      setInfo({Status:'Printing Completed!!'})
    } catch (error) {
      console.error('Error printing:', error);
      setInfo({Status:'Error printing:', error})
    }
  };
  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const wifi = async () => {
    console.log("WIFI");
    startActivityAsync(ActivityAction.WIRELESS_SETTINGS);
    //IntentLauncher.startActivityAsync(IntentLauncherAndroid.ACTION_WIFI_SETTINGS);
  }
  const getUnits = async () => {

    setUnits({ loading: true, data: null });
    const result = await tabletApi.GetUnitDescriptionByBID(B_ID);
    if (!result.ok) {
      setUnits({ loading: false, data: null });
      return;
    }
    let data = result.data;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    setUnits({ loading: false, data });
  };

  const handleOpenChange =async (val)=>
  {
    setOpen(val);
  }
  const getWarningTypes = async () => {
    const token = await authStorage.getToken();
    setWarningTypes({ loading: true, data: null });
    const result = await tabletApi.GetFeesUnitsWarningTypes( token);
    if (!result.ok) {
      // setError(true);
      setWarningTypes({ loading: false, data: null });
      return;
    }
   //console.log(result);
    let data = result.data;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    let newWarning = {
      ID:0,
      WarningTypeID: 0,
      CommercialName: "إخطار جديد",   
      UnitID: "",
      Notes: "", 
      IsDeleted :0,
      Image:null,
      // LOCATION: location?.latitude ? location?.latitude : ""+","+ location?.longitude ? location?.longitude : "",     
    };
   data =[newWarning].concat(data);

    setWarningTypes({ loading: false, data });
  };

  const checkBluetoothStatus = async () => {
    try {
      const isEnabled = await RNZebraBluetoothPrinter.isEnabledBluetooth();
      return isEnabled;
    } catch (error) {
      throw error;
    }
  };


  useEffect(() => {
    getUnits();
    getWarningTypes();
    handleNetwork();
    console.log("I am heree");
    checkBluetoothStatus()
      .then((isEnabled) => {
        setIsBluetoothEnabled(isEnabled);
      })
      .catch((error) => {
        console.error('Error checking Bluetooth status:', error);
      });


      check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          // Permission is already granted, proceed with Bluetooth scanning.
          console.log("Permission is already granted")
          //scanDevices();
        } else {
          // Permission is not granted, request it.
          console.log("sssss");
          return request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
        }
      })
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          return request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

         
          // Permission granted, you can now scan for Bluetooth devices.
        } else {
          console.log("ssss");
          return request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        }
      })
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);

          console.log("OKKK")
          //scanDevices();
          // Permission granted, you can now scan for Bluetooth devices.
        } else {
          return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        }
      })

  }, []);

  const handleChange1 = async (ForBuilding) => {
    setIsForBuild(ForBuilding == 1);

  }
  const handleChange = async (UseID) => {
    setUseID(UseID);

  }
  const handleSubmit = async (unitWarning, { resetForm }) => {
    //console.log(user);
    setProgress(0);
    setUploadVisible(true);
    const token = await authStorage.getToken();
    //console.log(token);
    let unitWarningToAdd = {
      WarningTypeID: selectedWarningType.ID,
      UnitID: U_ID,
      Notes: unitWarning.Notes,
      IsDeleted : unitWarning.IsDeleted?1:0 ,
      Printed:0,
      Image: (await getBase64Images(unitWarning.unitWarningImage)).bytes,
      // LOCATION: location?.latitude ? location?.latitude : ""+","+ location?.longitude ? location?.longitude : "",     
    };

     //console.log( (unitWarningToAdd));
    const result = await tabletApi.AddFeesUnitsWarnings(token, unitWarningToAdd, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
     console.log(result);
    if (!result.ok) {
     // console.log(result);


      setUploadVisible(false);
      setInfo({
        Status: "لم يتم حفظ الإخطار  ",


      });
      handleOpenChange(false);
      setLoading(false);
      return;
    }
    else {
      //console.log(result);
      if (result.data) {
        setInfo({
          Status: result.data.Message,
        });
        setWarningID(result.data.ResponseObject)   
        setLoading(false);
      }
    }
   resetForm();
    
  };


  /*const getBase64Images = async (images) => {
    let imagesToReturn = [];

    for (const image of images) {
      var extension = image.substr(image.lastIndexOf(".") + 1);
      imagesToReturn.push({
        dosyaCesidi: "image",
        dosyauzanti: "." + extension,
        //belgeTarihi: "01/01/2020",
        belgeSayisi: "1",
        dosya: await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        }),
      });
    }

    return imagesToReturn;
  };*/
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
      {info&&!open && (
        <Info
          numberOfLines={5}
          buttonText="إضافة جديدة"
          buttonVisible={true}
          secondbuttonVisible={true}
          secondbuttonText="طباعة"
          secondonPress={()=>{print()}}          
          color={colors.danger}
          message={
            info.Status

          }
          onPress={() => {setInfo(null);handleOpenChange(true);}}
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
          onPress={() => { console.log("ssss"); wifi(); }}
        />
      )}
      {isConnected && <Screen style={styles.container}>
        <UploadScreen
          onDone={() => {
            setUploadVisible(false);
          }}
          progress={progress}
          visible={uploadVisible}
        />
        <ActivityIndicator visible={units.loading} />
        <Form
          initialValues={{
            unitWarningImage: [],
            UnitID: selectedUnitWarning.UnitID,
            WarningType: { label: "حرف وصناعات", value: 1 },
            Notes: selectedUnitWarning.Notes,
            ForBuilding: 2,
            //UseID: selectedUnitWarning.UseID,
            IsDeleted:selectedUnitWarning.IsDeleted
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <View style={styles.imagesection}>
              <FormImagePicker name="unitWarningImage" capture={true}  />
            </View>

            <View style={styles.section}>
            <Field
                name="UnitID"
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={false}
                value={isForBuild || true ? "رقم البناء " + B_ID : "رقم الوحدة: " + U_ID}
                editable={false}
                width={'100%'}
                placeholder="رقم البناء أو الوحدة"
                style={[styles.name,{width:'50%'}]}
              />
              <FormRadioButtonGroup title={"مخصصة لـ:"} handleChange1={handleChange1} name="ForBuilding"
                items={[{ key: 1, label: "للبناء", value: 1 }, { key: 2, label: " وحدة داخل البناء", value: 2 }
                  //{ label: "الكل", value: 5 }
                ]} />
              {false&&<FormRadioButtonGroup title={"نوع اليافطة:"} handleChange1={handleChange} name="UseID"
                items={[{ key: 1, label: "تجاري", value: 1 }, { key: 2, label: "عادي", value: 2 },
                { key: 3, label: "إعلام", value: 3 }
                  //{ label: "الكل", value: 5 }
                ]} />}
              {!units.loading && units.data?.length>0&& !isForBuild && <Picker
                handleOpenChange={handleOpenChange}
                Open={open}
                type={"unitsumm"}
                unitsPicker={true}
                navigation={navigation}
                items={units.data}
                //name={"U_IDTxt"}
                editable={false}
                width={"100%"}
                placeholder="رقم الوحدة"
                showPlaceholder={true}
                searchPlaceHolder={"بحث عن رقم الوحدة"}
                selectedItemChanged={(unit) => {
                  setU_ID(unit.U_ID);
                  //getSignBoards(unit.U_ID);
                  ///scrollToIndexUnit(unit.label);      
                }}
              />}
              {true && <Picker
               items={
                  warningTypes.data?.map(
                    (item) => {
                      //return {  //label: item.SerialNo>0?item.CommercialName+"   ("+item.Height+" cm *  "+item.Width+" cm)":item.CommercialName, value: item.SerialNo, item:item };
                      return {label:item.WARNING_TYPE,value:item.ID}
                    })
                }
                //items={signBorads?.data}
                name="WarningType"
                placeholder="نوع الإخطار"
                showPlaceholder={true}
                signBoardPicker={false}
                selectedItemChanged={(warningType) => {
                  // console.log(signBoard);
                  //console.log(signBoard.value);
                 // if(signBoard.value>0)//Update or delete 
                  //setOperation(2);
                  //console.log(signBoard.CommercialName);
                  setSelectedWarningType({  ID: warningType.value,
                    WARNING_TYPE:warningType.label})}}
              />}
              
              <Field
                name="Notes"
                multiline
                showPlaceholder={false}
                numberOfLines={3}
                placeholder="ملاحظات"
                style={[styles.name]}
              />
             { false&&<FormSwitch
              name={"IsDeleted"}
              width={"100%"}
              placeholder={"حذف الإخطار"}
              onValueChange={(value)=>{setIsDeleted(value)}}
              ></FormSwitch>}
            </View>
             
            {selectedUnitWarning.ID==0&&<SubmitButton  title={"إضافة إخطار" }/>}
            {selectedUnitWarning.ID>0&&<SubmitButton  buttonStyle={{backgroundColor: colors.danger}} title={"حذف أو تعديل إخطار" }/>}
          </ScrollView>

        </Form>
      </Screen>}
    </>
  );
}
export default AddUnitWarningScreen;

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
