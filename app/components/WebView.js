import React, { useState,useRef,forwardRef } from "react";
import { Dimensions, Platform } from "react-native";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import ActivityIndicator from "./ActivityIndicator";
import { useCombinedRefs } from "../utility/use-combined-refs";

const { width, height: initialHeight } = Dimensions.get("window");
const isAndroid = Platform.OS === "android";
export const AppWebView = forwardRef(
  ({ source, onNavigationStateChange,onMessage },ref)=> {
  const [loading, setLoading] = useState(true);
  const [documentHeight, setDocumentHeight] = useState(initialHeight);
  const webViewRef = useRef(ref);
  const combinedRef = useCombinedRefs(ref, webViewRef);
 /// const [htmlSource, setHtmlSource] = useState({baseUrl:source.baseUrl,html:source.html});
  return (
    <WebView
    ref={combinedRef}
    showsVerticalScrollIndicator={false}
      source={source.baseUrl!=undefined?{baseUrl:source.baseUrl,html:source.html}:{uri:source.uri}}
      startInLoadingState={true}
      onNavigationStateChange={onNavigationStateChange}
      containerStyle={{ paddingBottom: 0 }}
      //injectedJavaScript={debugging}

      injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight);"
      onLoadStart={() => {
        setLoading(true);
      }}
      onLoadEnd={() => {
       // webViewRef.current.injectJavaScript("alert('OKKKKKKKKKKK')");
        setLoading(false);
        console.log("ddd");
      }}
      renderLoading={() => <ActivityIndicator visible={loading} />}
      style={{ height: initialHeight*.8 }}
      enabledUploadAndroid={true}   
      setAllowFileAccessFromFileURLs={true}
      setAllowUniversalAccessFromFileURLs={true}
      allowFileAccess={true}
      javaScriptEnabled={true}
      scrollEnabled={false}
      domStorageEnabled={true}
      onMessage={onMessage}
      originWhitelist={['*']}
      mixedContentMode={"always"} 
      geolocationEnabled={true}  
    />
  );
}
);

export default AppWebView;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    width: "100%",
  },
});
