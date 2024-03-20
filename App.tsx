import { StyleSheet, SafeAreaView, View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "screens/Home";
import { Pokedex } from "screens/Pokedex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Pokemon } from "screens/Pokemon";
import { WebViewContainer } from 'screens/WebViewContainer';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Pokedex" component={Pokedex} />
          <Stack.Screen name="Pokemon" component={Pokemon} />
          <Stack.Screen name="WebViewContainer" component={WebViewContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
