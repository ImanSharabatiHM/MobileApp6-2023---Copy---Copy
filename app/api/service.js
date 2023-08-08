import client from "./client";
import clientE from "./clientEs";

const endpoint = "/services";

const addServiceHit = (serviceId) => client.post(endpoint + "/" + serviceId);

const getServices = () => clientE.get("/api/MobileAPIController/GetMobileServices");
const getFavorites = () => client.get(endpoint + "/favorites");
const addOrRemoveFavorite = (serviceId) =>
  client.post(endpoint + "/favorites/" + serviceId);

export default {
  addServiceHit,
  getServices,
  getFavorites,
  addOrRemoveFavorite,
};
