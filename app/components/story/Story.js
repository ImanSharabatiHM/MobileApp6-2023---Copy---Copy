/* eslint-disable react/no-unused-prop-types */
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import AppWebView from "../../components/WebView";

// import Video from 'react-native-video';
import { Video } from "expo-av";
// import Image from 'react-native-scalable-image';
import PropTypes from "prop-types";
import colors from "../../config/colors";
import Text from "../Text";

const ScreenWidth = Dimensions.get("window").width;

const Story = (props) => {
  const { story } = props;
  const { url, type, content } = story || {};
console.log(story);
  return (
    <View style={styles.container}>
      {/* {!props.isLoaded && (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
      )} */}
      <Text style={styles.title}>
        {content}</Text>
      {type === "image" ? (
        <Image
         // source={require('../../assets/story1k.png')}
          source={{uri:url}}
          onLoadEnd={props.onImageLoaded}
          style={styles.contentCover}
          resizeMode="contain"
          width={ScreenWidth}
        />
      ) : 
      <Image
      //source={require('../../assets/story1k.png')}
      source={{uri:url}}
      onLoadEnd={props.onImageLoaded}
      style={styles.contentCover}
      resizeMode="contain"
      width={ScreenWidth}
    />   
      }
      
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
    flex: 1,
    width: "100%",
    backgroundColor: colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "50%",
    height: "70%",
    flex: 1,
  },
  contentCover: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  title: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Cairo_400Regular',
    color: colors.white,
    paddingRight: 15,
    // margin: 10,
  },
  imageContent: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  loading: {
    backgroundColor: colors.dark,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Story;
/*<Video
        source={{ uri: url }}
        onLoad={(item) => {
          props.onVideoLoaded(item);
          // console.log(item);
        }}
        style={[styles.content, { backgroundColor: colors.black }]}
        resizeMode="contain"
        shouldPlay={!props.isNewStory}
      />*/