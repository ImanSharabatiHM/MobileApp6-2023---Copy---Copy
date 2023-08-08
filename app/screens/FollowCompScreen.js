import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Card from "../components/CardComplaint";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
import Info from "../components/Info";
import * as IntentLauncher from 'expo-intent-launcher';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as Network from 'expo-network';
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";

const initialLayout = { width: Dimensions.get("window").width };

function FollowCompScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const {user}=useAuth();
  const [proje, getProje] = useState(null);
  //const GetCMUserComplaintsByIDApi = useApi(complaintApi.GetCMUserComplaintsByID);
  const [complaints, setComplaints] = useState({
    loading: false,
    data: null
    
  });
   const [error, setError] = useState(false);
  const [info, setInfo] = useState(null);

  const [isConnected, setIsConnected] = useState(true);

  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const wifi = async () => {
    console.log("WIFI");
    startActivityAsync(ActivityAction.WIRELESS_SETTINGS);
    //IntentLauncher.startActivityAsync(IntentLauncherAndroid.ACTION_WIFI_SETTINGS);
}

 

  const handledata = async () => {
    getComplaints();
     
  };
  const getComplaints = async () => {
    setComplaints({ loading: true, data: null });
    const result = await complaintApi.GetCMUserComplaintsByID(user.nameidentifier,user.mobilephone);
    if (!result.ok) { 
      setComplaints({ loading: false, data: null });
      setError(true);
      return;
    }

    console.log("result.d",result.data.length);
    setComplaints({ loading: false, data: result.data });
  };

 

  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    handleNetwork();

    handledata();
  }, []);
  return (
    <>
        <ActivityIndicator visible={complaints.loading} /> 
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
    {isConnected&&<Screen style={styles.screen}>
      {!complaints.loading && complaints.data?.length!=0 && (
        <FlatList
          data={complaints.data}
          keyExtractor={(item) => "Complaint"+item.ID}
          renderItem={({ item }) => (
            <Card
            title={item.CATEGORY+"/"+item.CATEGORY_SUB}              
            status={item.STATUS} 
            date={dayjs(item.COMPLAINT_DATE).locale("ar").format('dddd D-MM-YYYY \nالساعة:  h:mm A') } 
            notes={"."+item.COMPLAINT_TEXT}     
            imageHeight={450}
            onPress={() => {
                //getUnit(item);
                //modalizeRef.current.open();
              }}
             
             base64={''+item.IMAGE}
            //  /imageUrl= {"http://10.11.20.9/php/ImagesHeraf/10-282-0a5-3.jpg"}
            />
          )}
        />
      )}
    </Screen>
     }{ (!complaints.loading && complaints.data?.length==0) && (
      <Info
        numberOfLines={5}
        buttonText="تقديم شكوى"
        buttonVisible={true}
        color={colors.primary}
        message={ 
          ("لم يتمّ تقديم شكاوي من قبلك")
        }
        onPress={() => navigation.navigate(routes.COMPLAINTS)}
      />
    )}
     
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


export default FollowCompScreen;
