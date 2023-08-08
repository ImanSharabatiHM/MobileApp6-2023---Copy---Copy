import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions ,View,TouchableOpacity,  ScrollView
} from "react-native";
import Carousel from "../components/carousel/Carousel";
import * as Device from "expo-device";
import { WebView } from "react-native-webview";

import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Card from "../components/CardPlace";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
import Info from "../components/Info";
import {Modal} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import facilities from "../config/facilities";
import AppText from "../components/Text";

const initialLayout = { width: Dimensions.get("window").width };

function PlacesScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const {user}=useAuth();
  const [proje, getProje] = useState(null);
  const [deviceType, setDeviceType] = useState(null);

  //const GetCMUserComplaintsByIDApi = useApi(complaintApi.GetCMUserComplaintsByID);
  const [places, setPlaces] = useState({
    loading: false,
    data: null
    
  });
   const [error, setError] = useState(false);
  const [info, setInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [place, setPlace] = useState(null);
  
  const handleDeviceType = async () => {
    let dType = await Device.getDeviceTypeAsync();
    setDeviceType(dType);
  };


 

  const handledata = async () => {
    getPlaces();
     
  };
  const getPlaces = async () => {
    setPlaces({ loading: true, data: null });
    //const result// = await complaintApi.GetCMUserComplaintsByID(user.nameidentifier,user.mobilephone);
    //if (!result.ok) { 
     // setComplaints({ loading: false, data: null });
    //  setError(true);
    //  return;
    //}

    //
  //  / console.log("result.d",result.data.length);
    setPlaces({ loading: false, data: 
    [
       {"placeId":"place9","placeName":"إسعاد الطفولة", "placeLocation":"عين سارة-خلف مدرسة الحسين بن علي ",
    "placeLocationUrl":"https://www.openstreetmap.org/?mlat=31.53770&mlon=35.10037#map=19/31.53770/35.10037",
    "placeInfo":"   ","placeImages":[{"Id":"place9.1","img":"http://www.hebron-city.ps/userfiles/image/child%20center.jpg"}]},

   {"placeId":"place3","placeName":"مكتبة بلديّة الخليل", "placeLocation":"طلعة بئر الحمّص",
    "placeLocationUrl":"https://www.openstreetmap.org/?mlat=31.52860&mlon=35.10223#map=19/31.52860/35.10223",
    "placeInfo":"تعتبر المكتبة العامة من أقدم واكبر المكتبات على مستوى الوطن وتقدم خدماتها لكافة شرائح المجتمع وذلك لرفع المستوى الثقافي لأبناء المدينة والمقيمين فيها والزائرين وإتاحة فرصة التثقيف لجميع الراغبين في المطالعة، وتشجيع المواطنين على استغلال أوقات الفراغ منها هو مفيد ومنتج ، وتنمية المواهب والمهارات العلمية والأدبية ، وتعزيز التقدم الاجتماعي والاقتصادي عن طريق تهيئة الوسائل للبحث العلمي الحر وتامين الكتب والمراجع والمصادر اللازمة لذلك ."+
    "- المكتبة العامة تقع المكتبة العامة على في وسط مدينة الخليل في بير الحمص وتبلغ مساحتها 750 معدل عدد روادها الشهري 3500 وتحتوي على 57000 كتاب وتقدم العديد من الخدمات ومنها دورات في التنمية البشرية ودورات الخط ورشات عمل أسبوعية للأطفال ودورات تصنيف ديوي العشري لمعلمين المدارس المشرفين على المكتبات المدرسية ومحاضرات وورشات عمل ."+
    "- المكتبة العامة المشارقة وتقع المكتبة في المنطقة الجنوبية من مدينة الخليل وتبغ مساحتها 600 متر مربع عدد ورادها الشهري 1400 وتحتوي على 13 الف كتاب وتقدم العديد من الخدمات مثل رواية قصة ورسوم وتلوين ومحاضرات وورشات عمل تربويه وثقافية وقانونية داخلي وخارجية وورشات رسم وتلوين وانشطة ترفيهية ومسابقات في القراءة ونادي قراء.       ",
    "placeImages":[{"Id":"place3.1","img":"http://www.hebron-city.ps/userfiles/image/Hebron%20library%2044.png"}]},
    
     {"placeId":"place5","placeName":"حديقة ابن رشد", "placeLocation":"عين سارة",
    "placeLocationUrl":"https://www.openstreetmap.org/?mlat=31.53268&mlon=35.09764#map=19/31.53268/35.09764",
    "placeInfo":"",
    "placeImages":[{"Id":"place5.1","img":"http://www.hebron-city.ps/userfiles/image/ibin%20roshd%201.jpg"}]},

    {"placeId":"place10","placeName":"المركز الكوري ", "placeLocation":"الحاووز الثاني- بجانب المدرسة الكورية",
    "placeLocationUrl":"https://www.openstreetmap.org/?mlat=31.50836&mlon=35.07398#map=17/31.50836/35.07398",
    "placeInfo":"أمسى المركز الكوري الفلسطيني مناره مميزة في الوطن على كافة المستويات ، ونسعى بالاستمرار بتحقيق الحلم الى حقيقة والاستمرار بالعطاء والتميز من خلال برامج جديدة وهادفة ومستمرة ، وفي كل يوم تضاف لمسة من التميز الى خدمات المركز يشهد لها الجميع"+
    "حيث يعتبر المركز الكوري الفلسطيني أحد منشآت بلدية الخليل الساعية لاستثمار طاقتها وجهودها في الانسان الفلسطيني ، وتوفير الدفيئة الثقافية الضرورية له لبناء كيانه الحضاري على أسس أكثر متانه تؤهله للمساهمة الفاعلة والمستديمة في الفعل الإنساني بمستوياته كافة من أجل تحفيز الإبداع الفني والثقافي والمعلوماتي لدى أبناء المجتمع والتي تعتبر ضمن الاهداف الاستراتيجية التنموية التي وضعتها بلدية الخليل لتحقيقها لخدمة مواطنيها وتعزيز اماكاناتهم في مجالات الثقافية والرياضة والشباب والترفيه ، كما ويعتبر المشروع الاكبر للحكومة الكورية في الاراضي الفلسطينية الممول من خلال الوكالة الدولية للتعاون الكوري  KOICA ،  لخدمة قطاع الشباب والثقافة في الخليل بشكل خاص ، وفي فلسطين بشكل عام من خلال تنظيم الفعاليات والتدريبات التي من شأنها رفع امكانيات الشباب والمجتمع والمؤسسات والرقي بخدماتها  من جهه ،  والعمل على استضافة التدريبات التخصصية  والفعاليات والمهرجانات والمؤتمرات والمعارض المحلية والدولية للمؤسسات الاهلية والحكومية على المستوى المحلي والدولي  ، حيث يقام المشروع المكون من مبنى ثقافي شبابي ومدرسة  على أرض بمساحة 13.000 متر مربع تعود ملكيتها لبلدية الخليل ، وتبلغ مساحة بناء المركز الكوري الفلسطيني 4000 متر مربع بالاضافة لحديقة بمساحة 2500 متر مربع .",
    "placeImages":[{"Id":"place10.1","img":"http://www.hebron-city.ps/userfiles/image/kor.jpg"}]}
   

    ]
    
    
    });
  };

 

  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    handleDeviceType();

    handledata();
  }, []);
  return (
    <>
     { (!places.loading && places.data?.length==0) && (
      <Info
        numberOfLines={5}
        //buttonText="تقديم شكوى"
        buttonVisible={false}
        color={colors.primary}
        message={ 
          ("لم يتمّ تحميل البيانات..  ")
        }
      //  onPress={() => navigation.navigate(routes.COMPLAINTS)}
      />
    )}
      <Screen style={styles.screen}>
      {!places.loading && places.data?.length!=0 && (
        <FlatList
          data={places.data}
          keyExtractor={(item) => item.placeId}
          renderItem={({ item }) => (
            <Card
            title={item.placeName}              
            status={item.placeLocation} 
            imageHeight={450}
            onPress={() => {
              setModalOpen(true);
              setPlace(item);

                //getUnit(item);
                //modalizeRef.current.open();
              }}
             
            // base64={''+item.IMAGE}
             imageUrl= {item.placeImages[0].img}
            />
          )}
        />
      )}
    </Screen>
    <Modal
      animationType="slide"
      propagateSwipe={true}
      style={styles.modal}
      //transparent={true}
      visible={modalOpen}> 
      <View style={{ flex: 1 }}>
          {true && (
            <View style={styles.content__header} key="0">
              <TouchableOpacity onPress={()=>{setModalOpen(false)}}>
                <MaterialCommunityIcons
                  name="close"
                  color={colors.dark}
                  size={35}
                />
              </TouchableOpacity>
              <View>
                {place?.placeName && (<AppText style={styles.content__heading} numberOfLines={4}>
                  {place?.placeName}
                </AppText>
                )}
                {place?.placeLocation && (
                  <View style={{ marginTop: 10, padding: 0 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 0 }} onPress={()=>{setIsMapOpen(!isMapOpen)}}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        color={isMapOpen?'green':colors.primaryNew}
                        size={28}

                      />
                      <AppText >{place.placeLocation}</AppText>
                    </TouchableOpacity>
                  </View>
                )}

              </View>
            </View>

          )}
          {isMapOpen &&
            <WebView
 
              scrollEnabled={true}
              scalesPageToFit={true}
              automaticallyAdjustContentInsets={false}
              source={{ uri: place?.placeLocationUrl }} />
          }
          {true && <View style={styles.content__inside} key="5">
            <ScrollView>
              <TouchableOpacity activeOpacity={1}>

                <View style={styles.contentimages} key="3">
                  {true && (
                    <Carousel
                      height={deviceType === 1 ? 350 : 300}
                      deviceType={deviceType}
                      onPress={async (item) => {
                        //  / modalizeRef.current.open();              
                      }}
                      items={place?.placeImages?.map((image) => {
                        return {
                          contentId: image.Id,
                          //title:"gg",
                          //subTitle: haber.title,
                          imageUrl: image.img,
                          height: 200
                        };
                      })}
                    />
                  )
                  }
                  {place?.placeInfo && <View><AppText numberOfLines={70} style={styles.content__details}>{place.placeInfo}</AppText></View>}
                </View>


              </TouchableOpacity>
            </ScrollView>
          </View>}
        </View>        
      </Modal>     
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
  contentimages: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  content__header: {
    width: "100%",
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content__details: {
    textAlign: 'justify',
    padding: 10,
    fontSize: 15,
    paddingBottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content__heading: {
    marginBottom: 2,
    fontSize: 24,
    padding: 10,
    //fontWeight: "600",
    color: colors.danger,
  },

  content__subheading: {
    marginVertical: 10,
    fontSize: 16,
    color: colors.secondaryLight,
  },
  content__fulldate: {
    marginVertical: 10,
    paddingRight: 0,
    fontSize: 14,
    color: colors.primaryNew,
  },
  modal: {
    width: "100%",
    height: "100%",
    marginTop: 10,

    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom:20,
  },
  content__inside: {
    flex: 1,
    width: "100%",
    padding: 0,
  },
  content__inside__map: {
    flex: 1,
    width: "100%",
    padding: 0,
    backgroundColor: colors.danger
  },
});


export default PlacesScreen;
