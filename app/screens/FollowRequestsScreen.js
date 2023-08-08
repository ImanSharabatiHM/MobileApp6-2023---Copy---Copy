import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
import requestApi from "../api/request";
import Info from "../components/Info";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import routes from "../navigation/routes";
import Card from "../components/CardRequest";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
import * as IntentLauncher from 'expo-intent-launcher';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as Network from 'expo-network';
const initialLayout = { width: Dimensions.get("window").width };
import ActivityIndicator from "../components/ActivityIndicator";

function FollowRequestsScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const {user,setUser}=useAuth();
  const [proje, getProje] = useState(null);
  const [requests, setRequests] = useState({
    loading: false,
    data: null
    
  });
  const [error, setError] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const handledata = async () => {
    getRequests();
     
  };
  const getRequests = async () => {
    setRequests({ loading: true, data: null });
    const result = await requestApi.getRequestsByID(user.nameidentifier);
    if (!result.ok) { 
       setRequests({ loading: false, data: null });

      setError(true);
      return;
    }
    console.log(result);
    setRequests({ loading: false, data: result.data });
  };
  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const wifi = async () => {
    console.log("WIFI");
    startActivityAsync(ActivityAction.WIRELESS_SETTINGS);
    //IntentLauncher.startActivityAsync(IntentLauncherAndroid.ACTION_WIFI_SETTINGS);
}
  useEffect(() => {
    console.log(user);
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    handledata();
    handleNetwork();
    //GetRequestsByIdApi.request(user.nameidentifier);//user.id

  }, []);

  return (
    <>
    <ActivityIndicator visible={requests.loading} /> 
        {!isConnected && (
      <Info
        numberOfLines={2}
        buttonText="اتّصال بالشّبكة"
        buttonVisible={true}
        color={colors.danger}
        message={ 
          "لتتمكّن من استخدام الخدمة يرجى الاتّصال بشبكة الإنترنت"
        }
        onPress={() =>{console.log("ssss");wifi();}}
      />
    )}
     {(!requests.loading && requests.data?.length==0)&& (
      <Info
        numberOfLines={5}
        buttonText="تقديم طلب"
        buttonVisible={true}
        color={colors.primary}
        message={ 
          ("لم يتمّ تقديم طلبات من قبلك")
        }
        //onPress={() => navigation.navigate(routes.COMPLAINTS)}
      />
    )}
     {isConnected&& <Screen style={styles.screen}>
      {(!requests.loading && requests.data?.length!=0)&& (
        <FlatList
          data={requests.data}
          keyExtractor={(item) => item.TALAB_NO+Math.random()}
          renderItem={({ item }) => (
            <Card
            title={item.TALAB_NAME+"\n"+"رقم الطلب: "+item.TALAB_NO}              
            status={item.STAT} 
            //unitno={item.UNIT_NO}
            date={dayjs(item.TALAB_DATE).locale("ar").format('dddd D-MM-YYYY \nالساعة:  h:mm A')} 
            notes={item.NOTES==""?"-":item.NOTES}     
            imageHeight={450}
            onPress={() => {
                //getUnit(item);
               // modalizeRef.current.open();
              }}
             
            // base64={'data:image/png;base64,'+item.IMAGE}
            //  /imageUrl= {"http://10.11.20.9/php/ImagesHeraf/10-282-0a5-3.jpg"}
            />
          )}
        />
      )}
    </Screen>}
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


export default FollowRequestsScreen;
