import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { PokemonListRow, RootStackParamList } from "types";
import { Screen } from "components/Screen";
import { PokeAPIService } from "services/PokeApiService";
import { useNavigation } from "@react-navigation/native";
import { capitalizeFirstLetter } from "helpers";
import { colors, spacing } from "components/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Pokedex">;

export function PokedexScreen({}: Props) {
  const listRef = useRef<FlatList>(null);
  const [page, setPage] = useState(1);
  const [pokemon, setPokemon] = useState<PokemonListRow[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchPokemon = async (page = 1) => {
    const results = await PokeAPIService.listPokemon(page);
    setPokemon((prev) => prev.concat(results));
  };

  const scrollToTop = () => {
    listRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  const translateY = scrollY.interpolate({
    inputRange: [100, 150, 200],
    outputRange: [-100, -75, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (!pokemon.length) {
      fetchPokemon();
    }
  }, [page]);

  return (
    <Screen loading={!pokemon.length}>
      <Animated.FlatList
        ref={listRef}
        keyExtractor={(item) => item.name}
        data={pokemon}
        renderItem={({ item }) => <PokemonListRow pokemon={item} />}
        ItemSeparatorComponent={Separator}
        onEndReached={() => {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchPokemon(nextPage);

            return nextPage;
          });
        }}
        onEndReachedThreshold={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      ></Animated.FlatList>
      <Animated.View style={[styles.banner, { transform: [{ translateY }] }]}>
        <TouchableOpacity onPress={scrollToTop}>
          <Text style={styles.title}>Scroll to Top</Text>
        </TouchableOpacity>
      </Animated.View>
    </Screen>
  );
}

interface PokemonListRowProps {
  pokemon: PokemonListRow;
}

function PokemonListRow({ pokemon }: PokemonListRowProps) {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate("Pokemon", { name: pokemon.name })}
    >
      <View style={styles.row}>
        <Text style={styles.rowText}>
          {capitalizeFirstLetter(pokemon.name)}
        </Text>
        <Text style={styles.rowText}>{">"}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  banner: {
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.black,
  },
  title: {
    padding: spacing.medium,
    fontSize: spacing.medium,
    fontWeight: "bold",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    padding: spacing.large,
    paddingHorizontal: spacing.large,
    justifyContent: "space-between",
  },
  rowText: {
    fontSize: spacing.medium,
    fontWeight: "bold",
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
