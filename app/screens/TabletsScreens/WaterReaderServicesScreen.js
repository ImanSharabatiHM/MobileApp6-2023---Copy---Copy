import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions,View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import tabletApi from "../../api/tablet";
import Text from "../../components/Text";
import { ListItemSeparator } from "../../components/lists";
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

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
import Card from "../../components/CardWaterReaderRow";
import auth from "../../api/auth";
import authStorage from "../../auth/storage";
import water from "../../api/water";

function WaterReaderServicesScreen({ navigation,route }) {
  const modalizeRef = useRef(null);
  const [proje, getProje] = useState(null);
  const [unit, getUnit] = useState(null);
  const getProjelerApi = useApi(contentApi.getProjeler);
  const getCustomerUnitsApi = useApi(customerApi.GetUnitDescription);
  const [index, setIndex] = useState(0);
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [units, setUnits] = useState({ loading: false, data: null });
  const [B_ID, setB_ID] = useState(0);//route.params.B_ID
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);


   
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
          {false&&<ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />}
          {false && (
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
          {false&&<ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />}
           {false && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              {"الاستخدام"}
            </Text>
          )}
           <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true && (
            <Text style={styles.headerItemSmallP} numberOfLines={1}>
              {"الشصي"}
            </Text>
          )}
           <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />    
           {true && (
            <Text style={styles.headerItemSmallPlus} numberOfLines={1}>
              {"السابقة"}
            </Text>
          )} 
           <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />    
           {true && (
            <Text style={styles.headerItemSmallPlus} numberOfLines={1}>
              {"الحالية"}
            </Text>
          )} 
      </View>
    );
  };
  const getWaterServices = async () => {
    setUnits({ loading: true, data: null });
     const token = await authStorage.getToken();
     const result = await water.GetWaterServicesForReader(token); 
     //console.log(result);
   /// const result = await tabletApi.GetWaterServicesByBID(B_ID,token); 
      ///   console.log(result.data.Services)

    if (!result.ok) {
      setUnits({ loading: false, data: null });
      return;
    }  

    //console.log(result.data.Services);
   // let data = result.data.Services.filter( (a)=> a.CURRENT_READ!=0  ) ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    
   let data = result.data.Services.slice(0,15) ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
     console.log(JSON.stringify( result.data.Services[1]))
    setUnits({ loading: false, data });
  };
  
  const checkBluetoothStatus = async () => {
    try {
      const isEnabled = await RNZebraBluetoothPrinter.isEnabledBluetooth();
      return isEnabled;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getWaterServices();
    checkBluetoothStatus()
    .then((isEnabled) => {
     // console.log("ENABLEEEED")
;
      setIsBluetoothEnabled(isEnabled);
    })
    .catch((error) => {
      console.error('Error checking Bluetooth status:', error);
    });


    check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN)
    .then((result) => {
      console.log(result);
      if (result === RESULTS.GRANTED) {
        // Permission is already granted, proceed with Bluetooth scanning.
        console.log("Permission is already granted")
        //scanDevices();
      } else {
        // Permission is not granted, request it.
        //console.log("sssss");
        return request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      }
    })
    .then((result) => {
      //console.log(result);
      if (result === RESULTS.GRANTED) {
        return request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

       
        // Permission granted, you can now scan for Bluetooth devices.
      } else {
        //console.log("dddddd");
        return request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      }
    })
    .then((result) => {
     // console.log(result);
      if (result === RESULTS.GRANTED) {
        return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);

        console.log("OKKK")
        //scanDevices();
        // Permission granted, you can now scan for Bluetooth devices.
      } else {
        return request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      }
    })

}, []);

  return (
    <View   >
     <ActivityIndicator visible={units.loading} />
     {!units.loading&&units.data&&   (
      <FlatList
      data={units.data}  
      ListHeaderComponent={ListHeader}      
      keyExtractor={(item) => item.SERVICE_NO+Math.random()}
        renderItem={({ item,index }) => (
          <Card
            //s={modalizeRef}
            iconName={"close"}
            index={index}
            unit={item}
            CUST_NO={item.CUST_NO}
            LAST_READ={item.LAST_READ}
            CURRENT_READ={item.CURRENT_READ+""}
            LAST_INV={item.QUANTITY_AMOUNT+""}
            DAMGE={item.DAMGE}
            navigation={navigation}
            title={item.SERVICE_NO+""}
            unitNo={item.U_ID}
            all={item.U_ID==-1}
            other={item.U_ID==0}
            unitId={item.U_ID}
            unitOwner={item.CUST_NAME+""}
            SERVICE_OWNER={item.CUST_NO+""}
             FEE_ID={item.FeeId}
             AMOUNT_TO_PAY={item.AmountToPay}

            unitUse={item.Use}
            SHASI_NO={item.SHASI_NO}
            onPress={() => {
             // console.log("dddddd");
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
     
    </View>
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
    width:"13.9%",
    textAlign:"center",
    paddingTop:5,
    marginRight:0,
    fontSize:12,
  },
  headerItemSmallPlus: {
    backgroundColor:colors.lightDark,
    textAlignVertical:"center",
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    width:"13%",
    textAlign:"center",
    paddingTop:5,
    marginRight:0,
    fontSize:12,
  },
  headerItemSmallP: {
    backgroundColor:colors.lightDark,
    textAlignVertical:"center",
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    width:"16%",
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
    width:"28%",
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

export default WaterReaderServicesScreen;
