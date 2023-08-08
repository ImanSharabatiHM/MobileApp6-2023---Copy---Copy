import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import customerApi from "../api/customer";
import complaintApi from "../api/complaint";

import Card from "../components/CardComplaint";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";
import useAuth from "../auth/useAuth";
const initialLayout = { width: Dimensions.get("window").width };

function UserAppointmentsScreenww({ navigation }) {
  const modalizeRef = useRef(null);
  const {user}=useAuth();
  const getAppointmentsByUserIDApi = useApi(customerApi.getAppointmentsByUserID);
  const [error, setError] = useState(false);



  useEffect(() => {
    getAppointmentsByUserIDApi.request(user.nameidentifier);//user.id

  }, []);

  return (
    <>
      <Screen style={styles.screen}>
      {getAppointmentsByUserIDApi.data && (
        <FlatList
          data={getAppointmentsByUserIDApi.data}
          keyExtractor={(item) => item.Id+Math.random()}
          renderItem={({ item }) => (
            <Card
            title={item.CATEGORY+"/"+item.CATEGORY_SUB}              
            status={item.STATUS} 
            date={item.COMPLAINT_DATE} 
            notes={"قيد التجربة..."+item.COMPLAINT_TEXT}     
            imageHeight={450}
            onPress={() => {
                //getUnit(item);
                modalizeRef.current.open();
              }}
             
             base64={'data:image/png;base64,'+item.IMAGE}
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
