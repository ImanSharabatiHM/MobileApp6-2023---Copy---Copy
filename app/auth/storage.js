import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken1";
const ekey = "eDevletAuthToken";
const dtok="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBbm9ueW1vdXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdHJlZXRhZGRyZXNzIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RhdGVvcnByb3ZpbmNlIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaG9tZXBob25lIjoiMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZ3JvdXBzaWQiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlncm91cHNpZCI6IiIsImV4cCI6MTk4MzQ3NjAzOCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.qUJJe-5RDlDOzKkYlShI7K99sy7dh1Eep6YmS5sjoMQ";
const storeToken =   (authToken) => {
  try{
  //console.log("I will store Token.... ",authToken);
    SecureStore.setItemAsync(key, authToken);
  }
  catch(error) { console.log("Error storing the auth token", error)}
   
};

const storeAuthUser = async (authUser) => {
  try {
    await SecureStore.setItemAsync("authUser", authUser);
  } catch (error) {
    console.log("Error storing the auth User", error);
  }
};



const storeWaterPipe = async (water) => {
  try {
    await SecureStore.setItemAsync("water", water);
  } catch (error) {
    console.log("Error storing the water pipe for user", error);
  }
};
const storeTrackID = async (id) => {
  try {
    await SecureStore.setItemAsync("track", id);
  } catch (error) {
    console.log("Error storing the track id for user", error);
  }
};
const storeEPayment = async (EPayment) => {
  try {
    await SecureStore.setItemAsync("EPayment", EPayment);
  } catch (error) {
    console.log("Error storing the EPayment value", error);
  }
};


const storeOverTimeNotes = async (id) => {
  try {
    await SecureStore.setItemAsync("notes", id);
  } catch (error) {
    console.log("Error storing the overtime notes for user", error);
  }
};
const storeOverTimeCount = async (count) => {
  try {
    await SecureStore.setItemAsync("count", count);
  } catch (error) {
    console.log("Error storing the initial counter for user", error);
  }
};
const storeStartTime = async (time) => {
  try {
    await SecureStore.setItemAsync("starttime", time);
  } catch (error) {
    console.log("Error storing the start time for overtime", error);
  }
};

const storeTabletApp = async (app_id) => {
  console.log(app_id);
  try {
    await SecureStore.setItemAsync("APP_ID", app_id+"");
  } catch (error) {
    console.log("Error storing the app_id for user", error);
  }
};

const storeEDevletToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(ekey, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  //console.log("will get token..",key );
 
  try {
   // console.log("YESSSSSS       ",SecureStore.getItemAsync(key));
   return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
    return dtok;    
  }
};

const getAppId = async () => {
  //console.log("will get token..",key );
 
  try {
   // console.log("YESSSSSS       ",SecureStore.getItemAsync(key));
   return await SecureStore.getItemAsync("APP_ID");
  } catch (error) {
    console.log("Error getting the APP_ID", error);
    return "-1";    
  }
};

const getOverTimeNotes = async () => {
  try {
   return await SecureStore.getItemAsync("notes");
  } catch (error) {
    console.log("Error getting the overtime notes", error); 
  }
};

const getOverTimeCount = async () => {
  try {
   return await SecureStore.getItemAsync("count");
  } catch (error) {
    console.log("Error getting the initial ", error); 
  }
};


const getAuthUser = async () => {
  //console.log("will get getAuthUser..");
  try {
    return await SecureStore.getItemAsync("authUser");
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getWaterPipeForUser = async () => {
  try {
    return await SecureStore.getItemAsync("water");
  } catch (error) {
    console.log("Error getting the water pipe for user", error);
  }
};

const getTrackID = async () => {
  try {
    return await SecureStore.getItemAsync("track");
  } catch (error) {
    console.log("Error getting the trackid for user", error);
  }
};
const getEPayment = async () => {
  try {
    return await SecureStore.getItemAsync("EPayment");
  } catch (error) {
    console.log("Error getting the EPayment for user", error);
  }
};

const getStartTime = async () => {
  try {
    return await SecureStore.getItemAsync("starttime");
  } catch (error) {
    console.log("Error getting the start time for overtime", error);
  }
}; 
const getEDevletToken = async () => {
  try {
    return await SecureStore.getItemAsync(ekey);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  let token = await getToken();
  //console.log("ddd",token);
  if(token!="" && token!=null && token._W == null)
  {
    //console.log("OKKKKKKKK it was stored WWW",token);
    //storeToken(dtok); 
    var userFromToken = jwtDecode(token);
    var t = JSON.stringify(userFromToken);
     t=t.split("http://schemas.microsoft.com/ws/2008/06/identity/claims/").join('');
    t=t.split("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/").join('');
    var u=JSON.parse(t);
    // /authStorage.storeToken(authToken);
    return u;  
  }



  else if(!token){
   // console.log("No token stored..",token);
    storeToken(dtok); 
    var userFromToken = jwtDecode(dtok);
    var t = JSON.stringify(userFromToken);
     t=t.split("http://schemas.microsoft.com/ws/2008/06/identity/claims/").join('');
    t=t.split("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/").join('');
    var u=JSON.parse(t);
    // /authStorage.storeToken(authToken);
    return u;     
  }

  else if(token!="" && token!=null)
  {
    //console.log("CCCC",token);
    var userFromToken = jwtDecode(token);
    var t = JSON.stringify(userFromToken);
     t=t.split("http://schemas.microsoft.com/ws/2008/06/identity/claims/").join('');
    t=t.split("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/").join('');
    var u=JSON.parse(t);
    // /authStorage.storeToken(authToken);
    return u;

  }
  else{
   // console.log("No token stored..",token);
    storeToken(dtok); 
    var userFromToken = jwtDecode(dtok);
    var t = JSON.stringify(userFromToken);
     t=t.split("http://schemas.microsoft.com/ws/2008/06/identity/claims/").join('');
    t=t.split("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/").join('');
    var u=JSON.parse(t);
    // /authStorage.storeToken(authToken);
    return u;     
  }
  //return token ? jwtDecode(token) : null;
};

const getEDevletUser = async () => {
  const token = await getEDevletToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};
const removeWater = async () => {
  try {
    await SecureStore.deleteItemAsync("water");
  } catch (error) {
    console.log("Error removing the Water", error);
  }
};
const removeEDevletToken = async () => {
  try {
    await SecureStore.deleteItemAsync(ekey);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default {
  storeEPayment,
  storeStartTime,
  storeAuthUser,
  storeTrackID,
  storeOverTimeNotes,
  storeOverTimeCount,
  getOverTimeCount,
  getOverTimeNotes,
  getTrackID,
  getEPayment,
  getAuthUser,
  getToken,
  getEDevletToken,
  getUser,
  getStartTime,
  getEDevletUser,
  removeToken,
  removeEDevletToken,
  storeToken,
  getWaterPipeForUser,
  storeWaterPipe,
  removeWater,
  storeEDevletToken,
  storeTabletApp,
  getAppId
};
