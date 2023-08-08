import client from "./clientEs";

const endpoint = "/MobileAPIController";

 const getComplaintDepts = (Token) => client.get(endpoint + "/GetCMCategories3",{Token});

const getComplaintDeptProblems = (CategoryID) =>
  client.get(endpoint + "/GetCMCategoriesSub3", {CategoryID});

const GetCMUserComplaintsByID = (Doc_ID,MobileNo) =>
  client.get(endpoint + "/GetCMUserComplaintsByID", {Doc_ID,MobileNo});



export const createCM = (complaint, onUploadProgress) => {
    return client.post(endpoint + "/PostCMComplaint4", complaint, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };
export default {
  createCM,
  GetCMUserComplaintsByID,
  getComplaintDeptProblems,
  getComplaintDepts,
 
};