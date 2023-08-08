import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StorageAccessFramework } from 'expo-file-system';

import colors from "../config/colors";

function ImageInput({ imageUri, onChangeImage,attach=false,style,capture=false}) {
  const path="file:///data/user/0/com.hebronline/cache/ImagePicker/";
  useEffect(() => {
    requestPermission();
  }, []);
  async function createImage(path,name,code){
    let result = null;
    console.log("will create Image .... "+path);
    try {
        result = await StorageAccessFramework.createFileAsync(path,name,"image/jpeg");
    } catch(e) {
        console.log(e);
    }
    console.log("Image was created :"+result);
    writeFile(result,code);
  
  
  }
  async function writeFile(path,data){
    let result = null;
    try {
        result = await StorageAccessFramework.writeAsStringAsync(
          path,
          data,
          { encoding: FileSystem.EncodingType.Base64 });
    } catch(e) {
        console.log("Error write File : "+e);
    }
   
  }
  const Capture = async () => 
   {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        base64: true,

      });
      if (!result.canceled) {
        onChangeImage(result.assets[0].uri);
       // console.log("NEWWWWWWWWWW  "+result.assets[0].uri);
      //const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      //console.log(path);
     // createImage(path,"test.jpeg",result.assets[0].base64)  
    //  onChangeImage(path+"test.jpeg");

    }
    } catch (error) {
      console.log("Error capturing image", error);
    }
  }
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("أنت بحاجة إلى تمكين إذن للوصول إلى المكتبة");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
   // else if(capture) { Capture();  }
    else
      Alert.alert("تنبيه", "هل أنت متأكد أنك تريد حذف هذه الصورة؟", [
        { text: "نعم", onPress: () => onChangeImage(null) },
        { text: "لا" },
      ]);
  };

  const selectImage = async () => {
    try {
      if(!capture)
      {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled)onChangeImage(result.assets[0].uri);

    }
    else
    {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        base64: true,

      });
      if (!result.canceled)onChangeImage(result.assets[0].uri);

    }
     // console.log(result);

    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container,style]}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name={attach?"file-upload":"camera" }
            size={40}           
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={[styles.image]} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 75,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 75,
  },
  image: {
    height: "100%",
    width: "100%",
    alignContent:"stretch",
  },
});

export default ImageInput;
