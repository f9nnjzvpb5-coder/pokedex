import { Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import POKEMONS from "../../data/pokemons";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function FichePokemon() {
  const { number } = useLocalSearchParams();
  const pokemon = POKEMONS.find((p) => p.number === Number(number));

  // pokemons.js ne contient que les 100 premiers : on évite le plantage
  const nom = pokemon ? pokemon.name : `Pokémon #${number}`;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: nom }} />
      <Image source={{ uri: `${ARTWORK}${number}.png` }} style={styles.image} />
      <Text style={styles.number}>#{number}</Text>
      <Text style={styles.name}>{nom}</Text>
      {pokemon && <Text style={styles.type}>{pokemon.type}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 24, gap: 8 },
  image: { width: 260, height: 260 },
  number: { color: "#888888", fontSize: 16 },
  name: { fontSize: 28, fontWeight: "bold" },
  type: {
    backgroundColor: "#ECE8DE",
    paddingHorizontal: 14, paddingVertical: 4, borderRadius: 10,
    overflow: "hidden", fontSize: 16,
  },
});