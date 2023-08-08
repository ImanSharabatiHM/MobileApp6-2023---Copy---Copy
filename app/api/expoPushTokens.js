import client from "./clientEs";

const registers = (pushToken,nameidentifier) =>
  client.get("/register", { TOKEN: pushToken,ID:nameidentifier });

  const register = (pushToken,nameidentifier,device) =>
  client.get("/api/MobileAPIController/UpdateCustomerToken", { Token: pushToken,CustID:nameidentifier,device:device });
 
  export default {
  register,
};
