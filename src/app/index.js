import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import PokemonCard from "../components/PokemonCard";
import Titre from "../components/Titre";

const POKEMONS = [
  { number: 1, name: "Bulbizarre", type: "Plante" },
  { number: 4, name: "Salamèche", type: "Feu" },
  { number: 7, name: "Carapuce", type: "Eau" },
  { number: 25, name: "Pikachu", type: "Électrik" },
  { number: 37, name: "Goupix", type: "Feu" },
  { number: 43, name: "Mystherbe", type: "Plante" },
];

export default function Index() {
  const [onlyFire, setOnlyFire] = useState(false);

  const displayed = onlyFire
    ? POKEMONS.filter((p) => p.type === "Feu")
    : POKEMONS;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Titre texte="Mon Pokédex" />
      <Text>{displayed.length} Pokémon</Text>

      <Pressable
        onPress={() => setOnlyFire(!onlyFire)}
        style={[styles.filterButton, onlyFire && styles.filterButtonActive]}
      >
        <Text style={[styles.filterText, onlyFire && styles.filterTextActive]}>
          {onlyFire ? "Afficher tous les Pokémon" : "Afficher seulement le type Feu"}
        </Text>
      </Pressable>


      {displayed.map((p) => (
        <PokemonCard
          key={p.number}
          number={p.number}
          name={p.name}
          type={p.type}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 16, gap: 12
  },
  filterButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ECE8DE",
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10
  },
  filterButtonActive: { backgroundColor: "#F08030" },
  filterText: { fontWeight: "bold", color: "#333333" },
  filterTextActive: { color: "#FFFFFF" },
});