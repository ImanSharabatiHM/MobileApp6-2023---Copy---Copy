import React, { useEffect, useState,useRef } from "react";
import { Linking, StyleSheet,ScrollView ,PermissionsAndroid,Platform} from "react-native";
import ActivityIndicator from "../../components/ActivityIndicator";
import Screen from "../../components/Screen";
import customerApi from "../../api/customer";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import Button from"../../components/Button"
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { Form ,FormField as Field,FormPicker as Picker, FormField,SubmitButton} from "../../components/forms";
import { ListItem, ListItemSeparator } from "../../components/lists";
import colors from "../../config/colors";
import { FlatList } from "react-native";
import Info from "../../components/Info";
import Card from "../../components/CardEmployeePermission";
import Alertmsg from "../../components/Alertmsg";
//import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';

import icons from "../../config/icons";
import { View } from "react-native-animatable";
import authStorage from "../../auth/storage";
import tablet from "../../api/tablet";
 
function EmployeePermissions({ navigation, route }) {
    const [employeePermissions, setEmployeePermissions] = useState({ loading: false, data: [] });
    const [loading, setLoading] = useState(false);
    const [custName, setCustName] = useState("");
    const [custId, setCustId] = useState(null);
    const [userApp,setUserApp]=useState({label:'',value:-1})
  const [taxType, setTaxType] = useState(1);
  const [msgVisible, setmsgVisible] = useState(false);
  const [msgTitle, setmsgTitle] = useState("");
 
    const[showEPaymentFeature,setShowEPaymentFeature]=useState(false);

    

 


  const handleChange1 = async (TaxType ) => {
    //setTaxType(TaxType);
    //getUnitTaxes(U_ID,TaxType,fromDate)
 }

  const GetAllPermissionsForEmp = async () => {
    setEmployeePermissions({ loading: true, data: [] });
    const token=await authStorage.getToken();
    //const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU1NTU1NSIsImV4cCI6MTY4MTQyMjU3NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.zty_zAVQezQ1cSI172DxwWMf2IeEPeXdo6ZIwecCupU";
    const result= await tablet.GetAllPermissionsForEmp(custId,token);
 console.log(result);
    if (!result.ok) {
    //  / setError(true);
      setEmployeePermissions({ loading: false, data:[] });
      return;
    }
  

    setEmployeePermissions({ loading: false, data:result.data });
    //console.log(data);
  };




  useEffect(() => {

     
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    
   }, []);
 
  const handleChange = async (ID,CHECKED ) => {
    console.log(ID,CHECKED);
    var len=employeePermissions.data.length;
    for(var i=0;i<len;i++)
    {
      var obj=employeePermissions.data[i];
      if(ID==obj.PERMISSION){
        obj.CHECKED=CHECKED;//console.log("ffff" + obj.PAY);}
    break;   
    }

}     
}

const UpdateEmployeePermissions = async () => {
  
    data=employeePermissions.data;
    setLoading(true);
    var token = await authStorage.getToken();
    const result = await tablet.PostUpdateEmployeePermissions(token,custId,{"permissions":employeePermissions.data});
   //console.log(result)
     if (!result.ok) {
      console.log(result);
      return;
    } 
    setLoading(false);
  
    //let data = result.data ;
    // setCustName(data);
    // GetTabletAppByEmpNo();*/
  };
const getCustomer = async () => {
  
    setLoading(true);
    var token = await authStorage.getToken();
    const result = await customerApi.GetEmpNameByID(custId,token);
    if (!result.ok) {
      console.log(result);
      return;
    } 
  
    let data = result.data ;
     setCustName(data);
     GetTabletAppByEmpNo();
  };
  const GetTabletAppByEmpNo = async () => {
  
    var token = await authStorage.getToken();
     const result = await tablet.GetTabletAppByEmpNo(custId,token);
     if (!result.ok) {
       console.log(result);
       setLoading(false);
       return;
     } 
   
     let data = result.data ;
     setUserApp({label:data.APP_NAME_AR,value:data.APP_ID});
     setLoading(false);
   };
  return (
    <>
         {msgVisible && <Alertmsg
     isVisible={msgVisible}
     imageUrl={"http://maps.hebron-city.ps/MapBuildings/1.jpg"}
      title={msgTitle}
      onPress={() => {
        setmsgVisible(false);}}
      buttonTitle={"إغلاق"}
     
   />} 

      <Form
        initialValues={{
          CustName:custName,
          CustID:"",
          App:userApp,
          AppName:''

         
        }}
        onSubmit={()=>GetAllPermissionsForEmp()}
        //validationSchema={validationSchema}
      >
      <ScrollView>
    
      <View style={styles.section}>
      <Field
          keyboardType="number-pad"
          maxLength={9}
          editable={true}
          name="CustID"
          onChangeText={newText => setCustId(newText)}
          showPlaceholder={true}
          placeholder="الرقم الوظيفي"
          style={[styles.id]}
        //  onDone={newText => setCustId(newText)}
          onEndEditing={getCustomer}

        />
         <Field
          name="CustName"
          value={custName}
          placeholder={"الاسم"}
          editable={false}
          style={[styles.name]}
          showPlaceholder={true}
        />
          <Field
          name="AppName"
          value={userApp.label}
          placeholder={"التطبيق الحالي"}
          editable={false}
          style={[styles.name]}
          showPlaceholder={true}
        />
        </View>
        <SubmitButton title="إظهار الصلاحيات" />
        </ScrollView>
      </Form>    
      <ActivityIndicator visible={loading} />

       <Screen style={styles.screen}> 
 
      {!employeePermissions.loading && employeePermissions.data.length==0 && (
          <Info
          buttonText={"رجوع للوحدة"}
            buttonVisible={false}
            message={
              "لا يوجد رسوم " 
            }
           onPress={() => navigation.pop(1)}
          />
        )}
      
        {(!employeePermissions.loading && employeePermissions.data.length>0 &&
        <FlatList
          data={employeePermissions.data}
          keyExtractor={(item,index) => item.PERMISSION_ID+"-"+index}
          renderItem={({ item }) => (
            <Card
            handleChange={handleChange}
            VIEWCHECK={true}
            CHECKED={item.CHECKED}
            PERMISSION_ID={item.PERMISSION_ID}
            PERMISSION_AR={item.PERMISSION_AR}
            PERMISSION={item.PERMISSION}
            onPress={() => {
                //setTaxItem(item);
                //console.log(item);
                // modalizeRef.current.open();
              }}
             
            />
          )}
          ItemSeparatorComponent={() => (
            <ListItemSeparator seperatorStyle={styles.seperatorStyleTable} />
          )}
        />
        )}
      
        {((showEPaymentFeature||1)&&!employeePermissions.loading&&employeePermissions.data.length>0&& 
         <View style={[styles.buttonPay]}>
         <Button          
         buttonStyle={{marginTop:5,height:'75%',width:'72%',marginHorizontal:'12%'}}
         color={"primary"}
         textStyle={styles.buttonTxt} title="حفظ التعديلات" 
         onPress={() => {
            UpdateEmployeePermissions()
          //GetenrateLink("2");
           // navigation.navigate(routes.TAXTOTAL,{U_ID:-1})
          }}     
         /> 
        </View>)}
   
      </Screen>    
     </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.white,
  },
  name: { 
    width:"100%",
    fontSize:14,
    padding:0,
    top:0,
    fontFamily:"Cairo_400Regular",
    color: colors.darkNew,
    textAlign:"right"
    
    },
  buttonPay: {
    width: "100%",
    height:50,
    alignSelf: "center",
    flexDirection:"row",
    backgroundColor:colors.white
 
  },
  buttonClose: {
    width: "95%",
    height:50,
    alignSelf: "center",
    marginBottom:7,
    flexDirection:"row"
 
  },
  buttonTxt: {
    color:colors.white,
    fontSize:14,
    alignContent:"center",
    alignItems:"center",
    textAlign:"center",
    fontFamily:'Cairo_600SemiBold',
    
   },
  listTextStyle: {
    color: colors.darkNew,
    fontFamily:'Cairo_700Bold',

  },
  totalTextStyle: {
    color: colors.danger,
    fontFamily:'Cairo_700Bold',

  },
  seperatorStyle: {
    backgroundColor: colors.backgroundColor,
  },
  seperatorStyleTable: {
    backgroundColor: colors.secondary,
  },
  screen: {
    marginTop:20,
    backgroundColor: colors.backgroundColor,
  },
  section: { marginHorizontal: 3, width: "100%", fontSize: 14},

});
export default EmployeePermissions;
