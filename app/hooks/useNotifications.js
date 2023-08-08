import { useEffect,useState,useRef } from "react";

import * as Notifications from "expo-notifications";
import * as Location from 'expo-location';
import * as Camera from 'expo-camera';
 
import expoPushTokensApi from "../api/expoPushTokens";
import authApi from "../api/auth";
import * as Device from "expo-device";
import useAuth from "../auth/useAuth";
import * as Network from 'expo-network';
import routes from "../navigation/routes";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default useNotifications = (notificationListenerr,navigation) => {
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [isConnected, setIsConnected] = useState(true);
  const [badgeCount, setBadgeCount] = useState(0);

  const responseListener = useRef();
  useEffect(() => {
    handleNetwork();
     //getBadgeCount();
    registerForPushNotifications().then(token => setExpoPushToken(token));
    let device = {
      model: Device.deviceName,
      platform: Device.osName,
      version: Device.osVersion,
    };
    authApi.updateDevice(device);
    if (notificationListenerr)
     {
      const subscription = Notifications.addNotificationResponseReceivedListener(
        //notificationListenerr
        notification => {
          console.log("useNotification.jsssss",(notification));
          handleNotificationResponse(notification);

        }
      );
      return () => subscription.remove();
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("useNotification.jsvvvvv",(notification));
      setNotification(notification);
     // handleNotifications(notification);
    });
   // const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    responseListener.current = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, []);
  async function handleNetwork() {
    const { isInternetReachable } = await Network.getNetworkStateAsync();
    setIsConnected(isInternetReachable)
  }
  const wifi = async () => {
    console.log("WIFI");
    startActivityAsync(ActivityAction.WIRELESS_SETTINGS);
    //IntentLauncher.startActivityAsync(IntentLauncherAndroid.ACTION_WIFI_SETTINGS);
}
  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  const handleNotificationResponse = (response) => {
    
    // Redirect to the specific screen when the app is opened from the notification
    // Replace 'NotificationScreen' with the actual name of the screen you want to navigate to
    // You can also pass additional data from the notification to the screen by using response.notification.request.content.data
    if (response.notification.request.content.data && response.notification.request.content.data) {
      console.log("Will navigate!!!");
      //console.log(navigation);
      const newBadgeCount = badgeCount + 1;
       updateBadgeCount(newBadgeCount);
      
      const screenToOpen = response.notification.request.content.data.screen;
      //navigation.navigate(routes.NOTIFICATIONS);
    }
  };
 
  const updateBadgeCount = async (count) => {
    try {
      await Notifications.setBadgeCountAsync(count);
      setBadgeCount(count);
    } catch (error) {
      console.log('Error setting badge count:', error);
    }
  };
  const getBadgeCount = async () => {
    try {
      const badgeCount = await Notifications.getBadgeCountAsync();
      setBadgeCount(badgeCount);
    } catch (error) {
      console.log('Error getting badge count:', error);
    }
  };
  const registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted' ||!isConnected) {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();//.getDevicePushTokenAsync();//Notifications.getExpoPushTokenAsync();
      //const token = await Notifications.getDevicePushTokenAsync();//Notifications.getExpoPushTokenAsync();
      //console.log(user);
      expoPushTokensApi.register(token.data,user.nameidentifier==""?"0":user.nameidentifier,Device.deviceName);
      console.log("useNotification.js",token.data,"eeeeee",user.nameidentifier," ");
      setExpoPushToken(token.data);
      //token=token.data;
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
//expo push:android:upload --api-key AAAATY2N6nE:APA91bEdUojrD03PGjbExN6jrNHPIfvOBR8ODktuVg5cwcC9i4kZIYDPiSjdFBVbJIU_gXZstKjb0YZHTIhmJ3sOLkJHC-WfJ0m93i48aeXoUrVd8C4-OeQ5sJxO1kxTy1T6IviPj3c4