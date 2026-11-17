import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import PokemonCard from "../../components/PokemonCard";
import Titre from "../../components/Titre";

const API = "https://pokeapi.co/api/v2/pokemon?limit=151";

export default function Index() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState(null);
  const [captured, setCaptured] = useState([]);
  const [capturesSeulement, setCapturesSeulement] = useState(false);
  const [search, setSearch] = useState("");

  async function charger() {
    const reponse = await fetch(API);
    const data = await reponse.json();
    const liste = data.results.map((p, i) => ({
      number: i + 1,
      name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
    }));
    setPokemons(liste);
  }

  useEffect(() => {
    charger();
  }, []);

  if (pokemons === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  function capturer(number) {
    if (captured.includes(number)) {
      setCaptured(captured.filter((n) => n !== number));
    } else {
      setCaptured([...captured, number]);
    }
  }

  const visibles = pokemons
    .filter((p) => !capturesSeulement || captured.includes(p.number))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const messageVide =
    capturesSeulement && search === ""
      ? "Vous n'avez encore rien capturé"
      : "Aucun Pokémon trouvé";

  const header = (
    <View style={styles.header}>
      <Titre texte="Mon Pokédex" />
      <Text>{captured.length} capturés</Text>

      <TextInput
        style={styles.input}
        placeholder="Rechercher un Pokémon"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.row}>
        <Pressable
          onPress={() => setCapturesSeulement(!capturesSeulement)}
          style={[
            styles.filterButton,
            capturesSeulement && styles.filterButtonActive,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              capturesSeulement && styles.filterTextActive,
            ]}
          >
            {capturesSeulement ? "Tout afficher" : "Mes captures"}
          </Text>
        </Pressable>

        <Pressable onPress={() => setCaptured([])} style={styles.filterButton}>
          <Text style={styles.filterText}>Tout relâcher</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      data={visibles}
      extraData={captured}
      keyExtractor={(item) => String(item.number)}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={header}
      ListEmptyComponent={<Text>{messageVide}</Text>}
      renderItem={({ item }) => (
        <PokemonCard
          number={item.number}
          name={item.name}
          captured={captured.includes(item.number)}
          onToggle={() => capturer(item.number)}
          onOpen={() => router.push(`/pokemon/${item.number}`)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { gap: 12 },
  row: { flexDirection: "row", gap: 12 },
  input: { borderWidth: 1, borderRadius: 10, padding: 10 },
  filterButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ECE8DE",
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10,
  },
  filterButtonActive: { backgroundColor: "#2563EB" },
  filterText: { fontWeight: "bold", color: "#333333" },
  filterTextActive: { color: "#FFFFFF" },
});