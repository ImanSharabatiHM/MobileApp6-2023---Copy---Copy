import React from "react";
import  {useState,useEffect}  from 'react';
import { StyleSheet,View ,ScrollView} from "react-native";
import * as Yup from "yup";
import authApi from "../api/auth";
import contentApi from "../api/content";
import customerApi from "../api/customer";

import complaintApi from "../api/complaint";
import colors from "../config/colors";

import useAuth from "../auth/useAuth";
import useLocation from "../hooks/useLocation";

import Screen from "../components/Screen";
import constants from "../config/constants";
import ActivityIndicator from "../components/ActivityIndicator";
import Info from "../components/Info";
import complaint from "../api/complaint";

function UserTaxScreen({ navigation }) {

  const { user } = useAuth();
  const getUserTotalTax = useApi(complaintApi.getComplaintDepts);
  const [info, setInfo] = useState(null);

  //const location = useLocation();
   const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const getUserTaxApi = useApi(customerApi.getAllTaxForUserByUserID);

  const gettaxes = async () => {
    setLoading(true);
    setInfo({ loading: true, data: null });
    const result = await customerApi.getAllTaxForUserByUserID(user.nameidentifier);
    setInfo({ loading: false, data: null });
    const staticservices=[
      {contentId:"ser1",iconActive:"arsarayicbedel_passive",title:"الخدمة الأولى",isAnonymous:false,rout:"http://www.google.com"},
      {contentId:"ser2",iconActive:"guncelhaberler_passive",title:"الخدمة الثانية",isAnonymous:false,rout:"http://www.google.com"},
      {contentId:"ser3",iconActive:"etkinlikler_passive",title:"الخدمة الثانية",isAnonymous:false,rout:"http://www.google.com"},
      {contentId:"ser4",iconActive:"imardurumbilgisi_passive",title:"الخدمة الثانية",isAnonymous:false,rout:"http://www.google.com"}

    
    ];
    console.log(JSON.stringify(result));
    if (!result.ok) {
      setError(true);
      setInfo({ loading: false, data:staticservices });

      return;
    }
    let data = result.data ;//.sort(function (a, b) { return b.hitCount - a.hitCount; }) .slice(0, 5);

    setLoading(false);
    setInfo({ loading: false, data });
  };
  const handleTax = async () => {
    gettaxes();
  }

  useEffect(() => {
    handleTax();

    console.log(getUserTaxApi.data);
  }, []);
   
 
  return (
    <>
   
    <Screen style={styles.container}>
    {info && (
      <Info
        numberOfLines={6}
        notFound={loading}
        buttonText="التفاصيل"
        buttonVisible={true}
        color={colors.primary}
        message={ 
          ( " رسوم الحرف والصناعات : " + info.data?.TAX_HERAF +" دينار.\n"+
          " رسوم النفايات : " + info.data?.TAX_Waste +" شيكل.\n"+
          " رسوم اليافطات : " + info.data?.TAX_YAFTAT +" دينار.\n"+
          " رسوم المياه: " + info.data?.TAX_WATER +" شيكل.\n"+
          " ضريبة المعارف : " + info.data?.TAX_MAAREF +" دينار.\n"

          )
        }
        //onPress={() => setInfo(null)}
      />
    )}
    <ActivityIndicator visible={loading} />

     
    </Screen>
    </>
  );
}
export default UserTaxScreen;

const styles = StyleSheet.create({
  section: { marginHorizontal: "20%" ,width:"60%",fontSize:12,},
  Field: { 
  width:"50%",
  fontSize:12,
  fontFamily:"Cairo_400Regular",
  // /color: colors.black
},
name: { 
width:"100%",
fontSize:12,
fontFamily:"Cairo_400Regular",
color: colors.darkNew
},
  button:{width:"70%"},
  imagesection: { width:"100%" },

  container: {
    fontSize:10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
