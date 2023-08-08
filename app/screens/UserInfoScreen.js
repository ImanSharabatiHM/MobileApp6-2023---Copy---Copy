import React, { useEffect, useRef, useState } from "react";
import { FlatList,StyleSheet,Dimensions,View,ScrollView} from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
 
import Button from"../components/Button"
import contentApi from "../api/content";
import routes from "../navigation/routes";
import Card from "../components/CardUser";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
import { color } from "react-native-reanimated";
const initialLayout = { width: Dimensions.get("window").width };

function UserInfoScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const {user,waterPipe}=useAuth();
  const [showIncompleteFeature, setShowIncompleteFeature] = useState(false);

  const [proje, getProje] = useState(null);
  const GetCMUserComplaintsByIDApi = useApi(complaintApi.GetCMUserComplaintsByID);
  const [error, setError] = useState(false);
  const getWaterAreasApi = useApi(contentApi.getWaterAreas);
  const getShowIncompleteFeature = async () => {
    //console.log(user.nameidentifier);
    const result = await contentApi.ShowIncompleteFeature();

    if (!result.ok) {
      setShowIncompleteFeature(0);
      setError(true);
      return;
    }
    console.log(result.data);
    
    setShowIncompleteFeature(result.data);
  };
  useEffect(() => {
    console.log(user);
    console.log("EEEEE"+waterPipe);
    getShowIncompleteFeature();
   // GetCMUserComplaintsByIDApi.request(user.nameidentifier,user.homephone);//user.id

  }, []);

  return (
    <>
      <Screen style={styles.screen}>
        <View style={{height:"100%"}} >   
      {user && ( 
                <Card
                name={user.name}             
                nameidentifier={user.nameidentifier} 
                mobilephone = {user.mobilephone?user.mobilephone:"0"} 
                homephone={user.homephone?user.homephone:"0"}    
                streetaddress={user.streetaddress?user.streetaddress:"الخليـل"}   
                waterditribution={waterPipe}
                usernumber={user.role=="HMUser"?user.serialnumber:""}/>)}  
                             
         {true&&showIncompleteFeature&& <View style={[styles.buttonClose]}>
            <Button
            buttonStyle={{marginTop:0,height:"100%"}}
            color={"primary"}
             textStyle={styles.buttonTxt} title="طلب تحديث البيانات" 
             onPress={() => navigation.navigate(routes.UPDATEINFO)}      
             />
          </View>}

          {true&&(user?.role == "HMUser")&& <View style={[styles.buttonClose]}>
            <Button  
             buttonStyle={{marginTop:0,height:"100%"}}
             color={"primary"}
             textStyle={styles.buttonTxt} title="قسيمة الراتب" 
             onPress={() => navigation.navigate(routes.SALARY)}      
             />
          </View>}
          </View>
     </Screen>  
    </> 
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  screen: {
    height:"100%",
    paddingTop: 10,
    backgroundColor:colors.white
   },
  buttonClose: {
    marginTop:10,
    width: "80%",
    height:"8%",
    alignSelf: "center",
 
  },
  buttonTxt: {
    color:colors.white,
    fontSize:16,
    alignContent:"center",
    alignItems:"center",
    textAlign:"center"
    
   },
});


export default UserInfoScreen;
