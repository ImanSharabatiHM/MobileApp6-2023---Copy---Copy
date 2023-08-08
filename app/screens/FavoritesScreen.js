import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, StatusBar, Button } from "react-native";
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
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import { AppModalize } from "../components/Modalize";
import service from "../api/service";

function FavoritesScreen({ navigation }) {
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);
  const modalizeRef = useRef(null);
  const webModalizeRef = useRef(null);
  const [navItem, setNavItem] = useState(false);
  const setServiceHitApi = useApi(servicesApi.addServiceHit);
  const setServicesApi = useApi(servicesApi.addOrRemoveFavorite);

  const getServices = async () => {
    setLoading(true);
    const favoriteResult = await servicesApi.getFavorites();
    setLoading(false);

    if (!favoriteResult.ok) setError(true);

    setServices(favoriteResult.data);
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
       navigation.navigate(routes.SERVICEINFO,{item:item});

    } 
    
    else navigation.navigate(item.route);
  };

  const handleEDevletLogin = (item) => {
    Alert.alert(
      constants.EDEVLETALERTMESSAGETITLE,
      constants.EDEVLETALERTMESSAGE,
      [
        {
          text: "تسجيل الدخول الآن",
          onPress: () => {
            setNavItem(item);
            modalizeRef.current.open();
          },
        },
        {
          text: "إنهاء",
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
    <>
      <Screen style={styles.container}>
        {error && (
          <Info
            message="حدث خطأ غير متوقع"
            Button={<Button title="حاول مرة أخرى" onPress={getServices()} />}
          />
        )}
        {services.length === 0 && (
          <Info
            message="خدمتك المفضلة غير موجودة ، انقر لإضافة ..."
            buttonText="أضف الآن"
            onPress={() => navigation.navigate(routes.SEARCH)}
          />
        )}
        <ActivityIndicator visible={loading} />
        {services && (
          <FlatList
            data={services}
            extraData={refresh}
            keyExtractor={(service) => service.serviceId.toString()}
            renderItem={({ item }) => (
              <ListItem
                FavoriteComponent={
                  <Favorite
                   /* onPress={() => {
                      setServicesApi.request(item.serviceId);
                      setServices(
                        services.filter(
                          (service) => service.serviceId !== item.serviceId
                        )
                      );
                      setRefresh(!refresh);
                    }}*/
                    style={{ backgroundColor: colors.white }}
                    color={colors.primary}
                    isFavorite={true}
                  />
                }
                title={item.title}
                onPress={() => {
                  console.log("Service pressedddd");
                  if (!item.isAnonymous && user.role == "Anonymous")
                    handleEDevletLogin(item);
                  else if (user.role == "EDevlet" && !isExpired(user.exp)) {
                    logOut();
                    handleEDevletLogin(item);
                  } else {

                    handleNavigation(item);
                  }
                }}
                listStyle={styles.drawerItem}
                textStyle={styles.drawerTextStyle}
                renderChevron
              />
            )}
            ItemSeparatorComponent={() => <ListItemSeparator />}
          />
        )}
      </Screen>
      <AppModalize ref={modalizeRef} title="المصادقة">
        <AppWebView
          source={{
            uri:
              "https://*****" +
              constants.UUIDV4() +
              "",
          }}
          scalesPageToFit={false}
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
      </AppModalize>
      <AppModalize ref={webModalizeRef} title={navItem.title}>
        <AppWebView
          source={{
            uri: navItem.route,
          }}
        />
      </AppModalize>
      <StatusBar style="light" />
    </>
  );
}
export default FavoritesScreen;

const styles = StyleSheet.create({
  buttonClose: {
    width: 100,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  drawerItem: {
    backgroundColor: colors.white,
  },
  drawerTextStyle: {
    color: colors.darkNew,
    //fontWeight: "bold",
  },
});
