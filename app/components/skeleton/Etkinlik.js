import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function Etkinlik() {
  return (
    <View style={{ marginBottom: 15 }}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" marginBottom={30}>
          <SkeletonPlaceholder.Item
            width="100%"
            height={250}
            borderRadius={8}
            marginBottom={10}
          />
          <SkeletonPlaceholder.Item
            flexDirection="column"
            justifyContent="space-between"
          >
            <SkeletonPlaceholder.Item
              width="100%"
              height={20}
              borderRadius={8}
              marginBottom={5}
            />
            <SkeletonPlaceholder.Item
              width="20%"
              height={20}
              borderRadius={8}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
export default Etkinlik;
