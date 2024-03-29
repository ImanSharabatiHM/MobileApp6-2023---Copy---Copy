import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions,View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import tabletApi from "../../api/tablet";
import Text from "../../components/Text";
import { ListItemSeparator } from "../../components/lists";
import authStorage from "../../auth/storage";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import employeesApi from "../../api/employees";

import contentApi from "../../api/content";
import customerApi from "../../api/customer";
import AppWebView from "../../components/WebView";
import { AppModalize } from "../../components/Modalize";
import useAuth from "../../auth/useAuth";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
const initialLayout = { width: Dimensions.get("window").width };
import ActivityIndicator from "../../components/ActivityIndicator";
import Card from "../../components/CardTalabRow";

function TalabatsScreen({ navigation,route }) {
  const modalizeRef = useRef(null);
  const [proje, getProje] = useState(null);
  const [unit, getUnit] = useState(null);
  const getProjelerApi = useApi(contentApi.getProjeler);
  const getCustomerUnitsApi = useApi(customerApi.GetUnitDescription);
  const [index, setIndex] = useState(0);
  const { user, logInWithEDevlet, logOut } = useAuth();
  const [talabats, setTalabats] = useState({ loading: false, data: null });
  const [units, setUnits] = useState({ loading: false, data: null });
  const [B_ID, setB_ID] = useState(route.params.B_ID);
  const [toDate, setToDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

  const [location, setLocation] = useState({ loading: false, data: {longtitude:"0",latitude:"0"} });

   
  const ListHeader = () => {
    //View to set in Header
    return (
      <Card
      //s={modalizeRef}
      iconName={"close"}
      
      ODD={-1}
      TALAB_DATE={"التاريخ"}
      TALAB_NO={"الرقم"}
      TALAB_NAME={"الطلب"}
      CUST_NAME={"مقدم الطلب"}
      navigation={navigation}
  
            />
   
 
    );
  };
  const getUnits = async () => {
    setUnits({ loading: true, data: null });
    const result = await tabletApi.GetUnitDescriptionByBID(B_ID);
    if (!result.ok) {
      setUnits({ loading: false, data: null });
      return;
    }
    let data = result.data.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    setUnits({ loading: false, data });
  };
  const GetBuildingCoordinates=async(B_ID)=>
  {setLocation({ loading: true, data: {longtitude:"0",latitude:"0"} });
  const result = await employeesApi.GetBuildingCoordinates(B_ID);
  if (!result.ok) {
     
    setLocation({ loading: false, data: {longtitude:"0",latitude:"0"}  });
    return;
  }
  //console.log(B_ID,result);
  let data = result.data.ResponseObject;//.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
   setLocation({ loading: false,data: {longtitude:data.longtitud,latitude:data.latitud}  });
   //console.log(location);
   route.params.onSelect({ Location: data.longtitud+","+data.latitud,Proj:"P" });

   navigation.goBack();
  }

  const getTalabats = async () => {

    const token = await authStorage.getToken();
    //const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkxMjA2NzY5MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiLYsdmI2KfZhiDZhtiy2KfYsSDZhdit2YXZiNivINin2KjZiNi52YrYtNipIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiSE1Vc2VyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9zZXJpYWxudW1iZXIiOiIxMDk1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RyZWV0YWRkcmVzcyI6Itiv2YjZitix2KjYp9mGICIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N0YXRlb3Jwcm92aW5jZSI6Itin2YTYrtmE2YrZhCAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9jb3VudHJ5Ijoi2YHZhNiz2LfZitmG2YrZhyAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjA1OTc5MTkzMzYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9ob21lcGhvbmUiOiIwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9ncm91cHNpZCI6IjAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlncm91cHNpZCI6IiIsImV4cCI6MTk1MjQwNDY1NiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.SIw1BdZyi1cgYmz1_xIYMV6DoRmN7IjsNbB472HEdc0";
    setTalabats({ loading: true, data: null });
     console.log(route.params.B_ID);
    const result = await employeesApi.GetTalabat(token,'2010/04/15',
    dayjs((toDate)).locale("ar").format('YYYY/MM/DD')
    ,-1,route.params.B_ID==undefined?-1:route.params.B_ID);
    
   

    if (!result.ok) {       
      setTalabats({ loading: false, data: null });
      return;
    }
    let data = result.data.ResponseObject;
    //.sort(function (a, b) { return b.U_ID - a.U_ID; }) ;;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
     setTalabats({ loading: false, data:data });
    //console.log(data);
  };
  useEffect(() => {
    getTalabats();   console.log("BBBBBBBBBBBBBB"+route.params.B_ID);

    // getUnits();
    //getCustomerUnitsApi.request(user.nameidentifier);//
  }, []);

  return (
    <>
     <ActivityIndicator visible={talabats.loading} />
    
     {!talabats.loading&&talabats.data&&   (
      <FlatList
      data={talabats.data}  
      ListHeaderComponent={ListHeader}
      all
      keyExtractor={(item) => item.TALAB_NO+Math.random()}
        renderItem={({ item ,index}) => (
          <Card
            //s={modalizeRef}
            iconName={"close"}
            TALAB={item}
            ODD={index%2==0}
            TALAB_DATE={dayjs((item?.TALAB_DATE)).locale("ar").format('YYYY/MM/DD')}
            TALAB_NO={item?.TALAB_NO}
            TALAB_NAME={item?.TALAB_NAME}
            CUST_NAME={item?.CUST_NAME}

 
            navigation={navigation}
        
             onPress={async () => {
             //console.log("MAPPP");
             GetBuildingCoordinates(item.BID);
             
              
              //if(item.DAMGE=="N")
              {
                //setModalVisible(false);
               // handleOpenChange(false);

             // setFilteredTxt("");
             // setFiltered(items);
             // onSelectItem(item);
             // selectedItemChanged(item);

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
     
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
    width: 1,
    height: "100%",
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
  headerFooterStyle: {
    flexDirection:"row",
    width: '100%',
    height: 45,
    backgroundColor: '#FFF',
  },
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
  tabView:
  {
   //backgroundColor:colors.danger,
     height:20,
    //color:colors.danger

  },
  tabLabel:
  {
    margin:0,
    // /width:"30%",
    padding:0,
    margin:0,
    fontFamily:"Cairo_600SemiBold",
    fontSize:14,
    //backgroundColor:colors.danger,
    color:colors.white

  }
  ,
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
  tab:
  {
    width:140,
    marginRight:2,
    padding:2
   // backgroundColor:colors.danger,
   // color:colors.white

  }
});

export default TalabatsScreen;
