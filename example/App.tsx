import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList, WebViewInternalUrls } from "types";
import { HomeScreen } from "screens/HomeScreen";
import { WebViewScreen } from "screens/WebviewScreen";
import { PokedexScreen } from "screens/PokedexScreen";
import { PokemonScreen } from "screens/PokemonScreen";
import { CapturedContextProvider } from "components/CapturedContext";
import { Image, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CapturedContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WebView"
            component={WebViewScreen}
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="Pokedex"
            component={PokedexScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("WebView", {
                      uri: WebViewInternalUrls.WorkshopUrl,
                    })
                  }
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("./assets/pokeball.png")}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Pokemon" component={PokemonScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CapturedContextProvider>
  );
}
