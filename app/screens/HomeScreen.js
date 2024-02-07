import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  useAnimatedValue

} from "react-native";
import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import {Modal} from "react-native";
import  * as modal from "react-native-modal";
 
import updateLocale from "dayjs/plugin/updateLocale";
import { Alert } from "react-native";
import constants from "../config/constants";
import PresidantMsg from "../config/PresidantMsg";

import { CubeNavigationHorizontal } from "react-native-3dcube-navigation";
import { onScroll } from "react-native-redash";

import {
  MAX_HEADER_HEIGHT,
  MIN_HEADER_HEIGHT,
} from "../components/home/Header";
import SearchButton, { BUTTON_HEIGHT } from "../components/home/SearchButton";
import Cover from "../components/home/Cover";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import Carousel from "../components/carousel/Carousel";
import CardInfo from "../components/CardInfo";
import Animated,{interpolate,Extrapolation,useSharedValue,useAnimatedScrollHandler} from "react-native-reanimated";
import Story from "../components/Story";
import { ScrollView } from "react-native";
import Icon from "../components/Icon";
import icons from "../config/icons";
import Card from "../components/skeleton/Card";
import Stories from "../components/skeleton/Stories";
import HaberSkeleton from "../components/skeleton/Haber";
import Etkinlik from "../components/skeleton/Etkinlik";
import { AppModalize } from "../components/Modalize";
import Service from "../components/skeleton/Service";
import AppText from "../components/Text";
import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import facilities from "../config/facilities";

import routes from "../navigation/routes";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { ErrorMessage } from "../components/forms";
import contentApi from "../api/content";
import notificationApi from "../api/notification";
import AppWebView from "../components/WebView";
import servicesApi from "../api/service";
import StoryContainer from "../components/story/StoryContainer";
import useNotificationsCount from "../notification/useNotificationsCount";
import * as Device from "expo-device";
import loginhmScreen from "./LoginhmScreen";
import { Modalize } from "react-native-modalize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

 
 const { width, height } = Dimensions.get("window");

function HomeScreen({ navigation }) {
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [content, setContent] = useState(null);

  const [isModelOpen, setModel] = useState(false);
  const [isModelPlaceOpen, setModelPlace] = useState(false);
  const [showIncompleteFeature, setShowIncompleteFeature] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);
  const [viewerHeight, setViewerHeight] = useState(height);

  const [stories, setStories] = useState({ loading: false, data: null });
  const [services, setServices] = useState({ loading: false, data: null });
  const [etkinlikler, setEtkinlikler] = useState({
    loading: false,
    data: null,
  });
  const [duyurular, setDuyurular] = useState({ loading: false, data: null });
  const [baskanMesaj, setBaskanMesaj] = useState({
    loading: false,
    data: null,
  });
  const [haberler, setHaberler] = useState({ loading: false, data: null });
  const [homeContent, setHomeContent] = useState({
    loading: false,
    data: null
    
  });
  const [navItem, setNavItem] = useState(false);
  const [error, setError] = useState(false);
  const [deviceType, setDeviceType] = useState(null);

  const webModalizeRef = useRef(null);
  const webModalizeRef1 = useRef(null);
  const webModalizeRef2 = useRef(null);

  const modalizeRef = useRef(null);

  const  y=useSharedValue(0,false);

  const { setNotificationCount } = useNotificationsCount();

  const handleDeviceType = async () => {
    let dType = await Device.getDeviceTypeAsync();
    setDeviceType(dType);
  };

  const handleServices = async () => {
    getStories();

    getNotifications();
    getShowIncompleteFeature();
    getHomeContent();
    topServices();
    getEtkinlikler();
    GetClarifications();
    getHaberler();
   getBaskanMesaj();
  };

  const getHomeContent = async () => {
    setHomeContent({ loading: true, data: null });
    const result = await contentApi.getHomeContent();
    setHomeContent({ loading: false, data: null });
    if (!result.ok) {
      setError(true);
      return;
    }
  //console.log(result);
    setHomeContent({ loading: false, data: result.data });
  };
  const getShowIncompleteFeature = async () => {
    ////console.log(user.nameidentifier);
    const result = await contentApi.ShowIncompleteFeature();

    if (!result.ok) {
      setShowIncompleteFeature(0);
      setError(true);
      return;
    }
    if(result.data==1)
    setShowIncompleteFeature(result.data);
    else     setShowIncompleteFeature(false);

    
  };
  const getNotifications = async () => {
    //console.log(user.nameidentifier);
    const result = await notificationApi.getNotificationsNotReadCount(user.nameidentifier);

    if (!result.ok) {
      setNotificationCount(0);
      setError(true);
      return;
    }
     //console.log(result);
    
    setNotificationCount(result.data);
  };

  const topServices = async () => {
    setServices({ loading: true, data: null });
    const result = await servicesApi.getServices();
    const staticservices=[
      {contentId:"ser1",iconActive:"arsarayicbedel_passive",title:"الخدمة الأولى",isAnonymous:false,rout:"http://www.google.com"},
      {contentId:"ser2",iconActive:"guncelhaberler_passive",title:"الخدمة الثانية",isAnonymous:false,rout:"http://www.google.com"},
      {contentId:"ser3",iconActive:"etkinlikler_passive",title:"الخدمة الثانية",isAnonymous:false,rout:"http://www.google.com"},
      {contentId:"ser4",iconActive:"imardurumbilgisi_passive",title:"الخدمة الثانية",isAnonymous:false,rout:"http://www.google.com"}   
    ];
    if (!result.ok) {
      setError(true);
      setServices({ loading: false, data:null });
      return;
    }
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    setServices({ loading: false, data:data });
  };

  const getEtkinlikler = async () => {
    setEtkinlikler({ loading: true, data: null });
    const result = await contentApi.getEtkinlikler();
    if (!result.ok) {
      setError(true);    setEtkinlikler({ loading: false, data: null });

      return;
    }

    setEtkinlikler({ loading: false, data: result.data });
  };

  const getHaberler = async () => {
    setHaberler({ loading: true, data: null });
    const staticdata=[
      {dateCreated:"1/1/2022", contentId:"Hab1", title:"تحت رعاية رئيس الوزراء .. بلدية الخليل تفتتح ميدان قلقس جنوب المدينة", imageUrl:"http://www.hebron-city.ps/userfiles/image/2021/165.jpg"},
      {dateCreated:"1/1/2022", contentId:"Hab2", title:"بلدية الخليل تطلق سلسلة ورشات عمل", imageUrl:"http://www.hebron-city.ps/userfiles/image/2021/169.jpg"},
      {dateCreated:"1/1/2022", contentId:"Hab3", title:"بلدية الخليل تبحث مشروع تطبيق الهواتف النقّالة للخدمات الإلكترونية مع بلدية باغجلار التركية", imageUrl:"http://www.hebron-city.ps/userfiles/image/2021/176.jpg"},
      {dateCreated:"1/1/2022", contentId:"Hab4", title:"تحت رعاية رئيس الوزراء .. بلدية الخليل تفتتح ميدان قلقس جنوب المدينة", imageUrl:"http://www.hebron-city.ps/userfiles/image/2021/165.jpg"}
    ];
    setHaberler({ loading: true, data: [] });
    
        const result = await contentApi.getHaberlerNew();

    //console.log(result);
     if (!result.ok) {
    
      //setError(true); 
     // setHaberler({ loading: false, data: []});

      //Added by Iman
     //  //console.log("Set Manualllyyyy",result);
       setHaberler({ loading: false, data:[] });
      return;
    }
   setHaberler({ loading: false, data: result.data});
   //setHaberler({ loading: false, data:staticdata });
////console.log(result.data);
    if(result.data[0]==null)
   {setHaberler({ loading: false, data: [] });//console.log("ddddsss");
  }
   else setHaberler({ loading: false, data:result.data  });

  };

  const GetClarifications = async () => {
    setDuyurular({ loading: true, data: null });
    const result = await contentApi.GetClarifications();
    const staticdata=[
      {contentId:"Duy1",details:"test",title:"يرجى من جميع المواطنين تحديث بياناتهم من خلال تطبيق بلدية الخليل"},
      {contentId:"Duy2",details:"test",title:"للحصول على الرمز البريدي لأي بناء يرجى استخدام خدمة عنوانــي"},

    ];
   if (!result.ok)
     {
      setError(true);
      //Added by iman
       setDuyurular({ loading: false, data:null });

      return;
    }

    setDuyurular({ loading: false, data: result.data });
  };

  const getStories = async () => {
    setStories({ loading: true, data: null });
    const result = await contentApi.GetStories();
   const staticstories= [
      {header:"خبر1",contentID:"story1",avatar:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",image:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",video:""},
      {header:"خبر2",contentID:"story2",avatar:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",image:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",video:""},
      {header:"خبر3",contentID:"story3",avatar:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",image:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",video:""},
      {header:"خبر4",contentID:"story4",avatar:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",image:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",video:""},
      {header:"خبر5",contentID:"story5",avatar:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",image:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",video:""},
      {header:"خبر6",contentID:"story6",avatar:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",image:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",video:""},
      {header:"خبر7",contentID:"story7",avatar:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",image:"http://www.hebron-city.ps/userfiles/image/2021/178.jpg",video:""},
      {header:"8خبر",contentID:"story8",avatar:"http://www.hebron-city.ps/userfiles/image/2021/174.jpg",image:"",video:"https://www.youtube.com/watch?v=_oT435m0QeY&t=1s"}]
    
    if (!result.ok) {
      //console.log("Stories errrss");
      setStories({ loading: false, data: null });
      //Added for test
      //setStories({ loading: false, data: staticstories });
      setError(true);
      return;
    }
    //console.log(result);
     setStories({ loading: false, data: result.data });

  };

  const getBaskanMesaj = async () => {
    setBaskanMesaj({ loading: true, data: null });
    //const result = await contentApi.getBaskanMesajNew();
   // setBaskanMesaj({ loading: false, data: null });
   // if (!result.ok) 
    {
      //Added by iman
      setBaskanMesaj({ loading: false, data:  {title:"رسالة رئيس البلدية",
      description:"أ. تيسير أبو اسنينة",
      contentId:"PresidantMsg",
      imageUrl:"1"} });
      //setError(true);
      return;
    }

   // setBaskanMesaj({ loading: false, data: result.data });
  };

  const handleNavigation = (item) => {

    servicesApi.addServiceHit(item.id);
    //console.log(item.route);
    if (item.route.includes("http")) {
      setNavItem(item);
      webModalizeRef1.current.open();
    } //else navigation.navigate(item.route);
    else{
      if(item.route=="UserTax")  navigation.navigate(routes.EPAYMENT,{U_ID:-1})
      else
      {console.log(item.route);
        navigation.navigate(item.route);} 
      }
  };

  const handleEDevletLogin = (item) => {
    Alert.alert(
      constants.EDEVLETALERTMESSAGETITLE,
      constants.EDEVLETALERTMESSAGE,
      [
        {
          text: "تسجيل الدخول",
          onPress: () => {
            setNavItem(item);
            modalizeRef.current.open();
          },
        },
        {
          text: "انهاء",
        },
      ],
      { cancelable: true }
    );
  };

  const isExpired = (timestamp) => {
    const now = dayjs();
    const storedTime = dayjs.unix(timestamp);
    return storedTime.diff(now, "minute") > 30;
  };

  const decodeEntities = (encodedString) => {
    if (encodedString === null || encodedString === undefined) return "";
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
      nbsp: " ",
      amp: "&",
      quot: '"',
      lt: "<",
      gt: ">",
    };
    return encodedString
      .replace(translate_re, function (match, entity) {
        return translate[entity];
      })
      .replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
  };

  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    handleDeviceType();
    handleServices();
  }, []);

  const height = interpolate(y.value,
    inputRange= [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
    outputRange= [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
    extrapolate= Extrapolation.CLAMP,
  );
  const opacity = interpolate(y.value, 
    inputRange= [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT * 20],
    outputRange= [0, 1, 0],
    extrapolate=  Extrapolation.CLAMP,
  );
  const storyOpacity = interpolate(y.value, 
    inputRange= [-MAX_HEADER_HEIGHT / 8, 0, MAX_HEADER_HEIGHT / 8],
    outputRange= [0, 1, 0],
    extrapolate=  Extrapolation.CLAMP,
  );

  const onStorySelect = (index) => {
    //console.log("ppp"+index);
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll) => {
    //console.log("Next");
    const newIndex = currentUserIndex + 1;
    if (stories.data?.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, false);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll) => {
    //console.log("Previous")
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, false);
      }
    }
  };
  const onUserInfoOpen = (placeId) => {
    //setModel(true);
    //console.log("Willopen userinfo moad"+placeId);
    //webModalizeRef2.current.open();
   // //console.log(facilities[placeId]);
   setModelPlace(true);
    setContent(facilities[placeId]);
     
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue < scrollValue) {
      onStoryNext(true);
      //console.log("next");
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue > scrollValue) {
   onStoryPrevious();
      //console.log("previous");
      setCurrentScrollValue(scrollValue);
    }
  };

 
  const scrollHandler = useAnimatedScrollHandler({
    useNativeDriver:true,
    onScroll: (event) => {
       
      y.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      //isScrolling.value = true;
    },
    onEndDrag: (e) => {
      //isScrolling.value = false;
    },
  });
  return (
    <View style={styles.container}>
     {true&&<Header y={y} sticky={false} navigation={navigation} />}
      {true&&<Cover y={y} />}
      {true&&<Animated.ScrollView
       onScroll={scrollHandler}
       style={styles.contentContainer}
       showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.header}>
          <Header y={y} sticky={true} navigation={navigation} />
        </View>
        {true&&<View style={styles.coverShort}>
          <View style={styles.headerContainer}>
    
   <Animated.View style={[styles.searchButton, { opacity:opacity }]}>
     <SearchButton
       onPress={() => {
         navigation.push(routes.SEARCH, { services });
       }}
     />
   </Animated.View>
 </View>
</View>}

        {true&&<View style={styles.content}>
          <ErrorMessage
            error="حدث خطأ غير متوقع!"
            visible={loginFailed}
          />

          {
         // homeContent.loading && !homeContent.data?.haberler && (  <HaberSkeleton /> )
        //    haberler.loading && !haberler.data && (  <HaberSkeleton /> )
          }
          {  haberler?.data &&!haberler.loading && haberler.data.length!=0&&true && (
            <Carousel
              height={deviceType === 1 ? 350 : 500}
              deviceType={deviceType}
              onPress={async (item) => {              
                 const result = await contentApi.getNewsContent(
                  item.contentId
                );
                
                 console.log(result);
                if (!result.ok) {
                   setContent(null);

                  setError(true);
                  return;
                }
     
                item.details = result.data.body;
                item.news=true;
                item.urlpre=constants.HMURL;
                setContent(item);
                webModalizeRef.current.open();
              }}
              items={haberler.data.map((haber) => {
                if(haber!=null)
                return {
                  contentId: haber.contentId,
                  title: haber.title,
                  date:dayjs(haber.dateCreated).locale("ar").fromNow() ,
                  fullDate:"تاريخ النشر: "+haber.dateCreated.split("T")[0],
                  imageUrl: constants.HMURL+haber.imageUrl,
                  //details: haber.details,
                  images:[{"Id":"haber1img","img":haber.imageUrl}]
                };
              })}
            />
          )}


          {services?.data && !services.loading&& (
            <View>                         
              <View style={styles.sectionContainer}>
                <AppText style={[styles.sectionTitle]}>
                   أهم الخدمات</AppText>
              </View>
             
              {services.data.map((item, index) => {
                return (
                     <ListItem
                      IconComponent={
                        <Icon name={icons[item.iconActive]} localIcon={true} />
                      }
                      key={item.contentId}
                      title={item.title}
                      onPress={() => {
                       // //console.log(user);
                        if (!item.isAnonymous && user.role == "Anonymous")      
                         {//must log in         
                          navigation.navigate(routes.LOGINHM);
                         }
                        else if (
                          user.role == "EDevlet" &&
                          !isExpired(user.exp)
                        ) {
                          logOut();
                          handleEDevletLogin(item);
                        } 
                        else 
                        {
                          //console.log("GO to Service page..");
                           handleNavigation(item);
                        }
                      
                        }}
                      listStyle={styles.drawerItem}
                      textStyle={styles.drawerTextStyle}
                      chevronSize={25}
                      renderChevron
                    />
                 );
              }
              )}
              </View>
              
              
              )}
          {
         // duyurular.loading && !duyurular.data && <Card />
          }
          {duyurular?.data &&!duyurular.loading && (
            <>
              <View style={styles.sectionContainer}>
              <Carousel
                backgroundColor={colors.danger}
                style={"announceInfo"}
                showBullet={true}
                onPress={async (item) => {
                  webModalizeRef.current.open();
                  const result = await contentApi.getContentDetail(
                    item.contentId
                  );

                  if (!result.ok) {
                    setError(true);
                    //item.details= item.details;
                    //item.details="تفاصيل الإعلان الهام";
                    setContent(item);

                    return;
                  }
                  item.details = result.data.content;

                  setContent(item);
                }}
                items={duyurular.data.map((duyuru) => {
                  return {
                    contentId: duyuru.contentId,
                    title: "إعلان هام",
                    subTitle: duyuru.title,
                    imageUrl: require("../assets/uyari.png"),
                    details: duyuru.details,
                  };
                })}
              />
              </View>
            </>
          )}
          
  
            {true&&showIncompleteFeature&&<View style={styles.coverAlone}>
 
 <View style={styles.headerContainer}>
 <AppText style={styles.stortieHeaderAlone}>مرافق بلديـّـة الخليــل</AppText>
   {/*homeContent.loading && !homeContent.data?.stories && (
     <Stories deviceType={deviceType} />
   )*/
  // stories.loading && !stories.data && (
    // <Stories deviceType={deviceType} />)
   }
   {//homeContent.data?.stories && (
    showIncompleteFeature&& stories?.data &&
    (
     <Animated.View style={[styles.story, { opacity: 1 }]}>
        
       <ScrollView showsHorizontalScrollIndicator={false} horizontal>
         { stories.data.map((item, index) => (
           <Story
             key={index+"story"}
             deviceType={deviceType}
             title={item.header}
             avatar={item.avatar}
             onPress={() => {
               //console.log("Pressseddss");
             onStorySelect(index);
              //setImageIndex(index);
             //setVisible(true);
             }}
           />
         ))}
       </ScrollView>
     </Animated.View>
   )}
    
 </View>
</View>}


  
          

          <View style={styles.sectionContainer}></View>
          {
          //homeContent.loading && !homeContent.data?.baskanMesaj && <Card />
          }
          {baskanMesaj.data && (
            <CardInfo
              imageUrl={"1"}
              imageWidth={105}
              imageHeight={120}
              cardStyle={{
                backgroundColor: colors.primaryDark,
                paddingVertical: 0,
                paddingLeft: 0,
              }}
              detailStyle={{ marginVertical: 15 }}
              title={baskanMesaj.data.title}
              subTitle={baskanMesaj.data.description}
              onPress={async () => {
                let item = {
                  contentId:  baskanMesaj.data.contentId,
                  title:  baskanMesaj.data.title,
                  subTitle: baskanMesaj.data.description,
                  details: null,
                };

                //const result = await contentApi.getContentDetail(item.contentId );

                //if (!result.ok)
                {
                setError(true);
                  //AddedbyIman
                item.details =PresidantMsg.msg;
                item.images=[{Id:"msgImg",img:"/userfiles/image/ibrahimi%20masque.jpg"}];
                item.urlpre=constants.HMURL;
                setContent(item);
                webModalizeRef.current.open();
                return;
                }
               // item.details = result.data.content;
                //setContent(item);
               // webModalizeRef.current.open();
              }}
            />
          )}

          {
          //etkinlikler.loading && !etkinlikler.data && <Etkinlik />
          }
          {false &&etkinlikler.data &&
            //etkinlikler.data?.body?.etkinliklerResult?.NewDataSet["@xmlns"] ===undefined &&
             (
              <>
                <View style={styles.sectionContainer}>
                  <AppText style={styles.sectionTitle}>الأحداث</AppText>
                </View>
                <Carousel
                  height={deviceType === 1 ? 350 : 500}
                  deviceType={deviceType}
                  titleStyle={{ color: colors.primary }}
                  items={etkinlikler?.data?.body?.etkinliklerResult?.NewDataSet?.Table?.map(
                    (etkinlik, index) => {
                      let eventDate =
                        etkinlik.eventDate.split(" ")[0].split(".")[2] +
                        "-" +
                        etkinlik.eventDate.split(" ")[0].split(".")[1] +
                        "-" +
                        etkinlik.eventDate.split(" ")[0].split(".")[0] +
                        "T" +
                        etkinlik.eventDate.split(" ")[1] +
                        ":00.000+03:00";

                      return {
                        index,
                        title: etkinlik.eventDate,
                        subTitle: etkinlik.eventTitle["#cdata-section"],
                        imageUrl: etkinlik.eventImage["#cdata-section"],
                        details: etkinlik.eventContent["#cdata-section"],
                      };
                    }
                  )}
                />
              </>
            )}
          <View style={styles.sectionContainer}>
            {/* <AppText style={styles.sectionTitle}>PROJELER</AppText> */}
          </View>
         {showIncompleteFeature&&<TouchableWithoutFeedback
            onPress={() => navigation.push(routes.PROJELERSCREEN)}
          >
            <View
              style={{
                width: "100%",
                height: 250,
                borderRadius: 8,
                overflow: "hidden",
                backgroundColor: colors.primary,
              }}
            >
              <Image
                style={{ width: "100%", height: 250, resizeMode: "cover" }}
                source={require("../assets/projeler.png")}
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 250,
                  width: "100%",
                  alignItems: "center",
                  // justifyContent: "center",
                }}
              >
                <AppText
                  style={{
                    color: colors.white,
                    //fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 20,
                    textShadowOffset: { width: 2, height: 2 },
                    textShadowRadius: 1,
                    textShadowColor: colors.dark,
                  }}
                > المشاريع
                </AppText>
              </View>
            </View>
          </TouchableWithoutFeedback>}
          <View style={[styles.sectionContainer, { marginBottom: 75 }]} />
        </View>}
      </Animated.ScrollView>}
      {true&&showIncompleteFeature&&<Modal
        animationType="slide"
        transparent={true}
        visible={isModelOpen}
        //style={{ flex: 1 }}
        onShow={() => {
          if (currentUserIndex >= 0) {
           // //console.log("CurrentUserIndex"+currentUserIndex);
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        <CubeNavigationHorizontal
         callBackAfterSwipe={(g) => onScrollChange(g)}
          ref={modalScroll}
          style={{ flex: 1 }}
        >
          {//homeContent.data?.stories?.map((item, index) => {
             stories?.data?.map((item, index) => {
               ////console.log("ssssssssssssssssssss"+index);
            let placeId= "place9";
            let storyItem = {
              username: item.header,//item.header,
              profile: item.avatar,
              images:[],
              stories: item.subStories,
            };

            return (
              <StoryContainer
                key={index+"storycont"}
                onClose={onStoryClose}
                onStoryNext={onStoryNext}
                onStoryPrevious={onStoryPrevious}
                onUserInfoOpen={
                  () => {
                    //console.log("Pressseddss");
                  onUserInfoOpen(placeId);
                   //setImageIndex(index);
                  //setVisible(true);
                  }

                }
                placeId={item.contentID}
                user={storyItem}
                isNewStory={index!== currentUserIndex}
              />
            );
          })}
        </CubeNavigationHorizontal>

       {false&& <Modal
      animationType="slide"
      propagateSwipe={true}
      //transparent={true}
      visible={isModelPlaceOpen}> 
            <View style={styles.content__header} key="0">
            <TouchableOpacity onPress={ () => {setModelPlace(false);}}>
              <MaterialCommunityIcons
                name="close"
                color={colors.dark}
                size={35}
              />
            </TouchableOpacity>
             <AppText style={styles.content__heading} numberOfLines={4}>{facilities["bbb"].placeName} </AppText>                      
            <AppText style={styles.content__subheading}>{facilities["bbb"].placeLocation}</AppText>             
            <AppText style={styles.content__fulldate}> {facilities["bbb"].placeLocation} </AppText>                  
            </View>          
          <View style={styles.contentimages} key="3">              
                {false && (
                  <Carousel            
                  height={deviceType === 1 ? 350 : 300}
                  deviceType={deviceType}
                    onPress={async (item) => {
                    //  / modalizeRef.current.open();              
                    }}
                    items={facilities["bbb"].placeImages.map((image) => {              
                      return {
                        contentId: image.Id,
                        imageUrl:image.img,
                        height:300
                      };
                    })}
                  />
                )
                }             
          </View>
 
          <AppWebView source={{ uri: "http://www.hebron-city.ps/ar_category.aspx?id=hxhK92a24745578ahxhK92" }} />
           </Modal>} 
      </Modal>}
      {true&&<AppModalize
        ref={webModalizeRef}
        adjustToContentHeight={true}
        title={content?.title}
        subTitle={content?.subTitle}
        details={content?.details}
        fullDate={content?.fullDate}
        onPress={async () => {
         // //console.log("ssss");
          
          setContent(null);webModalizeRef.current.close();
        }}
        images={content?.images}
        urlpre={ constants.HMURL}
      >
        {false&&<AppWebView
          automaticallyAdjustContentInsets={true}
          scalesPageToFit={true}
          /*source={{
            html:
              "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
              decodeEntities(content?.details).split("<br />").join(""),
          }}*/
        />}
      </AppModalize>}

     { true&&<AppModalize ref={webModalizeRef1} title={navItem.title}
      
      >
        <AppWebView
          scrollEnabled={true}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={true}
          source={{
            uri: navItem.route,
          }}
        />
           <AppWebView
          automaticallyAdjustContentInsets={true}
          scalesPageToFit={true}
          source={{
            html:
              "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
              decodeEntities(content?.details).split("<br />").join(""),
          }}
        />
      </AppModalize>}
     { true&&<AppModalize ref={modalizeRef} title="تسجيل الدخول">
        <AppWebView
          source={{
            uri:
             // "https://****" +  constants.UUIDV4() + "****",
             "http://egate.hebron-city.ps/loginPage.aspx?ReturnUrl=%2f"
          }}
          scalesPageToFit={true}
          onNavigationStateChange={async (newNavState) => {
            if (newNavState.url.includes("https://www.turkiye.gov.tr/"))
              modalizeRef.current.close();
            if (
              newNavState.url.includes(
                "https://*****"
              )
            ) {
              modalizeRef.current.close();
              const result = await authApi.eDevletLogin(newNavState.url);
              if (!result.ok) return setLoginFailed(true);
              setLoginFailed(false);
              logInWithEDevlet(result.data.token);
              navigation.navigate(navItem.route);
              servicesApi.addServiceHit(navItem.id);
            }
          }}
        />
      </AppModalize>}
      {true&&<StatusBar style="light" />}
     {true&&<Footer y={y}  navigation={navigation} />}

    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  sectionContainer: { paddingVertical: 15 },
  sectionTitle: {
    color: colors.secondaryLight,
    fontSize: 18,
    },
    content__header: {
      padding: 15,
      paddingBottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    content__details: {
      alignSelf: "flex-start",

      textAlign: "right",
      padding: 15,
      fontSize:15,
      paddingBottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    content__heading: {
      marginBottom: 2,
      fontSize: 24,
      //fontWeight: "600",
      color: colors.secondary,
    },
  
    content__subheading: {
      marginVertical: 10,
      fontSize: 16,
      color: colors.secondaryLight,
    },
    content__fulldate: {
      marginVertical: 10,
      paddingRight:3,
      fontSize: 14,
      color: colors.primaryNew,
    },
  
    content__inside: {
      width: "100%",
      padding: 10,
    },
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },
  contentContainer: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
  },
  drawerItem: {
    backgroundColor: colors.white,
    borderBottomWidth:4,
    borderColor:colors.light
  },
  drawerTextStyle: {
    fontSize: 17,
    color: colors.secondary,
    alignSelf: "flex-start",
  },
  cover: {
    height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT * 2,
  },
  coverAlone: {
    //marginTop:10,
    height:200,
    backgroundColor:colors.twitter,
    borderRadius:8,
  },
  coverShort: {
    
    height: BUTTON_HEIGHT * 1.5,
  },
  header: { marginTop: BUTTON_HEIGHT },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  headerContainer: {

    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 20,
   marginTop:0,
  },
  headerContainerAlone: {
     ...StyleSheet.absoluteFillObject,
  borderRadius:7,
  paddingHorizontal: 5,
  },
  stortieHeader:
  {
    paddingVertical:0,
    color: colors.white,
    fontSize: 18,
    marginTop: 0,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: colors.lightDarkPlus,
    
  },
  stortieHeaderAlone:
  {
    paddingVertical:0,
    color: colors.white,
    fontSize: 18,
    marginTop: 0,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: colors.primaryNew,
    
  },
  story: {
    width: "100%",
    height: 150,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    bottom: 30,
    left: 20,
    right: 20,
    position: "absolute",
  },
  content: {
    paddingTop: 32,
    paddingHorizontal: 20,
    backgroundColor: "#EAEAEA",
  },
  seperatorStyle: {
    backgroundColor: colors.backgroundColor,
  },
});
