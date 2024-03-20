import { WebView } from 'react-native-webview';

export const WebViewContainer = () => {
  return(
    <WebView source={{ uri: 'https://reactnative.dev/' }} />
  )
}