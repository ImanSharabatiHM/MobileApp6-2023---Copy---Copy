import * as Linking from "expo-linking";
import Constants from "expo-constants";

import client from "./client";
import client88 from "./clientEs";

import constants from "../config/constants";

const anonymousLogin = () =>{
  client.post("/account/anonymousLogin", {
    userName: constants.UUIDV4(),
    userSecret: constants.USERSECRET
  });
}
const anonymousLogin1 = () => client.get("/account/anonymousLogin1");


const userLogin = (username,password) => client88.get("/api/MobileAPIController/Token",{username,password});
const forgetPasswordSMS = (CUST_NO) => client88.get("/api/MobileAPIController/ForgetPasswordSMS",{CUST_NO});
const UpdateCustomerToken = (CustID,Token) => client88.get("/api/MobileAPIController/UpdateCustomerToken",{CustID,Token});
const GetTabletPermission = (EmpNo) => client88.get("/api/MobileAPIController/GetTabletPermission",{EmpNo});

  
export const addNewUser = (user, onUploadProgress) => {
  return client88.post("/MobileAPIController/NewCustomer", user, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
const eDevletLogin = (url) => {
  let data = Linking.parse(url);
  return client.post("/account/eDevletLogin", {
    authorizationCode: data.queryParams.code,
    userSecret: constants.USERSECRET,
  });
};

const updateDevice = (device) => {
  client.put("/account/device", {
    model: device.model,
    platform: device.platform,
    version: device.version,
  });
};

export default {
  anonymousLogin1,
  anonymousLogin,
  eDevletLogin,
  updateDevice,
  forgetPasswordSMS,
  addNewUser,
  userLogin,
  UpdateCustomerToken
};
