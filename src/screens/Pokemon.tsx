import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Pokeball from '../../assets/pokeball.png';
import { colors, fontSize } from '../../theme';

export const Pokemon = ({ route, navigation }) => {
  const { name, url } = route.params;
  const { data: pokemon, isFetching } = useQuery({
    queryKey: ["pokemons-list"],
    queryFn: () => axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
  });

  if (isFetching) return <Text>Loading...</Text>;
  if (!pokemon?.data) return <Text>Error</Text>;
  return (
    <SafeAreaView>
      <View style={styles.pageContainer}>
        <Pressable
          onPress={() => {}}
          style={styles.pokeballButton}
        >
          <Image source={Pokeball} style={styles.pokeballImage}/>
        </Pressable>
        <Image source={{uri: pokemon.data.sprites.other['official-artwork'].front_default}} style={styles.pokemonImage}/>
        <Text style={styles.pokemonName}>{name}{`(#${pokemon.data.id})`}</Text>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('WebViewContainer')
            }}
            style={styles.pokeballButton}
          >
            <Text>Click here</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeballButton: {
    width: 40,
    height: 40
  },
  pokeballImage: {
    width: '100%',
    height: '100%'
  },
  pokemonImage: {
    width: 200,
    height: 200
  },
  pokemonName: {
    fontSize: fontSize.large,
    color: colors.black,
    textTransform: 'capitalize',
  }
});