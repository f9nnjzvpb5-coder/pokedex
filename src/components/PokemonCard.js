import { useState } from "react";
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
    
export default function PokemonCard({ number, name, type }) {
    const color = TYPE_COLORS[type];
    const [captured, setCaptured] = useState(false);
    return (
        <View style={[styles.card, { backgroundColor: color }]}>
            <Image source={{ uri: `${ARTWORK}${number}.png` }} style={styles.image} />
            <View>
                <Text style={styles.number}>#{number}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.type}>{type}</Text>
            </View>
            <Pressable
                onPress={() => setCaptured(!captured)}
                style={[styles.button, captured && styles.buttonCaptured]}
            >
                <Text style={[styles.buttonText, captured && styles.buttonTextCaptured]}>
                    {captured ? "Captured" : "Capture"}
                </Text>
            </Pressable>
        </View>
    );

}


const styles = StyleSheet.create({
    card: {
        flexDirection: "row", alignItems: "center", gap: 12,
        padding: 12, borderRadius: 14
    },
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
