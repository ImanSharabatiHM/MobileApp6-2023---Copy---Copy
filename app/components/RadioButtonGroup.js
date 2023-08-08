import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { RadioButton } from "react-native-paper";
import colors from "../config/colors";

function RadioButtonGroup({ value, values, onValueChange }) {

    return (
        <View style={styles.container}>
            <RadioButton.Group mode={"android"}  onValueChange={(newValue) => onValueChange(newValue)} value={value}>            
                      <View style={styles.radioButton}>{values?.map((val,index) =>
                     <RadioButton.Item key={index} labelStyle={ {fontSize: 12,fontFamily:"Cairo_600SemiBold",marginRight:-15,padding:0}} 
                     style={ {marginRight:0,
                        padding:0,                
                        flexDirection:"row-reverse"}} 
                     color={colors.primaryNew} label={val.label} value={val.value} />)}
                     </View> 
            </RadioButton.Group>
        </View>
    );
}
export default RadioButtonGroup

const styles = StyleSheet.create({
    container:
     { flex: 1,
        color:colors.danger,
        marginTop:0,
        marginLeft:-20,  
        padding:0}, 

    txtRadio:
    {
        fontSize: 12,
    fontFamily:"Cairo_400Regular",
    
    },
    radioButton: {     
        flexDirection:"row", 
        textAlign:"right",
        fontSize: 10,  
         marginVertical:-10,
      
        flexWrap:"wrap",
    }
});