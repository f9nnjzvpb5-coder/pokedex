import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ARTWORK =
    "https://raw.githubusercontent.com/PokeAPI/sprites" +
    "/master/sprites/pokemon/other/official-artwork/";

const TYPE_COLORS = {
    Plante: "#78C850",
    Feu: "#F08030",
    Eau: "#6890F0",
    Électrik: "#F8D030",
};

export default function PokemonCard({ number, name, type, captured, onToggle, onOpen }) {
    const color = TYPE_COLORS[type] || "#D9D4C7";
    return (
        <Pressable
            onPress={onOpen}
            style={[
                styles.card,
                { backgroundColor: color },
                captured && styles.cardCaptured,
            ]}
        >
            <Image source={{ uri: `${ARTWORK}${number}.png` }} style={styles.image} />
            <View>
                <Text style={styles.number}>#{number}</Text>
                <Text style={styles.name}>{name}</Text>
                {type && <Text style={styles.type}>{type}</Text>}
            </View>
            <Pressable
                onPress={onToggle}
                style={[styles.button, captured && styles.buttonCaptured]}
            >
                <Text style={[styles.buttonText, captured && styles.buttonTextCaptured]}>
                    {captured ? "Capturé ✓" : "Capturer"}
                </Text>
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row", alignItems: "center", gap: 12,
        padding: 12, borderRadius: 14,
        borderWidth: 3, borderColor: "transparent",
    },
    cardCaptured: { borderColor: "#2563EB" },
    image: { width: 80, height: 80 },
    number: { color: "#888888" },
    name: { fontSize: 18, fontWeight: "bold" },
    type: {
        alignSelf: "flex-start", backgroundColor: "#ECE8DE",
        paddingHorizontal: 10, borderRadius: 10, overflow: "hidden"
    },
    button: {
        backgroundColor: "#ECE8DE",
        paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10
    },
    buttonCaptured: { backgroundColor: "#2563EB" },
    buttonText: { fontWeight: "bold", color: "#333333" },
    buttonTextCaptured: { color: "#FFFFFF" },
});