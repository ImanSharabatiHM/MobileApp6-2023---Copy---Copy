import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { FlatList } from "react-native";
import dayjs from "dayjs";
import { Alert } from "react-native";
import Screen from "../components/Screen";
import TextInput from "../components/TextInput";
import colors from "../config/colors";
import BackButton from "../navigation/header/BackButton";
import { ListItem, ListItemSeparator } from "../components/lists";
import servicesApi from "../api/service";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import useAuth from "../auth/useAuth";
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

const height = Dimensions.get("screen").height;

function SearchScreen({ navigation, route }) {
  console.log("search screen");
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [services, setServices] = useState([]);
  const [showTopServices, setShowTopServices] = useState(true);
  const [filteredServices, setFilteredServices] = useState([]);
  const [allServices, setAllServices] = useState([]);

  const [showFavorites, setShowFavorites] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);
  const modalizeRef = useRef(null);
  const webModalizeRef = useRef(null);
  const [navItem, setNavItem] = useState(false);

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
    if (!services) return;

    if (text?.length === 0) setShowTopServices(true);
    else setShowTopServices(false);

    let filtered = text
      ? allServices.filter(
        (service) =>
          service.title.includes(text) 
         // service.description.includes(text)
      )
      : allServices;
    setFilteredServices(filtered);
    setShowFavorites(true);
  };
 const filterFavorites = () => {
  return;
    if (!services) return;

    let filtered;
    if (!showFavorites) {
      filtered = services.filter((service) => service.isFavorite === true);
      setShowTopServices(false);
    } else {
      filtered = services;
      setShowTopServices(true);
    }
    setShowFavorites(!showFavorites);
    setFilteredServices(filtered);
  };
  const handleEDevletLogin = (item) => {
    Alert.alert(
      constants.EDEVLETALERTMESSAGETITLE,
      constants.EDEVLETALERTMESSAGE,
      [
        {
          text: "تحقق من هويتي الآن",
          onPress: () => {
            setNavItem(item);
            modalizeRef.current.open();
          },
        },
        {
          text: "تراجع",
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

 

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <TextInput
            IconComponent={
              <View style={styles.backIcon}>
                <BackButton 
                onPress={() => navigation.goBack()} 
                />
              </View>
            }
            showPlaceholder={false}
            containerStyle={styles.searchBox}
            textStyle={[styles.searchBoxText]}
            // autoFocus={true}
            onChangeText={handleChange}
            placeholder= "البحث من خلال اسم الخدمة"
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
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
                <AppText style={styles.sectionTitle}>
                     أهم الخدمات   
                </AppText>
                <TouchableOpacity onPress={filterFavorites}>
                  <AppText
                    style={[
                      styles.favorites,
                      showFavorites
                        ? { color: colors.primary }
                        : { color: colors.secondaryLight },
                    ]}
                  >  بحث                  
                  </AppText>
                </TouchableOpacity>
              </View>
          {!loading&&services.length !== 0 && showTopServices && (
            <>            
              {services
                .sort(function (a, b) {
                  return b.hitCount - a.hitCount;
                })
                .slice(0, 25)
                .map((item, index) => (
                    <ListItem
                      key={item.serviceId+item.contentId+"f"}
                      IconComponent={
                        <Icon
                          name={
                            item.isFavorite
                              ? icons[item.iconActive]
                              : icons[item.iconPassive]
                          }
                          localIcon={true}
                        />
                      }
                      title={item.title}
                      onPress={() => {
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
                        } else handleNavigation(item);
                      }}
                      listStyle={styles.drawerItem}
                      textStyle={styles.drawerTextStyle}
                      swipeBackground={colors.primary}
                      onSwipeableOpen={() => {
                        item.isFavorite = !item.isFavorite;
                        setFilteredServices(filteredServices);
                        setRefresh(!refresh);
                        servicesApi.addOrRemoveFavorite(item.id);
                      }}
                      renderRightActions={() => (
                        <Favorite
                          onPress={() => {
                            item.isFavorite = !item.isFavorite;
                            setFilteredServices(filteredServices);
                            setRefresh(!refresh);
                            servicesApi.addOrRemoveFavorite(item.id);
                          }}
                          isFavorite={item.isFavorite}
                        />
                      )}
                      chevronSize={25}
                      renderChevron
                    />
                ))}
            </>
          )}

          {filteredServices.length !== 0 && (
            <>
              <View style={styles.sectionContainer}>
                <AppText style={styles.sectionTitle}>جميع الخدمات</AppText>
                <TouchableOpacity>
                  <AppText
                    style={[
                      //onPress={false&&filterFavorites}//المفضلة
                      styles.favorites,
                      showFavorites
                        ? { color: colors.primary }
                        : { color: colors.secondaryLight },
                    ]}
                  > </AppText>
                </TouchableOpacity>
              </View>
              <View style={styles.searchResults}>
                {(false
                  ? filteredServices.slice(25, filteredServices.length)
                  : filteredServices
                ).map((item, index) => (
                    <ListItem
                      key={item.serviceId+item.contentId+"s"}
                      IconComponent={
                        <Icon
                          name={
                            item.isFavorite
                              ? icons[item.iconActive]
                              : icons[item.iconPassive]
                          }
                          localIcon={true}
                        />
                      }
                      title={item.title}
                      onPress={() => {
                        if (!item.isAnonymous && user.role == "Anonymous")
                        navigation.navigate(routes.LOGINHM);
                        else if ( user.role == "EDevlet" && !isExpired(user.exp) ) 
                        {
                          logOut();
                          handleEDevletLogin(item);
                        } 
                      
                        else handleNavigation(item);
                      }}
                      listStyle={styles.drawerItem}
                      textStyle={styles.drawerTextStyle}
                      swipeBackground={colors.primary}
                      onSwipeableOpen={() => {
                        item.isFavorite = !item.isFavorite;
                        setFilteredServices(filteredServices);
                        setRefresh(!refresh);
                        servicesApi.addOrRemoveFavorite(item.id);
                      }}
                      renderRightActions={() => (
                        <Favorite
                          onPress={() => {
                            item.isFavorite = !item.isFavorite;
                            setFilteredServices(filteredServices);
                            setRefresh(!refresh);
                            servicesApi.addOrRemoveFavorite(item.id);
                          }}
                          isFavorite={item.isFavorite}
                        />
                      )}
                      chevronSize={25}
                      renderChevron
                    />
                ))}
              </View>
            </>
          )}
        </ScrollView>
        {showFavorites && filteredServices.length === 0 && (
          <Info
            containerStyle={{
              height: height - (Constants.statusBarHeight + 120),
            }}
            message="ليس لديك أي خدمات مفضلة! يمكنك إضافة خدمات عن طريق التمرير إلى اليسار"
            buttonText="إضافة الآن"
            onPress={() => handleChange()}
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
export default SearchScreen;

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
    height: Constants.statusBarHeight + 44,
    backgroundColor: colors.primary,
    paddingTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 60,
    zIndex: 9,
  },
  searchContainer: {
    position: "absolute",
    top: Constants.statusBarHeight + 50,
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
