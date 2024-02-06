import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, Dimensions, Linking } from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Constants from "expo-constants";

import routes from "./routes";
import Icon from "../components/Icon";
import colors from "../config/colors";
import { ListItem, ListItemSeparator } from "../components/lists";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import { Alert } from "react-native";
import AppWebView from "../components/WebView";
import constants from "../config/constants";
import { AppModalize } from "../components/Modalize";
import icons from "../config/icons";
import contentApi from "../api/content";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import IconTouchable from "../components/IconTouchable";
import * as Device from "expo-device";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import authStorage from "../auth/storage";
import CustomerApi from "../api/customer";

const { width } = Dimensions.get("window");
const drawerWidth = width * 0.90;

function DrawerContent(props) {
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [app,setApp]=useState({loading:false,data:null});
  const [employeePermissions,setEmployeePermissions]=useState({loading:false,data:null});

  const [showIncompleteFeature, setShowIncompleteFeature] = useState(false);
  const [ShowEPaymentFeature, setShowEPaymentFeature] = useState(false);

  const [loginFailed, setLoginFailed] = useState(false);
  const [settings, setSettings] = useState(null);
  const [deviceType, setDeviceType] = useState(null);
  const modalizeRef = useRef(null);
  const getShowIncompleteFeature = async () => {
    //console.log(user.nameidentifier);
    const result = await contentApi.ShowIncompleteFeature();

    if (!result.ok) {
      setShowIncompleteFeature(0);
      //setError(true);
      return;
    }
    console.log(result);
    if(result.data==1)
    setShowIncompleteFeature(result.data);
    else     setShowIncompleteFeature(false);
    //setShowIncompleteFeature(result.data);
  };
  const getShowEPaymentFeature = async () => {
    const result = await contentApi.ShowEPaymentFeature();
     console.log(result);

    if (!result.ok) {
      setShowEPaymentFeature(0);
      //setError(true);
      return;
    }

    setShowEPaymentFeature(0);

    //setShowEPaymentFeature(result.data);
    authStorage.storeEPayment("0");

  };
  const getEmpDetails = async () => {
    setApp({loading:true,data:null});
  
    var token = await authStorage.getToken();
    const result = await CustomerApi.GetEmpAppDetails(token);    console.log(result);

    if (!result.ok) { 
      setApp({loading:false,data:null});
     
      return;
    }
    authStorage.storeTabletApp(result.data.APP_ID);
    setApp({loading:false,data:result.data});
  };
  const getEmployeePermissions = async () => {
    setEmployeePermissions({loading:true,data:null});
  
    var token = await authStorage.getToken();
    const result = await CustomerApi.GetEmployeePermissions(token);
    console.log(result);

    if (!result.ok) { 
      setEmployeePermissions({loading:false,data:null});
     
      return;
    }
    //authStorage.storeTabletApp(result.data.APP_ID);
    setEmployeePermissions({loading:false,data:result.data.ResponseObject});
  };
  const handleLogout = () => {
    Alert.alert(
      "تنبيه",
      "هل أنت متأكدمن تسجيل الخروج؟",
      [
        {

          text: "نعم",
          onPress: () => logOut()
          ,

          style: "cancel",
        },
        {
          text: "لا",
          // onPress: () => console.log("Kapatmaktan vazgeçildi"),
        },
      ],
      { cancelable: true }
    );
  };

  const getSettings = async () => {
    const result = await contentApi.GetContactInformation(); 
    console.log(result);

    if (!result.ok) {
      return;
    }

    setSettings(result.data);
  };

  const handleDeviceType = async () => {
    let dType = await Device.getDeviceTypeAsync();
    setDeviceType(dType);
  };

  useEffect(() => {
    //console.log("ssssss   user");
    //console.log(user);
    getEmpDetails();
    getEmployeePermissions();
    getShowIncompleteFeature();
    getShowEPaymentFeature();
    getSettings();
    handleDeviceType();
  }, []);

  return (
    <>
      {true&&<View style={styles.drawerContainer}>
        <Drawer.Section style={styles.topDrawerItem}>
          {user?.role == "EDevlet" && (
            <ListItem
            key={"item60"}
              title={user.given_name}
              subTitle={user.nameid}
              onPress={() => handleLogout()}
              listStyle={[styles.eDevletLoginStyle]}
              textStyle={styles.eDevletLoginTextStyle}
              subTitleStyle={styles.eDevletLoginSubTextStyle}
              IconRightComponent={
                <Icon name="account" iconColor={colors.primary} size={50} />
              }
            />
          )}
          {(user?.role == "Anonymous") && (
            <ListItem
              title="     بلديـــة الخليـــل "
              listStyle={[styles.eDevletLoginStyle]}
              textStyle={styles.eDevletLoginTextStyle}
              key={"item44"}
              //onPress={() => { modalizeRef.current.open(); }}
              // onPress={() => props.navigation.navigate(routes.LOGINHM)}


              IconComponent={
                <Icon name={icons.edevlet} style={{ color: colors.primary, backgroundColor: colors.red }} localIcon={true} size={45} />
              }
            />

          )}
          {(user?.role !== "Anonymous") && (
            <ListItem
              key={"item1"}

              title={user.name}
              listStyle={[styles.eDevletLoginStyle]}
              textStyle={styles.eDevletLoginTextStyle}
              //onPress={() => { modalizeRef.current.open(); }}
              onPress={() => props.navigation.navigate(routes.MYINFO)}


              IconComponent={
                <Icon name={icons.edevlet} style={{ color: colors.black, backgroundColor: colors.red }} localIcon={true} size={45} />
              }
              IconRightComponent=
              {<Icon name={'account-edit'} iconColor={colors.facebook} style={{ color: colors.black, backgroundColor: colors.red }} localIcon={false} size={45} />

              }
            />

          )}

        </Drawer.Section>
        <DrawerContentScrollView
          contentContainerStyle={{
            paddingTop: 0,
          }}
          {...props}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.drawerContent}>
            <ListItem
              key={"item2"}

              title="الصفحة الرئيسية"
              onPress={() => props.navigation.navigate(routes.HOME)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'home-account'} localIcon={false} size={40} />
              }
            />
             {(user?.role == "HMUser" || user?.role == "CUSER") && <ListItemSeparator seperatorStyle={styles.seperator} />}
              {(user?.role == "HMUser" || user?.role == "CUSER") && <ListItem
              key={"item21"}
              title="خاص بالموظفين وأعضاء المجلس"
              listStyle={styles.drawerSection}
              textStyle={styles.drawerSectionTextStyle}
            />}
            {(user?.role == "HMUser" || user?.role == "CUSER") && <ListItem
              key={"item40"}
              title="مواعيــدي"
              onPress={() =>
                props.navigation.navigate(routes.USERAPPOINTMENS)
              }
              listStyle={styles.kurumsalItem}
              textStyle={styles.kurumsalTextStyle}
              IconRightComponent={
                <Icon name={'alarm'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {showIncompleteFeature&&false && user?.serialnumber == "1927" && (user?.role == "HMUser" || user?.role == "CUSER") && <ListItem
              key={"item22"}
              title="طلب مركبة"
              onPress={() =>
                props.navigation.navigate(routes.PERMISSIONSTRANS)
              }
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'car'} localIcon={false} size={40} color={"#fff"} />
              }

            />}
              {showIncompleteFeature  && (user?.role == "HMUser" || user?.role == "CUSER") && employeePermissions.data?.TELEPHONE_BOOK==1 && <ListItem
              key={"item220"}
              title="دليل الهاتف"
              onPress={() =>
                props.navigation.navigate(routes.SEARCHCUST,{TELEPHONE_BOOK_CUST:employeePermissions.data?.TELEPHONE_BOOK_CUST})
              }
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'account-search'} localIcon={false} size={40} color={"#fff"} />
              }

            />}   
            {showIncompleteFeature && user?.serialnumber == "1927" && (user?.role == "HMUser" || user?.role == "CUSER") && <ListItem
              key={"item23"}
              title="متابعة أذونات الحركة"
              onPress={() => props.navigation.navigate(routes.FOLLOWTRANSPORT)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'bus-clock'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {showIncompleteFeature && employeePermissions.data?.VECHILE_TRACK==1 && (user?.role == "HMUser" || user?.role == "CUSER") && <ListItem
              key={"item93"}
              title="متابعة مسار المركبة"
              onPress={() => props.navigation.navigate(routes.TRACKING)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'go-kart-track'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {(user?.role == "HMUser" || user?.role == "CUSER") && <ListItem
              key={"item24"}
              title=" المذكرات والمعاملات"
              onPress={() => props.navigation.navigate(routes.ALLMAILS)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'mail'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
           
          
          

          
            {user?.role == "HMUser" && <ListItem
              key={"item34"}
              title="الإجازات وأذونات المغادرة"
              onPress={() =>
                props.navigation.navigate(routes.PERMISSIONS)
              }
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'account-clock'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
              {showIncompleteFeature && user?.role == "HMUser" && employeePermissions.data?.OVERTIME==1 && <ListItem
              key={"item50"}
              title="العمل الإضافي"
              onPress={() =>
                props.navigation.navigate(routes.OVERTIMEREG)
              }
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'clock-plus-outline'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {employeePermissions.data?.CUSTOMERS_SERVICE==1 && user?.role == "HMUser" && <ListItem
              key={"item35"}
              title="تحديث بيانات المواطن"
              onPress={() =>
                props.navigation.navigate(routes.UPDATECUST)
              }
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'cellphone'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
             {user?.role == "HMUser" && <ListItem
              key={"item350"}
              title="إجازات الموظفين"
              onPress={() =>
                props.navigation.navigate(routes.EMPLEAVES)
              }
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'account-multiple-check'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {showIncompleteFeature &&( employeePermissions.data?.PROJECTS_MAP==1 || user?.role == "CUSER") &&<ListItem
              key={"item118"}
              title="خريطة المشاريع"
               onPress={() => props.navigation.navigate(routes.PROJECTSMAP)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'map'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
                            
            {user?.role == "HMUser" && user?.serialnumber == "1465" && user?.serialnumber == "1927" && <ListItem
              key={"item11127"}
              title="صلاحيات الموظف"
              onPress={() =>
                props.navigation.navigate(routes.EMPLOYEEPERMISSIONS)
              }
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'plus'} localIcon={false} size={40} color={"#fff"} />
              }
            />}



             <ListItemSeparator seperatorStyle={styles.seperator} />
             {(user?.role == "HMUser" || user?.role == "CUSER") && <ListItem
              key={"item210"}
              title="المواطنين"
              listStyle={styles.drawerSection}
              textStyle={styles.drawerSectionTextStyle}
            />}
            {false && <ListItem
              key={"item3"}

              title="دليل الخدمات"
              onPress={() => props.navigation.navigate(routes.FAVORITES)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'star'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {(user?.role == "Anonymous") && <ListItem
              key={"item4"}

              title="تسجيل الدخول"
              onPress={() => props.navigation.navigate(routes.LOGINHM)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'login'} localIcon={false} size={40} />
              }
            />}

            {false && <ListItem
              key={"item5"}

              title="المجلس البلدي"
              onPress={() => props.navigation.navigate(routes.COUNCIL1)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={icons.kullanicibilgileri} localIcon={true} size={40} />
              }
            />}
            {user?.role != "Anonymous" && <ListItem
              key={"item6"}
              title="تقديم طلب خدمة"
              onPress={() => props.navigation.navigate(routes.REQUESTS, { item: {}, FromUnits: false })}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'cogs'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {user?.role != "Anonymous" && <ListItem
              key={"item7"}
              title="متابعة الطّلبـات"
              onPress={() => props.navigation.navigate(routes.FOLLOWREQUEST)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'folder-cog'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {user?.role != "Anonymous" && <ListItem
              key={"item8"}
              title="تقديم شكوى"
              onPress={() => props.navigation.navigate(routes.COMPLAINTS)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'comment-alert'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {user?.role != "Anonymous" && <ListItem
              key={"item9"}
              title="متابعة الشكاوى"
              onPress={() => props.navigation.navigate(routes.FOLLOWCOMP)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'folder-alert'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {user?.role != "Anonymous" && false && <ListItem
              key={"item10"}
              title="الأمور المالية"
              onPress={() =>
                props.navigation.navigate(routes.TAXDETAILS, { U_ID: -1 })}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'account-cash'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
             {user?.role != "Anonymous"  && <ListItem
              key={"item100"}
              title="الأمور المالية-دفع"
              onPress={() =>
                props.navigation.navigate(routes.EPAYMENT,{ U_ID: -1 })}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'account-cash'} localIcon={false} size={40} color={"#fff"} />
              }
            />}

             

            {user?.role != "Anonymous" && false && <ListItem
              key={"item11"}
              title="الملخص المالي"
              onPress={() =>
                props.navigation.navigate(routes.TAXTOTAL, { U_ID: -1 })}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'chart-box'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
           {true&& <ListItem
              key={"item12"}
              title="الخدمات"
              onPress={() => props.navigation.navigate(routes.SEARCH)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'wrench-outline'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
          {user?.role != "Anonymous" && <ListItem
              key={"item90"}
              title="طلب تنك مياه"
              onPress={() => props.navigation.navigate(routes.WATERTANK)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'water'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
             {user?.role != "Anonymous" && <ListItem
              key={"item91"}
              title="استهلاك المياه"
              onPress={() => props.navigation.navigate(routes.WATERCONSUM)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'cup-water'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {false && user?.role == "HMUser" && <ListItem
              key={"item13"}
              title="المذكرات"
              onPress={() => props.navigation.navigate(routes.MAILS)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'mail'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {false && user?.role == "HMUser" && <ListItem
              key={"item14"}
              title="المعاملات"
              onPress={() => props.navigation.navigate(routes.DOCS)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'file-certificate'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            
            {user?.role != "Anonymous" && false && <ListItem
              key={"item15"}
              title="تعديل البيانات"
              onPress={() => props.navigation.navigate(routes.UPDATEINFO)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'update'} localIcon={false} size={40} color={"#fff"} />
              }
            />}



            <ListItemSeparator seperatorStyle={styles.seperator} />
            <ListItem
              key={"item17"}
              title="بلديّتنا"
              listStyle={styles.drawerSection}
              textStyle={styles.drawerSectionTextStyle}
            />
            <ListItem
              key={"item18"}
              title="المجلس البلدي"
              onPress={() => props.navigation.navigate(routes.COUNCIL)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'account-group'} localIcon={false} size={40} color={"#fff"} />
              }
            />

            {showIncompleteFeature &&(user?.serialnumber=="1927" || user?.role == "Anonymous") &&<ListItem
              key={"item1118"}
              title="خريطة المشاريع"
              onPress={() => props.navigation.navigate(routes.PROJECTSPUBLICMAP)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'map'} localIcon={false} size={40} color={"#fff"} />
              }
            />}
            {true && showIncompleteFeature && <ListItem
              key={"item45"}
              title="مرافق بلدية الخليل"
              onPress={() => props.navigation.navigate(routes.PLACES)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'map-marker'} localIcon={false} size={40} />
              }
            />}
            <ListItem
              key={"item19"}
              title="أرشيف الأخبار"
              onPress={() => props.navigation.navigate(routes.HABERLERSCREEN)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'newspaper-variant'} localIcon={false} size={40} />
              }
            />
            <ListItem
              key={"item20"}
              title="حول التطبيق"
              onPress={() => props.navigation.navigate(routes.ABOUTAPP)}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={'information'} localIcon={false} size={40} />
              }
            />
 

            {false && <ListItem
              key={"item36"}
              title="المشاريع"
              onPress={() => props.navigation.navigate(routes.PROJELERSCREEN)}
              listStyle={styles.kurumsalItem}
              textStyle={styles.kurumsalTextStyle}
            />}
            {false && <ListItem
              key={"item37"}
              title="عنواني"
              onPress={() =>
                props.navigation.navigate(routes.POSTAL)
              }
              listStyle={styles.kurumsalItem}
              textStyle={styles.kurumsalTextStyle}
            />}
            {false && user?.role != "Anonymous" && <ListItem
              key={"item38"}
              title="بـيانـاتــي"
              onPress={() =>
                props.navigation.navigate(routes.MYINFO)
              }
              listStyle={styles.kurumsalItem}
              textStyle={styles.kurumsalTextStyle}
            />}

            {false && <ListItem
              key={"item39"}
              title="الأحداث"

              onPress={() =>
                props.navigation.navigate(routes.ETKINLIKLERSCREEN)
              }
              listStyle={styles.kurumsalItem}
              textStyle={styles.kurumsalTextStyle}
            />}
           
            {(user?.role != "Anonymous" && user?.role != "") && <ListItemSeparator seperatorStyle={styles.seperator} />}

            {(user?.role != "Anonymous" && user?.role != "") &&

              <ListItem
                key={"item41"}
                title={"تسجيل الخروج"}
                onPress={() => handleLogout()}
                listStyle={styles.drawerItem}
                textStyle={styles.drawerTextStyle}
                IconRightComponent={
                  <Icon name={'logout'} localIcon={false} size={40} />
                }
              />}
            {false && <ListItem
              key={"item42"}
              title="كلمة رئيس البلدية"
              onPress={() => props.navigation.navigate(routes.BASKANSCREEN)}
              listStyle={styles.kurumsalItem}
              textStyle={styles.kurumsalTextStyle}
            />}
            <ListItemSeparator seperatorStyle={styles.seperator} />
            <ListItem
              key={"item43"}
              title={settings?.telephone}
              onPress={() => {
                Linking.openURL("tel://" + settings?.telephone);
              }}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={icons.telefon} localIcon={true} size={30} />
              }
            />
            <ListItemSeparator seperatorStyle={styles.seperator} />
            <ListItem
              key={"item043"}
              title={settings?.telephone}
              onPress={() => {
                Linking.openURL('http://api.whatsapp.com/send?phone=' + settings?.whatsapp);
              }}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={icons.whatsapp} localIcon={true} size={30} />
              }
            />
            <ListItemSeparator seperatorStyle={styles.seperator} />
          </View>
        </DrawerContentScrollView>
        <Drawer.Section showDivider={false} style={styles.bottomDrawerSection}>
        <View style={styles.socialDrawer}>
            <IconTouchable
              onPress={() => Linking.openURL(settings?.facebook)}
              name={icons.facebook}
              localIcon={true}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 25 : 40}
            />
            {false&&<IconTouchable
              onPress={() => Linking.openURL(settings?.twitter)}
              name={icons.twitter}
              localIcon={true}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 25 : 40}
            />}
            {false&&<IconTouchable
              onPress={() => Linking.openURL(settings?.instagram)}
              name={icons.instagram}
              localIcon={true}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 25 : 40}
            />}
            <IconTouchable
              onPress={() => Linking.openURL(settings?.website)}
              name={"web"}
              localIcon={false}
              
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 40 : 40}
            />
            <IconTouchable
              onPress={() => Linking.openURL(settings?.youtube)}
              name={icons.youtube}
              localIcon={true}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 25 : 40}
            />
            <IconTouchable
              onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone=' + settings?.whatsapp)}
              name={icons.whatsapp}
              localIcon={true}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 25 : 40}
            />
          </View>
        </Drawer.Section>
      </View>}
      <AppModalize ref={modalizeRef} title="تسجيل الدخول">
        <AppWebView
          source={{
            uri: "https://egate.hebron-city.ps/loginPage.aspx?ReturnUrl=%2f"
            // "https://****" +  constants.UUIDV4() +  "*****",
          }}
          scalesPageToFit={true}
          onNavigationStateChange={async (newNavState) => {
            if (newNavState.url.includes("http://www.hebron-city.ps/"))
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
            }
          }}
        />
      </AppModalize>
    </>
  );
}

const styles = StyleSheet.create({
  blurredImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",

  },
  drawerContent: {},
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 10,


  },
  drawerSection: {
    backgroundColor: colors.primaryDark,

  },
  drawerSectionTextStyle: {
    color: colors.seperator,
    //alignSelf:"flex-start",
    writingDirection: "rtl",

    //fontWeight: "600",
    fontSize: 18,
  },
  eDevletLoginStyle: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  eDevletLoginTextStyle: {
    color: colors.primaryDark,
    //fontWeight: "bold",
    fontSize: 16,
  },
  eDevletLoginSubTextStyle: {
    color: colors.primaryDark,
    //fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  drawerItem: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 12,
    //alignSelf:"flex-start",
    writingDirection: "rtl",
  },
  drawerTextStyle: {
    color: colors.white,
    alignSelf: "flex-start",
    //fontWeight: "bold",
    fontSize: 18,
  },
  kurumsalItem: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 10,
  },
  kurumsalTextStyle: {
    color: colors.white,
    //fontWeight: "bold",
    fontSize: 18,
  },
  icon: {
    borderWidth: 0.5,
    borderColor: colors.seperator,
    borderRadius: 50,
    padding: 10,
    margin: 5,
    width: (drawerWidth - 100) / 5,
    height: (drawerWidth - 100) / 5,
  },
  topDrawerItem: {
    backgroundColor: colors.primaryDark,
    paddingTop: Constants.statusBarHeight + 5,
    marginBottom: 10,
  },
  bottomDrawerSection: {
    paddingVertical: 40,
  },
  socialDrawer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "right",
    justifyContent: "center",
  },
  seperator: {
    backgroundColor: colors.seperator,
    marginVertical: 15,
    marginHorizontal: 20,
    height: 0.5,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
