import client from "./openClient";
import clientHM from "./client";
import clientEs from "./clientEs";

 
const endPoint="/api/MobileAPIController";


const send = (url) => client.get(url);
const GetTabletsFiles = (APP_ID,Token) =>
clientHM.get("/GetTabletsFiles", { APP_ID,Token });


//http://egate.hebron-city.ps:8282/api/MobileAPIController/GetTabletsFiles?APP_ID=7


export const sendPic = (pic, onUploadProgress) => {
  var data = new FormData();
  data.append('name',pic.image);
  data.append('heraf',pic.heraf);
  data.append('uri', pic.uri);

  //"image="+image+"&uri="+uri+"&heraf=t"
  return clientEs.post("/", data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const sendPici = ( imagename, Base64DataUrl, onUploadProgress) => {
 // console.log("Image Name:  "+imagename+"   "+Base64DataUrl)
  return clientEs.post("/AddImage", {imagename, Base64DataUrl}/*, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  }*/);
};

export const addSignBoard = (Token,SignBoard, onUploadProgress) => {
  return clientEs.post( endPoint+"/AddGisSignboard?Token="+Token, SignBoard, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const UpdateSignBoard = (CustID,AreaID) =>
  clientEs.get( "/api/MobileAPIController/UpdateCustomerWaterArea", { CustID,AreaID });

  export const RemoveSignBoard = (CustID,AreaID) =>
  clientEs.get( "/api/MobileAPIController/UpdateCustomerWaterArea", { CustID,AreaID });

const GetSignBoards = (UnitID,Token) =>
clientEs.get( "/api/MobileAPIController/ListGisSignboards?UnitID="+UnitID+"&Token="+Token);

const GetUnitDescriptionByBID = (BID) =>
clientEs.get("/api/MobileAPIController/GetUnitsByBID", { BID }); 

const GetBuildingDescByBID = (BID) =>
clientEs.get("/api/MobileAPIController/GetBuildingDescByBID", { BID });

 export default {
GetBuildingDescByBID,
addSignBoard,
GetSignBoards,
RemoveSignBoard,
UpdateSignBoard,
GetUnitDescriptionByBID,
 send,
 GetTabletsFiles,
 sendPic,
 sendPici
};
