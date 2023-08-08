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

function ProjelerScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const [proje, getProje] = useState(null);
  const [unit, getUnit] = useState(null);
  const getCustomerUnitsApi = useApi(customerApi.getUnitsWithTaxByUserID);
  const [index, setIndex] = useState(0);
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [units, setUnits] = useState({ loading: false, data: null });

  const [routes] = useState([
    { key: "1", title: "جميع المشاريع" },
    { key: "2", title: " المشاريع القائمة" },
    { key: "3", title: "المشاريع المقترحة" },
  ]);

  const renderTabContent = (units) => (
    <Screen style={styles.screen}>
 
    </Screen>
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      indicatorStyle={{ backgroundColor: colors.primary }}
      style={{ backgroundColor: colors.secondary}}
      labelStyle={[styles.tabLabel]}
    />
  );

  const renderScene = SceneMap({
   // getProjelerApi.data?.body?.projelerResult.NewDataSet.Table.filter(
    //  (item) => item.projectType === "3"
   // )
    1: () =>
      renderTabContent(
        //getCustomerUnitsApi.data 
      ),
    2: () =>
      renderTabContent(
       // getCustomerUnitsApi.data.filter( (item) => item.USER_ID === user.nameidentifier )
      ),
    3: () =>
      renderTabContent(
      //  getCustomerUnitsApi.data.filter( (item) => item.OWNER_ID === user.nameidentifier )
      ),
    
  });
  const getUnits = async () => {
    setUnits({ loading: true, data: null });
    const result = await getCustomerUnitsApi.request(user.nameidentifier);
    setUnits({ loading: false, data: null });
    if (!result.ok) {
      setError(true);
      setUnits({ loading: false, data:null });
      return;
    }
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    //console.log(data);
    setUnits({ loading: false, data });
  };
  useEffect(() => {
    //getCustomerUnitsApi.request(user.nameidentifier);//
    //console.log(getCustomerUnitsApi.data);
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
    fontFamily:"Cairo_600SemiBold",
    fontSize:14,
    color:colors.white

  }
});

 
export default ProjelerScreen;
