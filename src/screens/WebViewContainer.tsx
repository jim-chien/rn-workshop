import { useRoute } from "@react-navigation/native";
import { useRef } from "react";
import { WebView } from "react-native-webview";

export const WebViewContainer = () => {
  const { params } = useRoute();
  const isInternal = params.url.includes("rn-workshop");
  const webViewRef = useRef<WebView>(null);

  return isInternal ? (
    <WebView
      source={{ uri: params.url }}
      ref={webViewRef}
      onLoadEnd={() => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            code: "capture_pokemons",
            data: [],
          })
        );
      }}
      // onMessage={}
    />
  ) : (
    <WebView source={{ uri: params.url }} />
  );
};
