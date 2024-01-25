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



function AddFarmScreen({ navigation, route }) {
  const { user } = useAuth();
  const {operation,setOperation}=useState(1);//1 add 2 update 3 delete
  const getDeptProblemsApi = useApi(complaintApi.getComplaintDeptProblems);
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
   const[open,setOpen]=useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [units, setUnits] = useState({ loading: false, data: null });
  const [U_ID, setU_ID] = useState("");
  const [B_ID, setB_ID] = useState(route.params.B_ID);
  const [signBorads, setSignBorads] = useState({ loading: false, data: null });
  const [selectedSignBoard, setSelectedSignBoard] = useState({  TYPE_ID: 2,
    SerialNo:0,
    CommercialName: "يافطة جديدة",   
    UseID: 2,
    UnitID: "",
    Width: 0,
    Height: 0,
    Notes: "", 
    IsDeleted :0,
    Image:null});
    const validationSchema = Yup.object().shape({

      // UnitID: Yup.string().required("رقم الهوية مطلوب") .min(9, "يجب إدخال 9 أرقام") .max(9),
      CommercialName: Yup.string().required("الاسم التجاري") ,
      //Width: !isDeleted?Yup.string().required("عرض اليافطة"):,
     // Height: !isDeleted?Yup.string().required(" طول اليافطة"):{},
    
    
      signBoardImage: Yup.array(),
    
    
    });
  const [isForBuild, setIsForBuild] = useState(false);
  const [useID, setUseID] = useState(1);

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
  const getSignBoards = async (UnitID) => {
    const token = await authStorage.getToken();
    setSignBorads({ loading: true, data: null });
    const result = await tabletApi.GetSignBoards(UnitID, token);
    if (!result.ok) {
      // setError(true);
      setSignBorads({ loading: false, data: null });
      return;
    }
   // console.log(result);
    let data = result.data;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    let newSign = {
      SerialNo:0,
      TYPE_ID: 1,
      CommercialName: "يافطة جديدة",   
      UseID: 1,
      UnitID: "",
      Width: 0,
      Height: 0,
      Notes: "", 
      IsDeleted :0,
      Image:null,
      // LOCATION: location?.latitude ? location?.latitude : ""+","+ location?.longitude ? location?.longitude : "",     
    };
   data =[newSign].concat(data);

    setSignBorads({ loading: false, data });
  };

  useEffect(() => {
    // getDeptApi.request();
    getUnits();
    handleNetwork();
    // getDeptApi.request("0");
    // console.log(getDeptApi.data);
  }, []);

  const handleChange1 = async (ForBuilding) => {
    setIsForBuild(ForBuilding == 1);

  }
  const handleChange = async (UseID) => {
    setUseID(UseID);

  }
  const handleSubmit = async (signBoard, { resetForm }) => {
    console.log(user);
    setProgress(0);
    setUploadVisible(true);
    const token = await authStorage.getToken();
    console.log(token);
    let signBoardToAdd = {
      TYPE_ID: selectedSignBoard.TYPE_ID,
      CommercialName: signBoard.CommercialName,
      SerialNo:selectedSignBoard.SerialNo,
      UseID: signBoard.UseID,
      UnitID: U_ID,
      Width: signBoard.Width,
      Height: signBoard.Height,
      Notes: signBoard.Notes,
      IsDeleted : signBoard.IsDeleted?1:0 ,
      Image: (await getBase64Images(signBoard.signBoardImage)).bytes,
      // LOCATION: location?.latitude ? location?.latitude : ""+","+ location?.longitude ? location?.longitude : "",     
    };

    //console.log( (signBoardToAdd));
    const result = await tabletApi.addSignBoard(token, signBoardToAdd, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
    if (!result.ok) {
     // console.log(result);


      setUploadVisible(false);
      setInfo({
        Status: "لم يتم حفظ اليافطة  ",


      });
      handleOpenChange(false);
      setLoading(false);
      return;
    }
    else {
      //console.log(result);
      if (result.data) {
        setInfo({
          Status: result.data.ResponseObject,
        });
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
            signBoardImage: [],
            UnitID: selectedSignBoard.UnitID,
            OldSignBorads: { label: selectedSignBoard.CommercialName, value: selectedSignBoard.SerialNo,item:selectedSignBoard },
            CommercialName: "",
            Height: selectedSignBoard.Height,
            Width: selectedSignBoard.Width,
            Notes: selectedSignBoard.Notes,
            ForBuilding:  selectedSignBoard.TYPE_ID,
            UseID: selectedSignBoard.UseID,
            IsDeleted:selectedSignBoard.IsDeleted
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <View style={styles.imagesection}>
              <FormImagePicker name="signBoardImage" capture={true}  />
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
              <FormRadioButtonGroup title={"نوع اليافطة:"} handleChange1={handleChange} name="UseID"
                items={[{ key: 1, label: "تجاري", value: 1 }, { key: 2, label: "عادي", value: 2 },
                { key: 3, label: "إعلام", value: 3 }
                  //{ label: "الكل", value: 5 }
                ]} />
              {!units.loading && units.data && !isForBuild && <Picker
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
                  getSignBoards(unit.U_ID);
                  ///scrollToIndexUnit(unit.label);      
                }}
              />}
              {true && <Picker
               items={
                  signBorads.data?.map(
                    (item) => {
                      return {
                         label: item.SerialNo>0?item.CommercialName+"   ("+item.Height+" cm *  "+item.Width+" cm)":item.CommercialName, value: item.SerialNo, item:item 
                        
                        }
                         ;
                    })
                }
                //items={signBorads?.data}
                name="OldSignBorads"
                placeholder="اختر يافطة"
                showPlaceholder={true}
                signBoardPicker={true}
                selectedItemChanged={(signBoard) => {
                  // console.log(signBoard);
                  //console.log(signBoard.value);
                 // if(signBoard.value>0)//Update or delete 
                  //setOperation(2);
                  //console.log(signBoard.CommercialName);
                  setSelectedSignBoard(signBoard.item)}}
              />}
              <Field
                name="CommercialName"
                placeholder={"الاسم التجاريّ"}
                style={[styles.name]}
                showPlaceholder={false}
                //value={selectedSignBoard.CommercialName}
              /><View style={[styles.dateSection]}>
               <Field
                name="Height"
                placeholder={"الطول"}
                style={[styles.nameh]}
                showPlaceholder={false}
                />
                <Field
                  name="Width"
                  placeholder={"العرض"}
                  style={[styles.nameh]}
                  showPlaceholder={false}
                />
                
              </View>
              <Field
                name="Notes"
                multiline
                showPlaceholder={false}
                numberOfLines={3}
                placeholder="ملاحظات"
                style={[styles.name]}
              />
              <FormSwitch
              name={"IsDeleted"}
              width={"100%"}
              placeholder={"حذف اليافطة"}
              onValueChange={(value)=>{setIsDeleted(value)}}
              ></FormSwitch>
            </View>
             
            {selectedSignBoard.SerialNo==0&&<SubmitButton  title={"إضافة يافطة" }/>}
            {selectedSignBoard.SerialNo>0&&<SubmitButton  buttonStyle={{backgroundColor: colors.danger}} title={"حذف أو تعديل يافطة" }/>}
          </ScrollView>

        </Form>
      </Screen>}
    </>
  );
}
export default AddFarmScreen;

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
