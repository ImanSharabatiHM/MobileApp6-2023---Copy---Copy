import{ React,useState} from "react";
import { View, StyleSheet, TouchableWithoutFeedback,Linking } from "react-native";
import { Image } from "react-native";
import IconTouchable from "../components/IconTouchable";
import icons from "../config/icons";
import * as Device from "expo-device";

import Text from "./Text";
import colors from "../config/colors";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
function CardApp({
  name,
  nameidentifier,
  streetaddress,
  mobilephone,
  homephone,
  waterditribution,
  settings,
  usernumber,
  devices,
  mntxt,
  user="0",
  imageUrl,
  imageHeight = 200,
  onPress,
  thumbnailUrl,
}) {
  const [deviceType, setDeviceType] = useState(null);

  return (
    <TouchableWithoutFeedback >
      <View style={styles.card}>     

      <ListItem
              title={"  "}
              listStyle={[styles.eDevletLoginStyle]}
              IconComponent={
              <Icon  name={icons.edevlet} iconStyle={{borderRadius:30}} style={{color:colors.black,backgroundColor:colors.red,borderRadius:40}} localIcon={true} size={90} />}
              IconRightComponent=
              { <Icon name={icons.bagc} iconStyle={{borderRadius:30}} style={{color:colors.black,backgroundColor:colors.red}} localIcon={true} size={90} /> }
            />
        <View style={styles.detailsContainer}>
        {mntxt!="" && (
            <Text style={styles.subTitle} numberOfLines={5}>
               {mntxt}
            </Text>
          )}
             
          {  (
           false&& <Text style={[styles.txtRedCenter]} numberOfLines={2}>النسخة التجريبية</Text>
          )}
        </View>
        <View style={styles.socialDrawer}>
        {devices!=""&& (user=="854669157" ||user=="942496977")&& (
            <Text style={styles.subTitle} numberOfLines={1}>
              عدد الأجهزة المستخدمة التطبيق : {devices}  
            </Text>           
          )}
        </View>
        <View style={styles.detailsContainer}>
        {usernumber!=""&& (user=="854669157" ||user=="942496977") && (
            <Text style={styles.subTitle} numberOfLines={1}>
              عدد المستخدمين : {usernumber}
            </Text>           
          )}
        </View>
        <Text style={[styles.subTitle,{textAlign:"center"}]} numberOfLines={5}>
              لإرسال ملاحظاتكم والتواصل:
            </Text>
        <View style={styles.socialDrawer}>
        <IconTouchable
              onPress={() =>Linking.openURL("tel://" + settings?.telephone) }
              name={"phone"}
              localIcon={false}             
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 70 : 70}
              iconColor={colors.darkNew}
            />
            <IconTouchable
              onPress={() => Linking.openURL(settings?.facebook)}
              name={"facebook"}
              localIcon={false}
              
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 70 : 70}
              iconColor={colors.facebook}
            />
            <IconTouchable
            iconColor={colors.twitter}
              //onPress={() => Linking.openURL(settings?.twitter)}
              name={"twitter"}
              localIcon={false}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 70 : 70}
            />
            <IconTouchable
            iconColor={colors.instagram}
             // onPress={() => Linking.openURL(settings?.instagram)}
              name={"instagram"}
              localIcon={false}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 70 : 70}
            />
             <IconTouchable
             iconColor={colors.twitter}
              onPress={() => Linking.openURL(settings?.website)}
              name={"web"}
              localIcon={false}
              s 
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 70 : 70}
            />
            <IconTouchable
            iconColor={colors.youtube}
              onPress={() => Linking.openURL(settings?.youtube)}
              name={"youtube"}
              localIcon={false}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 70 : 70}
            />
            <IconTouchable
            iconColor={colors.whatsapp}
              onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone='+settings?.whatsapp)}
              name={"whatsapp"}
              localIcon={false}
              iconStyle={[
                styles.icon,
                {
                  width: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                  height: deviceType === 1 ? (drawerWidth - 100) / 5 : 80,
                },
              ]}
              size={deviceType === 1 ? 70 : 70}
            />
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  socialDrawer: {
    //color:colors.white,
    backgroundColor:colors.white,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding:10,
    borderRadius: 8,
    backgroundColor: colors.white,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  detailsContainer: {
    marginBottom:50

   },
   imageContainer: {
    height:300,
    
  },
  image: {
    width:"100%",
    resizeMode:"center",
    
  },
  subTitle: {
    marginTop:8,
    color: colors.black,
    fontSize:16,
    textAlign:"center",
    //fontWeight: "bold",
  },
  txtRedCenter: {
    marginTop:8,
    color: colors.danger,
    fontSize:16,
    textAlign:"center",
    //fontWeight: "bold",
  },
  subTitleRed: {
    marginTop:2,
    color: colors.danger,
    fontSize:16,
    textAlign:"justify"
    
    //fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
    fontSize:16,
    color:colors.danger,
    textAlign:"justify",

    //fontWeight: "700",
  },
  eDevletLoginStyle: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});

export default CardApp;
