import React from "react";
import CardBuildDetails from "../../components/CardBuildDetails";
import { ListItem, ListItemSeparator } from "../../components/lists";

import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList,TouchableOpacity } from "react-native";
import * as Yup from "yup";
import Button from"../../components/Button"
import tabletApi from "../../api/tablet";

import authApi from "../../api/auth";
import contentApi from "../../api/content";
import RequestApi from "../../api/request";
import UploadScreen from "../UploadScreen";
import colors from "../../config/colors";
import * as FileSystem from "expo-file-system";
import {  Pressable, Text } from "react-native";
import useAuth from "../../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../../components/forms";
import FormImagePicker from "../../components/forms/FormImagePicker";
import Card from "../../components/CardCategory";

import Screen from "../../components/Screen";
import routes from "../../navigation/routes";
import ActivityIndicator from "../../components/ActivityIndicator";
import Info from "../../components/Info";
import customerApi from "../../api/customer";
import { Modal } from "react-native-paper";

const validationSchema = Yup.object().shape({

  RequestCustID: Yup.string().required("رقم الهوية مطلوب").min(9, "يجب إدخال 9 أرقام").max(9),
  RequestCode: Yup.string().required("القسم"),
  RequestCustName: Yup.string().required("اسم مقدم الطلب"),
  RequestUnitNo: Yup.string().required("رقم الوحدة"),
  RequestCustMobile: Yup.string().required("رقم هاتف مقدم الطلب"),
  RequestNotes: Yup.string().required("الملاحظات"),
  // RequestImage: Yup.array(),

});

function BuildingsProceduresScreen({ navigation, route }) {

  const { user } = useAuth();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [mainCategoriesVisible, setmainCategoriesVisible] = useState(true);//!route.params.FromUnits
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [building, setBuilding] = useState({ loading: false, data: null });

  const [subCategories, setSubCategories] = useState({ loading: false, data: null });
  const [requiredDocs, setRequiredDocs] = useState({ loading: false, data: null });
  const [fromUnits, setFromUnits] = useState(false);
  const [categories, setCategories] = useState({
    loading: false, data: null

  });
  const [mainCategories, setMainCategories] = useState({
    loading: false, data:
      [
        { TalabCode: '1', TextAr: 'يافطات', ImageName: "bannersIcon" },
        { TalabCode: '2', TextAr: 'تصوير', ImageName: "waterIcon" },
        { TalabCode: '3', TextAr: 'وحدات', ImageName: "buildingsIcon" },
        { TalabCode: '4', TextAr: 'صرف', ImageName: "sewageIcon" },
        { TalabCode: '5', TextAr: 'حرف', ImageName: "industryIcon" },
        { TalabCode: '6', TextAr: 'الرسوم', ImageName: "taxIcon" },
        { TalabCode: '7', TextAr: 'إخطارات', ImageName: "streetsIcon" },
        { TalabCode: '8', TextAr: 'كهرباء', ImageName: "electricityIcon" },
        { TalabCode: '9', TextAr: 'مخالفات', ImageName: "certificateIcon" },
      ]
  });

 
  const getRequiredDocs = async (TALAB_CODE) => {
    setRequiredDocs({ loading: true, data: null });
    const result = await RequestApi.GetNeededDocumentsByTalabCode(2);

    if (!result.ok) {
      // setError(true);
      setRequiredDocs({ loading: false, data: null });
      return;
    }
    let data = result.data;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    console.log(data);
    setRequiredDocs({ loading: false, data: data });
  };
  const getBuilding = async () => {
 
    setBuilding({ loading: true, data: null });
    const result = await tabletApi.GetBuildingDescByBID(route.params.B_ID);
    if (!result.ok) {
     // setError(true);
      setBuilding({ loading: false, data:null });
      return;
    }
    console.log(result);
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);    
    setBuilding({ loading: false, data });
  };
  const getCategories = async () => {
    setCategories({ loading: true, data: null });
    const result = await RequestApi.GetMainRequests();


    if (!result.ok) {
      //setError(true);
      setCategories({ loading: false, data: null });
      return;
    }
    let data = result.data;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    setCategories({ loading: false, data: data });
  };
  const getSubCategories = async (code) => {
    setSubCategories({ loading: true, data: null });
    const result = await RequestApi.GetSubRequests(code);


    if (!result.ok) {
      //setError(true);
      setSubCategories({ loading: false, data: null });
      return;
    }
    let data = result.data;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    setSubCategories({ loading: false, data: data });
  };
  useEffect(() => {
    // getUnits();
    getBuilding();
    getCategories();

  }, []);


  const handleSubmit = async (Request, { resetForm }) => {
    console.log(user);
    setProgress(0);
    setUploadVisible(true);
    //Request.RequestCode
    /*let RequestToAdd = {   
      UNIT_NO: FromUnits ? Request.RequestUnitNo:Request.RequestUnitNo,
      NOTES: Request.RequestNotes  +" رقم الهاتف: "+Request.RequestCustMobile,
      PAYEE_CODE: Request.RequestCustID,
      TALAB_CODE: Request.RequestCode.value,  
      B_NO:unit.BUILDING_NO, 
      STREET_NO: unit.U_STREET_NO,
      PIECE_CODE:unit.B_PARCEL,
      HOD_CODE:unit.B_BLOCK ,
        
       };
*/
    var unitno = fromUnits ? (Request.RequestUnitNo) : (Request.UnitNo.U_ID);
    let RequestToAdd = {
      UnitNo: unitno,
      NOTES: Request.RequestNotes + " رقم الهاتف: " + Request.RequestCustMobile,
      PayeeCode: Request.RequestCustID,
      TalabCode: "44",//Request.RequestCode.value,  
      Attachments: await getBase64Images(Request.RequestImages)
    };
    console.log(JSON.stringify(RequestToAdd));
    const result = await RequestApi.PostNewTalab(RequestToAdd, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
    console.log(JSON.stringify(result) + "   " + JSON.stringify(RequestToAdd));
    if (!result.ok) {
      setUploadVisible(false);
      setInfo({
        RequestStatus: "لم يتم تقديم الطلب",
        RequestNo: "",
      });
      setLoading(false);
      return;
    }
    else {

      if (result.data) {
        setInfo({
          RequestNo: result.data,
          RequestStatus: "قيد المتابعة",
        });
        setLoading(false);
      }
    }
    resetForm();
  };

  const viewTalabInfo = () => {
    navigation.navigate(routes.SERVICEINFO, { item: {} });

  }
  const scrollToIndex = (NAME) => {
    var filtered = categories.data.findIndex(item =>
      item.TextAr.includes(NAME),
    );
    //console.log(filtered);
    /* setSelectedIndex(filtered);
     if (filtered<0){
       setmsgVisible(true);
       setmsgTitle("المنطقة التي تبحث عنها غير موجودة!");
       return;}
     let searchIndex =filtered;
     flatListRef.scrollToIndex({animated: true, index: searchIndex});
     */
  }
  const scrollToIndexUnit = (NAME) => {
    var filtered = units.data.findIndex(item =>
      item.U_ID.includes(NAME),
    );
    //console.log(filtered);
    /* setSelectedIndex(filtered);
     if (filtered<0){
       setmsgVisible(true);
       setmsgTitle("المنطقة التي تبحث عنها غير موجودة!");
       return;}
     let searchIndex =filtered;
     flatListRef.scrollToIndex({animated: true, index: searchIndex});
     */
  }
  const getBase64Images = async (images) => {
    let imagesToReturn = [];


    for (let i = 0; i < images.length; i++) {
      var extension = images[i].substr(images[i].lastIndexOf(".") + 1);
      imagesToReturn.push({
        FILE_NAME: "test",
        FILE_EXT: "." + extension,

        FILE_BYTES: await FileSystem.readAsStringAsync(images[i], {
          encoding: FileSystem.EncodingType.Base64,
        }),
      });
    }

    return imagesToReturn;
  };


  return (
    <>
      {info && (
        <Info
          numberOfLines={5}
          buttonText="أعد التقديم"
          buttonVisible={true}
          color={colors.primary}
          message={
            (info.RequestNo !== "" ? (" . رقم الطلب : " + info.RequestNo + "\n" +
              "حالة الطلب : " + info.RequestStatus)
              : info.RequestStatus)
          }
          onPress={() => setInfo(null)}
        />
      )}
          <ActivityIndicator visible={building.loading} />

      <TouchableOpacity style={styles.container}>
      
        <View style={{ height: mainCategoriesVisible ? '80%' : 0 ,backgroundColor:colors.white}}>
          <CardBuildDetails
            BNO={building.data?.B_NO+''}
            STNO={building.data?.B_STREET_NO+''}
            BLOCK={building.data?.B_BLOCK+''}
            PARCEL={building.data?.B_PARCEL+''}
            IMAGE={building.data?.B_IMAGE}//{item.img}
            B_ID={route.params.B_ID}
              />
           <ListItemSeparator  seperatorStyle={styles.seperatorStyleTable} />
          {mainCategories.data && mainCategoriesVisible && !fromUnits && (
            <FlatList
              numColumns={5}
              data={mainCategories.data}
              keyExtractor={(item) => "mainc" + item.TalabCode
              }
              renderItem={({ item }) => (
                <Card
                  // s={modalizeRef}
                  unit={item}
                  navigation={navigation}
                  title={item.TextAr}
                  imageHeight={50}
                  onPress={() => {
                    //setmainCategoriesVisible(false);

                    console.log("ddd");
                    if(item.TalabCode==1)
                    navigation.navigate(routes.SIGNBOARD,{B_ID:route.params.B_ID}); 
                    else if(item.TalabCode==1)
                    {
                      navigation.navigate(routes.SIGNBOARD,{B_ID:route.params.B_ID}); 

                    }

                   // BNO:route.params.BNO, STNO:route.params.STNO,BLOCK:route.params.BLOCK,PARCEL:route.params.PARCEL
                    // modalizeRef.current.open();
                  }}
                  thumbnailUrl={"http://10.11.20.9/php/ImagesHeraf/1-197-0.jpg"}
                  // thumbnailUrl ={
                  ///   "http://www.bagcilar.bel.tr/AjaxResize.ashx?width=50&file=" +
                  //   item.img["#cdata-section"].substring(27)
                  //  }
                  imageUrl={item.ImageName}//{item.img}
                />
              )}
            />
          )}
       
          </View>
        <UploadScreen
          onDone={() => {
            setUploadVisible(false);
          }}
          progress={progress}
          visible={uploadVisible}
        />
        <ActivityIndicator visible={loading} />

       {
        false&&<Form
          initialValues={{
            RequestImages: [],
            RequestCustName: user.name,
            RequestCustID: user.nameidentifier,
            RequestUnitNo: "111",//route.params.item?.U_ID + "",//unit.UNIT_NO,
            RequestCustMobile: user.mobilephone == "" ? "" : user.mobilephone,
            UnitNo: "",
            RequestNotes: "",
            SubRequestCode: { label: "", value: "" },
            RequestCode: { label: "", value: "" }

          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
            <View style={styles.imagesection}>
              <FormImagePicker name={"RequestImages"} attach='true' />
            </View>
            <View style={styles.section}>
              {false && <Picker
                items={categories.data?.map(
                  (category) => { return { label: category.TextAr, value: category.TalabCode }; }
                )}
                name="RequestCode"
                placeholder="نوع الطلب"
                showPlaceholder={false}

              />}
              <Picker
                waterPicker={true}
                items={
                  categories.data?.map(
                    (category, index) => {
                      return { label: category.TextAr, value: category.TalabCode + "-" + index };
                    })
                }
                name="RequestCode"
                width={"100%"}
                placeholder="نوع الطلب"
                showPlaceholder={true}
                searchPlaceHolder={"بحث عن نوع الطلب"}
                selectedItemChanged={(category) => {
                  console.log("11");
                  getRequiredDocs(category.value);
                  // getSubCategories(category.value);
                  scrollToIndex(category.labels);
                }}
              />
              <Picker
                waterPicker={true}
                items={
                  subCategories?.data?.map(
                    (category, index) => {
                      return { label: category.TextAr, value: index };
                    })
                }
                name="SubRequestCode"
                width={"100%"}
                placeholder="نوع الطلب الفرعي"
                showPlaceholder={true}
                searchPlaceHolder={"بحث عن نوع الطلب"}
                selectedItemChanged={(category) => {
                  //scrollToIndex(category.label );      
                }}
              />


              {user.role != "Anonymous" && <View style={[styles.buttonClose]}>
                <Pressable visible={true} style={styles.buttonClose} onPress={viewTalabInfo}     >
                  <Text style={styles.buttonTxt}>{"عرض معلومات الطلب"}</Text>
                </Pressable>
              </View>}
              {<View style={styles.imagesection}>
                {false && <FlatList
                  scrollEnabled={false}
                  numColumns={1}
                  style={{ margin: 9 }}
                  data={requiredDocs?.data}
                  keyExtractor={(item, index) => item}
                  renderItem={({ item }) => (
                    <Field
                      editable={true}
                      name={"" + item}
                      placeholder={item}
                      style={[styles.name]}
                      showPlaceholder={false}
                    />
                    //<FormImagePicker  name={item} attach = 'false'/>
                  )}
                />}

              </View>}
              {!fromUnits && <Picker
                unitsPicker={true}
                navigation={navigation}
                items={
                  []
                }
                name={"UnitNo"}
                editable={false}
                width={"100%"}
                placeholder="رقم الوحدة"
                showPlaceholder={true}
                searchPlaceHolder={"بحث عن رقم الوحدة"}
                selectedItemChanged={(unit) => {
                  //  / scrollToIndexUnit(unit.label);      
                }}
              />}
              <Field
                editable={false}
                name="RequestCustName"
                placeholder={"الاسم"}
                style={[styles.name]}
                showPlaceholder={false}
              />
              <Field
                keyboardType="number-pad"
                maxLength={9}
                name="RequestCustID"
                editable={false}
                //showPlaceholder={user.role=="Anonymous"}
                showPlaceholder={false}
                placeholder="رقم الهوية"
                style={[styles.name]}
              />
              {fromUnits && <Field
                name="RequestUnitNo"
                placeholder="رقم الوحدة"
                showPlaceholder={false}
                style={[styles.name]}
                editable={false}
              />}
              <Field
                keyboardType="number-pad"
                name="RequestCustMobile"
                showPlaceholder={false}
                placeholder="رقم الهاتف المحمول"
                style={[styles.name]}
              />
              <Field
                name="RequestNotes"
                multiline
                showPlaceholder={false}
                numberOfLines={3}
                placeholder="ملاحظات"
                style={[styles.name]}
              />
            </View>
            <SubmitButton title="إرســـال" />
          </ScrollView>

        </Form>
}
<Button
        onPress={()=>navigation.goBack()}
        title={"إغلاق"}
        color={colors.primary}
        enabled={true}
        buttonStyle={{width:'80%',marginHorizontal:'10%',marginBotton:20,height:50,backgroundColor:colors.primary }}
        textStyle={{fontSize:14,color:colors.white}}

      />
</TouchableOpacity>
    </>
  );
}
export default BuildingsProceduresScreen;

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
