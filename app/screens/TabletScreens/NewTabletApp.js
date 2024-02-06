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

function NewTabletApp({ navigation }) {

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
      APP_NAME_AR: Request.AppNameAR,
      APP_NAME:Request.AppNameEN
       };
       console.log(RequestToAdd);
    const result = await tablet.NewTableApp(RequestToAdd.APP_NAME,RequestToAdd.APP_NAME_AR,token);
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
        onPress={() => {setInfo(null);GetAllTabletApps();}}
      />
    )}   

    <Screen style={styles.container}>
     <ActivityIndicator visible={loading} />

      <Form
        initialValues={{
          AppNameAR:'',
          AppNameEN:'',
          App:null

         
        }}
        onSubmit={handleSubmit}
       // validationSchema={validationSchema}
      >
      <ScrollView>
    
      <View style={styles.section}>
 
          <Field
          name="AppNameAR"
          placeholder={"اسم التطبيق بالعربية"}
          editable={true}
          style={[styles.name]}
          showPlaceholder={true}
        />
         <Field
          name="AppNameEN"
          placeholder={"اسم التطبيق بالإنجليزية"}
          editable={true}
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
        <SubmitButton title="إضافة تطبيق " />
        </ScrollView>

      </Form>
    </Screen>
    </>
  );
}
export default NewTabletApp;

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
