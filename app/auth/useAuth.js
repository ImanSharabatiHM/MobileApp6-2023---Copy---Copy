import { useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import jwtEncode from "jwt-encode";
import AuthContext from "./context";

import authStorage from "./storage";
import auth from "../api/auth";

export default useAuth = () => {
   const { user, setUser,waterPipe, setWaterPipe} = useContext(AuthContext);
   const dtok="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBbm9ueW1vdXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdHJlZXRhZGRyZXNzIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RhdGVvcnByb3ZpbmNlIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaG9tZXBob25lIjoiMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZ3JvdXBzaWQiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlncm91cHNpZCI6IiIsImV4cCI6MTk4MzQ3NjAzOCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.qUJJe-5RDlDOzKkYlShI7K99sy7dh1Eep6YmS5sjoMQ";

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    var t= JSON.stringify(user);
    t=t.split("http://schemas.microsoft.com/ws/2008/06/identity/claims/").join('');
    t=t.split("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/").join('');
    var u=JSON.parse(t);
    setUser(u);
    authStorage.storeToken(authToken);
  };
  const logInWithUser = async(authToken) => {
    var userFromToken = jwtDecode(authToken);
    var t= JSON.stringify(userFromToken);
    t=t.split("http://schemas.microsoft.com/ws/2008/06/identity/claims/").join('');
    t=t.split("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/").join('');
    var u=JSON.parse(t); 
     console.log("User 2999 : "+JSON.stringify(u));
    var waterP=u.primarygroupsid;
    authStorage.storeWaterPipe(waterP);
    authStorage.storeToken(authToken);
    setUser(u);
    console.log("Watre P "+waterP);
    setWaterPipe(waterP);
   
  };

  const logInWithEDevlet = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    console.log("useAuth",JSON.stringify(user));
    authStorage.storeEDevletToken(authToken);
  };

  const logOut = async () => {

     console.log("Logoutt");
    authStorage.removeToken();
    var anynusertoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBbm9ueW1vdXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdHJlZXRhZGRyZXNzIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3RhdGVvcnByb3ZpbmNlIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6IiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaG9tZXBob25lIjoiMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZ3JvdXBzaWQiOiIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlncm91cHNpZCI6IiIsImV4cCI6MTk4MzQ3NjAzOCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.qUJJe-5RDlDOzKkYlShI7K99sy7dh1Eep6YmS5sjoMQ";
    authStorage.storeToken(dtok);
    authStorage.removeWater();
    const user = jwtDecode(dtok);
    var t= JSON.stringify(user);
    t=t.split("http://schemas.microsoft.com/ws/2008/06/identity/claims/").join('');
    t=t.split("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/").join('');
    var u=JSON.parse(t);
    setUser(u);
  
  console.log("user,",JSON.stringify(authStorage.getUser()));  
 
  };

  const logOutAnonymousUser = async () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user,setWaterPipe, waterPipe, logIn, logInWithEDevlet, logOut, logOutAnonymousUser,logInWithUser };
};
