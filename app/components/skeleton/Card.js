import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function Card() {
  return (
    <View style={{ marginBottom: 20, borderRadius: 8 }}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" width="100%">
          <SkeletonPlaceholder.Item width={100} marginRight={10}>
            <SkeletonPlaceholder.Item
              width="100%"
              height={120}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item flex={1}>
            <SkeletonPlaceholder.Item
              width="100%"
              height={120}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
export default Card;
