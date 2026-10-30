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
  const [pokeballs, setPokeballs] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Titre texte="Mon Pokédex" />
      <Text>{POKEMONS.length} Pokémon</Text>

      <Text>Poké Balls : {pokeballs}</Text>

      <Pressable onPress={() => {
        if (pokeballs < 10) {
          setPokeballs(pokeballs + 1)
        }
      }}>
        <Text>+</Text>
      </Pressable>

      <Pressable onPress={() => {
        if (pokeballs > 0) {
          setPokeballs(pokeballs - 1)
        }
      }}>
        <Text>-</Text>
      </Pressable>

      <Pressable onPress={() => setPokeballs(0)}>
        <Text>Vider le sac</Text>
      </Pressable>

      {POKEMONS.map((p) => (
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
    padding: 16,
    gap: 12,
  },
});