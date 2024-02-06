import React, { useEffect,useRef, forwardRef ,useState} from "react";
import { View, StyleSheet, Platform,Dimensions } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-paper";
import colors from "../config/colors";
import { useCombinedRefs } from "../utility/use-combined-refs";
import AppText from "./Text";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "../components/carousel/Carousel";
import * as Device from "expo-device";
import { Constants } from "expo-camera";
import constants from "../config/constants";

// function ({ children, title, subTitle })
export const AppModalize = forwardRef(
  ({ children, title, subTitle,onPress,details,urlpre="", images,fullDate, ...otherProps }, ref) => {
    const modalizeRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalizeRef);
    const [deviceType, setDeviceType] = useState(null);
    const screenHeight = Dimensions.get('window').height;
    const modalHeight = screenHeight / 2; // Cover half of the screen
    const handleDeviceType = async () => {
      let dType = await Device.getDeviceTypeAsync();
      setDeviceType(dType);
    };
    useEffect(() => {
      handleDeviceType();
   
    }, []);
  
    return (
      <Portal>
        <Modalize
          ref={combinedRef}
          // withReactModal
          handlePosition={"outside"}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
            stickyHeaderIndices: [0],
          }}
          threshold={2}
          disableScrollIfPossible={true}
          modalTopOffset={25}
          //threshold={10}
          dragToss={2}
          {...otherProps}
        >
         
            <View style={s.content__header} key="0">
            <TouchableOpacity onPress={onPress}>
              <MaterialCommunityIcons
                name="close"
                color={colors.dark}
                size={35}
              />
            </TouchableOpacity>
             {title &&  <AppText style={s.content__heading} numberOfLines={4}>
                {title}
              </AppText>}
              {subTitle && (
                <AppText style={s.content__subheading}>{subTitle}</AppText>
              )} 
              {fullDate && (
                <AppText style={s.content__fulldate}>{fullDate}</AppText>
              )} 
                    
            </View>
          
           {images &&<View style={s.contentimages} key="3">              
            (
            <Carousel            
            height={deviceType === 1 ? 350 : 300}
            deviceType={deviceType}
              onPress={async (item) => {
              //  / modalizeRef.current.open();              
              }}
              items={images.map((image) => {              
                return {
                  contentId: image.Id,
                 //title:"gg",
                  //subTitle: haber.title,
                  imageUrl:urlpre +image.img,
                  height:300
                };
              })}
            />
          ) </View>
          }       
 
    
          {details &&<View style={s.content__inside} key="4">
           (<AppText   numberOfLines={100} style={s.content__details}>{details}</AppText>)  
          </View>} 

    
 
          <View style={s.content__inside} key="1">
            {children}
          </View>
        </Modalize>
      </Portal>
    );
  }
);

const s = StyleSheet.create({
  contentimages: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  content__header: {
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content__details: {
    
    textAlign: "justify",
    //alignSelf: "flex-start",

      padding: 15,
    fontSize:15,
    paddingBottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content__heading: {
    marginBottom: 2,
    fontSize: 24,
    writingDirection:"rtl",
    //fontWeight: "600",
    color: colors.secondary,
  },

  content__subheading: {
    marginVertical: 10,

    fontSize: 16,
    color: colors.secondaryLight,
  },
  content__fulldate: {
    marginVertical: 10,
    paddingRight:3,
    fontSize: 14,
    color: colors.primaryNew,
  },

  content__inside: {
    width: "100%",
    padding: 10,
  },
});
