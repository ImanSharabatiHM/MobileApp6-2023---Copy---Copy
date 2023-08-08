import client from "./client";
import clientEs from "./clientEs";
const endpoint = "/content";
const mobile="/api/MobileAPIController"
//const getHaberler = () => client.get(endpoint + "/haberler");
const getHaberler = () => clientEs.get("api/website/NewsTitles");
const getNewsContent = (id) => clientEs.get("api/website/News/"+id);
const getComplaintDepts = () => client.get(endpoint + "/complaintdept");
const getComplaintDeptProblems = (DeptId) =>
  client.get(endpoint + "/complaintsDeptProblems", { DeptId });
//const getHaberlerNew = () => client.get(endpoint + "/haberler");
const getHaberlerNew = () => clientEs.get("api/website/NewsTitles");
const getMudurler = () => client.get(endpoint + "/mudurler");
const getMudurDetay = (id) => client.get(endpoint + "/mudurler/" + id);
const getBaskan = () => client.get(endpoint + "/baskan");
const getBaskanlar = () => client.get(endpoint + "/baskanlar");
const getBaskanDetay = (id) => client.get(endpoint + "/baskanlar/" + id);
const getProjeler = () => client.get(endpoint + "/projeler");
const getEtkinlikler = () => client.get(endpoint + "/etkinlikler");
const getBaskanMesaj = () => client.get(endpoint + "/baskanMesaj");
const getBaskanMesajNew = () => client.get(endpoint + "/baskanMesajNew");
const getDuyurular = () => client.get(endpoint + "/duyurular");
const GetClarifications = () => clientEs.get(mobile + "/GetClarifications");
const ShowIncompleteFeature = () => clientEs.get(mobile+"/ShowIncompleteFeature");
const ShowEPaymentFeature = () => clientEs.get(mobile+"/GetShowEPaymentFeatur");
const getWaterSchedule = () => clientEs.get("/api/MobileAPIController/Water_s_plan_all2");
const getWaterAreas = () => clientEs.get("/api/MobileAPIController/GetWaterAreas");
const GetMobileDeviceUserSummary = () => clientEs.get("/api/MobileAPIController/GetMobileDeviceUserSummary");
const UpdateCustomerWaterArea = (CustID,AreaID) =>
  clientEs.get( "/api/MobileAPIController/UpdateCustomerWaterArea", { CustID,AreaID });
 
const GetStories = () => clientEs.get(mobile + "/GetStories");
const getHomeContent = () => client.get(endpoint + "/homeContent");
const GetContactInformation = () => clientEs.get(mobile + "/GetContactInformation");
const getContentDetail = (id) => client.get(endpoint + "/" + id);
export default {
  ShowEPaymentFeature,
  GetClarifications,
  ShowIncompleteFeature,
  GetMobileDeviceUserSummary,
  getComplaintDeptProblems,
  getComplaintDepts,
  getHaberler,
  getNewsContent,
  getWaterAreas,
  getHaberlerNew,
  getMudurler,
  getMudurDetay,
  getBaskan,
  getBaskanlar,
  getBaskanDetay,
  getProjeler,
  getEtkinlikler,
  getBaskanMesaj,
  getBaskanMesajNew,
  getDuyurular,
  
  GetStories,
  GetContactInformation,
  getContentDetail,
  getHomeContent,
  UpdateCustomerWaterArea,
  getWaterSchedule
};
