import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions,Platform ,Linking} from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";
import Info from "../components/Info";
import * as Calendar from 'expo-calendar';
import Card from "../components/CardAppointment";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
const initialLayout = { width: Dimensions.get("window").width };
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
function UserAppointmentsScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const {user}=useAuth();
  const getAppointmentsByUserIDApi = useApi(customerApi.getAppointmentsByUserID);
  const [error, setError] = useState(false);
  const [eventTitle, setEventTitle] = useState('Default event');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [friendNameText, setFriendNameText] = useState('');

  const startDate = selectedStartDate ? selectedStartDate.format('YYYY-MM-DD').toString() : '';
  const TIME_NOW_IN_UTC = moment.utc();
  const utcDateToString = momentInUTC => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
  };
  const addNewEvent = async (item) => {
    console.log(item);
    try {
    const calendarId = await createCalendar();
      const exist = CheckIfExist(item.ID);
      console.log("IS existeddd"+exist);
      if(!exist)
      {console.log("Will createtet");
    const res = await Calendar.createEventAsync("1", {
    id:item.ID,
    startDate: item.STARTDATE+".000Z",
    endDate: item.ENDDATE+".000Z",
    notes:item.DESCRIPTION,
    location:item.LOCATION,
    title: item.SUBJECT,
      });}
     // const del= await Calendar.deleteCalendarAsync(calendarId);
      Linking.openURL('content://com.android.calendar/time/');
      console.log('Event Created!');
    } catch (e) {
      console.log(e);
    }
  }; 

  async function CheckIfExist(id) {     
    try{
    const calendars = await Calendar.getEventAsync(id);
    return calendars.length>0;
    }
    catch(e){
    console.log(" not Existeddd!!!");
      return 0;
    }
    
       
  }
  async function getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendars = calendars.filter(
      (each) => each.source.name === 'Default'
    );
    return defaultCalendars.length
      ? defaultCalendars[0].source
      : calendars[0].source;
  }

  async function createCalendar() {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
    return newCalendarID;
  }



  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    getAppointmentsByUserIDApi.request(user.serialnumber);//(user.nameidentifier);//user.id
  }, []);

  return (
    <>
    { (getAppointmentsByUserIDApi.data?.length ==0 ) && (
      <Info
        numberOfLines={5}
        buttonText="إضافة موعد"
        buttonVisible={false}
        color={colors.primary}
        message={ 
          ("لا يوجد مواعيد قادمة..")
        }
        // /onPress={() => navigation.navigate(routes.COMPLAINTS)}
      />
    )}
      <Screen style={styles.screen}>
      {getAppointmentsByUserIDApi?.data && (
        <FlatList
          data={getAppointmentsByUserIDApi.data}
          keyExtractor={(item) =>  Math.random()}
          renderItem={({ item }) => (
            <Card
          subTitle={item.ENDDATE.split("T")[1]}              
            location={item.LOCATION} 
            date={dayjs(item.ENDDATE).locale("ar").format('dddd D-MM-YYYY \nالساعة:  h:mm A' )}
            
            subject={item.SUBJECT}     
            imageHeight={450}
            onPress={() => {
              if(Platform.OS === 'ios') {
                Linking.openURL('calshow:');
              } else if(Platform.OS === 'android') { 
              addNewEvent(item);
            

              }
                //getUnit(item);
               // modalizeRef.current.open();
              }}
             
            // base64={'data:image/png;base64,'+item.IMAGE}
            //  /imageUrl= {"http://10.11.20.9/php/ImagesHeraf/10-282-0a5-3.jpg"}
            />
          )}
        />
      )}
    </Screen>
      <AppModalize
        ref={modalizeRef}
        //title={proje?.projectTitle["#cdata-section"]}
      >
        <AppWebView
          source={{
            html:
              "<meta name='viewport' content='width=device-width, initial-scale=1'>" ,
              //proje?.projectContent["#cdata-section"].split("<br>").join(""),
          }}
        />
      </AppModalize>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
});


export default UserAppointmentsScreen;
