import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import settings from "../config/settings";

const apiClient = create({
  baseURL: settings.apiUrl88,
});

const isExpired = (timestamp) => {
  const now = dayjs();
  const storedTime = dayjs.unix(timestamp);
  return storedTime.diff(now, "minute") < 30;
};

apiClient.addAsyncRequestTransform(async (request) => {
  if (
    request.url.includes("favorites") ||
    request.url.includes("userNotifications")
  ) {
    let authToken = await authStorage.getToken();
    if (!authToken) return;
    request.headers["Authorization"] = "Bearer " + authToken;
  } else {
    let authEDevletToken = await authStorage.getEDevletToken();
    if (authEDevletToken) {
      const user = jwtDecode(authEDevletToken);
      if (isExpired(user.exp)) {
        let authToken = await authStorage.getToken();
        if (!authToken) return;

        request.headers["Authorization"] = "Bearer " + authToken;
      } else {
        request.headers["Authorization"] = "Bearer " + authEDevletToken;
      }
    } else {
      let authToken = await authStorage.getToken();
      if (!authToken) return;
      request.headers["Authorization"] = "Bearer " + authToken;
    }
  }
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  // cache.getAllKeys();
  const response = await get(url, params, axiosConfig);
  // return response;
  //console.log(response)
  if (response.ok) {
    // if (url.includes("toplanmaalanlari"))
    cache.store(url, response.data);
    return response;
  }
  if(url.includes("Token"))return response;

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
