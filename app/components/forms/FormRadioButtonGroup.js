import {React,useState} from "react";
import {StyleSheet} from "react-native";
import { useFormikContext } from "formik";
import Alertmsg from "../../components/Alertmsg";

import ErrorMessage from "./ErrorMessage";
import RadioButtonGroup from "../RadioButtonGroup";
import { View } from "react-native-animatable";
import AppText from "../Text";

function FormRadioButtonGroup({ name, items,handleChange1,title }) {
    const { errors, setFieldValue, touched, values } = useFormikContext();
    const [isMsgVisible, setIsMsgVisible] = useState(false); 

    const callback=(value)=>{

        if(value==1) setFieldValue(name, 2);
        else  setFieldValue(name, 1);
    }
    const handleChange = (value) => {
        
        if(name=='EmptyWaterLocation' && value==2)
        {
            console.log("valueee"+value);
            setIsMsgVisible(true);
            return;
        }
        setFieldValue(name, value);
        handleChange1(value);
       // console.log(a);
        //if(a==1){setFieldValue(name, 1);}
    };

    return (
        
        <View>
{isMsgVisible && <Alertmsg
            onPress2={()=>{setIsMsgVisible(false); setFieldValue(name, "2"); handleChange1(2);}}
            buttonTitle2={"إكمال"}
            isVisible={isMsgVisible}      
            title={"في حالة التفريغ بالخزانات يحتوي التنك 5 أكواب! "}
            has2Btn={true}
             onPress={() => {
                setFieldValue(name, "1");
                handleChange1(1);
               setIsMsgVisible(false);}}
             buttonTitle={"إغلاق"}
             style={styles.alert}
            
          />}
            <ErrorMessage error={errors[name]} visible={touched[name]} />
            {title&& <AppText   style={[{marginTop:10,marginBottom:3}]} numberOfLines={1}>{title}</AppText>}
              <RadioButtonGroup   value={values[name]} values={items} onValueChange={handleChange} />
        </View>
    );
}
export default FormRadioButtonGroup;
const styles = StyleSheet.create({
 
    section: { marginHorizontal: "10%", width: "80%", fontSize: 14, },
    alert:{
      width:"50%",
      height:"50%"
    },});