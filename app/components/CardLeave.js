import React from "react";
import PureChild from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import ActionButton from "react-native-action-button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

class CardLeave extends React.Component {
  constructor(props) {
    super(props);
    //this.state = props;
  }
  shouldComponentUpdate() {
   // console.log("ss"+ this.props.date);
    return true;
  }
 
render()
 {
  return (
    
    <TouchableWithoutFeedback onPress={this.props.onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
         
          {this.props.LEAVE_EMP!="" && (
            <Text style={styles.actionButtonIcon} >
            {this.props.LEAVE_NO}
            </Text>
          )}        
           {this.props.LEAVE_EMP!="" && (
            <Text style={styles.date} >
            {this.props.LEAVE_EMP}
            </Text>
          )}                 
        {this.props.ALTERNATE_EMP!=""  && (
            <Text style={styles.subTitle}>
           البديل:{this.props.ALTERNATE_EMP} 
            </Text>
            
          )
          }
          {this.props.BOSS_CONFIRMED!="" && this.props.BOSS_DECISION!="" &&(
            <Text style={styles.subTitle}>
           الاعتماد: {this.props.BOSS_CONFIRMED} /{this.props.BOSS_DECISION} 
            </Text>
            
          )
          }  
          {this.props.BOSS_CONFIRMED=="" && this.props.BOSS_DECISION!="" &&(
            <Text style={styles.subTitle}>
           الاعتماد:{this.props.BOSS_DECISION} 
            </Text>
            
          )
          }  
            {this.props.BOSS_CONFIRMED!="" && this.props.BOSS_DECISION=="" &&(
            <Text style={styles.subTitle}>
           الاعتماد:{this.props.BOSS_CONFIRMED} 
            </Text>
            
          )
          }
            {this.props.DURATION!="" && (
            <Text style={styles.subTitle}>
            المدة:{this.props.DURATION} 
            </Text>
            
          )
          } 
 
            {this.props.EMP_SHIFT_START!="" &&this.props.EMP_SHIFT_END !=""&& (
            <Text style={styles.subTitle}>
            الوردية  : {this.props.EMP_SHIFT_START} - {this.props.EMP_SHIFT_END}
            </Text>
            
          )
          } 
            {this.props.FROM_DATE!="" && (
            <Text style={styles.subTitle}>
            من تاريخ : {this.props.FROM_DATE} 
            </Text>
            
          )
          } 
          {this.props.TO_DATE!="" && (
            <Text style={styles.subTitle} numberOfLines={2}>
             إلى تاريخ : {this.props.TO_DATE}
            </Text>
          )}  
            {this.props.LEAVE_DATE !=""&& (
            <Text style={styles.subTitle}>
              تاريخ التقديم : {this.props.LEAVE_DATE} 
            </Text>
            
          )
          }           
           {false&&this.props.LEAVE_NO !=""&& (
            <Text style={styles.title} numberOfLines={2}>
             رقم الطلب : {this.props.LEAVE_NO}
            </Text>
          )}   
  
           {this.props.EMP_JOB_LOCATION!="" && (
            <Text style={styles.title} numberOfLines={2}>
             موقع العمل : {this.props.EMP_JOB_LOCATION}
            </Text>
          )}    
           {this.props.LEAVE_REASON!="" && (
            <Text style={styles.title} numberOfLines={2}>
             سبب المغادرة/الإجازة : {this.props.LEAVE_REASON}
            </Text>
          )}    
        </View>
      </View>
    </TouchableWithoutFeedback>
  
  );
}
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
  },
  date:{
    marginTop:-30,
    textAlign:"left",
    color:colors.danger,
    
    

  },
  absoluteFill: {
    backgroundColor: colors.darkNew,
    opacity: 0.1,
    marginTop:10,
 
  },
  actionButtonIcon: {
    fontSize: 15,
    color: colors.twitter,
  },
  subTitle: {
    marginTop:5,
    marginBottom:12,
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

export default CardLeave;
