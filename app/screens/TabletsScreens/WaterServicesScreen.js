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
import Card from "../../components/CardWaterRow";
import auth from "../../api/auth";
import authStorage from "../../auth/storage";

function WaterServicesScreen({ navigation,route }) {
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
              {"الاشتراك"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
          {true && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              { "الوحدة"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true&& (
            <Text style={ styles.headerItem } numberOfLines={1}>
              {"المستفيد"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              {"الاستخدام"}
            </Text>
          )}
           <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              {"رقم الشصي"}
            </Text>
          )}
           <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />     
      </View>
    );
  };
  const getWaterServices = async () => {
    setUnits({ loading: true, data: null });
     const token = await authStorage.getToken();

    const result = await tabletApi.GetWaterServicesByBID(B_ID,token); 
         console.log(result.data.Services)

    if (!result.ok) {
      setUnits({ loading: false, data: null });
      return;
    }  

    let data = result.data.Services.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    setUnits({ loading: false, data });
  };
  useEffect(() => {
    getWaterServices();
    //getCustomerUnitsApi.request(user.nameidentifier);//
  }, []);

  return (
    <>
     <ActivityIndicator visible={units.loading} />
     {!units.loading&&units.data&&   (
      <FlatList
      data={units.data}  
      ListHeaderComponent={ListHeader}
      all
      keyExtractor={(item) => item.U_ID+Math.random()}
        renderItem={({ item,index }) => (
          <Card
            //s={modalizeRef}
            iconName={"close"}
            index={index}
            unit={item}
            DAMGE={item.DAMGE}
            navigation={navigation}
            title={item.ServiceNo+""}
            unitNo={item.U_ID}
            all={item.U_ID==-1}
            other={item.U_ID==0}
            unitId={item.U_ID}
            unitOwner={item.CUST_NAME+""}
            unitUse={item.Use}
            SHASI_NO={item.SHASI_NO}

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
    width:"12%",
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
    width:"32%",
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

export default WaterServicesScreen;
