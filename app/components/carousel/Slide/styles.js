import { StyleSheet } from "react-native";
import colors from "../../../config/colors";

export const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    color: colors.secondary,
    //fontWeight: "700",
    paddingBottom: 8,
  },
  subTitle: {
    color: colors.secondary,
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    paddingBottom: 16,
  },
  date: {
    color: colors.facebook,
    width: "100%",
    textAlign: "left",
    fontSize: 11,
    paddingBottom: 16,
  },
});

export default styles;
