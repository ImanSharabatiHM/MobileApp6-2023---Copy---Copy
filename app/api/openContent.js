import client from "./openClient";

const endpoint = "/api";

const getToplanmaAlanlari = () => client.get(endpoint + "/toplanmaalanlari");
const getMahalleler = () =>
  client.get(endpoint + "/toplanmaalanlari/mahalleler");

export default {
  getToplanmaAlanlari,
  getMahalleler,
};
