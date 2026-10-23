import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
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
  const [count, setCount] = useState(0);
  return (

    <ScrollView contentContainerStyle={styles.scrollView}>
      <Titre texte="Mon Pokédex" />
      <Text>{POKEMONS.length} Pokémon</Text>
      <Pressable onPress={()=>setCount(count +1)}>
        <Text>+1</Text>
      </Pressable>
      <Pressable onPress={()=>setCount(count - 1)}>
        <Text>-1</Text>
      </Pressable>

      <Pressable onPress={()=>setCount(0)}>
        <Text>reset</Text>
      </Pressable>

      <Text>{count}</Text>
      
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
    padding: 16, gap: 12
  }
})
