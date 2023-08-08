import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions ,View,ScrollView} from "react-native";
import customerApi from "../api/customer";
import HaberSkeleton from "../components/skeleton/Haber";
import Carousel from "../components/carousel/Carousel";
import Cover from "../components/home/Cover";
import Header from "../components/home/Header";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import * as Device from "expo-device";
import Animated from "react-native-reanimated";
import { onScroll } from "react-native-redash";

const initialLayout = { width: Dimensions.get("window").width };
import {
  MAX_HEADER_HEIGHT,
  MIN_HEADER_HEIGHT,
} from "../components/home/Header";
import SearchButton, { BUTTON_HEIGHT } from "../components/home/SearchButton";

function CouncilScreen1({ navigation }) {
  const { Value } = Animated;

  const modalizeRef = useRef(null);
  const [proje, getProje] = useState(null);
  const [deviceType, setDeviceType] = useState(null);

  const [members, setMembers] = useState({ loading: false, data: null });
  const [error, setError] = useState(false);
  const [y, setY] = useState(new Value(0));

  const handleDeviceType = async () => {
    let dType = await Device.getDeviceTypeAsync();
    setDeviceType(dType);
  };
  const getCouncilMembers = async () => {
    setMembers({ loading: false, data: null });
    const staticmembers=[
      {Id:"1mem",Name:"أ. تيسير أبو اسنينة",title:"رئيس البلدية",img:
      "http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%AA%D9%8A%D8%B3%D9%8A%D8%B1%20%D8%A7%D9%94%D8%A8%D9%88%20%D8%B3%D9%86%D9%8A%D9%86%D8%A9.jpg"},
      {Id:"2mem",Name:"د. أسماء حاتم الشرباتي",title:"نائب رئيس البلدية",img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9%20%D8%A7%D9%94%D8%B3%D9%85%D8%A7%D8%A1%20%D8%A7%D9%84%D8%B4%D8%B1%D8%A8%D8%A7%D8%AA%D9%8A.jpg"},    
      {Id:"3mem",Name:"أ. محمد عمر النهنوش",title:"عضو بلدية الخليل",img:
      "http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%A7%D8%B0%20%D9%85%D8%AD%D9%85%D8%AF%20%D8%B9%D9%85%D8%B1%20%D8%A7%D9%84%D9%86%D9%87%D9%86%D9%88%D8%B4.jpg"},
      {Id:"4mem",Name:"م. ليانا أبو عيشة",title:"عضو بلدية الخليل",img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D9%85%D9%87%D9%86%D8%AF%D8%B3%D8%A9%20%D9%84%D9%8A%D8%A7%D9%86%D8%A7%20%D8%A7%D8%A8%D9%88%20%D8%B9%D9%8A%D8%B4%D8%A9.jpg"},
      {Id:"5mem",Name:"أ. عمر القواسمي",title:"عضو بلدية الخليل",img:
      "http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%B9%D9%85%D8%B1%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B3%D9%85%D9%8A.jpg"},
      {Id:"6mem",Name:"د. شحادة الرجبي",title:"عضو بلدية الخليل",img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%20%D8%B4%D8%AD%D8%A7%D8%AF%D8%A9%20%D8%A7%D9%84%D8%B1%D8%AC%D8%A8%D9%8A.jpg"},
      {Id:"7mem",Name:"م. يوسف الجعبري",title:"عضو بلدية الخليل",img:
      "http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D9%85%D9%87%D9%86%D8%AF%D8%B3%20%D9%8A%D9%88%D8%B3%D9%81%20%D8%A7%D9%84%D8%AC%D8%B9%D8%A8%D8%B1%D9%8A.jpg"},
      {Id:"8mem",Name:"م. ظافر السياج",title:"عضو بلدية الخليل",img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D9%85%D9%87%D9%86%D8%AF%D8%B3%20%D8%B8%D8%A7%D9%81%D8%B1%20%D8%B3%D9%8A%D8%A7%D8%AC.jpg"},
      {Id:"9mem",Name:"م. عبد الرحمن بدر",title:"عضو بلدية الخليل",img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D9%85%D9%87%D9%86%D8%AF%D8%B3%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86%20%D8%A8%D8%AF%D8%B1.jpg"},
      {Id:"10mem",Name:"أ. زهير السعيد",title:"عضو بلدية الخليل",img:
      "http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%B2%D9%87%D9%8A%D8%B1%20%D8%A7%D9%84%D8%B3%D8%B9%D9%8A%D8%AF.jpg"},
      {Id:"11mem",Name:"د. نداء الدويك",title:"عضو بلدية الخليل",img:
      "http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%A7%D8%B0%D8%A9%20%D9%86%D8%AF%D8%A7%D8%A1%20%D8%A7%D9%84%D8%AF%D9%88%D9%8A%D9%83.jpg"},
      {Id:"12mem",Name:"د. محمد غازي القواسمي",title:"عضو بلدية الخليل",
      img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%20%D9%85%D8%AD%D9%85%D8%AF%20%D8%BA%D8%A7%D8%B2%D9%8A%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B3%D9%85%D9%8A.jpg"},
      {Id:"13mem",Name:"أ. عبد الكريم فراح",title:"عضو بلدية الخليل",img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85%20%D9%81%D8%B1%D8%A7%D8%AD.jpg"},
      {Id:"14mem",Name:"د. نضال الجعبري",title:"عضو بلدية الخليل",
      img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%20%D9%86%D8%B6%D8%A7%D9%84%20%D8%A7%D9%84%D8%AC%D8%B9%D8%A8%D8%B1%D9%8A.jpg"},
      {Id:"15mem",Name:"أ. يحيى النتشة",title:"عضو بلدية الخليل",
      img:"http://www.hebron-city.ps/userfiles/image/Commitee2022/%D9%8A%D8%AD%D9%8A%D9%89%20%D8%A7%D9%84%D9%86%D8%AA%D8%B4%D8%A9.png"},

    
    ];  
      setMembers({ loading: false, data:staticmembers });
      return;

  };

 

  const handleServices = async () => {
  getCouncilMembers();
  };

  useEffect(() => {
    handleDeviceType();
    handleServices();

  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={onScroll({ y })}
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
      > 
      <View style={styles.content}>
          {members.loading && !members.data && (  <HaberSkeleton /> )}         
           {members.data && (
            <Carousel
            
            height={deviceType === 1 ? 350 : 500}
            deviceType={deviceType}
              onPress={async (item) => {
                modalizeRef.current.open();              
              }}
              items={members.data.map((haber) => {              
                return {
                  contentId: haber.Id,
                  title: haber.Name,
                  subTitle: haber.title,
                  imageUrl: haber.img,
                  height:500
                };
              })}
            />
          )
          }       

    </View>  
    </Animated.ScrollView>
     </View>
   );
}

const styles = StyleSheet.create({
  sectionContainer: { paddingVertical: 15 },
  sectionTitle: {
    color: colors.secondaryLight,
    fontSize: 18,
    },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  contentContainer: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
  },
  drawerItem: {
    backgroundColor: colors.white,
  },
  drawerTextStyle: {
    fontSize: 17,
    color: colors.secondary,
  },
  cover: {
    height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT * 2,
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
  },
  story: {
    width: "100%",
    height: 150,
    marginTop: 10,
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
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    height:"100%"
  },
  seperatorStyle: {
    backgroundColor: colors.backgroundColor,
  },
});

export default CouncilScreen1;
