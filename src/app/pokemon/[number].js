import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

const TYPES_FR = {
  normal: "Normal", fire: "Feu", water: "Eau", electric: "Électrik",
  grass: "Plante", ice: "Glace", fighting: "Combat", poison: "Poison",
  ground: "Sol", flying: "Vol", psychic: "Psy", bug: "Insecte",
  rock: "Roche", ghost: "Spectre", dragon: "Dragon", dark: "Ténèbres",
  steel: "Acier", fairy: "Fée",
};

function majuscule(texte) {
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

export default function FichePokemon() {
  const { number } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);
  const [nomFr, setNomFr] = useState(null);

  async function charger() {
    const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const data = await reponse.json();
    setPokemon(data);

    // Bonus : le nom en français
    const reponseFr = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${number}`
    );
    const dataFr = await reponseFr.json();
    const nom = dataFr.names.find((n) => n.language.name === "fr");
    if (nom) {
      setNomFr(nom.name);
    }
  }

  useEffect(() => {
    charger();
  }, [number]);

  if (pokemon === null) {
    return (
      <View style={styles.loading}>
        <Stack.Screen options={{ title: "Chargement..." }} />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const nom = nomFr || majuscule(pokemon.name);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: nom }} />
      <Image source={{ uri: `${ARTWORK}${number}.png` }} style={styles.image} />
      <Text style={styles.number}>#{number}</Text>
      <Text style={styles.name}>{nom}</Text>
      <Text style={styles.type}>{TYPES_FR[pokemon.types[0].type.name] || majuscule(pokemon.types[0].type.name)}</Text>
      <Text style={styles.info}>Taille : {pokemon.height / 10} m</Text>
      <Text style={styles.info}>Poids : {pokemon.weight / 10} kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, alignItems: "center", padding: 24, gap: 8 },
  image: { width: 260, height: 260 },
  number: { color: "#888888", fontSize: 16 },
  name: { fontSize: 28, fontWeight: "bold" },
  type: {
    backgroundColor: "#ECE8DE",
    paddingHorizontal: 14, paddingVertical: 4, borderRadius: 10,
    overflow: "hidden", fontSize: 16,
  },
  info: { fontSize: 16 },
});
