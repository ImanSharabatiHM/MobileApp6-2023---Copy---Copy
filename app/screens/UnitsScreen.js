import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import Card from "../components/CardUnit";
import colors from "../config/colors";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import contentApi from "../api/content";
import customerApi from "../api/customer";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
const initialLayout = { width: Dimensions.get("window").width };
import ActivityIndicator from "../components/ActivityIndicator";

function UnitsScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const [proje, getProje] = useState(null);
  const [unit, getUnit] = useState(null);
  const getProjelerApi = useApi(contentApi.getProjeler);
  const getCustomerUnitsApi = useApi(customerApi.GetUnitDescription);
  const [index, setIndex] = useState(0);
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [units, setUnits] = useState({ loading: false, data: null });

  const [routes] = useState([
    { key: "1", title: "جميع الوحدات" },
    { key: "2", title: "الوحدات المستخدمة" },
    { key: "3", title: "الوحدات المملوكة" },
  ]);

  const renderTabContent = (units) => (
    <Screen style={styles.screen}>
      {units && (
        <FlatList
          data={units}
          keyExtractor={(item) => "U_ID"+item.U_ID}
          renderItem={({ item }) => (
            <Card
              s={modalizeRef}
              unit={item}
              navigation={navigation}
              title={item.STREET_DESC}
              //unitNo={item.UNIT_NO}
              unitId={item.U_ID}
              unitOwner={item.OWNER_ID}
              unitUse={item.UNIT_USE==""?"غير معروف":item.UNIT_USE}
              imageHeight={250}
              onPress={() => {
               // getUnit(item);
                modalizeRef.current.open();
              }}
              //thumbnailUrl ={"http://10.11.20.9/php/ImagesHeraf/1-197-0.jpg"}
             // thumbnailUrl ={
              ///   "http://www.bagcilar.bel.tr/AjaxResize.ashx?width=50&file=" +
              //   item.img["#cdata-section"].substring(27)
             //  }
             // imageUrl= {item.img}//{item.img}
             imageUrl={item.Image}
            />
          )}
        />
      )}
    </Screen>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled={true}
       tabStyle={[styles.tab]}
      indicatorStyle={{ backgroundColor: colors.primary }}
      style={{ backgroundColor: colors.secondary,width:"100%"}}
      labelStyle={[styles.tabLabel]}
    />
  );

  const renderScene = SceneMap({
   
   // getProjelerApi.data?.body?.projelerResult.NewDataSet.Table.filter(
    //  (item) => item.projectType === "3"
   // )
    1: () =>
      renderTabContent(
        units.data 
      ),
    2: () =>
      renderTabContent(
        units.data.filter(
          (item) => (item.USER_ID == user.nameidentifier)
        )
      ),
    3: () =>
      renderTabContent(
        units.data.filter(  (item) => (item.OWNER_ID == user.nameidentifier ) ) 
        ),
    
  });
  const getUnits = async () => {
    setUnits({ loading: true, data: null });
   // const result = await getCustomerUnitsApi.request(user.nameidentifier);852950427
     const result = await customerApi.GetUnitDescription(user.nameidentifier);   
    setUnits({ loading: false, data: null });
     if (!result.ok) {
      setError(true);
      setUnits({ loading: false, data:null });
      return;
    }
    let data = result.data.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;//.slice(0, 5);
    setUnits({ loading: false, data });
  };
  useEffect(() => {
    getUnits();
    //getCustomerUnitsApi.request(user.nameidentifier);//
  }, []);

  return (
    <>
     <ActivityIndicator visible={units.loading} />
      <TabView
       navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        style={styles.tabView}
        lazy
      />
      <AppModalize
        ref={modalizeRef}
        title={"موقع الوحدة"}
      >
        <AppWebView
          source={{  //uri: navItem.route,
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
  tabView:
  {
   //backgroundColor:colors.danger,
     height:20,
    //color:colors.danger

  },
  tabLabel:
  {
    margin:0,
    // /width:"30%",
    padding:0,
    margin:0,
    fontFamily:"Cairo_600SemiBold",
    fontSize:14,
    //backgroundColor:colors.danger,
    color:colors.white

  }
  ,
  tab:
  {
    width:140,
    marginRight:2,
    padding:2
   // backgroundColor:colors.danger,
   // color:colors.white

  }
});

export default UnitsScreen;
