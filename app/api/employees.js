import client from "./clientEs";
import clientIman from "./client";
const mobileendpoint="/api/MobileAPIController";
import db from "../utility/database";

const endpoint = "/MobileAPIController";

const InsertEmployeeLocation11 = (x,y,trackId,type,tok,d) =>
{
var params="x="+x+"&y="+y+"&trackId="+trackId+"&type="+type;
clientIman.get("/InsertEmployeeLocation?"+params);
}
const InsertEmployeeLocation = (X,Y,TRACKID,TYPE,TOKEN,MOBILE_TIME,TIME_STAMP) =>
client.get(mobileendpoint+"/InsertEmpLocation",{TOKEN,X,Y,TRACKID,TYPE,MOBILE_TIME,TIME_STAMP});


const ReInsertEmployeeLocation = (params) =>
client.get(mobileendpoint+"/InsertEmpLocation",params);



const sendStoredApiRequests=  ()=>
{
  db.retrieveApiRequests((apiRequests) => {
   // alert(apiRequests.length);
    apiRequests.forEach((request) => {
    //  alert("will send REQUEST fROM DB  "+request.id);
      // Retry the API call for each stored request
      console.log(request);
      const res= client.get(request.endpoint, request.body);

      db.removeApiRequest(request.id);
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
      
      
      }); 
   
  });
}
const removeStoredApiRequests= ()=>
{
  db.retrieveApiRequests((apiRequests) => {
   //alert("Will remove "+apiRequests.length);
    apiRequests.forEach((request) => {
    //  alert("will send REQUEST fROM DB  "+request.id);
      // Retry the API call for each stored request
      db.removeApiRequest(request.id);
      //const res= client.get(request.endpoint, request.body);

      //console.log(res);
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
      
      
      }); 
   
  });
}

const ReInsertStoredLocations = (token) =>
client.sendStoredApiRequests();

const CheckOverTimeRequest = (EMP_NO,Token,OVERTIME_MONTH) =>
  client.get(mobileendpoint + "/GetCheckOverTimeRequest", { EMP_NO,Token,OVERTIME_MONTH });
  

const GetTrackID = (Token) =>
  client.get(mobileendpoint + "/GetTrackID", { Token });
   
/*const PostOverTimeRequest = (EMP_NO,Token,OVERTIME_HOURS,OVERTIME_DETAILS,WORK_DETAILS) =>
  client.post(mobileendpoint + "/PostOverTimeRequest", { EMP_NO,Token,OVERTIME_HOURS,OVERTIME_DETAILS,WORK_DETAILS });
*/

  export const PostOverTimeRequest = (request,Token, onUploadProgress) => {
    return client.post(mobileendpoint + "/PostOverTimeRequest?Token="+Token, request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };

  export const PostOverTimeDetails = (request,Token, onUploadProgress) => {
    return client.post(mobileendpoint + "/PostOverTimeDetails?Token="+Token, request, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };
    
    

export default {
  removeStoredApiRequests,
  ReInsertStoredLocations,
  PostOverTimeDetails,
  InsertEmployeeLocation,
  ReInsertEmployeeLocation,
  CheckOverTimeRequest,
  PostOverTimeRequest,
  GetTrackID,
  sendStoredApiRequests
};