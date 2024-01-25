import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import notificationApi from "../api/notification";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import colors from "../config/colors";
import { FlatList } from "react-native";
import Info from "../components/Info";
import * as Notifications from "expo-notifications";
import useNotificationsCount from "../notification/useNotificationsCount";
import useAuth from "../auth/useAuth";

function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(null);
  const { setNotificationCount } = useNotificationsCount();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user} = useAuth();
 
  useEffect(() => { 
    //this.props.navigation.pop={bb}
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    getNotifications("9");
    //Notifications.setBadgeCountAsync(10);
    markAllAsRead();
  }, []);

  const getNotifications = async () => {
    setLoading(true);
    const result = await notificationApi.getNotifications(user.nameidentifier);
    setLoading(false);
    setNotifications([]);
    setNotificationCount(0);
    //console.log()
    if (!result.ok) {
      //setError(true);
      const staticNotes=
      [{sentDate:"5/22/2022",id:"1",notification:{id:"1",title:" test ",body:"تم تغيير جدول توزيع المياه، يرجى مراجعته"}},
      {sentDate:"5/5/2022",id:"2",notification:{id:"2",title:"test",body:"يرجى دفع رسوم النفايات للحصول على خصم 25%"}}
    ]
    setNotifications([]);
    setNotificationCount(0);
    }
    else{
    setNotifications(result.data);
    console.log(result);
    //All notifications were read
    setNotificationCount(0);
    }
  };
  const bb = () => {
  console.log("BACCCKCKCKC");
  }

  const handleDelete = (notification) => {
    var id=notification.Notification.ID;
    notificationApi.deleteNotification(id);
    setNotifications(notifications.filter((n) => n.Notification.ID !==id));
    setNotificationCount(notifications.length - 1);
    

  };
  const markAllAsRead =async () => {
   
    const result = await notificationApi.markAllAsReadNotification(user.nameidentifier);
    //console.log()
    if (!result.ok) {
    }
    else{
      console.log(result,"mmmm");

    }

  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen} >
        {error && (
          <Info
            buttonVisible={true}
            message="حدث خطأ غير متوقع"
            onPress={() => getNotifications(user.nameidentifier)}
          />
        )}
        {notifications?.length === 0 && (
          <Info buttonVisible={false} buttonText={"تحديث"} message="لا يوجد إشعارات جديدة"   onPress={() => getNotifications("5")}/>
        )}
        {notifications && (
          <FlatList
            data={notifications}
            renderItem={({ item }) => (
              <ListItem
                title={item.Notification.Title}
                subTitle={item.Notification.Body+"\n"+dayjs(item.NDate).locale("ar").format("dddd YYYY/MM/D   HH:mm")}
                rightInfo={dayjs(item.NDate).locale("ar").fromNow()}
                //rightInfo={dayjs(item.NDate).locale("ar").fromNow()}
                listStyle={item.Notification.Status==0?styles.listItem:styles.listItemOld}
                textStyle={styles.listTextStyle}
                rightInfoStyle={{
                  width: 50,
                  fontSize: 12,
                  color: colors.primary,
                  textAlign: "center",
                }}
                renderRightActions={() => (
                  <ListItemDeleteAction onPress={() => handleDelete(item)} />
                )}
                
                onSwipeableOpen={() => handleDelete(item)}
                swipeBackground={colors.danger}
              />
            )}
            ItemSeparatorComponent={() => <ListItemSeparator />}
          />
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.lightBlue,
  },
  listItemOld: {
    backgroundColor: colors.white,
  },
  listTextStyle: {
    color: colors.danger,
  },
  seperatorStyle: {
    backgroundColor: colors.backgroundColor,
  },
  screen: {
    backgroundColor: colors.backgroundColor,
  },
});
export default NotificationsScreen;
