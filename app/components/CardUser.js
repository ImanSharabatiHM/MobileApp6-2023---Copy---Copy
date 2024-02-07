import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback,ScrollView } from "react-native";
import { Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function CardUser({
  name,
  type='0',
  nameidentifier,
  streetaddress,
  mobilephone,
  homephone,
  waterditribution,
  usernumber,
  imageUrl,
  imageHeight = 200,
  onPress,
  thumbnailUrl,
}) {
  return (
       <View style={styles.card}>
        
      {<View style={styles.imageContainer}>
          <Image
            style={[styles.image ]}            
          // preview={{ uri: thumbnailUrl }}
            source={require('../assets/person.png')}
          />       
        </View>}
        <View style={styles.detailsContainer}><ScrollView>
        {name && (
            
            <Text style={[styles.title,{color:colors.black}]} numberOfLines={2}> المواطن :
            </Text>
          )}
          {name && (            
            <Text style={styles.title} numberOfLines={2}>{name}
            </Text>
          )}
          {nameidentifier && (
            <Text style={styles.subTitle} numberOfLines={2}>
              رقم الهوية : {nameidentifier}
            </Text>
          )}
          {type && (
            <Text style={styles.subTitle} numberOfLines={2}>
              النوع الاجتماعي: {type}
            </Text>
          )}
            {usernumber!="" && (
            <Text style={styles.subTitle} numberOfLines={1}>
               الرقم الوظيفي : {usernumber}
            </Text>
          )}
             
          {homephone && (
            <Text style={styles.subTitle} numberOfLines={2}>رقم الهاتف: {homephone}</Text>
          )}
          {mobilephone && (
            <Text style={styles.subTitle} numberOfLines={2}>
              رقم المحمول: {mobilephone}
            </Text>
          )}
           {streetaddress !="" && (
            <Text style={styles.subTitle} numberOfLines={2}>
              العنوان: {streetaddress}
            </Text>
          )}
          { waterditribution !="" && (
            <Text style={styles.subTitle} numberOfLines={2}>
              خط المياه: {waterditribution}
            </Text>
          )}         
          </ScrollView>
        </View>
        
      </View>
   );
}

const styles = StyleSheet.create({
  card: {  
    top:10,
    height:"65%",
    padding:10,
    borderRadius: 8,
    marginBottom:10,
     marginHorizontal: 20,
     backgroundColor:colors.light
  },
  detailsContainer: {
     height:"80%",
    padding:10,  
    },
   imageContainer: {
    height:"20%",
    marginVertical:0,
    marginTop:0,
  },
  image: {
    top:0,
    marginTop:0,
    marginHorizontal:"10%",
    height:"100%",
    resizeMode:"center",
  },
  subTitle: {
    marginTop:2,
    color: colors.black,
    fontSize:16,
    textAlign:"justify"
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
});

export default CardUser;
