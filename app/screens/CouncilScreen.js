import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import customerApi from "../api/customer";

import CardInfoPerson from "../components/CardInfoPerson";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
const initialLayout = { width: Dimensions.get("window").width };

function CouncilScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const [proje, getProje] = useState(null);
  const getCustomerUnitsApi = useApi(customerApi.getUnitsByCustId);

  const [members, setMembers] = useState({ loading: false, data: null });
  const [error, setError] = useState(false);


  const getCouncilMembers = async () => {
    setMembers({ loading: false, data: null });
    const staticmembers=[
      {Id:"1mem",Name:"أ. تيسير أبو اسنينة",title:"رئيس البلدية",img:1},
      {Id:"2mem",Name:"د. أسماء حاتم الشرباتي",title:"نائب رئيس البلدية",img:2},
      {Id:"12mem",Name:"د. محمد غازي القواسمي",title:"عضو بلدية الخليل",img:3},

      {Id:"3mem",Name:"أ. محمد عمر النهنوش",title:"عضو بلدية الخليل",img:15},
      {Id:"4mem",Name:"م. ليانا أبو عيشة",title:"عضو بلدية الخليل", img:5},
      {Id:"5mem",Name:"أ. عمر القواسمي",title:"عضو بلدية الخليل",
      img:4},
      {Id:"6mem",Name:"د. شحادة الرجبي",title:"عضو بلدية الخليل",img:14},
      {Id:"9mem",Name:"م. عبد الرحمن بدر",title:"عضو بلدية الخليل",img:7},

      {Id:"7mem",Name:"م. يوسف الجعبري",title:"عضو بلدية الخليل",img:11},
      {Id:"11mem",Name:"د. نداء الدويك",title:"عضو بلدية الخليل",img:9},

      {Id:"8mem",Name:"م. ظافر السياج",title:"عضو بلدية الخليل",img:6},
      {Id:"13mem",Name:"أ. عبد الكريم فراح",title:"عضو بلدية الخليل",img:10},

      {Id:"10mem",Name:"م. تامر الأطرش",title:"عضو بلدية الخليل",img:8},
      {Id:"14mem",Name:"د. نضال الجعبري",title:"عضو بلدية الخليل",img:12},

      {Id:"15mem",Name:"أ. يحيى النتشة",title:"عضو بلدية الخليل",img:13}

    
    ];   
      setMembers({ loading: false, data:staticmembers });
      return;

  };

 

  const handleServices = async () => {
  getCouncilMembers();
  };

  useEffect(() => {
    handleServices();

  }, []);

  return (
    <>
      <Screen style={styles.screen}>
      {members.data && (
        <FlatList
          data={members.data}
          keyExtractor={(item) => item.Id+Math.random()}
          renderItem={({ item }) => (
            <CardInfoPerson
            title={item.Name}              
            subTitle={item.title}              
            imageHeight={450}
            onPress={() => {
                //getUnit(item);
                modalizeRef.current.open();
              }}
              thumbnailUrl ={item.img}
             // thumbnailUrl ={
              ///   "http://www.bagcilar.bel.tr/AjaxResize.ashx?width=50&file=" +
              //   item.img["#cdata-section"].substring(27)
             //  }
              imageUrl= {item.img}
            />
          )}
        />
      )}
    </Screen>
      <AppModalize
        ref={modalizeRef}
        //title={proje?.projectTitle["#cdata-section"]}
      >
        <AppWebView
          source={{
            html:
              "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
              proje?.projectContent["#cdata-section"].split("<br>").join(""),
          }}
        />
      </AppModalize>
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
});

export default CouncilScreen;
