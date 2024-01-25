import client from "./clientEs";

const registers = (pushToken,nameidentifier) =>
  client.get("/register", { TOKEN: pushToken,ID:nameidentifier });

  const register = (pushToken,nameidentifier,device,deviceToken,experienceId) =>
  client.get("/api/MobileAPIController/UpdateCustomerToken", { Token: pushToken,CustID:nameidentifier,DeviceSerial:device,DToken:deviceToken,ProjectID:experienceId });
 
  export default {
  register,
};
