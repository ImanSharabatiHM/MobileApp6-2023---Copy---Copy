import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key, value) => {
  //console.log("cache.js");
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
   // console.log("Cache completed");
  } catch (error) {
    console.log("Cache.js ",error);
  }
};

const isExpired = (item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  return false;
 // return now.diff(storedTime, "minute") > 5;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    //console.log("From cache");
    if (!item) return null;

    if (isExpired(item)) {
      // Command Query Separation (CQS)
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    console.log("item.value ",item.value);
    return item.value;
  } catch (error) {
    console.log("cache.js",error);
  }
};

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log("getalkeys",e);
  }

  //console.log(keys);
};

export default {
  store,
  get,
  getAllKeys,
};
