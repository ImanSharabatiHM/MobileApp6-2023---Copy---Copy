import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import defaultStyles from "../config/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppText from "./Text";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
function AppDatePicker({
  placeholder,
  onSelectItem,
  onSelectItemTxt,
  selectedDate,
  selectedItem,
  width = "100%",
  handleConfirm,
  contWidth="50%",
  dateFormat="YYYY/MM/DD",
  timeFormate="hh:mm a",
  dateflex= "column",
  mode,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState(selectedDate);

  dayjs.extend(updateLocale);
  dayjs.extend(relativeTime);
  const handleConfirm2 = (date) => {
    //date=date.toUTCString();
    setModalVisible(false);

    if(handleConfirm!=null)handleConfirm(date);
    setSelectedDate1(date);
    //if(mode=="date") setSelectedDate1(dayjs(date).locale("ar").format(dateFormat));
    // else setSelectedDate1(date.toLocaleTimeString());
      // setSelectedDate1(date);
    console.log(dayjs(date).locale("ar").format(dateFormat));
    // let formatedDate =
    //   date.getDate() +
    //   "/" +
    //   (parseInt(date.getMonth()) + 1) +
    //   "/" +
    //   date.getFullYear();
    let reverseFormatedDate =
      date.getFullYear() +
      "/" +
      (parseInt(date.getMonth()) + 1) +
      "/" +
      date.getDate();
 
      let reverseFormatedTime =
      date.getHours() +
      ":" +
      date.getMinutes();
     
       //onSelectItemTxt(date.toISOString());
      // if(mode=="date") onSelectItem(dayjs(date).locale("ar").format(dateFormat));
       //else onSelectItem(reverseFormatedTime);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={{ marginTop: 0,paddingEnd:10,width:contWidth,dateflex}}>
          <AppText style={styles.placeholder}>{placeholder}</AppText>
          <View style={[styles.container, { width }]}>
            {/* {selectedItem ? ( */}
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={defaultStyles.colors.medium}
            />
        <AppText style={styles.text}>{selectedDate1 ? (mode=="date"?dayjs(selectedDate1).locale("ar").format(dateFormat):dayjs(selectedDate1).locale("ar").format(timeFormate).replace("am","صباحاً").replace("pm","مساءً") ): 'No date selected'}</AppText>
          

            {/* ) : (<AppText style={styles.text}>{selectedItem}</AppText>    <Text style={styles.placeholder}>{placeholder}</Text>
            )} */}

            
          </View>
        </View>
      </TouchableWithoutFeedback>
      <DateTimePickerModal
        {...otherProps}
        date={selectedDate1}
        isVisible={modalVisible}
        mode={mode}
        
        locale="en_GB"
        headerTextIOS="اختر التاريخ"
        cancelTextIOS="إغلاق"
        confirmTextIOS="تأكيد"
        onConfirm={handleConfirm2}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: defaultStyles.colors.light,
    // borderRadius: 25,
    // flexDirection: "row",
   padding: 5,
    // marginVertical: 10,
    backgroundColor: defaultStyles.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: defaultStyles.colors.backgroundColor,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    marginBottom:0,
  },
  placeholder: {
    padding:5,
    
    color: defaultStyles.colors.secondaryLight,
    fontSize: 14,
    textTransform: "uppercase",
  },
  text:{
    flex: 1,
    color: defaultStyles.colors.darkNew,
    fontSize: 14,
    textAlign:"justify",
    //fontWeight: "bold",
   
  },
});

export default AppDatePicker;
