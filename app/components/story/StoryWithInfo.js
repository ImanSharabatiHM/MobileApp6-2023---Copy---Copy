/* eslint-disable react/no-unused-prop-types */
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
// import Video from 'react-native-video';
import { Video } from "expo-av";
// import Image from 'react-native-scalable-image';
import PropTypes from "prop-types";
import colors from "../../config/colors";
import Text from "../Text";

const ScreenWidth = Dimensions.get("window").width;

const Story = (props) => {
  const { story } = props;
  const { url, type } = story || {};
console.log(url);
  return (
    <View style={styles.container}>
      {/* {!props.isLoaded && (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
      )} */}
 
      {type === "image" ? (
        <Image
         source={{ uri: url }}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="contain"
          width={ScreenWidth}
        />
      ) : (
        <Video
          source={{ uri: url }}
          onLoad={(item) => {
          props.onVideoLoaded(item);
            // console.log(item);
          }}
          style={[styles.content, { backgroundColor: colors.black }]}
          resizeMode="contain"
          shouldPlay={!props.isNewStory}
        />
      )}
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: "100%",
    flex: 1,
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

export default StoryWithInfo;
