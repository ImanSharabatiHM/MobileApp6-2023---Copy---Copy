import React from "react";
import  {useState}  from 'react';
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { Alert,Linking } from "react-native";

import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { Form, FormPicker as Picker, SubmitButton, FormField as Field } from "../components/forms";
import Screen from "../components/Screen";
import Button from "../components/Button";
import Alertmsg from "../components/Alertmsg";
import constants from "../config/constants";
import routes from "../navigation/routes";
import jwtDecode from "jwt-decode";
import colors from "../config/colors";
import * as SMS from 'expo-sms';
import ActivityIndicator from "../components/ActivityIndicator";


function LoginhmScreen({ navigation }) {

  const { user, logInWithUser } = useAuth();
  const forgetPassApi = useApi(authApi.forgetPasswordSMS);
  const [id, setId] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [forgetPass, setforgetPass] = useState(false);
  const [login, setLogin] = useState(true);
  const [employee, setEmployee] = useState(false);
  const [whatsappVisible, setWhatsappVisible] = useState(false);

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msgVisible, setmsgVisible] = useState(false);
  const [msgTitle, setmsgTitle] = useState("");

  if(user?.role != "Anonymous"){navigation.navigate(routes.HOME);}

  let validationShapeLogin = {
   idNo: Yup.string().required("رقم الهوية مطلوب")
    .min(9, "يجب إدخال 9 أرقام")
    .max(9),
    pass: Yup.string().required("كلمة المرور"),
    } 
      let validationShapeLoginEmp = {
   idNo: Yup.string().required("الرقم الوظيفي مطلوب"),
   // .min(9, "يجب إدخال 9 أرقام")
   // .max(9),
    pass: Yup.string().required("كلمة المرور"),
    } 
     
  
  let validationShapeForget = {
    idNo: Yup.string().required("رقم الهوية مطلوب")
    .min(9, "يجب إدخال 9 أرقام")
    .max(9),
    mobile: Yup.string().required("رقم المحمول مطلوب"),
    } 
     
   
  
   
  const validationSchema =(login==false)?(employee?Yup.object().shape(validationShapeLoginEmp):Yup.object().shape(validationShapeForget)):Yup.object().shape(validationShapeLogin);
  const handlePress = () => {
    //setmsgVisible(false);
  }; 

  const handleLogin = async (data) => {
   setProgress(0);
    if(login &&(user.role == "Anonymous"))
    { 
      setLoading(true);
      console.log("Will Login.."+data.idNo,data.pass);
      var  result = await authApi.userLogin(data.idNo,data.pass);      
      console.log(JSON.stringify(result) );   
      if (!result.ok) {
        setLoginFailed(true);
        setmsgVisible(true);
       

        setLoading(false);
        if(result.problem == "NETWORK_ERROR")
        { setWhatsappVisible(true);
          setmsgTitle("مشكلة في الاتصال بالشبكة");
        }
        else {setmsgTitle("رقم الهوية أو كلمة المرور خاطئة");        setWhatsappVisible(false);
      }
       // setError(true);
        return;
      
     }
     else
     {
      setLoading(false);
     setLoginFailed(false);
     setmsgVisible(false);
     //To setUser
     logInWithUser(result.data);
     navigation.navigate(routes.MYINFO);}
    }
    else if(forgetPass)
    {
      const result =   await authApi.forgetPasswordSMS(data.idNo);
      if (!result.ok) {
        setmsgVisible(true);
        setWhatsappVisible(true);

        setmsgTitle("في حال استمر الخطأ يرجى الضغط على زر التواصل\\nحدث خطأ!\nيرجى إعادة المحاولة");      }        
      else {
        //const isAvailable = await SMS.isAvailableAsync();
        //if (isAvailable) { console.log("sssss"); } else { }

        console.log("SMS sent!");
        setmsgVisible(true);
        setWhatsappVisible(true);
        setmsgTitle("ستصلك رسالة تحتوي كلمة المرور \nفي حال لم تصل الرسالة يرجى الضغط على زر التواصل\n");
        setLogin(true);
        setforgetPass(false);
      return;
      }

    }
    else if(newUser)
    {
    const result = await
    authApi.addNewUser({"CUST_NO": user.idNo,"MOBILE": user.mobile}, (progress) => {
    setProgress(progress);
    if (progress == 1) setLoading(true);
      });
      console.log(JSON.stringify(result));
      if (!result.ok) {
        //setUploadVisible(false);
        //setInfo({complaintStatus: "لم يتم تقديم الشكوى" complaintNo: ""//});
        setLoading(false);
        return;
      }
      else {
  
      if (result.data) { 
        setmsgTitle("تمت العملية بناجح...");
        setLoading(false);      
      //resetForm();
    }
}
    }
  }

  return (
    <>
  
    
    <Screen style={styles.container}>
    <ActivityIndicator visible={loading} />

      <Form
        initialValues={{
          tahsilatYili: null,
          idNo:"",
          empNo:"",
          pass:"",
          mobile:''
        }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
       {(login|| newUser||forgetPass) && <Field
          keyboardType="number-pad"
          maxLength={9}
          name="idNo"
          placeholder="رقم الهوية"
          style={styles.field}
          onChangeText={null}
        />
       }
        {(employee) && <Field
          keyboardType="number-pad"
          maxLength={9}
          name="empNo"
          placeholder="الرقم الوظيفي"
          style={styles.field}
        />
       }

     {(login||employee) && <Field
          type="password"
          name="pass"
          placeholder="كلمة المرور"
          style={styles.field}
          secureTextEntry={true}
        />
     }

    {(newUser||forgetPass) &&<Field
          keyboardType="number-pad"
          name="mobile"
          placeholder="رقم المحمول "
          style={styles.field}
        />
     }
   

    {login && <SubmitButton title="تسجيل الدخول" />}
    {employee && <SubmitButton title="تسجيل الدخول" />}

    {forgetPass && <SubmitButton title="إرسال SMS" />}
    {newUser && <SubmitButton title="إنشاء حساب " />}
    {(login || forgetPass)&&<Button 
      textStyle={[styles.forgetTxt]}
      buttonStyle={[styles.newUserButton]}
      onPress={() => 
        {/*setNewUser(true);
         setLogin(false);
         setforgetPass(false);*/     
         setNewUser(false);
         setLogin(false);
         setforgetPass(true);
     }
      }
      title="مستخدم جديد" /> }
      

      {(login||forgetPass||newUser)&&<Button 
      textStyle={[styles.forgetTxt]}
      buttonStyle={[styles.forgetButton]}
      onPress={() => 
        {//setNewUser(false);
         //setLogin(false);
         //setforgetPass(true);
        }}
      title="طلب تحديث البيانات" />}


      {(login||newUser)&&<Button 
      textStyle={[styles.forgetTxt]}
      buttonStyle={[styles.forgetButton]}
      onPress={() => 
        {setNewUser(false);
         setLogin(false);
         setforgetPass(true);
        }}
      title="هل نسيت كلمة المرور؟" />}

    {(employee)&&<Button 
      textStyle={[styles.forgetTxt]}
      buttonStyle={[styles.forgetButton]}
      onPress={() => 
        {setNewUser(false);
         setLogin(false);
        // setEmployee(true);
         setforgetPass(false);
        }}
      title="تسجيل الدخول كموظف؟" />}

        {(employee)&&<Button 
      textStyle={[styles.forgetTxt]}
      buttonStyle={[styles.forgetButton]}
      onPress={() => 
        {setNewUser(false);
         setLogin(true);
         //setEmployee(false)
         setforgetPass(false);
        }}
      title="تسجيل الدخول كمواطن؟" />}
      
       {(newUser||forgetPass)&&<Button 
      textStyle={[styles.forgetTxt]}
      buttonStyle={[styles.newUserButton]}
      onPress={() => 
        {setNewUser(false);
         setLogin(true);
        // setEmployee(true);
         setforgetPass(false);
        }
      }
      title="إلغاء" />}
     </Form>
     {msgVisible && <Alertmsg
     isVisible={msgVisible}
      title={msgTitle}
      has2Btn={whatsappVisible}
      icon={"whatsapp"}
      buttonTitle2={"تواصل"}
      onPress2={() => Linking.openURL('http://api.whatsapp.com/send?phone=+97022228121')}
      onPress={() => {
        setmsgVisible(false);}}
      buttonTitle={"إغلاق"}
     
   />} 
     
    </Screen>
    </>
  );
}
export default LoginhmScreen;

const styles = StyleSheet.create({
  forgetButton: {
    backgroundColor:colors.transparent,
    height:40,
    marginVertical:3,
    paddingVertical:0
  },
  forgetTxt:
  {
    fontSize:15,
    padding:0,
    margin:0,
    color:colors.danger
  },
  newUserButton: {
    backgroundColor:colors.transparent,
    height:40,
    marginVertical:0,
    paddingVertical:0

  },
  container: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  field:
  {
    width:"100%",
    fontSize:12,
    fontFamily:"Cairo_400Regular",
  }
});
