import React from "react";
import  {useState,useEffect}  from 'react';
import { StyleSheet,View ,ScrollView,FlatList} from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import contentApi from "../api/content";
import RequestApi from "../api/request";
import UploadScreen from "./UploadScreen";
import colors from "../config/colors";
import * as FileSystem from "expo-file-system";
import Card from "../components/CardService";
import useAuth from "../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";

import Screen from "../components/Screen";
import constants from "../config/constants";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import request from "../api/request";

function ServiceInfoScreen({ navigation,route }) {

  const { user } = useAuth();
  const [serviceId,setServiceId]=useState(route.params.item.TalabCode);
  const [service,setService]=useState(route.params.item);

  const getDeptApi = useApi(RequestApi.getComplaintDepts);
  const getDeptProblemsApi = useApi(RequestApi.getComplaintDeptProblems);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const unit=route.params.item;
  const [requiredDocuments, setRequiredDocuments] =  useState({ loading: false,data:[]});
  const [requestSteps, setRequestSteps] =  useState({ loading: false,data:[]});
  const [masar, setmasar]  =  useState({ loading: false,data:[]});
  const getRequiredDocs= async (TalabCode,TalabSubCode) => {
    setRequiredDocuments({ loading: true, data: [] });
     //const result = await getCustomerUnitsApi.request(user.nameidentifier);
   const result = await RequestApi.GetRequestDocs((TalabCode,TalabSubCode));
   console.log(result);
  
    if (!result.ok) {
     // setError(true);
     setRequiredDocuments({ loading: false, data:[] });
      return;
    }
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    console.log(data);
    setRequiredDocuments({ loading: false, data:data });
  };
  const getRequestSteps= async (TalabCode,TalabSubCode) => {
    setRequestSteps({ loading: true, data: [] });
     //const result = await getCustomerUnitsApi.request(user.nameidentifier);
   const result = await RequestApi.GetRequestSteps(TalabCode,TalabSubCode);
   console.log(result);
  
    if (!result.ok) {
     // setError(true);
     setRequestSteps({ loading: false, data:[] });
      return;
    }
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    console.log(data);
    setRequestSteps({ loading: false, data:data });
  };
  const getRequestMasars= async (TalabCode,TalabSubCode)=> {
    setmasar({ loading: true, data: [] });
     //const result = await getCustomerUnitsApi.request(user.nameidentifier);
   const result = await RequestApi.GetRequestMasars(TalabCode,TalabSubCode);
   console.log(result);
  
    if (!result.ok) {
     // setError(true);
     setmasar({ loading: false, data:[] });
      return;
    }
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);
    console.log(data);
    setmasar({ loading: false, data:data });
  };
  const handleServices = async () => {
    getRequiredDocs(serviceId,"");
    getRequestSteps(serviceId,"");
    getRequestMasars(serviceId,"");
  }
  useEffect(() => {
   handleServices();
  }, []);
 

 

 
  return (
    <>
    <ActivityIndicator visible={requiredDocuments.loading ||requestSteps.loading ||masar.loading} /> 

    {!requestSteps.loading && requestSteps.data?.length==0 && (
      <Info
        numberOfLines={5}
        buttonText="لا يوجد معلومات حول الخدمة، سيتم إضافتها قريباً.."
        buttonVisible={false}
        color={colors.primary}
        message={"لا يوجد معلومات حول الخدمة، سيتم إضافتها قريباً.."}
        onPress={() => setInfo(null)}
      />
    )}
      <Screen style={styles.screen}>
      {!requestSteps.loading &&requestSteps.data?.length!=0&& (  
         <FlatList
         data={[user]}
         keyExtractor={(item) => 90990+Math.random()}
         renderItem={({ item }) => (
          <Card
          title={service.TextAr}
          days={service.NoOfDays}
          code={service.TalabCode}
          docs={requiredDocuments}
          steps={requestSteps}
          masar={masar} 
          />
         )}
       />      
            
       
      )}
          {false&&<View style={[styles.buttonClose]}>
            <Button buttonStyle={styles.buttonClose}
            color={"secondaryLight"}
             textStyle={styles.buttonTxt} title="طلب تحديث البيانات" 
             onPress={() => navigation.navigate(routes.UPDATEINFO)}

             
             
             />
          </View>}
    </Screen>
    </>
  );
}
export default ServiceInfoScreen;

const styles = StyleSheet.create({
    scene: {
        flex: 1,
      },
      screen: {
        paddingTop: 10,
        backgroundColor: colors.light,
      },
  section: { marginHorizontal: "10%" ,width:"80%",fontSize:12,},
  Field: { 
  width:"50%",
  fontSize:12,
  fontFamily:"Cairo_400Regular",
  textAlign:"right",
  // /color: colors.black
},
name: { 
width:"100%",
fontSize:12,
fontFamily:"Cairo_400Regular",
color: colors.darkNew,
textAlign:"right",

},
  button:{width:"70%"},
  imagesection: { width:"100%" },

  container: {
    fontSize:10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
