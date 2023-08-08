import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import authStorage from "../auth/storage";

import Constants from "expo-constants";
import { FlatList } from "react-native";
import dayjs from "dayjs";
import { Alert } from "react-native";
import Screen from "../components/Screen";
import TextInput from "../components/TextInput";
import CardEmployee from "../components/CardEmployee";
import colors from "../config/colors";
import BackButton from "../navigation/header/BackButton";
import { ListItem, ListItemSeparator } from "../components/lists";
import servicesApi from "../api/service";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import useAuth from "../auth/useAuth";
import customerApi from "../api/customer";

import authApi from "../api/auth";
import constants from "../config/constants";
import AppWebView from "../components/WebView";
import Favorite from "../components/Favorite";
import { AppModalize } from "../components/Modalize";
import Icon from "../components/Icon";
import icons from "../config/icons";
import AppText from "../components/Text";
import { ScrollView } from "react-native";
import routes from "../navigation/routes";
import { Cairo_200ExtraLight } from "@expo-google-fonts/cairo";
import { Colors } from "react-native-paper";

const height = Dimensions.get("screen").height;

function SearchEmployeeScreen({ navigation, route }) {
  console.log("search screen");
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [services, setServices] = useState([]);
  const [showTopServices, setShowTopServices] = useState(true);
  const [filteredServices, setFilteredServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const[suggestedCustomers,setSuggestedCustomers]=useState({Loading:false,data:null});
  const [showFavorites, setShowFavorites] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);
  const modalizeRef = useRef(null);
  const webModalizeRef = useRef(null);
  const [navItem, setNavItem] = useState(false);




  const getCustomers = async (name) => {
    var token = await authStorage.getToken();
    setSuggestedCustomers({ Loading: true, data: null });
    
    const result = await customerApi.SearchMunStaffMobileNumbers(token,name);
    console.log(result);
    if (!result.ok) {
      //setError(true); 
      setSuggestedCustomers({ Loading: false, data: null });
      return;
    }

    setSuggestedCustomers({ Loading: false, data: result.data.Employees });
  };

  const getServices = async () => {
    setLoading(true);
    const result = await servicesApi.getServices();
    const favoriteResult = await servicesApi.getFavorites();
    if (!result.ok) { return;};
    if (!favoriteResult.ok) { return;};

    const serviceResult = result.data.map((service) => {
      if (
        favoriteResult.data.some(
          (favorite) => favorite.serviceId === service.serviceId
        )
      ) {
        service.isFavorite = true;
      } else service.isFavorite = false;
      return service;
    });
    setLoading(false);
    setServices(serviceResult);
    //setFilteredServices(result.data);
    setAllServices((favoriteResult.data).concat(result.data));

    setFilteredServices((favoriteResult.data).concat(result.data));

  };

  useEffect(() => {
    getServices();
  }, []);

  const handleNavigation = (item) => {
    servicesApi.addServiceHit(item.id);
    if (item.route.includes("http")) {
      setNavItem(item);
      webModalizeRef.current.open();
    }
    else if(item.route=="ServiceInfo")
    {
       navigation.navigate(routes.SERVICEINFO,{item:{TalabCode:item.serviceId,TextAr:item.title,NoOfDays:item.NoOfDays}});

    } 
    
    else navigation.navigate(item.route);
  };

  const handleChange = (text) => {
    if(text.length<10)return;
    console.log("I will handle changeee!!");
    getCustomers(text);
  };


  return (
    <View style={styles.wrapper}>
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <TextInput
            IconComponent={
              <View style={styles.backIcon}>
                <BackButton onPress={() => navigation.goBack()} />
              </View>
            }
            showPlaceholder={false}
            containerStyle={styles.searchBox}
            textStyle={[styles.searchBoxText]}
            // autoFocus={true}
            onChangeText={handleChange}
            placeholder= "البحث من خلال اسم الموظف"
          />
        </View>
      </View>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        {error && (
          <Info
            message="حدث خطأ غير متوقع"
            Button={<Button title="حاول مرة أخرى" onPress={getServices()} />}
          />
        )}
        {suggestedCustomers.data&&!suggestedCustomers.Loading && (
        <FlatList
          data={suggestedCustomers.data}
          keyExtractor={(item,index) => "W"+index+Math.random()}
          renderItem={({ item,index }) => (
            <CardEmployee
            Mobile={item.EMP_MOBILE!=""?item.EMP_MOBILE:null}
            Name={item.EMP_NAME!=""?item.EMP_NAME:null}
            ID={item.EMP_NO!=""?item.EMP_NO:null}             
            notes={item.EMP_DEPARTMENT!=""?item.EMP_DEPARTMENT:null}   
            imageHeight={50}
            color={Colors.white}
            imageUrl={item.EMP_PHOTO!=""?item.EMP_PHOTO:null}
            onPress={() => {
               
              }}
             
            />
          )}
        />
      )}
       
      </Screen>

      <AppModalize ref={modalizeRef} title="تسجيل الدخول">
        <AppWebView
          source={{
            uri:
              "https://*****" +
              constants.UUIDV4() +
              "*****",
          }}
          scalesPageToFit={true}
          onNavigationStateChange={async (newNavState) => {
            if (newNavState.url.includes("https://www.turkiye.gov.tr/"))
              modalizeRef.current.close();
            if (
              newNavState.url.includes(
                "https://****"
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
      </AppModalize>
      <AppModalize ref={webModalizeRef} title={navItem.title}>
        <AppWebView
          source={{
            uri: navItem.route,
          }}
        />
      </AppModalize>
      {/* <StatusBar style="light" /> */}
    </View>
  );
}
export default SearchEmployeeScreen;

const styles = StyleSheet.create({
  buttonClose: {
    width: 100,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
  },
  backIcon: {
    width: 60,
    // flex: 1,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkNew,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  container: {
    backgroundColor: colors.backgroundColor,
    marginTop:50,
    paddingHorizontal: 20,
  },
  drawerItem: {
    backgroundColor: colors.white,
    borderBottomColor:colors.light,
    borderBottomWidth:2,
  },
  drawerTextStyle: {
    fontSize: 17,
    color: colors.secondary,
  },
  favorites: {
    fontSize: 12,
    //fontWeight: "bold",
    color: colors.darkNew,
  },
  searchHeader: {
    width: "100%",
    height:  0,
    backgroundColor: colors.primary,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 60,
    zIndex: 9,
  },
  searchContainer: {
    position: "absolute",
    top: Constants.statusBarHeight +1,
    width: "100%",
  },
  searchBox: {
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    backgroundColor: colors.white,
    borderRadius: 8,
    height: 64,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 0,
    shadowColor: colors.darkNew,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  searchBoxText: {
    fontSize: 11,
    color: colors.secondary,
    fontFamily:'Cairo_400Regular'
    
    //fontWeight: "normal",
  },
  searchResults: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  seperatorStyle: {
    backgroundColor: colors.backgroundColor,
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  sectionTitle: {
    color: colors.secondaryLight,
    fontSize: 18,
  },
  wrapper: { backgroundColor: colors.backgroundColor, flex: 1 },
});
