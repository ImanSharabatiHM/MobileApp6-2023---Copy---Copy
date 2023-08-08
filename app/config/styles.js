import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    writingDirection:"rtl",
    color: colors.dark,
    fontFamily: Platform.OS === "android" ? "Cairo_400Regular" : "Cairo_400Regular",
    
  },
};
