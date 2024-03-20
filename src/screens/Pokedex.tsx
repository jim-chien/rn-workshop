import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  Pressable,
} from "react-native";

export const Pokedex = ({ navigation }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["pokemons-list"],
    queryFn: () => axios.get("https://pokeapi.co/api/v2/pokemon"),
  });

  return (
    <SafeAreaView>
      {isFetching ? <Text>Loading...</Text> : null}
      <FlatList
        data={data?.data.results}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Pokemon", {
                name: item.name,
                url: item.url,
              });
            }}
            style={styles.listItem}
          >
            <View style={styles.listItemContent}>
              <Text>{item.name}</Text>
              <Text>{">"}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#bbb",
  },
});
