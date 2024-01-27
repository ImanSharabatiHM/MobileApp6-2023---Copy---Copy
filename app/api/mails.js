import client from "./clientEs";

const endpoint = "/api/MobileAPIController";


/*export const PostNewTalab = (request, onUploadProgress) => {
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
  export const createRequestUpdate = (request, onUploadProgress) => {
    return client88.post(endpoint1+"/UpdateCustomerDataRequest", request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };
*/
//const getRequestsByID = (UserID) =>
 // client.get( "/GetObjectionsByUserId", {UserID});
  const GetMuth = (Token,MDate,NotDone) =>
  client.get(endpoint+ "/GetMuth", {Token,MDate,NotDone});

  const GetMuthDocAttachments = (Token,MuthDoc,MuthDocNo) =>
  client.get(endpoint+ "/GetMuthDocAttachments", {Token,MuthDoc,MuthDocNo});

  const GetDocArchiveReport = (Token,DocArchive) =>
  client.get(endpoint+ "/GetDocArchiveReport", {Token,DocArchive});

  const GetDocArchive = (Token,DocDate,NotDone) =>
  client.get(endpoint+ "/GetDocArchive", {Token,DocDate,NotDone});

  const GetMuthReport = (Token,MuthNo) =>
  client.get(endpoint+ "/GetMuthReport", {Token,MuthNo});

export default {
  GetMuth,
  GetMuthReport,
  GetDocArchive,
  GetDocArchiveReport,
  GetMuthDocAttachments


 
};