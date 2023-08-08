import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions,View,Text } from "react-native";
import customerApi from "../api/customer";
import authStorage from "../auth/storage";

import complaintApi from "../api/complaint";
import employeeApi from "../api/employees";

import requestApi from "../api/request";
import Info from "../components/Info";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import routes from "../navigation/routes";
import Card from "../components/CardTransport";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
import Button from"../components/Button"
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Colors } from "react-native-paper";
import { color } from "react-native-reanimated";

const LOCATION_TASK_NAME = 'background-location-task-track-EMPP';
const initialLayout = { width: Dimensions.get("window").width };
let foregroundSubscription = null
 //Insert Employee Location
 const InsertEmployeeLocation = async (x,y,trackId,type) => {
  const result = await employeeApi.InsertEmployeeLocation(x,y,trackId,type);
  /*if (!result.ok) {      
      return;
    }*/
  };

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data
    const location = locations[0]
    if (location) {
      
      var x=location.coords.longitude;
      var y=location.coords.latitude;
      console.log("Location in background(", x,",",y,")");
      InsertEmployeeLocation(x,y,123,1);

    }
  }
})
function TrackingScreen({ navigation }) {
  
  const [position, setPosition] = useState(null)
  const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted||true){ 
        //console.log("OKKK");  
        let backgroundPermissionRequest =await Location.requestBackgroundPermissionsAsync();
        console.log("requestPermissions background", backgroundPermissionRequest);

      }}
  // Request permissions right after starting the app
  useEffect(() => {
    
    requestPermissions()
  }, [])

  // Start location tracking in foreground
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied froground");
      return
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove();

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      location => { 
        console.log(location.coords);

        setPosition(location.coords);
      }
    )
  }

  // Stop location tracking in foreground
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove()
    setPosition(null)
  }

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    requestPermissions();
    const token = await authStorage.getToken();
    console.log(token);

   // console.log("sss");
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync()
   // console.log("ggg");

    if (!granted) {
      console.log("location tracking denied background")
      return
    }

    //console.log("OKK permissions!!");
    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }

    console.log("background defined");
    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      console.log("Already started")
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    })
  }



  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("Location tacking stopped");
    }
  }
  return (
    <>
   
      <Screen style={styles.screen}>
      <View style={styles.container}>
      {false&&<Text>Longitude: {position?.longitude}</Text>}
      {false&&<Text>Latitude: {position?.latitude}</Text>}
      <View style={styles.separator} />
     {false&&<Button
        onPress={startForegroundUpdate}
        title="Start in foreground"
        color="green"
      />}
      <View style={styles.separator} />
     {false&&<Button
        onPress={stopForegroundUpdate}
        title="Stop in foreground"
        color="red"
      />}
      <View style={styles.separator} />
      <Button
        onPress={startBackgroundUpdate}
        title="البدء بتتبع المسار"
        color={"secondaryLight"}
      />
      <View style={styles.separator} />
      <Button
        onPress={stopBackgroundUpdate}
        title="إيقاف تتبع المسار"
        color={"instagram"}
      />
    </View>
    </Screen>
      
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 15,
  },
  separator: {
    marginVertical: 8,
  },
  buttonTxt: {
    color:colors.white,
    fontSize:17.5,
    alignContent:"center",
    alignItems:"center",
    textAlign:"center"
    
   },
   buttonClose: {
    width: "80%",
     alignSelf: "center",
     
    
  },
});


export default TrackingScreen;
