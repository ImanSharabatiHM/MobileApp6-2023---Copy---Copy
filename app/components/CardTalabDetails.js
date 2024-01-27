import { useRef, useState, React } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";
import UploadScreen from "./../screens/UploadScreen";
import Info from "./Info";
import FormOneImagePicker from "../components/forms/FormOneImagePicker";
import FormImagePicker from "../components/forms/FormImagePicker";
import RequestApi from "../api/request";
import * as FileSystem from "expo-file-system";
import Message from "./Message";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import routes from "../navigation/routes";
import { AppModalize } from "./Modalize";
import { AppModal } from "./Modal";
import ActivityIndicator from "./ActivityIndicator";

import AppWebView from "./WebView";
import constants from "../config/constants";
import useAuth from "../auth/useAuth";

import Text from "./Text";
import colors from "../config/colors";
import { Dimensions } from "react-native";
import { color } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

function CardTalabDetails({
  talabno,
  navigation,
  imageHeight = 300,
  onPress,
  thumbnailUrl,
}) {
  const {user}=useAuth();
  const [progress, setProgress] = useState(0);

  const [navItem, setNavItem] = useState(false);
  const [taxVisible, settaxVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [info, setInfo] = useState(null);

  const webmodalizeRef = useRef(null);
  const modalizeRef = useRef(null);
  const appmodalRef = useRef(null);
  const [viewerHeight, setViewerHeight] = useState(height);
  const wkt = "POLYGON ((159920.9557 103851.8817, 159924.1642 103858.298800001, 159923.73 103857.77, 159914.12 103862.109999999, 159914.96 103863.09, 159910.2 103864.67, 159907.95 103858.310000001, 159920.9557 103851.8817))";
  const getBase64Images = async (images) => {
    let imagesToReturn = [];
     

    for (let i = 0; i < images.length; i++) {
      var extension = images[i].substr(images[i].lastIndexOf(".") + 1);
      console.log("extension")
      imagesToReturn.push({
        FILE_NAME:"Attach-"+talabno,
        FILE_EXT: "." + extension,       
        FILE_BYTES: await FileSystem.readAsStringAsync(images[i], {
          encoding: FileSystem.EncodingType.Base64,
        }),
      });
    }

    return imagesToReturn;
  };
  const handleSubmit = async (Request,{ resetForm }) => {
    setInfo(null);
    setProgress(0);
    setLoading(true);
    setUploadVisible(true);
    let images = [];
    for (let i = 0; i < Request.CC.length; i++) {
      images.push(Request.CC[i]);
    }
    for (let i = 0; i < Request.TalabAttach.length; i++) {
      images.push(Request.TalabAttach[i]);
    }
 
    let RequestToUpdate = {
      NOTES: Request.NoteText,
      EmpNo: user.serialnumber,
      TalabNo: talabno,
      Attachments: await getBase64Images(images)
    };
    const result = await RequestApi.PostRequestNotesAndAttach(RequestToUpdate, (progress) => {
      setProgress(progress);
      if (progress == 1) setLoading(true);
    });
    //console.log(RequestToUpdate);
     console.log(result.status)
    if (!result.ok) {
      setUploadVisible(false);
      setInfo({
        RequestStatus: "حصل خلل",
        RequestNo: talabno
      });
      setLoading(false);
      return;
    }
    else {

      if (result.data) {
         setInfo({
          RequestNo: talabno,
          RequestStatus: "تم بنجاح",
        }); 
        setLoading(false);
      }
    }
    resetForm();
  }

  return (
    <>

      {taxVisible && false && <Message
        isVisible={true}
        title={navItem.msg}
        onPress={() => { settaxVisible(false); }}
        buttonTitle={"إغلاق"} />}
      <AppModalize
        ref={modalizeRef}
        title={navItem.title}
        adjustToContentHeight={true}
        onLayout={(layout) => { setViewerHeight(layout.layout.height * .9); }}
        onPress={
          async () => {
            modalizeRef.current.close();
          }}
      >
        <View style={{ height: viewerHeight * .9 }}>
          
          {info && (
            <Info
              buttonVisible={true}
              buttonText="تفاصيل"
              message={info.RequestStatus}
              numberOfLines={8}
              notFound={false}

            />

          )}
        </View>
      </AppModalize>
   
      <TouchableWithoutFeedback >
        < View style={styles.firstContainer}>  
         {info && (
            <Info
              buttonVisible={true}
              buttonText="رجوع"
              message={info.RequestStatus}
              numberOfLines={2}
              notFound={false}
              onPress={()=>setInfo(null)}
            />

          )}
          <View style={styles.mainContainer}>
          <ActivityIndicator visible={loading} />
          <UploadScreen
      onDone={() => {
        setUploadVisible(false);
      }}
      progress={progress}
      visible={uploadVisible&&false}
    />
      
            <Form
              initialValues={{
                TalabAttach: [],
                NoteText: "",
                CC: []
              }}
              onSubmit={handleSubmit}
            >
              <View style={{ flexDirection: "column", width: '100%' }}>
                <Field
                  name="NoteText"
                  multiline
                  showPlaceholder={false}
                  numberOfLines={3}
                  placeholder="نص المطالعة"
                  style={[styles.notes]}
                />
                <View style={{ flexDirection: "row" }}>
                  {true && <FormOneImagePicker style={{ width: '100%', borderRadius: 2, top: 0 }} name={"TalabAttach"} attach='true' />}
                  <View>
                    <FormImagePicker style={{ width: '100%', borderRadius: 2, top: 0 }} name="CC" capture={true} />
                  </View>
                </View>
              </View>
              {<View style={[styles.buttonClose]}>
                <SubmitButton buttonStyle={styles.buttonClose} textStyle={styles.buttonTxt}
                  title="حفظ المطالعة والمرفقات"
                />
              </View>}
            </Form>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <AppModalize
        ref={webmodalizeRef}
        title={navItem.title}
        onPress={
          async () => {
            webmodalizeRef.current.close();
          }}
      >
        <AppWebView
          source={{
            //uri: constants.MAPLOCATIONURL+"?wkt="+unit.WKT,
            uri: constants.POSTALURL

          }}
          scrollEnabled={true}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={true}
        />
      </AppModalize>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    overflow: "hidden",
    width: "100%",
    height: '100%',
    flexDirection: "row",
    marginLeft: 0,
    marginTop: 0,
    backgroundColor: colors.lightDark
  },
  notes: {
    width: '90%',
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: colors.darkNew, textAlign: "right",
    padding: 5,
    paddingVertical: 0

  },
  firstContainer: {
    overflow: "hidden",
    width: "100%",
    height: 230,
    flexDirection: "column",
    marginLeft: 0,
    marginTop: 0,
    backgroundColor: colors.lightDark
  },

  card: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 0,
    overflow: "hidden",
    marginHorizontal: 10,
  },

  buttonTxt:
  {
    fontSize: 12,
    padding: 0,
    margin: 0,
    color: colors.white
  },
  newUserButton: {
    // /backgroundColor:colors.transparent,
    width: "30%",
    height: 40,
    marginHorizontal: 5,
    marginVertical: 4,
    paddingVertical: 4

  },
  detailsContainer: {
    flex: 2,
    alignItems: "flex-start",
    padding: 10,
  },
  buttonsContainer: {
    padding: 4,
    flexDirection: "row"
  },
  absoluteFill: {
    backgroundColor: colors.white,
    opacity: 0.8,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    // flex: 1,
    marginTop: 0,
    width: '100%',
    height: '100%',
    resizeMode: "stretch",
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 20,
    //  / transform: [{ rotate: '90deg' }]

  },
  subTitle: {
    color: colors.secondary,
    // fontWeight: "bold",
  },
  unitOwner: {
    color: colors.secondary,
    //  fontWeight: "bold",
  },
  unitUse: {
    color: colors.secondary,
    //fontWeight: "bold",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: colors.white,
  },
  title: {
    marginBottom: 7,
  },
});

export default CardTalabDetails;
