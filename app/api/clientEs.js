import { create } from "apisauce";
import React from "react";
import cache from "../utility/cache";
import db from "../utility/database";
import authStorage from "../auth/storage";
import NetInfo from '@react-native-community/netinfo';
import {useState} from 'react';
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import settings from "../config/settings";

 const apiClient = create({
  baseURL: settings.apiUrlEs,
  maxContentLength: 250000,
 
});

const isExpired = (timestamp) => {
  const now = dayjs();
  const storedTime = dayjs.unix(timestamp);
  return storedTime.diff(now, "minute") < 30;
};

apiClient.addAsyncRequestTransform(async (request) => {
  //request.headers['Access-Control-Allow-Origin']= 'https://egate.hebron-city.ps/api';
 // request.headers['Access-Control-Allow-Methods']= 'GET, POST, PUT, DELETE';
  //request.headers['Access-Control-Allow-Headers']= 'Content-Type, Authorization';

  if (
    request.url.includes("favorites") ||
    request.url.includes("userNotifications")
  ) {
    let authToken = await authStorage.getToken();
    if (!authToken) return;
    request.headers["Authorization"] = "Bearer " + authToken;
  } else {
    let authEDevletToken = await authStorage.getEDevletToken();
    if (authEDevletToken) {
      const user = jwtDecode(authEDevletToken);
      if (isExpired(user.exp)) {
        let authToken = await authStorage.getToken();
        if (!authToken) return;

        request.headers["Authorization"] = "Bearer " + authToken;
      } else {
        request.headers["Authorization"] = "Bearer " + authEDevletToken;
      }
    } else {
      let authToken = await authStorage.getToken();
      if (!authToken) return;
      request.headers["Authorization"] = "Bearer " + authToken;
    }
  }
});
 
const get = apiClient.get;
const getNetInfo = async() => {
  // To get the network state once
  NetInfo.fetch().then((state) => {
    alert(
      `Connection type: ${state.type}
      Is connected?: ${state.isConnected}
      IP Address: ${state.details.ipAddress}`
    ); 
    console.log(state.isConnected);
   return state.isConnected;
  });
  
};
/*const sendStoredApiRequests = apiClient.sendStoredApiRequests;

apiClient.sendStoredApiRequests=async()=>
{
  db.retrieveApiRequests((apiRequests) => {
    alert(apiRequests.length);
    apiRequests.forEach((request) => {
      alert("will send REQUEST fROM DB  "+request.id);
      // Retry the API call for each stored request
      const res= get(request.endpoint,request.body);
      console.log(res);
     /* makeApiCall(request.endpoint, request.method, request.headers, request.body)
        .then((response) => {
          // Handle successful API call
          db.removeApiRequest(request.id);
        })
        .catch((error) => {
          // Handle API call failure
          console.error('API call error:', error);
        });
      */
      
      
    //  }); 
   
  //});
//}*/
apiClient.get = async (url, params, axiosConfig) => {
  //check if no internet connection 
  /*if(url.includes("InsertEmpLocation"))
  {
    console.log("In Insert Employee Location Request");
    const isConnected= await getNetInfo();
     console.log("Internet connectedddddd"+isConnected);
      //console.log(getNetInfo());

  }*/

  // cache.getAllKeys();
 /* if(url.includes("/website/NewsTitles"))
  {const data = await cache.get(url);
  console.log("From Cachhhhhhh");
  return data ? { ok: true, data } : {};}
  */const response = await get(url, params, axiosConfig);
 
  // return response;
  //  console.log(response)
  if(false&&url.includes("InsertEmpLocation"))
  {
     console.log("pffffffffffffffarams");
    db.createTable();
    db.storeApiRequest(url, 'POST', { 'Content-Type': 'application/json' }, {'key':'value'});
    db.retrieveApiRequests((apiRequests) => {
      console.log(apiRequests.length);
    apiRequests.forEach((request) => {
       alert("REQUEST fROM DB  "+request.id);
        // Retry the API call for each stored request
        /*makeApiCall(request.endpoint, request.method, request.headers, request.body)
          .then((response) => {
            // Handle successful API call
            removeApiRequest(request.id);
          })
          .catch((error) => {
            // Handle API call failure
            console.error('API call error:', error);
          }); */
     });
    });
  }
  if (response.ok|| response.status==200) {
    // if (url.includes("toplanmaalanlari"))
    cache.store(url, response.data);
    return response;
  }
  else
  { 
    //console.log(response);

    if(url.includes("InsertEmpLocation"))
    {
      console.log(url);
      db.createTable();
      //alert("Will store request");
      db.storeApiRequest(url, 'POST', { 'Content-Type': 'application/json' }, params);
      db.retrieveApiRequests((apiRequests) => {
        //alert(apiRequests.length);
      /* apiRequests.forEach((request) => {
          alert("REQUEST fROM DB  "+request.id);
          // Retry the API call for each stored request
          /*makeApiCall(request.endpoint, request.method, request.headers, request.body)
            .then((response) => {
              // Handle successful API call
              removeApiRequest(request.id);
            })
            .catch((error) => {
              // Handle API call failure
              console.error('API call error:', error);
            }); });*/
       
      });


    }

  }
  if(url.includes("Token")||url.includes("InsertEmpLocation"))return response;
   

  //if(url.includes("Token"))return { ok: false };
  if(url.includes("GetCustomerNameByID"))return { ok: false };
  const data = await cache.get(url);
  
  return data ? { ok: true, data } : response;
};

export default apiClient;
