import { useQuery } from "@tanstack/react-query";
import { SafeAreaView, Text } from "react-native";

export const Pokedex = () => {
  // const { data, isFetching } = useQuery({queryKey: 'pokemons-list', queryFn: () => });

  return (
    <SafeAreaView>
      <Text>Pokedex screen</Text>
    </SafeAreaView>
  );
};
