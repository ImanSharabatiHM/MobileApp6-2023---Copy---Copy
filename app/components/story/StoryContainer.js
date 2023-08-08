import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  SafeAreaView,

} from "react-native";
import AppWebView from "../../components/WebView";
import { AppModalize } from "../../components/Modalize";
import constants from "../../config/constants";

import AppText from "../Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";
import facilities from "../../config/facilities";

import Carousel from "../../components/carousel/Carousel";
import * as Device from "expo-device";
import { WebView } from "react-native-webview";
import Modal from "react-native-modalbox";
import GestureRecognizer from "react-native-swipe-gestures";
import Story from "./Story";
import UserView from "./UserView";
import Readmore from "./Readmore";
import ProgressArray from "./ProgressArray";
//import { coolDownAsync } from "expo-web-browser";
//import { ScrollView } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;

const StoryContainer = (props) => {
  const { user } = props;
  const { stories = [] } = user || {};
  const { placeId } = props;
  const place = facilities[placeId];
  const [deviceType, setDeviceType] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isMapOpen, setMapOpen] = useState(false);

  const [isPause, setIsPause] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const webModalizeRef1 = useRef(null);

  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(3);
  const story = stories.length ? stories[currentIndex] : {};
  const { isReadMore, url, content } = story || {};
  const handleDeviceType = async () => {
    let dType = await Device.getDeviceTypeAsync();
    setDeviceType(dType);
  };
  useEffect(() => {
    handleDeviceType();

  }, []);


  // const onVideoLoaded = (length) => {
  //   props.onVideoLoaded(length.duration);
  // };

  const changeStory = (evt) => {
    console.log("TTTTxxxxxxxxxxxxT");
    if (evt.locationX > SCREEN_WIDTH / 2) {
      prevStory();
    } else {
      nextStory();
    }
  };

  const nextStory = () => {
    if (stories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryNext();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && stories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryPrevious();
    }
  };

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onVideoLoaded = (length) => {
    let seconds = ((length.durationMillis % 60000) / 1000).toFixed(0);
    setLoaded(true);
    setDuration(length.durationMillis / 1000);
    setIsPause(false);
  };

  const onPause = (result) => {
    setIsPause(result);
  };

  const onReadMoreOpen = () => {
    setIsUser(false);
    setIsPause(true);
    setModel(true);
    console.log(placeId)
  };
  const onViewMap = () => {

    console.log(placeId);
    setMapOpen(!isMapOpen);
  };
  const onUserInfoOpen = () => {
    console.log(placeId);
    setIsUser(true);
    setIsPause(true);
    setModel(true);
  };
  const onReadMoreClose = () => {
    setIsPause(false);
    setIsUser(false);
    setModel(false);
  };




  const loading = () => {
    if (!isLoaded) {
      return (
        <View style={styles.loading}>
          <View style={{ width: 1, height: 1 }}>
            <Story
              onImageLoaded={onImageLoaded}
              pause
              onVideoLoaded={onVideoLoaded}
              story={story}
            />
          </View>
          <ActivityIndicator color="white" />
        </View>
      );
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipeDown = () => {
    console.log("Swipdown");
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };

  const onSwipeUp = () => {
    if (!isModelOpen && isReadMore) {
      setModel(true);
    }
  };

  const onSwipeLeft = () => {
    console.log("Swipleft");
  };

  const onSwipeRight = () => {
    console.log("Swipright");

  };

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
       config={config}
      style={styles.container}

    >

      <TouchableOpacity
        activeOpacity={.2}
        delayLongPress={200}
        onPress={(e) => changeStory(e.nativeEvent)}
        onLongPress={() => onPause(true)}
        onPressOut={() => onPause(false)}
        style={styles.container}
      >
        <View style={styles.container}>
          <Story
            onImageLoaded={onImageLoaded}
            pause
            isNewStory={props.isNewStory}
            onVideoLoaded={onVideoLoaded}
            story={story}
          />

          {loading()}

          <UserView
            name={user.username}
            profile={user.profile}
            onClosePress={props.onClose}
            //onPress={props.onUserInfoOpen}
            onPress={onUserInfoOpen}
          />

          {isReadMore && <Readmore onReadMore={onReadMoreOpen} />}

          <ProgressArray
            next={nextStory}
            isLoaded={isLoaded}
            duration={duration}
            pause={isPause}
            isNewStory={props.isNewStory}
            stories={stories}
            currentIndex={currentIndex}
            currentStory={stories[currentIndex]}
            length={stories.map((_, i) => i)}
            progress={{ id: currentIndex }}
          />
        </View>
      </TouchableOpacity>
      {<Modal
        style={styles.modal}
        swipeArea={20} // The height in pixels of the swipeable area, window height by default
        swipeThreshold={50} // The threshold to reach in pixels to close the modal
        swipeToClose={true}
        propagateSwipe={false}

        backdropOpacity={0.1}
        isOpen={isModelOpen}
        onClosed={onReadMoreClose}
      >
        {isUser && <View style={{ flex: 1 }}>
          {true && (
            <View style={styles.content__header} key="0">
              <TouchableOpacity onPress={onReadMoreClose}>
                <MaterialCommunityIcons
                  name="close"
                  color={colors.dark}
                  size={35}
                />
              </TouchableOpacity>
              <View>
                {place?.placeName && (<AppText style={styles.content__heading} numberOfLines={4}>
                  {place?.placeName}
                </AppText>
                )}
                {place?.placeLocation && (
                  <View style={{ marginTop: 10, padding: 0 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 0 }} onPress={onViewMap}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        color={isMapOpen?'green':colors.primaryNew}
                        size={28}

                      />
                      <AppText >{place.placeLocation}</AppText>
                    </TouchableOpacity>
                  </View>
                )}

              </View>
            </View>

          )}
          {isMapOpen &&
            <WebView
 
              scrollEnabled={true}
              scalesPageToFit={true}
              automaticallyAdjustContentInsets={false}
              source={{ uri: place?.placeLocationUrl }} />
          }
          {true && <View style={styles.content__inside} key="5">
            <ScrollView>
              <TouchableOpacity activeOpacity={1}>

                <View style={styles.contentimages} key="3">
                  {true && (
                    <Carousel
                      height={deviceType === 1 ? 350 : 300}
                      deviceType={deviceType}
                      onPress={async (item) => {
                        //  / modalizeRef.current.open();              
                      }}
                      items={place?.placeImages?.map((image) => {
                        return {
                          contentId: image.Id,
                          //title:"gg",
                          //subTitle: haber.title,
                          imageUrl: image.img,
                          height: 200
                        };
                      })}
                    />
                  )
                  }
                  {place?.placeInfo && <View><AppText numberOfLines={70} style={styles.content__details}>{place.placeInfo}</AppText></View>}
                </View>


              </TouchableOpacity>
            </ScrollView>
          </View>}
        </View>}

        {!isUser && <View style={{ flex: 1 }}>
          {true && (
            <View style={styles.content__header} key="0">
              <TouchableOpacity onPress={onReadMoreClose}>
                <MaterialCommunityIcons
                  name="close"
                  color={colors.dark}
                  size={35}
                />
              </TouchableOpacity>
              <View>
                {place?.placeName && (<AppText style={styles.content__heading} numberOfLines={4}>
                  {place.placeName}
                </AppText>
                )}
                {place?.placeLocation && (
                  <AppText style={styles.content__subheading}> عنوان -الموضوع</AppText>
                )}</View>
            </View>

          )}

          <View style={styles.content__inside} key="4">
            <ScrollView>
              <TouchableOpacity activeOpacity={1}>

                <View style={styles.contentimages} key="3">
                  {true && (
                    <Carousel
                      height={deviceType === 1 ? 350 : 300}
                      deviceType={deviceType}
                      onPress={async (item) => {
                        //  / modalizeRef.current.open();              
                      }}
                      items={story?.images?.map((Image) => {
                        return {
                          contentId: Image.Id,
                          //title:"gg",
                          //subTitle: haber.title,
                          imageUrl: Image.img,
                          height: 200
                        };
                      })}
                    />
                  )
                  }
                  {story?.content && <View><AppText numberOfLines={70} style={styles.content__details}>{story.content}</AppText></View>}
                </View>


              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>}


      </Modal>}



    </GestureRecognizer>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    // paddingTop: 30,
    // backgroundColor: 'red',
  },
  v:
  {
    flex: 1,

  },

  contentimages: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  content__header: {
    width: "100%",
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content__details: {
    textAlign: 'justify',
    padding: 10,
    fontSize: 15,
    paddingBottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content__heading: {
    marginBottom: 2,
    fontSize: 24,
    padding: 10,
    //fontWeight: "600",
    color: colors.danger,
  },

  content__subheading: {
    marginVertical: 10,
    fontSize: 16,
    color: colors.secondaryLight,
  },
  content__fulldate: {
    marginVertical: 10,
    paddingRight: 0,
    fontSize: 14,
    color: colors.primaryNew,
  },

  content__inside: {
    flex: 1,
    width: "100%",
    padding: 0,
  },
  content__inside__map: {
    flex: 1,
    width: "100%",
    padding: 0,
    backgroundColor: colors.danger
  },
  progressBarArray: {
    flexDirection: "row",
    position: "absolute",
    top: 10,
    width: "98%",
    height: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  userView: {
    flexDirection: "row",
    position: "absolute",
    top: 55,
    width: "98%",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    //fontWeight: "500",
    marginLeft: 12,
    color: "red",
  },
  time: {
    fontSize: 12,
    //fontWeight: "400",
    marginTop: 3,
    marginLeft: 12,
    color: "white",
  },
  content: {
    width: "100%",
    height: "100%",
  },
  loading: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "100%",
    height: "100%",
    marginTop: 10,

    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom:20,
  },
  bar: {
    width: 50,
    height: 8,
    backgroundColor: "gray",
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 8,
  },
});

export default StoryContainer;
