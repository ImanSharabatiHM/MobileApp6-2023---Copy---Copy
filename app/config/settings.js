import Constants from "expo-constants";

const settings = {
  dev: {
  //apiUrl: "http://10.11.16.101/wcfapi/Service1.svc",
  apiUrl:"https://egate.hebron-city.ps/GISMaps/Wcfrest/Service1.svc",
  apiSpatial:"https://egate.hebron-city.ps/Wcfrest/Service1.svc/",
  //apiUrlEs:"https://mobile.hebron-city.ps/api", //22-5-2023

  apiUrlEs:"https://egate.hebron-city.ps/api", //22-5-2023
   //apiUrlEs:"http://egate.hebron-city.ps:8282", //22-5-2023

  //apiUrlEs:"http://localhost:59250/api",
  //apiUrlEs:"http://10.11.16.101:59250/api",
  //apiUrltest:"http://10.11.19.193/MunicipalityAPI/api",
  },
  staging: {
  apiUrlEs:"https://egate.hebron-city.ps/api", //22-5-2023
  apiSpatial:"https://egate.hebron-city.ps/Wcfrest/Service1.svc/",

  // apiUrl: "http://10.11.16.101/wcfapi/Service1.svc",
  // apiUrlEs:"http://192.168.100.2:8282/api",
  //apiUrl: "http://maps.hebron-city.ps/Wcfrest/Service1.svc",  
  //apiUrl: "http://10.11.16.101/wcfapi/Service1.svc",
  apiUrl:"https://egate.hebron-city.ps/GISMaps/Wcfrest/Service1.svc",
  //apiUrlEs:"http://egate.hebron-city.ps:8282", //22-5-2023
  //apiUrlEs:"https://mobile.hebron-city.ps/api", //22-5-2023


  },
  prod: {
    apiUrlEs:"https://egate.hebron-city.ps/api",
    apiSpatial:"https://egate.hebron-city.ps/Wcfrest/Service1.svc/",
  //apiUrlEs:"https://mobile.hebron-city.ps/api", //22-5-2023
  //apiUrlEs:"http://egate.hebron-city.ps:8282", //22-5-2023
  //apiUrlEs:"http://192.168.100.2:8282/api",
  //apiUrl: "http://maps.hebron-city.ps/Wcfrest/Service1.svc",   
  apiUrl:"https://egate.hebron-city.ps/GISMaps/Wcfrest/Service1.svc/",
  //apiUrlEs:"http://egate.hebron-city.ps:8282",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
