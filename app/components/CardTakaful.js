import{ React,useState} from "react";
import { View, StyleSheet, TouchableWithoutFeedback,Linking } from "react-native";
import { Image } from "react-native";
import IconTouchable from "./IconTouchable";
import icons from "../config/icons";
import * as Device from "expo-device";

import Text from "./Text";
import colors from "../config/colors";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { ListItem, ListItemSeparator } from "./lists";
import Icon from "./Icon";
function CardTakaful({
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
  mntxt1,
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
              <Icon  name={icons.takaful} iconStyle={{borderRadius:30}} style={{color:colors.black,backgroundColor:colors.red,borderRadius:40}} localIcon={true} size={90} />}
              IconRightComponent=
              { <Icon name={icons.naqaba} iconStyle={{borderRadius:30}} style={{color:colors.black,backgroundColor:colors.red}} localIcon={true} size={90} /> }
            />
        <View style={styles.detailsContainer}>
        {mntxt!="" && (
            <Text style={styles.subTitleLarge} numberOfLines={9}>
               {mntxt}
            </Text>
            
          )}
          { <Text style={styles.subTitleBold} numberOfLines={2}>
               {waterditribution} شيكل.
            </Text>}
          {mntxt1!="" && (
            <Text style={styles.subTitle} numberOfLines={4}>
               {mntxt1}
            </Text>
          )}
             
        
        </View>
       
       
        <Text style={[styles.subTitle2,{textAlign:"center"}]} numberOfLines={3}>
             لمزيد من الاستفسارات يُرجى مراجعة إدارة صندوق التكافل-نقابة العاملين في بلدية الخليل.
            </Text>
       { false&&<View style={styles.socialDrawer}>
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
          </View>}
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
  subTitleLarge: {
    marginTop:8,
    color: colors.black,
    fontSize:16,
    textAlign:"center",
    fontFamily:"Cairo_600SemiBold",

    //fontWeight: "bold",
  },
  subTitle2: {
    marginTop:8,
    color: colors.black,
    fontSize:14,
    textAlign:"center",
    fontFamily:"Cairo_600SemiBold",

    //fontWeight: "bold",
  },
  subTitle: {
    marginTop:8,
    color: colors.black,
    fontSize:14,
    textAlign:"center",
    
    //fontWeight: "bold",
  },
  subTitleBold: {
    marginTop:8,
    color: colors.danger,
    fontSize:26,
    fontFamily:"Cairo_700Bold",
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

export default CardTakaful;
