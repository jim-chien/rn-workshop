import { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "components/Screen";
import {
  Pokemon,
  RootStackParamList,
  Stat,
  Type,
  WebViewInternalUrls,
} from "types";
import { PokeAPIService } from "services/PokeApiService";
import { Button } from "components/Button";
import { CapturedContext } from "components/CapturedContext";
import { colors, fontSize, spacing } from "components/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Pokemon">;

const { width: screenWidth } = Dimensions.get("screen");

export function PokemonScreen({ navigation, route }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const { name } = route.params;
  const [capturedList, dispatch] = useContext(CapturedContext);
  const isCaptured = capturedList.some(
    (captured) => captured.id === pokemon?.id
  );

  const fetchPokemon = async (name: string) => {
    const pokemon = await PokeAPIService.getPokemon(name);
    setPokemon(pokemon);
  };

  useEffect(() => {
    fetchPokemon(name);
  }, [name]);

  return (
    <Screen loading={!pokemon}>
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <Image source={{ uri: pokemon?.imageURI }} style={styles.sprite} />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.name}>
              {pokemon?.name} (#{pokemon?.id})
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("WebView", {
                  uri: getBulbapediaURL(pokemon?.name ?? ""),
                })
              }
            >
              <Text style={styles.name}>🔗</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.typesContainer}>
          {pokemon?.types.map((type) => (
            <TypePill key={type.name} type={type} />
          ))}
        </View>
        <View style={{ marginTop: spacing.medium }}>
          {pokemon?.stats.map((stat) => (
            <StatPill key={stat.name} {...stat} />
          ))}
        </View>
        <Button
          onPress={() =>
            dispatch({
              type: isCaptured ? "release" : "capture",
              pokemon: pokemon!,
            })
          }
          title={isCaptured ? "Release" : "Capture"}
          color={isCaptured ? colors.blue : colors.red}
          style={styles.captureButton}
        />
      </ScrollView>
      {isCaptured ? (
        <TouchableOpacity
          style={styles.pokeballTouchable}
          onPress={() =>
            navigation.navigate("WebView", {
              uri: WebViewInternalUrls.WorkshopUrl,
            })
          }
        >
          <Image
            style={styles.pokeball}
            source={require("../../assets/pokeball.png")}
          />
        </TouchableOpacity>
      ) : null}
    </Screen>
  );
}

function TypePill({ type }: { type: Type }) {
  return (
    <View
      style={{
        width: screenWidth / 3,
        alignItems: "center",
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.medium,
        borderRadius: 25,
        borderWidth: 2,
        marginHorizontal: spacing.medium,
        backgroundColor: type.color,
      }}
    >
      <Text
        style={{
          fontSize: fontSize.medium,
          fontWeight: "bold",
          color: colors.white,
        }}
      >
        {type.name}
      </Text>
    </View>
  );
}

function StatPill({ name, value, backgroundColor, color }: Stat) {
  return (
    <View style={[styles.statPill, { backgroundColor }]}>
      <View
        style={{
          flex: 2,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.statText}>{name}: </Text>
        <Text style={styles.statText}>{value}</Text>
      </View>
      <View style={{ flex: 5, flexDirection: "row" }}>
        <View
          style={[
            styles.statBar,
            {
              backgroundColor: color,
              width: `${value / 2.55}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
  },
  body: {
    alignItems: "center",
    marginVertical: spacing.medium,
  },
  sprite: {
    height: 200,
    width: 200,
  },
  name: {
    fontSize: fontSize.large,
    fontWeight: "bold",
    marginTop: spacing.medium,
  },
  typesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statPill: {
    height: 40,
    flexDirection: "row",
    padding: spacing.small,
    marginVertical: 2,
  },
  statText: {
    fontWeight: "bold",
  },
  statBar: {
    borderWidth: StyleSheet.hairlineWidth,
    marginLeft: spacing.small,
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  captureButton: {
    marginTop: spacing.medium,
  },
  pokeballTouchable: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  pokeball: {
    width: 50,
    height: 50,
  },
});

function getBulbapediaURL(pokemonName: string) {
  return `https://bulbapedia.bulbagarden.net/wiki/${pokemonName}_(Pok%C3%A9mon)`;
}
