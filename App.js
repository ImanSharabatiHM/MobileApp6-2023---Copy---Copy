import  { React,useEffect} from "react"
import  {useState}  from 'react'
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';

import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import  navigationRef  from "./app/navigation/rootNavigation";
import { Portal } from "react-native-paper";
import NotificationContext from "./app/notification/notificationContext";
import { I18nManager } from "react-native";
 
import {
  useFonts,
  Cairo_200ExtraLight,
  Cairo_300Light,
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
  Cairo_800ExtraBold,
  Cairo_900Black,
} from '@expo-google-fonts/cairo';
 SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState();
  const [waterPipe, setWaterPipe] = useState("");

  const [isReady, setIsReady] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  //const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
  const fetchData = async () => {
    console.log("Will Fetch");
    try {
      const response = await axios.get('https://egate.hebron-city.ps/api/api/website/NewsTitles');
     console.log(response.data);
    } catch (error) {
      console.log("ERRRORO",response);
      console.log("ERRRORO",error);

      console.error('Request error:', error);
    }
    console.log("FINISHHHHH");
  };
  async function prepare() {
    try {
      // Pre-load fonts, make any API calls you need to do here
     // await Font.loadAsync(Entypo.font);
      // Artificially delay for two seconds to simulate a slow loading
      // experience. Please remove this if you copy and paste the code!
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.warn("from app.js",e);
    } finally {
      // Tell the application to render
      setIsReady(true);
      await SplashScreen.hideAsync();
    }
  }
  useEffect(() => {
   I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
    console.log(I18nManager.isRTL+"   hhh hhhh ");
    if (!I18nManager.isRTL) {

     // RNRestart.Restart();
    }
    //fetchData();
    restoreUser();
   prepare();
  }, []);
  
  let [fontsLoaded] = useFonts({
    Cairo_200ExtraLight,
    Cairo_300Light,
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
    Cairo_800ExtraBold,
    Cairo_900Black,
  });


  const restoreUser = async () => {
    var usert = await authStorage.getUser();  
     var wPipe = await authStorage.getWaterPipeForUser();    
    if (usert) {
      if(usert!= null){
        setUser(usert);
        setWaterPipe(wPipe);
      }
    } else {          
      var anynusertoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBbm9ueW1vdXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdHJlZXRhZGRyZXNzIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RhdGVvcnByb3ZpbmNlIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaG9tZXBob25lIjoiMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZ3JvdXBzaWQiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlncm91cHNpZCI6IiIsImV4cCI6MTk4MzQ3NjAzOCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.qUJJe-5RDlDOzKkYlShI7K99sy7dh1Eep6YmS5sjoMQ";
      authStorage.storeToken(anynusertoken);
      var useranyn = await authStorage.getUser();
      setUser(useranyn);   
     }
    console.log("I set Userrr"); 
  };

  /*const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      
    }
  }, [isReady]);
*/
  if (!isReady)
  {
    return null;   
  }
 if (!fontsLoaded) {
  console.log("NOTTT");
    return null;
  } 
  return (  
    <Portal.Host>
      <AuthContext.Provider value={{ user, setUser, waterPipe,setWaterPipe}}>
        <NotificationContext.Provider value={{ notificationCount, setNotificationCount }} >          
          <NavigationContainer ref={navigationRef}  fallback={prepare}  theme={navigationTheme}>
            {<DrawerNavigator />}
          </NavigationContainer>
        </NotificationContext.Provider>
      </AuthContext.Provider>
    </Portal.Host>
  );

  
}


