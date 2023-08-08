import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback,Linking } from "react-native";
import { Image } from "react-native-expo-image-cache";
import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListItem, ListItemSeparator } from "../components/lists";
import Icon from "../components/Icon";
import icons from "../config/icons";

import Text from "./Text";
import colors from "../config/colors";

function CardCustomer({
  Name,
  Mobile,
  ID,
  title,
  subTitle,
  imageUrl,
  date,
  color,
  status,
  notes,
  imageHeight = 300,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card,{backgroundColor:colors.white}]}>
        {imageUrl && (
          <Image
            style={[styles.image, { height: imageHeight }]}
            tint="dark"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
          />
        )}

        <View style={styles.detailsContainer}>
        {true&&<MaterialCommunityIcons
            style={styles.actionButtonIcon}
            name="card-account-details-outline"
          />
        }            
            {Name&&(<ListItem
               title={"الاسم : "+Name}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
             
            />)}
        {ID&&(<ListItem
               title={"رقم الهوية : "+ID}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
             
            />)}
 

            {Mobile&&(<ListItem
              title={"المحمول : "+Mobile}

              onPress={() => {
                Linking.openURL("tel://" + Mobile);
              }}
              listStyle={styles.drawerItem}
              textStyle={styles.drawerTextStyle}
              IconRightComponent={
                <Icon name={"phone"} iconColor={colors.facebook}
                localIcon={false} size={30} />
              }
            />)}
     

           {notes && (
            <Text style={styles.notes} numberOfLines={8}>
             {notes}.
            </Text>
          )}
     
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    padding:10,
    borderRadius: 8,
    marginTop:0,

    backgroundColor: colors.white,
    marginBottom: 5,
    overflow: "hidden",
    marginHorizontal: 0,
    
  },
  drawerItem: {
    backgroundColor: colors.white,
    paddingVertical: 5,
    //alignSelf:"flex-start",
    writingDirection: "rtl",
  },
  drawerTextStyle: {
    color: colors.facebook,
    alignSelf: "flex-start",
    //fontWeight: "bold",
    fontSize: 14,
  },
  detailsContainer: {
    borderRadius: 8,
marginTop:0,
    paddingTop: 0,
  },
  image: {
    width: "100%",
  },
  date:{
    marginTop:30,
    textAlign:"left",
    color:colors.danger,
    
    

  },
  absoluteFill: {
    backgroundColor: colors.white,
    opacity: 0.1,
    marginTop:10,
 
  },
  actionButtonIcon: {
    fontSize: 30,
    height: 30,
    color: colors.twitter,
    paddingLeft:5,
  
  },
  subTitle: {
    marginTop:5,

    fontSize:15,
    fontFamily:'Cairo_600SemiBold',
    color: colors.secondary,
   // fontWeight: "bold",
  },
  notes: {
    marginTop:5,
    fontSize:14,
    color: colors.secondary,
   // fontWeight: "bold",
  },
  unitOwner: {
    color: colors.secondary,
  //  fontWeight: "bold",
  },
  unitUse: {
    color: colors.secondary,
    //fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default CardCustomer;
