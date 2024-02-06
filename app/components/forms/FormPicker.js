import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import {  StyleSheet,View} from "react-native";
import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";
import SearchButton, { BUTTON_HEIGHT } from "../../components/home/SearchButton";
import Animated from "react-native-reanimated";
import  Button  from "../Button";
import colors from "../../config/colors";

function AppFormPicker({
  signBoardPicker=false,
  handleOpenChange=null,
  Open=false,
  type="",
  items,
  name,
  navigation,
  waterPicker=false,
  unitsPicker=false,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  connectedFieldName,
  searchPlaceHolder,
  selectedItemChanged = () => null,
  width,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      {<Picker
      handleOpenChange={handleOpenChange}
      signBoardPicker={signBoardPicker}
        navigation={navigation}
        items={items}
        type={type}
        waterPicker={waterPicker}
        unitsPicker={unitsPicker}
        searchPlaceHolder={searchPlaceHolder}
        numberOfColumns={numberOfColumns}
        Open={Open}
        onSelectItem={(item) => {
          console.log("sss")
          setFieldValue(name, item);
          if (connectedFieldName) {setFieldValue(connectedFieldName, null);}
        }}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        selectedItemChanged={selectedItemChanged}
        width={width}
      />
      
      }
      
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );


}

export default AppFormPicker;
const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 30,//Constants.statusBarHeight + 10,
    width: "100%",
  },
  buttonClose: {
    bottom:5,
    width: "20%",
    alignSelf:"flex-end",
  },
  buttonTxt: {
    color:colors.white,
    fontSize:20
    
   },
  backIcon: {
    width: 60,
    // flex: 1,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkNew,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  searchBox: {
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    backgroundColor: colors.white,
    borderRadius: 8,
    height: 64,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 0,
    shadowColor: colors.darkNew,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  searchBoxText: {
    fontSize: 11,
    color: colors.secondary,
    fontFamily:'Cairo_400Regular'
    
    //fontWeight: "normal",
  },
  searchResults: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  
  searchButton: {
    bottom: 5,
    left: 0,
    right: 0,
  },
});