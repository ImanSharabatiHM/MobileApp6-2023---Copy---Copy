import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { withDecay } from "react-native-reanimated";
import ImageInput from "./ImageInput";

function ImageInputList({ imageUris = [], onRemoveImage,style, onAddImage,attach=false,capture=false }) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={[styles.container]}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput             
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput style={{width:'100%'}} attach={attach} capture = {capture} onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 1,
    
  },
});

export default ImageInputList;
