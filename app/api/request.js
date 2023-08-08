import client from "./client";
import client88 from "./clientEs";

const endpoint = "/Complaints";
const requestsEndPoint="/api/MobileAPIController";
const endpoint1="/api/MobileAPIController";
const talabEndPoint="/api/MobileAPIController";
export const PostNewTalab = (request, onUploadProgress) => {
    return client88.post( talabEndPoint+"/PostNewTalab", request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };

  export const createRequest = (request, onUploadProgress) => {
    return client.post( "/AddObjection", request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };
  export const RequestWaterTank = (Token,request, onUploadProgress) => {
    return client88.post(endpoint1+"/RequestWaterTank?Token="+Token, request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };

  export const createRequestUpdate = (request, onUploadProgress) => {
    return client88.post(endpoint1+"/UpdateCustomerDataRequest", request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };
//const getRequestsByID = (UserID) =>
 // client.get( "/GetObjectionsByUserId", {UserID});
  const getRequestsByID = (PAYEE_CODE) =>
  client88.get(talabEndPoint+"/getPayeeTalabatByPayeeCode", {PAYEE_CODE});

  const GetMainRequests = () =>
  client88.get( requestsEndPoint+"/GetMainRequests");

  const GetNeededDocumentsByTalabCode = (TALAB_CODE) =>
  client88.get( requestsEndPoint+"/GetNeededDocumentsByTalabCode",{TALAB_CODE});

  
  const GetRequestDocs = (TalabCode,TalabSubCode) =>
  client88.get( requestsEndPoint+"/GetRequestDocs",{TalabCode,TalabSubCode});

  const GetRequestMasars = (TalabCode,TalabSubCode) =>
  client88.get( requestsEndPoint+"/GetRequestMasars",{TalabCode,TalabSubCode});

  const GetRequestSteps = (TalabCode,TalabSubCode) =>
  client88.get( requestsEndPoint+"/GetRequestSteps",{TalabCode,TalabSubCode});

  const RequestMobileAuthCode = (CustNo,Token) =>
  client88.get( requestsEndPoint+"/RequestMobileAuthCode",{CustNo,Token});

   
 
  
  const GetSubRequests = (Code) =>
  client88.get( requestsEndPoint+"/GetSubRequests/"+Code);
  
export default {
  RequestWaterTank,
  RequestMobileAuthCode,
  GetRequestSteps,
  GetRequestDocs,
  createRequest,
  getRequestsByID,
  GetRequestMasars,
  createRequestUpdate,
  GetMainRequests,
  GetSubRequests,
  PostNewTalab,
  GetNeededDocumentsByTalabCode


 
};
/*
RequestsController/PostNewTalab
  CustomersController/UpdateCustomerDataRequest
  /EServicesAPIController/getPayeeTalabatByPayeeCode
  Definitions/GetMainRequests
  Definitions/GetSubRequests
  */