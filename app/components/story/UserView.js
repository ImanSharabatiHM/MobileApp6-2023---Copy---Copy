/* eslint-disable */
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View ,TouchableHighlight,Platform} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";

class UserView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return (
      <View style={styles.userView}>
        <TouchableHighlight onPress={props.onPress}>
        <Image source={{ uri: props.profile }}   style={styles.image} />
        </TouchableHighlight>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Text style={styles.name}>{props.name}</Text>
          { <Text style={styles.time}>قبل 3 ساعات</Text> }
        </View>
        <TouchableOpacity onPress={props.onClosePress}>
          <Icon
            name="close"
            color="white"
            size={30}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 8,
  },
  userView: {
    flexDirection: "row",
    position: "absolute",
    top: Platform.OS !== "android" ? Constants.statusBarHeight + 20 : 20,
    width: "98%",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontFamily:"Cairo_400Regular",
    //fontWeight: "500",
    marginLeft: 12,
    color: "white",
  },
  time: {
    fontSize: 12,
    //fontWeight: "400",
    marginTop: 3,
    marginLeft: 12,
    color: "white",
  },
});

export default UserView;
