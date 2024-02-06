import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions ,  View} from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
import Button from"../components/Button"
import contentApi from "../api/content";
import routes from "../navigation/routes";
import authStorage from "../auth/storage";

import Card from "../components/CardTakaful";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
 const initialLayout = { width: Dimensions.get("window").width };

function TakafulTotalScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const {user,waterPipe}=useAuth();
  const [proje, getProje] = useState(null);
  const GetCMUserComplaintsByIDApi = useApi(complaintApi.GetCMUserComplaintsByID);
  const [error, setError] = useState(false);
  const getWaterAreasApi = useApi(contentApi.getWaterAreas);
  const [settings, setSettings] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [total, setTotal] = useState(0);


  const getSettings = async () => {
    // console.log("getsettinggg");
     const result = await contentApi.getAyarlar();
     if (!result.ok) {
       return;
     }
    console.log(result);
     setSettings(result.data);
   };

   const getTotal = async () => {
    // console.log("getsettinggg");
    var token = await authStorage.getToken();

     const result = await customerApi.GetTakafulTotal(token);
     if (!result.ok) {
       return;
     }
    console.log(result);
     setTotal(result.data);
   };


   const getStatistics = async () => {
    // console.log("getsettinggg");
     const result = await contentApi.GetMobileDeviceUserSummary();
     if (!result.ok) {
       return;
     }
    console.log(result);
     setStatistics(result.data);
   };
 

  useEffect(() => {
    getTotal();
   // getSettings();
    //getStatistics();
   // console.log(user);
    //console.log("EEEEE"+waterPipe);
   // GetCMUserComplaintsByIDApi.request(user.nameidentifier,user.homephone);//user.id

  }, []);

  return (
    <>
      <Screen style={styles.screen}>
      {user && (  
         <FlatList
         data={[user]}
         keyExtractor={(item) => 90990+Math.random()}
         renderItem={({ item }) => (
          <Card
          name={item.name?item.name:"0"}
          user={user.nameidentifier?item.nameidentifier:"0"} 
          devices={statistics?.DEVICES?statistics.DEVICES:0}
          usernumber={statistics?.LOGGEDIN_USERS?statistics.LOGGEDIN_USERS:0}            
          nameidentifier={item.nameidentifier?item.nameidentifier:"0"} 
          mobilephone = {item.mobilephone?item.mobilephone:"0"} 
          homephone={item.homephone?item.homephone:"0"}    
          streetaddress={item.streetaddress?item.streetaddress:"الخليـل"}   
          waterditribution={total}
          mntxt={"رصيد الموظف في صندوق التكافل :"}
          
          mntxt1={"هذا المبلغ مُستحَق للموظف على ذمة صندوق التكافل، دون أدنى مسؤولية على البلدية."}
          settings={settings}
         // onPress={() => {
              //getUnit(item);
             // modalizeRef.current.open();
          //  }}
           
          //  /base64={'data:image/png;base64,'+item.IMAGE}
          //  /imageUrl= {"http://10.11.20.9/php/ImagesHeraf/10-282-0a5-3.jpg"}
          />
         )}
       />      
            
       
      )}
         { false&&<View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
            color={"secondaryLight"}
             textStyle={styles.buttonTxt} title="طلب تحديث البيانات" 
             onPress={() => navigation.navigate(routes.UPDATEINFO)}

             
             
             />
          </View>}
    </Screen>
      <AppModalize
        ref={modalizeRef}
        //title={proje?.projectTitle["#cdata-section"]}
      >
        <AppWebView
          source={{
            html:
              "<meta name='viewport' content='width=device-width, initial-scale=1'>"
             // proje?.projectContent["#cdata-section"].split("<br>").join(""),
          }}
        />
      </AppModalize>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
  socialDrawer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClose: {
    width: "80%",
    alignSelf: "center",
  },
  buttonTxt: {
    color:colors.white,
    fontSize:20
    
   },
});


export default TakafulTotalScreen;
