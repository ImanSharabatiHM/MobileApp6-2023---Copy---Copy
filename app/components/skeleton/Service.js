import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

function Service() {
  return (
    <View style={{ marginBottom: 20 }}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column">
          <SkeletonPlaceholder.Item width="100%" marginBottom={1}>
            <SkeletonPlaceholder.Item width="100%" height={64} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width="100%" marginBottom={1}>
            <SkeletonPlaceholder.Item width="100%" height={64} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width="100%" marginBottom={1}>
            <SkeletonPlaceholder.Item width="100%" height={64} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width="100%" marginBottom={1}>
            <SkeletonPlaceholder.Item width="100%" height={64} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width="100%" marginBottom={1}>
            <SkeletonPlaceholder.Item width="100%" height={64} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
export default Service;
