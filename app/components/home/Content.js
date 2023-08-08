import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MAX_HEADER_HEIGHT } from "./Header";

function Content(props) {
  const height = MAX_HEADER_HEIGHT;
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
    >
      <View style={styles.header}>
        <View style={[styles.gradient, { height }]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0, 0.3]}
            end={[0, 1]}
            colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.story}>قصص</Text>
        </View>
      </View>
      <View style={styles.content}></View>
    </ScrollView>
  );
}
export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: MAX_HEADER_HEIGHT,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  headerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  story: {
    textAlign: "center",
    color: "white",
    fontSize: 48,
    //fontWeight: "bold",
  },
  content: {
    paddingTop: 32,
    backgroundColor: "black",
  },
});
