import React, { useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Stat } from "./Stat/Stat";
import { Slide } from "./Slide/Slide";
import { styles } from "./styles";
import colors from "../../config/colors";
import CardInfo from "../CardInfo";

// const { width } = Dimensions.get("window");

export const Carousel = (props) => {
  const {
    items,
    style,
    height,
    deviceType,
    onPress,
    showBullet = true,
    titleStyle,
    backgroundColor = colors.white,
  } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;
  const [interval, setInterval] = React.useState(0);
  const [intervals, setIntervals] = React.useState(0);
  const [showContent, setShowContent] = React.useState(false);
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    setIntervals(items?.length);
    //setInterval(items.length-1);
  }, []);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items?.length;
    //console.log(totalItems);
    //setIntervals(Math.ceil(totalItems / itemsPerInterval));
    //setIntervals(totalItems);
  };

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <View
        key={i}
        style={{
          ...styles.bullet,
          backgroundColor:
            interval === i ? colors.primary : colors.backgroundColor,
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={{
          backgroundColor: backgroundColor,
        }}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
          // width: "100%",
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => {
          init(w);
        }}
        onScroll={(data) => {
         // console.log("WAS:   "+interval);
          setWidth(data.nativeEvent.contentSize.width-10);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
         }}
        scrollEventThrottle={1}
        pagingEnabled
        decelerationRate="fast"
      >
        {items?.map((item, index) => {
          switch (style) {
            case "cardInfo":
              return (
                <CardInfo
                  key={index+item.title}
                  imageUrl={item.imageUrl}
                  cardStyle={{ backgroundColor: backgroundColor }}
                  title={item.title}
                  imageHeight={item.height}
                  subTitle={item.subTitle}
                  onPress={() => onPress(item)}
                />
              );
              case "announceInfo":
                return (
                  <CardInfo
                    key={index+item.title}
                    imageUrl={item.imageUrl}
                    cardStyle={{ backgroundColor: backgroundColor }}
                    title={item.title}
                    imageHeight={item.height}
                    subTitle={item.subTitle}
                    lines={3}
                    onPress={() => onPress(item)}
                  />
                );
           
              case "stats":
              return (
                <Stat key={index} label={item.title} value={item.subTitle} />
              );
            default:
              return (
                <Slide
                  key={index}
                  title={item.title?item.title:" "}
                  subTitle={item.subTitle?item.subTitle:" "}
                  imageUrl={item.imageUrl?item.imageUrl:" "}
                  details={item.details?item.details:" "}
                  deviceType={deviceType?deviceType:" "}
                  titleStyle={titleStyle}
                  date={item.date?item.date:" "}
                  item={item}
                  height={height}
                  onPress={() => onPress(item)}
                />
              );
          }
        })}
      </ScrollView>
      {showBullet   && <View style={[styles.bullets,{backgroundColor:backgroundColor}]}>{bullets}</View>}
    </View>
  );
};

export default Carousel;
