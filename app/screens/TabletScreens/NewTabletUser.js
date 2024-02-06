import React from "react";
import  {useState,useEffect}  from 'react';
import { StyleSheet,View ,ScrollView} from "react-native";
import * as Yup from "yup";
import contentApi from "../../api/content";
 import colors from "../../config/colors";
import * as FileSystem from "expo-file-system";
import customerApi from "../../api/customer";
import authStorage from "../../auth/storage";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../../components/forms";
import FormRadioButtonGroup from "../../components/forms/FormRadioButtonGroup";
import useAuth from "../../auth/useAuth";
import Screen from "../../components/Screen";
import ActivityIndicator from "../../components/ActivityIndicator";
import Info from "../../components/Info";
import tablet from "../../api/tablet";
  
const validationSchema = Yup.object().shape({
 
  CustID: Yup.string().required("رقم الهوية مطلوب")
  .min(3, "يجب إدخال 3 أرقام على الأقل")
  .max(5),
  //CustName: Yup.string().required("اسم مقدم الطلب"),
  //CustMobile:Yup.string().required("رقم هاتف مقدم الطلب"),
 
});

function NewTabletUser({ navigation }) {

  const { user } = useAuth();

  //const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [custName, setCustName] = useState("");
  const [custId, setCustId] = useState(null);
  const [tabletApps, setTabletApps] = useState({loading:false,data:[]});
  const [app,setApp]=useState(0);
  const [userApp,setUserApp]=useState({label:'',value:-1})



  const handleSubmit = async (Request, { resetForm }) => {
    setLoading(true);

    var token = await authStorage.getToken();
    let RequestToAdd = { 
      CustNo: Request.CustID,
      App:Request.App.value
       };
    const result = await tablet.NewTableUser(RequestToAdd.CustNo,RequestToAdd.App,token);
    if (!result.ok) {
      setInfo({
         RequestStatus: result.data.Message,
         RequestNo: "",  
      });
     setLoading(false);
     return;
    }
    else {{
      setInfo({
        RequestNo:"",
        RequestStatus: result.data.Message
      });
        setLoading(false);
    }}
    resetForm();
    setCustName('');
  };

 
const GetAllTabletApps = async () => {
    setTabletApps({loading:true ,data:null});
    var token = await authStorage.getToken();
     const result = await tablet.GetAllTabletApps(token);
     if (!result.ok) {
       console.log(result);
       return;
     }   
     let data = result.data ;
     setTabletApps({loading:true ,data:data  });
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

  
  
 
  useEffect(() => {
    GetAllTabletApps();
   }, []);
  
  return (
    <>
    {info && (
      <Info
        numberOfLines={2}
        buttonText="إضافة جديدة"
        buttonVisible={true}
        color={colors.primary}
        message={ 
          (info.RequestStatus)
        }
        onPress={() => {setInfo(null);setUserApp({label:'',value:-1})}}
      />
    )}   

    <Screen style={styles.container}>
     <ActivityIndicator visible={loading} />

      <Form
        initialValues={{
          CustName:custName,
          CustID:"",
          App:userApp,
          AppName:''

         
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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
 
           {true&&<Picker
                 items={tabletApps.data?.map(
                  (tabletApp) => {
                    return {label: tabletApp.APP_NAME_AR ,value: tabletApp.APP_ID };
                          })}
              
                          selectedItemChanged={(App) =>   
                            {
                             setApp(App.value);
                           //  / scrollToIndexUnit(unit.label);      
                           }}
                          style={[styles.name]}
                          name="App"
                        
                          placeholder="التطبيق"
                          showPlaceholder={false}                
              />}

        </View>
        <SubmitButton title="إضافة أو تعديل مستخدم" />
        </ScrollView>

      </Form>
    </Screen>
    </>
  );
}
export default NewTabletUser;

const styles = StyleSheet.create({
  section: { marginHorizontal: "10%" ,width:"80%",fontSize:12,marginTop:20},
  Field: { 
  width:"50%",
  fontSize:12,
  fontFamily:"Cairo_400Regular",
  // /color: colors.black
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
id: { 
  width:"100%",
  fontSize:14,
  fontFamily:"Cairo_600SemiBold",
  color: colors.danger,
  textAlign:"right"
  },
  button:{width:"70%"},
  imagesection: { width:"100%" },

  container: {
    fontSize:10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
