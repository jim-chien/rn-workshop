import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SafeAreaView, Text } from "react-native";

export const Pokemon = ({ route }) => {
  const { name, url } = route.params;

  // const { data, isFetching } = useQuery({
  //   queryKey: ["pokemons-list"],
  //   queryFn: () => axios.get("https://pokeapi.co/api/v2/pokemon"),
  // });

  return (
    <SafeAreaView>
      <Text>{name}</Text>
      <Text>{url}</Text>
    </SafeAreaView>
  );
};
