import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CapturedContext } from "components/CapturedContext";
import { useCallback, useContext, useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import {
  CapturePokemonsWebViewMessage,
  Pokemon,
  PokemonWebViewMessage,
  RootStackParamList,
} from "types";

type Props = NativeStackScreenProps<RootStackParamList, "WebView">;

export function InternalWebView({ navigation, route }: Props) {
  const webViewRef = useRef<WebView>(null);
  const [capturedList, dispatch] = useContext(CapturedContext);

  const { uri } = route.params;

  const handleWebViewMessage = (message: PokemonWebViewMessage) => {
    if (message.code === "release_pokemon") {
      dispatch({
        type: "release",
        pokemon: capturedList.find((pokemon) => pokemon.id === message.data)!,
      });
    } else if (message.code === "navigate_to_pokemon") {
      navigation.pop();
      navigation.navigate("Pokemon", { name: message.data });
    }
  };

  const sendCapturePokemonsMessage = useCallback(
    (capturePokemons: Pokemon[]) => {
      const capturePokemonsMessage: CapturePokemonsWebViewMessage = {
        code: "capture_pokemons",
        data: capturePokemons,
      };

      webViewRef.current?.postMessage(JSON.stringify(capturePokemonsMessage));
    },
    [webViewRef.current]
  );

  useEffect(() => {
    sendCapturePokemonsMessage(capturedList);
  }, [capturedList]);

  return (
    <WebView
      ref={webViewRef}
      onLoadEnd={() => sendCapturePokemonsMessage(capturedList)}
      source={{ uri }}
      onMessage={(messageEvent) => {
        if (messageEvent.nativeEvent.data) {
          try {
            const parsedMessage = JSON.parse(messageEvent.nativeEvent.data);

            if (!("code" in parsedMessage)) return;

            handleWebViewMessage(parsedMessage as PokemonWebViewMessage);
          } catch (e) {
            console.error(
              `error parsing web-view message: ${messageEvent.nativeEvent.data}`,
              e
            );
          }
        }
      }}
    />
  );
}
