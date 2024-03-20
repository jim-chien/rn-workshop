import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Button,
  View,
  Pressable,
} from "react-native";
import { colors, fontSize } from "./theme";
import Pokeball from "./assets/pokeball.png";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native Pokedex</Text>
      <Image source={Pokeball} />
      <Pressable onPress={() => { }}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </Pressable>
      {/* <View style={styles.button}> */}
      {/*   <Button title="GET STARTED" onPress={() => { }} color={colors.white} /> */}
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightRed,
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    fontSize: fontSize.extraLarge,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: fontSize.medium,
    color: colors.white,
  },
});
