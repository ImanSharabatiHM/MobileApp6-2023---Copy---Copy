import React from "react";
import { useFormikContext } from "formik";

import DatePicker from "../DatePicker";
import ErrorMessage from "./ErrorMessage";
import { ceil } from "react-native-reanimated";

function AppFormDatePicker({dateflex, name, width,contWidth, placeholder,mode,dateFormat,selectedDate,onChangeDate=null,handleConfirm=null, ...otherProps }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <DatePicker
        selectedDate={selectedDate}
        dateflex={dateflex}
        placeholder={placeholder}
       /* onSelectItem={(item) => {
          setFieldValue(name, item);
          if(onChangeDate!=null)
          onChangeDate(item)

        }}*/
     /*   onSelectItemTxt={(fullDatetime) => {
          setFieldValue(name+"Txt", fullDatetime);
          console.log("eeee");
          if(name=="To"){
            var from=new Date(values["FromTxt"]);
            var to=new Date(fullDatetime);
            var totalTime=(to.getTime()-from.getTime())/1000;
            totalTime=(totalTime/60);
            var min,hour,days;
            min=totalTime%60;
            hour=totalTime/60;
            console.log(min,hour);
            if(hour%6 ==0){;days=hour/24 +1;setFieldValue("Total",days+"أيام" );}
            else if(totalTime>=300){;days=totalTime/(60*24);setFieldValue("Total",days+"أيام" );}
            else if(totalTime>=60){;hour=(totalTime-min)/60;setFieldValue("Total",min+"دقائق "+hour+" ساعات" );}
            else if(totalTime<60){;hour=totalTime/60;setFieldValue("Total",min+"دقائق " );}
            console.log("oppp",totalTime);
            
            
         }

        }}*/
        handleConfirm={handleConfirm}
        selectedItem={values[name]}
        width={width}
        contWidth={contWidth}
        dateFormat={dateFormat}
        mode={mode}
         {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormDatePicker;
