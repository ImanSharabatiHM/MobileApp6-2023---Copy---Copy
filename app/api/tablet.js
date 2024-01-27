import client from "./openClient";
import clientHM from "./client";
import clientEs from "./clientEs";
import clientSpatial from "./clientSpatial";

 
const endPoint="/api/MobileAPIController";


const send = (url) => client.get(url);
const GetTabletsFiles = (APP_ID,Token) =>
clientHM.get("/GetTabletsFiles", { APP_ID,Token });

const InsertFeature = (type,table,PropsObj,pCoordinate,Token) =>
clientSpatial.get("/InsertFeature", {type,table,PropsObj, pCoordinate,Token });

const GetWarningFile = (Token, WarningID) =>
clientEs.get(endPoint+"/GetWarningFile", {Token, WarningID});


 //InsertFeature?type=Point&table=COUNTERTRAFFIC&PropsObj={OBJECTID:9991,NO:12}&pCoordinate=159607.41029779185,104889.3821315178


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

const GetSignBoards = (UnitID,Token) =>
clientEs.get( "/api/MobileAPIController/ListGisSignboards?UnitID="+UnitID+"&Token="+Token);

const GetFeesUnitsWarningTypes = (Token) =>
clientEs.get( "/api/MobileAPIController/GetFeesUnitsWarningTypes?Token="+Token);

const GetUnitDescriptionByBID = (BID) =>
clientEs.get("/api/MobileAPIController/GetUnitsByBID", { BID }); 

const GetWaterConsumption12ByServiceNo = (SerivceNo,Token) =>
clientEs.get("/api/MobileAPIController/GetWaterConsumption12ByServiceNo", { SerivceNo ,Token}); 


const GetWaterServicesByBID = (B_ID,Token) =>
clientEs.get("/api/MobileAPIController/GetWaterServicesByBID", { B_ID ,Token}); 



const GetElectServicesByBID=(B_ID,Token)=>
clientEs.get("/api/MobileAPIController/GetElectServicesByBID", { B_ID ,Token}); 

 

const GetBuildingDescByBID = (BID) =>
clientEs.get("/api/MobileAPIController/GetBuildingDescByBID", { BID });

const GetBuildingCoordinates = (B_ID) =>
clientEs.get(endPoint+ "/GetBuildingCoordinates", {B_ID});

const GetBuildingCoordinatesByUID = (U_ID) =>
clientEs.get(endPoint+ "/GetBuildingCoordinatesByUID", {U_ID});

const GetBuildingCoordinatesByBNO = (BNO,STNO) =>
clientEs.get(endPoint+ "/GetBuildingCoordinatesByBNO", {BNO,STNO});

const NewTableUser = (EmpNo, AppID,Token) =>
clientEs.post(endPoint+ "/NewTabletUser?EmpNo="+EmpNo+"&AppID="+AppID+"&Token="+Token);
const NewTableApp = (APPNAME, APPNAME_AR,Token) =>
clientEs.post(endPoint+ "/NewTabletApp?APPNAME="+APPNAME+"&APPNAME_AR="+APPNAME_AR+"&Token="+Token  );

const GetTabletAppByEmpNo=(EmpNo,Token) =>
clientEs.get(endPoint+ "/GetTabletAppByEmpNo", {EmpNo,Token});

const GetAllLayersForEmp=(EMP_NO,Token)=>
clientEs.get(endPoint+ "/GetAllLayersForEmp", {EMP_NO,Token});

const GetAllPermissionsForEmp=(EMP_NO,Token)=>
clientEs.get(endPoint+ "/GetAllPermissionsForEmp", {EMP_NO,Token});

 
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

const GetCoordinatesByBlock = (ObjectID) =>
clientEs.get(endPoint+ "/GetCoordinatesByBlock", {ObjectID});

const GetLayersForEmp=(Token)=>
clientEs.get(endPoint+ "/GetLayersForEmp", {Token});


const GetCoordinatesByLandMark = (ObjectID) =>
clientEs.get(endPoint+ "/GetCoordinatesByLandMark", {ObjectID});

const GetBuildingCoordinatesByWaterService = (SERVICE_NO) =>
clientEs.get(endPoint+ "/GetBuildingCoordinatesByWaterService", {SERVICE_NO});

const GetStreetCoordinatesBySTNO = (STNO) =>
clientEs.get(endPoint+ "/GetStreetCoordinatesBySTNO", {STNO});

const GetWaterServiceFinancialTotals = (SERVICE_NO) =>
clientEs.get(endPoint+ "/GetWaterServiceFinancialTotals", {SERVICE_NO});

const GetStreetsNames = () =>
clientEs.get(endPoint+ "/GetStreetsNames", {});

const GetLandMarks = () =>
clientEs.get(endPoint+ "/GetLandMarks", {});

const GetAreasNames = () =>
clientEs.get(endPoint+ "/GetAreasNames", {});


export default {
GetElectServicesByBID,
PostUpdateEmployeePermissions,
PostUpdateLayersPermissions,
GetAllLayersForEmp,
GetAllPermissionsForEmp,
GetTabletAppByEmpNo,
GetAllTabletApps,
GetWarningFile,
InsertFeature,
NewTableUser,
NewTableApp,
GetWaterServiceFinancialTotals,
GetLayersForEmp,
GetCoordinatesByBlock,
GetLandMarks,
GetFeesUnitsWarningTypes,
GetAreasNames,
GetStreetsNames,
GetBuildingCoordinatesByWaterService,
GetStreetCoordinatesBySTNO,
GetCoordinatesByLandMark,
GetCoordinatesByParcel,
GetBuildingCoordinatesByBNO,
GetBuildingCoordinatesByUID,
GetBuildingCoordinates,
GetWaterConsumption12ByServiceNo,
GetWaterServicesByBID,
AddBuildingImage,
GetBuildingDescByBID,
addSignBoard,
AddFeesUnitsWarnings,
GetSignBoards,
RemoveSignBoard,
UpdateSignBoard,
GetUnitDescriptionByBID,
 send,
 GetTabletsFiles,
 sendPic,
 sendPici
};
