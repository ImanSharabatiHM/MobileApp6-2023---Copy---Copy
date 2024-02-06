import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions,View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import tabletApi from "../../api/tablet";
import Text from "../../components/Text";
import { ListItemSeparator } from "../../components/lists";

import colors from "../../config/colors";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import contentApi from "../../api/content";
import customerApi from "../../api/customer";
import AppWebView from "../../components/WebView";
import { AppModalize } from "../../components/Modalize";
import useAuth from "../../auth/useAuth";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
const initialLayout = { width: Dimensions.get("window").width };
import ActivityIndicator from "../../components/ActivityIndicator";
import Card from "../../components/CardUnitRow";

function BuildingUnitsScreen({ navigation,route }) {
  const modalizeRef = useRef(null);
  const [proje, getProje] = useState(null);
  const [unit, getUnit] = useState(null);
  const getProjelerApi = useApi(contentApi.getProjeler);
  const getCustomerUnitsApi = useApi(customerApi.GetUnitDescription);
  const [index, setIndex] = useState(0);
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [units, setUnits] = useState({ loading: false, data: null });
  const [B_ID, setB_ID] = useState(route.params.B_ID);


   
  const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
           {true && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              {" "}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              {"التسلسلي"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
          {true && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              { "الرقم"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
          {true && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              { "المساحة"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true&& (
            <Text style={styles.headerItem} numberOfLines={1}>
              {"المستفيد"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true && (
            <Text style={styles.headerItem} numberOfLines={1}>
              {"الاستخدام"}
            </Text>
          )}
           <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />     
      </View>
    );
  };
  const getUnits = async () => {
    setUnits({ loading: true, data: null });
    const result = await tabletApi.GetUnitDescriptionByBID(B_ID);
    if (!result.ok) {
      setUnits({ loading: false, data: null });
      return;
    }
    let data = result.data;//.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    setUnits({ loading: false, data });
  };
  useEffect(() => {
    getUnits();
    //getCustomerUnitsApi.request(user.nameidentifier);//
  }, []);

  return (
    <>
     <ActivityIndicator visible={units.loading} />
     {!units.loading&&units.data&&   (
      <FlatList
      initialNumToRender={20}
      windowSize={21}
      maxToRenderPerBatch={30}
      updateCellsBatchingPeriod={200}
      data={units.data}  
      ListHeaderComponent={ListHeader}
      all
      keyExtractor={(item) => item.U_ID+Math.random()}
        renderItem={({ item }) => (
          <Card
            //s={modalizeRef}
            iconName={"close"}
            unit={item}
            DAMGE={item.DAMGE}
            group={item.GROUP}
            navigation={navigation}
            title={item.STREET_DESC}
            unitArea={item.UNIT_AREA}
            unitNo={item.UNIT_NO}
            all={item.U_ID==-1}
            other={item.U_ID==0}
            unitId={item.U_ID}
            unitOwner={item.USER_NAME+""}
            unitUse={item.MAIN_USE_DESC+" /"+item.SUB_USE_DESC}
             onPress={() => {
              if(item.DAMGE=="N")
              {
                //setModalVisible(false);
               // handleOpenChange(false);

             // setFilteredTxt("");
             // setFiltered(items);
             // onSelectItem(item);
             // selectedItemChanged(item);

              }
              //console.log(item);
              
             // getUnit(item);
              //modalizeRef.current.open();
            }}
            thumbnailUrl ={"http://10.11.20.9/php/ImagesHeraf/1-197-0.jpg"}
           />
        )}
      />
      )}
     
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    width: 1,
    height: "100%",
  },
  headerItemSmall: {
    backgroundColor:colors.lightDark,
    textAlignVertical:"center",
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    width:"10%",
    textAlign:"center",
    paddingTop:5,
    marginRight:0,
    fontSize:12,
  },
  headerFooterStyle: {
    flexDirection:"row",
    width: '100%',
    height: 45,
    backgroundColor: '#FFF',
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
  headerItem: {
    backgroundColor:colors.lightDark,
    textAlignVertical:"center",
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    width:"27%",
    textAlign:"center",
    paddingTop:5,
    marginRight:0,
    fontSize:12,
  },
  tab:
  {
    width:140,
    marginRight:2,
    padding:2
   // backgroundColor:colors.danger,
   // color:colors.white

  }
});

export default BuildingUnitsScreen;
