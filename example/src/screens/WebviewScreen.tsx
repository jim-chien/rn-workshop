import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InternalWebView } from "components/InternalWebView";
import { WebView } from "react-native-webview";
import { RootStackParamList, WebViewInternalUrls } from "types";

type Props = NativeStackScreenProps<RootStackParamList, "WebView">;

export function WebViewScreen({ route, navigation }: Props) {
  const { uri } = route.params;

  const isInternalUri = Object.values<string>(WebViewInternalUrls).some(
    (internalUri) => uri.includes(internalUri)
  );

  if (isInternalUri) {
    return <InternalWebView route={route} navigation={navigation} />;
  }

  return <WebView source={{ uri }} />;
}
