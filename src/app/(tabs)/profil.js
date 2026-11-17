import { View, Text, Image, StyleSheet } from "react-native";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function Profil() {
  return (
    <View style={styles.container}>
      <Text style={styles.prenom}>Tom</Text>
      <Text>Mon Pokémon préféré : Pikachu</Text>
      <Image source={{ uri: `${ARTWORK}25.png` }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 24, gap: 12 },
  prenom: { fontSize: 28, fontWeight: "bold" },
  image: { width: 200, height: 200 },
});
