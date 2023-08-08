import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import Constants from "expo-constants";
import colors from "../config/colors";
import LogoTitle from "./header/LogoTitle";
import Hamburger from "./header/Hamburger";
import Notification from "./header/Notification";
/*import ArsaRayicBedelSorgulamaScreen from "../Old-screens/ArsaRayicBedelSorgulamaScreen";
import ArsaRayicBedelDetayScreen from "../Old-screens/ArsaRayicBedelDetayScreen";
import FaaliyetPlaniDetayScreen from "../Old-screens/FaaliyetPlaniDetayScreen";
import HizmetSorgulamaScreen from "../Old-screens/HizmetSorgulamaScreen";
import HizmetDetayScreen from "../Old-screens/HizmetDetayScreen";
import AskidaImarPlanlariListeScreen from "../Old-screens/AskidaImarPlanlariListeScreen";
import AskidaImarPlanlariDetayScreen from "../Old-screens/AskidaImarPlanlariDetayScreen";
import AnonimBorcSorgulamaScreen from "../Old-screens/AnonimBorcSorgulamaScreen";
import AnonimBorcDetayScreen from "../Old-screens/AnonimBorcDetayScreen";
import BorcOzetScreen from "../Old-screens/BorcOzetScreen";
import CopToplamaBilgisiSorgulamaScreen from "../Old-screens/CopToplamaBilgisiSorgulamaScreen";
import CopToplamaBilgisiDetayScreen from "../Old-screens/CopToplamaBilgisiDetayScreen";
import EncumenDetayScreen from "../Old-screens/EncumenDetayScreen";
import EncumenKararSorgulamaScreen from "../Old-screens/EncumenKararSorgulamaScreen";
import EncumenKararDetayScreen from "../Old-screens/EncumenKararDetayScreen";
import EncumenKararDetayAcikScreen from "../Old-screens/EncumenKararDetayAcikScreen";
import BarkodluBelgeSorgulamaScreen from "../Old-screens/BarkodluBelgeSorgulamaScreen";
import BarkodluBelgeDetayScreen from "../Old-screens/BarkodluBelgeDetayScreen";
import ImarDurumSorgulamaScreen from "../Old-screens/ImarDurumSorgulamaScreen";
import ImarDurumDetayScreen from "../Old-screens/ImarDurumDetayScreen";
import MeclisGundemDetayScreen from "../Old-screens/MeclisGundemDetayScreen";
import MeclisKararSorgulamaScreen from "../Old-screens/MeclisKararSorgulamaScreen";
import MeclisKararDetayScreen from "../Old-screens/MeclisKararDetayScreen";
import NikahSalonDurumSorgulama from "../Old-screens/NikahSalonDurumSorgulama";
import NikahSalonDurumDetay from "../Old-screens/NikahSalonDurumDetay";
import IhaleDetayScreen from "../Old-screens/IhaleDetayScreen";
import IhaleDetayAcikScreen from "../Old-screens/IhaleDetayAcikScreen";
import NobetciEczaneSorgulamaScreen from "../Old-screens/NobetciEczaneSorgulamaScreen";
import NobetciEczaneDetayScreen from "../Old-screens/NobetciEczaneDetayScreen";
import TalepBasvuruScreen from "../Old-screens/TalepBasvuruScreen";
import TalepBasvuruSorgulamaScreen from "../Old-screens/TalepBasvuruSorgulamaScreen";
import TalepBasvuruSorgulamaDetayScreen from "../Old-screens/TalepBasvuruSorgulamaDetayScreen";
import BeyanlarListeScreen from "../Old-screens/BeyanlarListeScreen";
import BeyanDetayScreen from "../Old-screens/BeyanDetayScreen";
import BildirimlerListeScreen from "../Old-screens/BildirimlerListeScreen";
import BildirimDetayScreen from "../Old-screens/BildirimDetayScreen";
import BildirimArsaBasvuruScreen from "../Old-screens/BildirimArsaBasvuruScreen";
import BildirimBinaBasvuruScreen from "../Old-screens/BildirimBinaBasvuruScreen";
import BildirimCevreBasvuruScreen from "../Old-screens/BildirimCevreBasvuruScreen";
import BildirimIlanBasvuruScreen from "../Old-screens/BildirimIlanBasvuruScreen";
import BeyanTasinmazlarListeScreen from "../Old-screens/BeyanTasinmazlarListeScreen";
import MakbuzSorgulamaScreen from "../Old-screens/MakbuzSorgulamaScreen";
import MakbuzDetayScreen from "../Old-screens/MakbuzDetayScreen";
import TahsilatSorgulamaScreen from "../Old-screens/TahsilatSorgulamaScreen";
import TahsilatListeScreen from "../Old-screens/TahsilatListeScreen";
import TahsilatDetayScreen from "../Old-screens/TahsilatDetayScreen";
import EvrakSorgulamaScreen from "../Old-screens/EvrakSorgulamaScreen";
import EvrakDetayScreen from "../Old-screens/EvrakDetayScreen";
import EtkinliklerScreen from "../Old-screens/EtkinliklerScreen";
import BaskanYardimcilariScreen from "../Old-screens/BaskanYardimcilariScreen";
import MudurlerScreen from "../Old-screens/MudurlerScreen";
import BaskanScreen from "../Old-screens/BaskanScreen";
import ToplanmaAlanlariListeScreen from "../Old-screens/ToplanmaAlanlariListeScreen";
*/
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
import TaxDetails from "../screens/TaxDetailsScreen"
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

import PermissionsScreen from "../screens/PermissionsScreen";
import PermissionsTransportScreen from "../screens/PermissionsTransportScreen";
import TaxDetailsScreen from "../screens/TaxDetailsScreen";
import AllMailsScreen from "../screens/AllMailsScreen";


const Stack = createStackNavigator();
console.log("Home Navigator");
const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    headerMode="float"
    screenOptions={{
      headerTintColor: "#fff",

      headerStyle: {
        backgroundColor: colors.primary,
        height: Constants.statusBarHeight + 60,
      },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
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
      name={routes.ARSARAYICBEDELSORGULAMA}
      component={ArsaRayicBedelSorgulamaScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>الاستعلام عن القيمة السوقية للأرض</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.ARSARAYICBEDELDETAY}
      component={ArsaRayicBedelDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>القيمة السوقية للأرض</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.FAALIYETPLANIDETAY}
      component={FaaliyetPlaniDetayScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>خطة النشاط اليومية</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.HIZMETSORGULAMA}
      component={HizmetSorgulamaScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>استعلام عن خدمة البلدية</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.LOGINHM}
      component={LoginhmScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}> تسجيل الدخول </Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
         <Stack.Screen
      name={routes.COUNCIL}
      component={CouncilScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>المجلس البلدي</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
     <Stack.Screen
      name={routes.FOLLOWREQUEST}
      component={FollowRequestsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>متابعة الطّلبــات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
         <Stack.Screen
      name={routes.FOLLOWTRANSPORT}
      component={FollowTranspotPermissionsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>متابعة أذونات الحركة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.FOLLOWCOMP}
      component={FollowCompScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>متابعة الشكاوى</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.UPDATEINFO}
      component={UpdateInfoScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}> طلب تعديل البيانات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.COUNCIL1}
      component={CouncilScreen1}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>المجلس البلدي</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
      <Stack.Screen
      name={routes.COMPLAINTS}
      component={ComplaintsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>الشكاوى</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />

          <Stack.Screen
      name={routes.PLACES}
      component={PlacesScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>مرافق بلديّة الخليــل</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.WATERADMIN}
      component={WaterAdminScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>إدارة إشعارات المياه</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.NOTIFICATIONADMIN}
      component={NotificationAdminScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>إرسال إشعارات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
     <Stack.Screen
      name={routes.REQUESTS}
      component={RequestsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>الطلبات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
         <Stack.Screen
      name={routes.TAXDETAILS}
      component={TaxDetailsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>الرّسـوم</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
             <Stack.Screen
      name={routes.ALLMAILS}
      component={AllMailsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>المذكّرات والعاملات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.MAILS}
      component={MailsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>المذكرات الداخلية</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
        <Stack.Screen
      name={routes.DOCS}
      component={DocsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>المعاملات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
         <Stack.Screen
      name={routes.SALARY}
      component={SalaryScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>قسيمة الراتب</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
             <Stack.Screen
      name={routes.PERMISSIONS}
      component={PermissionsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>الإجازات وأذونات المغادرة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
       <Stack.Screen
      name={routes.PERMISSIONSTRANS}
      component={PermissionsTransportScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>طلب مركبة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
      <Stack.Screen
      name={routes.SERVICEINFO}
      component={ServiceInfoScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>معلومات الخدمة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
      <Stack.Screen
      name={routes.USERTAX}
      component={UserTaxScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>المستحقّــات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name={routes.USERAPPOINTMENS}
      component={UserAppointmentsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>جدول المواعيد</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
     <Stack.Screen
      name={routes.MYINFO}
      component={UserInfoScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>بيــاناتي</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    
      <Stack.Screen
      name={routes.UNITS}
      component={UnitsScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>الوحــدات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
<Stack.Screen
      name={routes.WATERSCHEDULE}
      component={WaterScheduleScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>جدول توزيع المياه</Text>
        ),
        headerMode: false,
        
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.HIZMETDETAY}
      component={HizmetDetayScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>{route.params.mudurluk.label}</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.ASKIDAKIIMARPLANILISTE}
      component={AskidaImarPlanlariListeScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>خطط تقسيم المناطق المعلقة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.ASKIDAKIIMARPLANIDETAY}
      component={AskidaImarPlanlariDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>معلومات تفصيلية عن الخطة</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.ANONIMBORCSORGULAMA}
      component={AnonimBorcSorgulamaScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>الاستعلام عن الديون</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.ANONIMBORCDETAY}
      component={AnonimBorcDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => <Text style={styles.headerText}>تفاصيل الديون</Text>,
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BORCOZETDETAY}
      component={BorcOzetScreen}
      options={{
        headerTitle: () => <Text style={styles.headerText}>ملخص الديون</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.COPTOPLAMABILGISISORGULAMA}
      component={CopToplamaBilgisiSorgulamaScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>استعلام عن جمع القمامة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.COPTOPLAMABILGISIDETAY}
      component={CopToplamaBilgisiDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>تفاصيل جمع القمامة</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.ENCUMENGUNDEMDETAY}
      component={EncumenDetayScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>جداول أعمال المجلس</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.ENCUMENKARARSORGULAMA}
      component={EncumenKararSorgulamaScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>الاستفسار عن قرار المجلس</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.ENCUMENKARARDETAY}
      component={EncumenKararDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>قرارات المجلس</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.ENCUMENKARARDETAYACIK}
      component={EncumenKararDetayAcikScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>
            {route.params.karar.kararNumarasi + " 'قرار رقم."}
          </Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BARKODLUBELGESORGULAMA}
      component={BarkodluBelgeSorgulamaScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>استعلام عن وثيقة الباركود</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.BARKODLUBELGEDETAY}
      component={BarkodluBelgeDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>تفاصيل وثيقة الباركود</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.IMARDURUMSORGULAMA}
      component={ImarDurumSorgulamaScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>استعلام عن حالة التقسيم</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.IMARDURUMDETAY}
      component={ImarDurumDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>تفاصيل حالة التقسيم</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.MECLISGUNDEMDETAY}
      component={MeclisGundemDetayScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>جداول أعمال الجمعية</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.MECLISKARARSORGULAMA}
      component={MeclisKararSorgulamaScreen}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>استقصاء قرار برلماني</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.MECLISKARARDETAY}
      component={MeclisKararDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>قرارات الجمعية</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.NIKAHSALONSORGULAMA}
      component={NikahSalonDurumSorgulama}
      options={{
        headerTitle: () => (
          <Text style={styles.headerText}>استعلام عن قاعة أفراح</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.NIKAHSALONDETAY}
      component={NikahSalonDurumDetay}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>شروط القاعة</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.IHALEDETAY}
      component={IhaleDetayScreen}
      options={{
        headerTitle: () => <Text style={styles.headerText}>المناقصات</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name={routes.IHALEDETAYACIK}
      component={IhaleDetayAcikScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>
            {route.params.ihale.ihaleKayitNoField + " 'تفاصيل العطاء"}
          </Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.NOBETCIECZANESORGULAMA}
      component={NobetciEczaneSorgulamaScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>الاستفسار عن الصيدلية المناوبة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.NOBETCIECZANEDETAY}
      component={NobetciEczaneDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>الصيدليات المناوبة</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.TALEPBASVURU}
      component={TalepBasvuruScreen}
      options={() => ({
        headerTitle: () => <Text style={styles.headerText}>تطبيق جديد</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.TALEPBASVURUSORGULAMA}
      component={TalepBasvuruSorgulamaScreen}
      options={({ navigation }) => ({
        headerTitle: () => <Text style={styles.headerText}>تطبيقاتي</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.TALEPBASVURUSORGULAMADETAY}
      component={TalepBasvuruSorgulamaDetayScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>
            {route.params.basvuruNumarasi + " 'رقم طلبك"}
          </Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BEYANLARLISTE}
      component={BeyanlarListeScreen}
      options={() => ({
        headerTitle: () => <Text style={styles.headerText}>تصريحاتي</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BEYANDETAY}
      component={BeyanDetayScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>
            {route.params.beyan.beyanNo +
              " 'nolu " +
              route.params.beyan.beyanTuru +
              " Beyanı"}
          </Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BILDIRIMLERLISTE}
      component={BildirimlerListeScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>Beyan Bildirimlerim</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BILDIRIMDETAY}
      component={BildirimDetayScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>
            {route.params.bildirim.beyanNo + " 'nolu Bildirim"}
          </Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BILDIRIMARSABASVURUSCREEN}
      component={BildirimArsaBasvuruScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>إشعار الأرض الجديدة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BILDIRIMBINABASVURUSCREEN}
      component={BildirimBinaBasvuruScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>إشعار المبنى الجديد</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BILDIRIMCEVREBASVURUSCREEN}
      component={BildirimCevreBasvuruScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>إشعار CTV الجديد</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BILDIRIMILANBASVURUSCREEN}
      component={BildirimIlanBasvuruScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>إشعار إعلان إعلان جديد</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BEYANTASINMAZLARLISTE}
      component={BeyanTasinmazlarListeScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>كشوف العقارات</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.MAKBUZSORGULAMA}
      component={MakbuzSorgulamaScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>استعلام عن الاستلام</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.MAKBUZDETAY}
      component={MakbuzDetayScreen}
      options={({ navigation, route }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>
            {route.params.makbuzNo + " 'رقم الإيصال."}
          </Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.TAHSILATSORGULAMA}
      component={TahsilatSorgulamaScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>استعلام عن التحصيل</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.TAHSILATLISTE}
      component={TahsilatListeScreen}
      options={({ navigation }) => ({
        headerTitle: () => <Text style={styles.headerText}>المجموعات</Text>,
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.TAHSILATDETAY}
      component={TahsilatDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => (
          <Text style={styles.headerText}>تفاصيل المجموعة</Text>
        ),
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.EVRAKSORGULAMA}
      component={EvrakSorgulamaScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>وثيقة التحقق</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.EVRAKDETAY}
      component={EvrakDetayScreen}
      options={({ navigation }) => ({
        headerTitle: () => <Text style={styles.headerText}>تفاصيل الوثيقة</Text>,
        headerRight: () => (
          <HeaderButton
            icon="home-outline"
            onPress={() => navigation.popToTop()}
          />
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.ETKINLIKLERSCREEN}
      component={EtkinliklerScreen}
      options={() => ({
        headerTitle: () => <Text style={styles.headerText}>الأحداث</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.HABERLERSCREEN}
      component={HaberlerScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>أرشيف الأخبار</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.POSTAL}
      component={PostalScreen}
      options={() => ({
        headerTitle: () => <Text style={styles.headerText}>عنوانــي</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.PROJELERSCREEN}
      component={ProjelerScreen}
      options={() => ({
        headerTitle: () => <Text style={styles.headerText}>المشاريع</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BASKANYARDIMCILARISCREEN}
      component={BaskanYardimcilariScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>نواب الرئيس</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.MUDURLERSCREEN}
      component={MudurlerScreen}
      options={() => ({
        headerTitle: () => <Text style={styles.headerText}>المديرين</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.BASKANSCREEN}
      component={BaskanScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>رئيس البلدية</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
      <Stack.Screen
      name={routes.ABOUTAPP}
      component={AppInfoScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>حول التطبيق</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.FAVORITES}
      component={FavoritesScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>خدماتي المفضلة</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.TOPLANMALANLARILISTE}
      component={ToplanmaAlanlariListeScreen}
      options={() => ({
        headerTitle: () => (
          <Text style={styles.headerText}>مناطق التجمع</Text>
        ),
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name={routes.NOTIFICATIONS}
      component={NotificationsScreen}
      options={() => ({
        headerTitle: () => <Text style={styles.headerText}>الإشعارات</Text>,
        headerMode: false,
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  headerText: {
    color: colors.white,
    fontSize: 22,
    fontFamily:'Cairo_400Regular'
  },
});

export default HomeNavigator;
