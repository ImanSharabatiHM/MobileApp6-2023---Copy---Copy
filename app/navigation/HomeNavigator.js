import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text ,Animated} from "react-native";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import Constants from "expo-constants";
import colors from "../config/colors";
import LogoTitle from "./header/LogoTitle";
import Hamburger from "./header/Hamburger";
import Notification from "./header/Notification";
import HaberlerScreen from "../screens/HaberlerScreen";
import PostalScreen from "../screens/PostalScreen";
import UpdateInfoScreen from "../screens/UpdateInfoScreen";
import MapLocScreen from "../screens/MapLocScreen";
import ProjelerScreen from "../screens/ProjelerScreen";
import HeaderButton from "./header/Button";
import routes from "./routes";
import FavoritesScreen from "../screens/FavoritesScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import WaterScheduleScreen from "../screens/WaterScheduleScreen";
import LoginhmScreen from "../screens/LoginhmScreen";
import ComplaintsScreen from "../screens/ComplaintsScreen";
import PlacesScreen from "../screens/PlacesScreen";
import RequestsScreen from "../screens/RequestsScreen";
import TaxTotal from "../screens/TaxTotalScreen"
import AllEmpLeavesScreen from "../screens/AllEmpLeaves"
import WaterTankRequestScreen from "../screens/WaterTankRequest"
import WaterConsumScreen from "../screens/WaterConsumScreen"
import ServiceInfoScreen from "../screens/ServiceInfoScreen"
import UserTaxScreen from "../screens/UserTaxScreen"
import UnitsScreen from "../screens/UnitsScreen";
import CouncilScreen from "../screens/CouncilScreen";
import CouncilScreen1 from "../screens/CouncilScreen1";
import FollowCompScreen from "../screens/FollowCompScreen";
import FollowRequestsScreen from "../screens/FollowRequestsScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import UserAppointmentsScreen from "../screens/UserAppointmentsScreen";
import WaterAdminScreen from "../screens/WaterAdmin";
import NotificationAdminScreen from "../screens/NotificationAdmin";

import SalaryScreen from "../screens/SalaryScreen";
import MailsScreen from "../screens/MailsScreen";
import DocsScreen from "../screens/DocsScreen";
import FollowTranspotPermissionsScreen from "../screens/FollowTranspotPermissionsScreen";
import AppInfoScreen from "../screens/AppInfoScreen";
import TaxEPaymentScreen from "../screens/TaxEPaymentScreen";
import PermissionsScreen from "../screens/PermissionsScreen";
import PermissionsTransportScreen from "../screens/PermissionsTransportScreen";
import TaxDetailsScreen from "../screens/TaxDetailsScreen";
import AllMailsScreen from "../screens/AllMailsScreen";
import TaxTotalScreen from "../screens/TaxTotalScreen";
import TabletScreen from "../screens/TabletScreen";
import TabletScreenOnline from "../screens/TabletScreenOnline";
import SearchCustomerScreen from "../screens/SearchCustomerScreen";
import AddSignboardScreen from "../screens/TabletsScreens/AddSignboardScreen";
import AddUnitWarningScreen from "../screens/TabletsScreens/AddUnitWarningScreen";
import BuildingsProceduresScreen from "../screens/TabletsScreens/BuildingsProceduresScreen";



import TabletAdminScreen from "../screens/TabletAdminScreen";
import TabletMainScreen from "../screens/TabletMainScreen";
import UploadTabletScreen from "../screens/UploadTabletScreen";
import DownloadTabletScreen from "../screens/DownloadTabletScreen";
import PrintScreen from "../screens/PrintScreen"
import BluetoothScreen from "../screens/BluetoothScreen"

import UpdateCustScreen from "../screens/UpdateCustScreen";
import SearchEmployeeScreen from "../screens/SearchEmployeeScreen";
import TaxPaymentScreen from "../screens/TaxPaymentScreen";
import TrackingScreen from "../screens/TrackingScreen";
import OverTimePermissionsScreen from "../screens/OverTimePermissionsScreen";
import OverTimeRegistrationScreen from "../screens/OverTimeRegistrationScreen";
import ProjectsMapScreen from "../screens/ProjectsMapScreen";

const Stack = createStackNavigator();
console.log("Home Navigator");
const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle:  styles.headerText ,
    backgroundStyle: { opacity },
  };
};
const HomeNavigator = () => (
  <Stack.Navigator
  screenOptions={{
    headerMode:'screen'
  }}   
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerTintColor: "#ccc",
        headerShown:false,
        headerStyle: {
          backgroundColor: colors.primary,
          height: 0,
        },
      }}
    // options={({ navigation }) => ({
    //   headerLeft: () => (
    //     <Hamburger onPress={() => navigation.toggleDrawer()} />
    //   ),
    //   headerTitle: () => <LogoTitle />,
    //   headerRight: () => (
    //     <HeaderButton
    //       icon="bell"
    //       onPress={() => navigation.navigate(routes.NOTIFICATIONS)}
    //     />
    //   ),
    // })}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={routes.LOGINHM}
      component={LoginhmScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'تسـجيل الدخول',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.COUNCIL}
      component={CouncilScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'المجلس البلدي',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
     <Stack.Screen
      name={routes.EMPLEAVES}
      component={AllEmpLeavesScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'إجازات الموظفيـن',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
         <Stack.Screen
      name={routes.PRINT}
      component={BluetoothScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'طباعة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.FOLLOWREQUEST}
      component={FollowRequestsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'متابعة الطلبـات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.FOLLOWTRANSPORT}
      component={FollowTranspotPermissionsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'متابعة أذونات الحركة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.FOLLOWCOMP}
      component={FollowCompScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'متابعة الشّكاوى',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
        <Stack.Screen
      name={routes.OVERTIMEREG}
      component={OverTimeRegistrationScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'تسجيل عمل إضافي',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
       <Stack.Screen
      name={routes.EPAYMENT}
      component={TaxEPaymentScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'الأمور المالية-دفع',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
        <Stack.Screen
      name={routes.WATERTANK}
      component={WaterTankRequestScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'طلب تنك مياه',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
      <Stack.Screen
      name={routes.TRACKING}
      component={TrackingScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'متبعة مسار الحركة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />

 
    <Stack.Screen
      name={routes.UPDATEINFO}
      component={UpdateInfoScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      //headerStyleInterpolator: forFade,
      headerTitle:  'طلب تعديل البيانات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.COUNCIL1}
      component={CouncilScreen1}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      //headerStyleInterpolator: forFade,
      headerTitle:  'المجلس البلدي',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.COMPLAINTS}
      component={ComplaintsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      //headerStyleInterpolator: forFade,
      headerTitle:  'الشّكاوى',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />

    <Stack.Screen
      name={routes.PLACES}
      component={PlacesScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      //headerStyleInterpolator: forFade,
      headerTitle:  'مرافق بلدية الخليل',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.WATERADMIN}
      component={WaterAdminScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      //headerStyleInterpolator: forFade,
      headerTitle:  'إدارة إشعارات المياه',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
     <Stack.Screen
      name={routes.NOTIFICATIONADMIN}
      component={NotificationAdminScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      //headerStyleInterpolator: forFade,
      headerTitle:  'إرسال إشعارات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.REQUESTS}
      component={RequestsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'الطّلبات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.TAXDETAILS}
      component={TaxDetailsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'الرّســوم',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
        <Stack.Screen
      name={routes.TAXTOTAL}
      component={TaxTotalScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'الملخّص المالي',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
          <Stack.Screen
      name={routes.TABLET}
      component={TabletScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'تطبيق الميدان',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />

<Stack.Screen
      name={routes.TABLETMAIN}
      component={TabletScreen} 
      options={({ route }) => ({
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      //headerTitle:  'تطبيق الميدان الرئيسية',
      headerTitle:route.params.name,
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 
}
     )}
    />
         <Stack.Screen
      name={routes.TABLETADMIN}
      component={TabletAdminScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'مدير تطبيق الميـدان',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
      <Stack.Screen
      name={routes.TABLETUPLOAD}
      component={UploadTabletScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'ترحيل البيانات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.TABLETDOWNLOAD}
      component={DownloadTabletScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'تنزيل البيانات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.ALLMAILS}
      component={AllMailsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'المذكّرات والمعاملات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.MAILS}
      component={MailsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'المذكّرات الداخلية',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.DOCS}
      component={DocsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'المعاملات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.SALARY}
      component={SalaryScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerTitle:  'قسيمة الراتب',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
      <Stack.Screen
      name={routes.UPDATECUST}
      component={UpdateCustScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'تحديث بيانات المواطن',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.PERMISSIONS}
      component={PermissionsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'الإجازات وأذونات المغادرة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.PERMISSIONSTRANS}
      component={PermissionsTransportScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'طلب مركبة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.SERVICEINFO}
      component={ServiceInfoScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'معلومات الخدمة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.USERTAX}
      component={UserTaxScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'المستحقّات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.WATERCONSUM}
      component={WaterConsumScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'استهلاك المياه',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
      }}
    />
       
     <Stack.Screen
      name={routes.TABLETONLINE}
      component={TabletScreenOnline}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'تطبيق الميدان',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.SEARCHCUST}
      component={SearchCustomerScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'استعـلام',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
     <Stack.Screen
      name={routes.SEARCHEMP}
      component={SearchEmployeeScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'استعلام موظف',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
         <Stack.Screen
      name={routes.PAYMENT}
      component={TaxPaymentScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'منظومة الجباية',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.OVERTIME}
      component={OverTimePermissionsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'طلب إذن للعمل الإضافي',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.USERAPPOINTMENS}
      component={UserAppointmentsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'مواعيــدي',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
       
    />
    <Stack.Screen
      name={routes.MYINFO}
      component={UserInfoScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'بياناتي',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />

    <Stack.Screen
      name={routes.UNITS}
      component={UnitsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'الوحدات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.WATERSCHEDULE}
      component={WaterScheduleScreen}
      options={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'جدول توزيع الميـاه',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.HABERLERSCREEN}
      component={HaberlerScreen}
      options={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'أرشيف الأخبار',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.POSTAL}
      component={PostalScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'عنـواني',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />

    <Stack.Screen
      name={routes.PROJECTSMAP}
      component={ProjectsMapScreen}
      options={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'خريطة المشاريع',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
    
      name={routes.BUILDINGSPROC}
      component={BuildingsProceduresScreen}
      options={{
         headerShown: false  ,
         cardStyle: { backgroundColor: 'transparent' },
         cardOverlayEnabled: true,
         cardStyleInterpolator: ({ current: { progress } }) => {
           return {
             cardStyle: {
               opacity: progress.interpolate({
                 inputRange: [0, 1],
                 outputRange: [0, 1],
               }),
             },
             overlayStyle: {
               opacity: progress.interpolate({
                 inputRange: [0, 2],
                 outputRange: [0, 0.5],
               }),
             },
           };
         },
      presentation: 'modal',      
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'إجراءات الأبنية والوحدات',
        

      }}
    /> 
   
    <Stack.Screen
      name={routes.SIGNBOARD}
      component={AddSignboardScreen}
      options={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'إضافة يافطة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
      }}
    /> 
    <Stack.Screen
      name={routes.UNITWARNING}
      component={AddUnitWarningScreen}
      options={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'إضافة يافطة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    /> 
    <Stack.Screen
      name={routes.PROJELERSCREEN}
      component={ProjelerScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'المشاريع',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />

    <Stack.Screen
      name={routes.ABOUTAPP}
      component={AppInfoScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'حول التطبيـق',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
    <Stack.Screen
      name={routes.FAVORITES}
      component={FavoritesScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'خدمـاتي المفضلة',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />

    <Stack.Screen
      name={routes.NOTIFICATIONS}
      component={NotificationsScreen}
      options={{
        headerStyle: { backgroundColor: colors.primary },
      headerTintColor:colors.white,
      headerTitleStyle:styles.headerText,
      headerStyleInterpolator: forFade,
      headerTitle:  'الإشعارات',
      headerMode: 'float',
      headerTitleAlign: "center",
      headerBackTitleVisible: false,
 

      }}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  headerText: {
     fontSize: 22,
     fontFamily:'Cairo_600SemiBold',
     
  },
});

export default HomeNavigator;
