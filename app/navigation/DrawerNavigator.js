import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContentLight";
import HomeNavigator from "./HomeNavigatorLight";
import SearchScreen from "../screens/SearchScreen";
import useNotifications from "../hooks/useNotifications";
import navigation from "./rootNavigation";
import routes from "./routes";
import notification from "../api/notification";
import UpdateCustScreen from "../screens/UpdateCustScreen";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
 useNotifications((notification) => navigation.navigate(routes.NOTIFICATIONS,navigation));
  return (   
      <Drawer.Navigator
      screenOptions={
        {
          drawerStyle: {
            backgroundColor: '#eee',
            width: 300,
          },
        }

      }      
         drawerContent={(props) => <DrawerContent {...props} />}
      >
      {true&& <Drawer.Screen name="HomeScr" options={
        {headerShown:false}
      } component={HomeNavigator} />}
      {false&& <Drawer.Screen name="UpdateCust" component={UpdateCustScreen} />}
      {false&&<Drawer.Screen name="Search" component={SearchScreen} />}
      </Drawer.Navigator>
   
  );
};

export default DrawerNavigator;
