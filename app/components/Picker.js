import React, { useState,useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
   FlatList,
} from "react-native";
import Card from "../components/CardUnitPicker";
import CardSumm from "../components/CardUnitSummPicker";
import CardSignBoard from "../components/CardSignBoard";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import TextInput from "../components/TextInput";
import BackButton from "../navigation/header/BackButton";
import Text from "./Text";
import defaultStyles from "../config/styles";
import PickerItem from "./PickerItem";
import Screen from "./Screen";
import { ListItemSeparator } from "./lists";
import AppText from "./Text";
import colors from "../config/colors";
import Button from"../components/Button"
function AppPicker({
  handleOpenChange=null,
  Open=false,
  type="",
  icon,
  items,
  navigation,
  signBoardPicker=false,
  waterPicker=false,
  unitsPicker=false,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  selectedItemChanged,
  searchPlaceHolder="بحث عن خط توزيع المياه...",
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [filtered, setFiltered] = useState(items);
  const [filteredTxt, setFilteredTxt] = useState("");

  const handleChange = (text) => { 
      
  let filteredres = text
  ? items
  .filter(
    (item) =>
      item.label.includes(text) 
     // service.description.includes(text)
  )
  : items;
  setFilteredTxt(text);
  setFiltered( filteredres);

  };
  const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
           {true && (
            <Text style={styles.headerItemSmall} numberOfLines={2}>
              {" "}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true && (
            <Text style={styles.headerItemSmall} numberOfLines={2}>
              {"التسلسلي"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
          {true && (
            <Text style={styles.headerItemSmall} numberOfLines={1}>
              { "الرقم"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true&& (
            <Text style={styles.headerItem} numberOfLines={2}>
              {"المستفيد"}
            </Text>
          )}
          <ListItemSeparator v seperatorStyle={styles.seperatorStyleTable} />
           {true && (
            <Text style={styles.headerItem} numberOfLines={2}>
              {"الاستخدام"}
            </Text>
          )}
           
           <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />     
      </View>
    );
  };
  const handleChangeUnit = (text) => { 
    let filteredres = text
    ? items
    .filter(
      (item) =>
        (item.U_ID).toString().includes(text) 
    )
    : items;
    setFilteredTxt(text);
    setFiltered(filteredres);
  
    };
 
  return (
    <>
      <TouchableWithoutFeedback  onPress={() => setModalVisible(true)}>
        <View style={{ marginTop: 10 }}>
          <AppText style={styles.placeholder}>{placeholder}</AppText>

          <View style={[styles.container, { width }]}>
            {icon && (
              <MaterialCommunityIcons
                name={icon}
                size={20}
                color={defaultStyles.colors.medium}
                style={styles.icon}
              />
            )}
            {/* {selectedItem && ( */}
            <AppText style={styles.text}>{unitsPicker?selectedItem?.U_ID:selectedItem?.label}</AppText>
            {/* )} */}

            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={defaultStyles.colors.medium}
            />
            
          </View>

        </View>
      
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible || Open} animationType="slide">
        <Screen style={styles.modalContainer}>
          <View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose} textStyle={styles.buttonTxt} title="إغلاق" onPress={() => 
              {setFilteredTxt("");
              setModalVisible(false);
              if (handleOpenChange!=null) handleOpenChange(false);

              }} />
          </View>
          {(waterPicker||unitsPicker)&&<View style={[styles.txtSearch]}>
            <TextInput
        
            showPlaceholder={false}
           containerStyle={styles.searchBox}
            textStyle={[styles.searchBoxText]}
            // autoFocus={true}
            onChangeText={unitsPicker?handleChangeUnit: handleChange}
            placeholder= {searchPlaceHolder}
          />
          </View>}
          {type.includes('unitsumm')&&(
        <FlatList
        data={filteredTxt==""? items : filtered}  
        ListHeaderComponent={ListHeader}
        all
        keyExtractor={(item) => item.U_ID+Math.random()}
          renderItem={({ item }) => (
            <CardSumm
            SIGNBOARD_COUNT={item.SIGNBOARD_COUNT}
              //s={modalizeRef}
              unit={item}
              DAMGE={item.DAMGE}
              navigation={navigation}
              title={item.STREET_DESC}
              unitNo={item.UNIT_NO}
              all={item.U_ID==-1}
              other={item.U_ID==0}
              unitId={item.U_ID}
              unitOwner={item.USER_NAME+""}
              unitUse={item.MAIN_USE_DESC+" /"+item.SUB_USE_DESC}
               onPress={() => {
                if(item.DAMGE=="N")
                {setModalVisible(false);
                 handleOpenChange(false);

                setFilteredTxt("");
                setFiltered(items);
                onSelectItem(item);
                selectedItemChanged(item);

                }
                //console.log(item);
                
               // getUnit(item);
                //modalizeRef.current.open();
              }}
              thumbnailUrl ={"http://10.11.20.9/php/ImagesHeraf/1-197-0.jpg"}
             />
          )}
        />
      )}
      {signBoardPicker&&<FlatList          
            data={filteredTxt==""? items : filtered}         
            keyExtractor={(item,index) => item.UnitID+"_"+index}
            renderItem={({ item }) => (
              <CardSignBoard
              CommercialName={item.item.CommercialName}
              Height={item.item.Height+""}
              Width={item.item.Width+""}
              Notes={item.item.Notes}    
              navigation={navigation}    
              imageHeight={250}
              onPress={() => {
                setFilteredTxt("");
                setFiltered(items);
                onSelectItem(item);
                selectedItemChanged(item);
                setModalVisible(false);
                 // getUnit(item);
                  //modalizeRef.current.open();
                }}
                thumbnailUrl ={"http://10.11.20.9/php/ImagesHeraf/1-197-0.jpg"}
                imageUrl= {item.Image}//{item.img}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />}
          {!unitsPicker&&!signBoardPicker&&<FlatList          
            data={filteredTxt==""? items : filtered}         
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  setFilteredTxt("");
                  setFiltered([]);
                  onSelectItem(item);
                  selectedItemChanged(item);
                }}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />}
           {unitsPicker&&!type.includes('unitsumm')&&   (
        <FlatList
        data={filteredTxt==""? items : filtered}         
        keyExtractor={(item) => item.U_ID+Math.random()}
          renderItem={({ item }) => (
            <Card
              //s={modalizeRef}
              unit={item}
              navigation={navigation}
              title={item.STREET_DESC}
              unitNo={item.UNIT_NO}
              all={item.U_ID==-1}
              other={item.U_ID==0}
              unitId={item.U_ID}
              unitOwner={item.OWNER_ID}
              unitUse={item.UNIT_USE==""?"غير معروف":item.UNIT_USE}
              imageHeight={250}
              onPress={() => {
 
                setModalVisible(false);
                setFilteredTxt("");
                setFiltered(items);
                onSelectItem(item);
                selectedItemChanged(item);
               // getUnit(item);
                //modalizeRef.current.open();
              }}
              thumbnailUrl ={"http://10.11.20.9/php/ImagesHeraf/1-197-0.jpg"}
              imageUrl= {item.Image}//{item.img}
            />
          )}
        />
      )}
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonClose: {
    bottom:5,
    width: 100,
    alignSelf: "center",
  },
  headerItem: {
    backgroundColor:colors.lightDark,
    textAlignVertical:"center",
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    width:"27%",
    textAlign:"center",
    paddingTop:5,
    marginRight:0,
    fontSize:12,
  },
  headerItemSmall: {
    backgroundColor:colors.lightDark,
    textAlignVertical:"center",
    color:colors.facebook,
    fontFamily:"Cairo_700Bold",
    width:"15%",
    textAlign:"center",
    paddingTop:5,
    marginRight:0,
    fontSize:12,
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    width: 1,
    height: "100%",
  },
  txtSearch: {
    width: "90%",
    color:colors.danger,
    alignSelf: "center",
    bottom:5,
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
    top:5,
    height: 50,
    paddingHorizontal: 6,
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
    fontSize: 1,
    color: colors.lightBlue,
    fontFamily:'Cairo_400Regular'
    
    //fontWeight: "normal",
  },
  searchResults: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  buttonTxt: {
    color:colors.white,
    fontSize:20
    
   },
  container: {
    // backgroundColor: defaultStyles.colors.light,
    // borderRadius: 25,
    // flexDirection: "row",
    // padding: 15,
    // marginVertical: 10,
    backgroundColor: defaultStyles.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: defaultStyles.colors.backgroundColor,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 15,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  modalContainer: {
    paddingTop: 10,
  },
  placeholder: {
    color: defaultStyles.colors.secondaryLight,
    //fontWeight: "600",
    fontSize: 12,
    textTransform: "uppercase",
  },
  headerFooterStyle: {
    flexDirection:"row",
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
  },
  text: {
    flex: 1,
    color: defaultStyles.colors.darkNew,
    fontSize: 14,
    padding:4,
    //fontWeight: "bold",
    width: "50%",
  },
});

export default AppPicker;
