import { create } from "apisauce";
import cache from "../utility/cache";

const openApiClient = create({
  baseURL: "",
});

const get = openApiClient.get;
openApiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default openApiClient;
