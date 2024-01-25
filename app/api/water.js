import client from "./openClient";
import clientHM from "./client";
import clientEs from "./clientEs";
import clientSpatial from "./clientSpatial";

 
const endPoint="/api/MobileAPIController";



const GetWaterServicesForReader=(Token)=>
clientEs.get(endPoint+"/GetWaterServicesForReader", {Token});

const AddNewWaterReading=(SERVICE_NO , CURRENT_READ , Token)=>
clientEs.get(endPoint+"/UpdateWaterRead", {SERVICE_NO , CURRENT_READ , Token});

const GetWaterInvoice=(SERVICE_NO  , Token)=>
clientEs.get(endPoint+"/GetWaterInvoiceFile", {SERVICE_NO  , Token});

export const UpdateWaterServiceInfo = (Token,WaterService, onUploadProgress) => {
  return clientEs.post( endPoint+"/UpdateWaterServiceInfo?Token="+Token, WaterService, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};



 


const send = (url) => client.get(url);


const GetTabletsFiles = (APP_ID,Token) =>
clientHM.get("/GetTabletsFiles", { APP_ID,Token });

const InsertFeature = (type,table,PropsObj,pCoordinate,Token) =>
clientSpatial.get("/InsertFeature", {type,table,PropsObj, pCoordinate,Token });

const GetWarningFile = (Token, WarningID) =>
clientEs.get(endPoint+"/GetWarningFile", {Token, WarningID});


 //InsertFeature?type=Point&table=COUNTERTRAFFIC&PropsObj={OBJECTID:9991,NO:12}&pCoordinate=159607.41029779185,104889.3821315178


export const addSignBoard = (Token,SignBoard, onUploadProgress) => {
  return clientEs.post( endPoint+"/AddGisSignboard?Token="+Token, SignBoard, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
export const AddFeesUnitsWarnings = (Token,UnitWarning, onUploadProgress) => {
  return clientEs.post( endPoint+"/AddFeesUnitsWarnings?Token="+Token, UnitWarning, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
export const AddBuildingImage = (Token,Img, onUploadProgress) => {
  return clientEs.post( endPoint+"/AddBuildingImage?Token="+Token, Img, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
export const UpdateSignBoard = (CustID,AreaID) =>
  clientEs.get( "/api/MobileAPIController/UpdateCustomerWaterArea", { CustID,AreaID });

  export const RemoveSignBoard = (CustID,AreaID) =>
  clientEs.get( "/api/MobileAPIController/UpdateCustomerWaterArea", { CustID,AreaID });



const GetWaterConsumption12ByServiceNo = (SerivceNo,Token) =>
clientEs.get("/api/MobileAPIController/GetWaterConsumption12ByServiceNo", { SerivceNo ,Token}); 


const GetWaterServicesByBID = (B_ID,Token) =>
clientEs.get("/api/MobileAPIController/GetWaterServicesByBID", { B_ID ,Token}); 

 

const GetBuildingDescByBID = (BID) =>
clientEs.get("/api/MobileAPIController/GetBuildingDescByBID", { BID });


const NewTableUser = (EmpNo, AppID,Token) =>
clientEs.post(endPoint+ "/NewTabletUser?EmpNo="+EmpNo+"&AppID="+AppID+"&Token="+Token);
const NewTableApp = (APPNAME, APPNAME_AR,Token) =>
clientEs.post(endPoint+ "/NewTabletApp?APPNAME="+APPNAME+"&APPNAME_AR="+APPNAME_AR+"&Token="+Token  );

 
export const PostUpdateEmployeePermissions = (Token,EMP_NO,Permissions) => {
  return clientEs.post(endPoint + "/PostUpdateEmployeePermissions?Token="+Token+"&EMP_NO="+EMP_NO, Permissions );
};

export const PostUpdateLayersPermissions = (Token,EMP_NO,Permissions) => {
  return clientEs.post(endPoint + "/PostUpdateLayersPermissions?Token="+Token+"&EMP_NO="+EMP_NO, Permissions );
};


const GetAllTabletApps=(Token) =>
clientEs.get(endPoint+ "/GetAllTabletApps", {Token});

const GetCoordinatesByParcel = (BLOCK,PARCEL) =>
clientEs.get(endPoint+ "/GetCoordinatesByParcel", {BLOCK,PARCEL});

 
const GetCoordinatesByLandMark = (ObjectID) =>
clientEs.get(endPoint+ "/GetCoordinatesByLandMark", {ObjectID});

const GetBuildingCoordinatesByWaterService = (SERVICE_NO) =>
clientEs.get(endPoint+ "/GetBuildingCoordinatesByWaterService", {SERVICE_NO});

const GetStreetCoordinatesBySTNO = (STNO) =>
clientEs.get(endPoint+ "/GetStreetCoordinatesBySTNO", {STNO});

const GetWaterServiceFinancialTotals = (SERVICE_NO) =>
clientEs.get(endPoint+ "/GetWaterServiceFinancialTotals", {SERVICE_NO});




export default {
  GetWaterServicesForReader,
  AddNewWaterReading,
  UpdateWaterServiceInfo,
  GetWaterInvoice


};
