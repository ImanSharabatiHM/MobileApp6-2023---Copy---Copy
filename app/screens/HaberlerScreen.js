import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import constants from "../config/constants";

import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import contentApi from "../api/content";
import AppWebView from "../components/WebView";
import { AppModalize } from "../components/Modalize";

function HaberlerScreen({ navigation }) {
  const modalizeRef = useRef(null);
  const [haber, setHaber] = useState(null);
  const [error, setError] = useState(false);
  const getHaberlerApi = useApi(contentApi.getHaberlerNew);

  useEffect(() => {
    dayjs.extend(updateLocale);
    dayjs.extend(relativeTime);
    getHaberlerApi.request();
  }, []);

  const decodeEntities = (encodedString) => {
    if (encodedString === null || encodedString === undefined) return "";
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
      nbsp: " ",
      amp: "&",
      quot: '"',
      lt: "<",
      gt: ">",
    };
    return encodedString
      .replace(translate_re, function (match, entity) {
        return translate[entity];
      })
      .replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
  };

  return (
    <>
      <Screen style={styles.screen}>
        {getHaberlerApi.data && (
          <FlatList
            data={getHaberlerApi.data}
            keyExtractor={(item) => item.contentId}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                subTitle={dayjs(item.dateCreated).locale("ar").fromNow() }
                imageHeight={250}
                onPress={async () => 
                  {
                    const result = await contentApi.getNewsContent(
                      item.contentId
                    );
    
                    if (!result.ok) {
                       setContent(null);
    
                      setError(true);
                      return;
                    }
                    item.images=[{"Id":"haber1img","img":constants.HMURL+item.imageUrl}];

                    item.details = result.data.body;
                    item.news=true;
                    item.urlpre=constants.HMURL;
                    setHaber(item);
                  modalizeRef.current.open();
                  /*const result = await contentApi.getContentDetail(
                    item.contentId
                  );

                  if (!result.ok) {
                    setError(true);
                    return;
                  }
                  item.details = result.data.content;
                  */
                  
                }
              }                  

                imageUrl={constants.HMURL+item.imageUrl}
                thumbnailUrl={
                  //"http://www.bagcilar.bel.tr/AjaxResize.ashx?width=120&file=" +
                  //item.imageUrl.substring(27)
                  item.imageUrl

                }
              />
            )}
          />
        )}
      </Screen>
      <AppModalize
      ref={modalizeRef}
      title={haber?.title}
      subTitle={dayjs(haber?.dateCreated).locale("ar").fromNow()}
      details={haber?.details}
      images={haber?.images
        // [{Id:"100",img: "http://www.hebron-city.ps/userfiles/image/2022/65.jpg"},
         //{Id:"200",img: "http://www.hebron-city.ps/userfiles/image/2022/66.jpg"},    
         //{Id:"300",img:  "http://www.hebron-city.ps/userfiles/image/2022/67.jpg"}]
       }
       onClosed={async () => {
         setHaber(null);
       }}
       onPress={async () => {
        setHaber(null);
        modalizeRef.current.close();         
      }}
     
      >
       { false&&<AppWebView
          source={{
            html:
              "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
              decodeEntities(haber?.details).split("<br />").join(""),
          }}
        /> }
      </AppModalize>
     
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
});

export default HaberlerScreen;
