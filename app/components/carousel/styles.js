import { StyleSheet } from "react-native";
import colors from "../../config/colors";

export const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fbfbfb",
    borderRadius: 8,
    overflow: "hidden",
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  bullets: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
    backgroundColor: colors.white,
    top:0,
    padding: 10,
  },
  bullet: {
    borderRadius: 50,
    margin: 2.3,
    width: 10,
    height: 10,
  },
});

export default styles;
