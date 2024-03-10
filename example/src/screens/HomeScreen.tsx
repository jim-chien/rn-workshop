import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { Button } from "components/Button";

import { RootStackParamList } from "types";
import { colors, fontSize, spacing } from "components/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.body}>
          <Text style={styles.title}>React Native Pokédex</Text>
          <Image
            source={require("../../assets/pokeball.png")}
            style={styles.image}
          />
        </View>
        <Button
          title="GET STARTED"
          onPress={() => navigation.navigate("Pokedex")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightRed,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "transparent",
    padding: spacing.medium,
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    top: "12.5%",
  },
  title: {
    textAlign: "center",
    marginTop: spacing.medium,
    fontSize: fontSize.extraLarge,
    fontWeight: "bold",
    color: colors.white,
  },
});

// #0075BE and #FFCC00,
