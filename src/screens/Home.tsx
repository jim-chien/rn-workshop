import { StyleSheet, Text, Image, Pressable, SafeAreaView } from "react-native";
import { colors, fontSize } from "../../theme";

import Pokeball from "../../assets/pokeball.png";

export const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native Pokedex</Text>
      <Image source={Pokeball} />
      <Pressable
        onPress={() => {
          navigation.navigate("Pokedex");
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightRed,
    alignItems: "center",
    gap: 40,
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
  buttonContainer: {
    backgroundColor: "#bbb",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
  },
});
