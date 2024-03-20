import { StyleSheet, SafeAreaView, View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "screens/Home";
import { Pokedex } from "screens/Pokedex";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Pokedex" component={Pokedex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
