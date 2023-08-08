import React from "react";
import { Dimensions, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const { width } = Dimensions.get("window");
const storyWidth = (width - 100) / 4;

function Stories({ deviceType }) {
  return (
    <View style={{ marginBottom: 20, marginTop: 10 }}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" width="80%">
          <SkeletonPlaceholder.Item
            flexDirection="column"
            width={deviceType === 1 ? storyWidth : 90}
            marginRight={20}
          >
            <SkeletonPlaceholder.Item
              width={deviceType === 1 ? storyWidth : 90}
              height={deviceType === 1 ? storyWidth : 90}
              borderRadius={100}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={15}
              borderRadius={8}
              marginBottom={5}
            />
            <SkeletonPlaceholder.Item
              width="80%"
              height={15}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            flexDirection="column"
            width={deviceType === 1 ? storyWidth : 90}
            marginRight={20}
          >
            <SkeletonPlaceholder.Item
              width={deviceType === 1 ? storyWidth : 90}
              height={deviceType === 1 ? storyWidth : 90}
              borderRadius={100}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={15}
              borderRadius={8}
              marginBottom={5}
            />
            <SkeletonPlaceholder.Item
              width="80%"
              height={15}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            flexDirection="column"
            width={deviceType === 1 ? storyWidth : 90}
            marginRight={20}
          >
            <SkeletonPlaceholder.Item
              width={deviceType === 1 ? storyWidth : 90}
              height={deviceType === 1 ? storyWidth : 90}
              borderRadius={100}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={15}
              borderRadius={8}
              marginBottom={5}
            />
            <SkeletonPlaceholder.Item
              width="80%"
              height={15}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            flexDirection="column"
            width={deviceType === 1 ? storyWidth : 90}
            marginRight={20}
          >
            <SkeletonPlaceholder.Item
              width={deviceType === 1 ? storyWidth : 90}
              height={deviceType === 1 ? storyWidth : 90}
              borderRadius={100}
              marginBottom={10}
            />
            <SkeletonPlaceholder.Item
              width="100%"
              height={15}
              borderRadius={8}
              marginBottom={5}
            />
            <SkeletonPlaceholder.Item
              width="80%"
              height={15}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
export default Stories;
