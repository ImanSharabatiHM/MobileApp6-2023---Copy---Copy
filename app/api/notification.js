import client from "./clientEs";
import client1 from "./client";

const endpoint = "/api/MobileAPIController";
const getNotifications = (CustNo) => client.get(endpoint + "/MobileNotifications",{CustNo});
const getNotificationsNotReadCount = (CustNo) => client.get(endpoint + "/MobileNotificationsNotReadCount",{CustNo});

//MobileAPIController/MobileNotificationsUpdateStatus?NotificationID=1&StatusID=1
const deleteNotification = (NotificationID, StatusID="2") =>
 // client.delete(endpoint + "/userNotifications/" + id);
 client.get(endpoint+"/MobileNotificationsUpdateStatus",{ NotificationID ,StatusID});


 const markAsReadNotification = (NotificationID,StatusID="1") =>
 // client.delete(endpoint + "/userNotifications/" + id);
 client.get(endpoint+"/MobileNotificationsUpdateStatus",{ NotificationID ,StatusID});

 const sendNotification = (TOKEN ,Title,Body) =>
 // client.delete(endpoint + "/userNotifications/" + id);
 client1.get("/Notification",{ TOKEN ,Title,Body});

 const SendWaterAreaNotifications = (WaterAreaID ,NotificationText,Token) => 
 // client.delete(endpoint + "/userNotifications/" + id);
 client.get(endpoint+"/SendWaterAreaNotifications?",{ WaterAreaID ,NotificationText,Token});

 
 const SendAllCustomersNotifications = (Group=1 ,NotificationText,Token) => 
 // client.delete(endpoint + "/userNotifications/" + id);
 client.get(endpoint+"/SendAllCustomersNotifications?",{ Group ,NotificationText,Token});
 
 const sendWaterNotification = (TOKEN ,Title,Body) =>
 // client.delete(endpoint + "/userNotifications/" + id);
 client1.get("/Notification",{ TOKEN ,Title,Body});

  const markAllAsReadNotification = (CustNo,StatusID=1) =>
 // client.delete(endpoint + "/userNotifications/" + id);
 client.get(endpoint+"/MobileAllNotificationsUpdateStatus",{CustNo ,StatusID});
 //http://egate.hebron-city.ps:8282/api/MobileAPIController/MobileAllNotificationsUpdateStatus?CustNo=0&StatusID=0

export default {
  sendWaterNotification,
  getNotificationsNotReadCount,
  getNotifications,
  deleteNotification,
  markAsReadNotification,
  markAllAsReadNotification,
  sendNotification,
  SendWaterAreaNotifications,
  SendAllCustomersNotifications
};
