import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../../config/colors";
import AppText from "../Text";

function ListItem({
  Button,
  preTitle,
  preSubTitle,
  title,
  subTitle,
  subTitleVisible=true,
  image,
  IconComponent,
  IconRightComponent,
  FavoriteComponent,
  onPress,
  renderRightActions,
  renderChevron,
  chevronSize = 25,
  rightInfo,
  rightInfoStyle,
  listStyle,
  detailsContainer,
  imageStyle,
  Switch,
  swipeBackground,
  subTitleStyle,
  textStyle,
  onSwipeableOpen,
}) {
  const swipeRef = useRef(null);
  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   swipeRef.current.openRight();
  //   // }, 1000);
  // }, []);
  return (
    <Swipeable
      ref={swipeRef}
      containerStyle={{ backgroundColor: swipeBackground }}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={onSwipeableOpen}
      onSwipeableOpen={() => swipeRef.current.close()}
    >
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View
          style={[
            IconComponent ? null : { paddingVertical: 15 },
            styles.container,
            listStyle,
          ]}
        >
          {IconComponent}
          {FavoriteComponent}
          {image && <Image style={[styles.image, imageStyle]} source={image} />}

          <View style={[styles.detailsContainer, detailsContainer]}>
            {preTitle && (
              <AppText style={[styles.title, textStyle]} numberOfLines={1}>
                {preTitle}
              </AppText>
            )}
            {preSubTitle && (
              <AppText style={[styles.title, textStyle]} numberOfLines={2}>
                {preSubTitle}
              </AppText>
            )}

           {title&& (<AppText style={[styles.title, textStyle]} numberOfLines={1}>
              {title}
            </AppText>)
            }
            {subTitleVisible&&subTitle && (
              <AppText
                style={[styles.subTitle, subTitleStyle]}
                numberOfLines={20}
              >{subTitle}
              </AppText>
            )}
          </View>

          {rightInfo && (
            <AppText
              // style={[
              //   styles.subTitle,
              //   rightInfoStyle ? rightInfoStyle : textStyle,
              // ]}
              style={[
                styles.rightInfoStyle,
                rightInfoStyle ? rightInfoStyle : textStyle,
              ]}
              numberOfLines={3}
            >
              {rightInfo}
            </AppText>
          )}
          {Button}
          {Switch}
          {renderChevron && (
            <MaterialCommunityIcons
              // style={[styles.title, textStyle]}
              color={colors.secondary}
              name="chevron-right"
              size={chevronSize}
            />
          )}
          {IconRightComponent}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
    marginTop: 10,
  },
  title: {
    //fontWeight: "600",
  },
  rightInfoStyle: {
   // fontWeight: "bold",
  },
});

export default ListItem;
