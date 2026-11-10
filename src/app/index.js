import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import PokemonCard from "../components/PokemonCard";
import Titre from "../components/Titre";
import POKEMONS from "../data/pokemons";

export default function Index() {
  const [feuSeulement, setFeuSeulement] = useState(false);

  const visibles = feuSeulement
    ? POKEMONS.filter((p) => p.type === "Feu")
    : POKEMONS;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Titre texte="Mon Pokédex" />

        <Pressable
          onPress={() => setFeuSeulement(!feuSeulement)}
          style={[styles.filterButton, feuSeulement && styles.filterButtonActive]}
        >
          <Text style={[styles.filterText, feuSeulement && styles.filterTextActive]}>
            {feuSeulement ? "Afficher tous les Pokémon" : "Afficher seulement le type Feu"}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={visibles}
        keyExtractor={(item) => String(item.number)}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <PokemonCard number={item.number} name={item.name} type={item.type} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16, paddingTop: 16, gap: 12
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