import { StyleSheet, Text } from "react-native";

export default function Titre({ texte }) {
    return(
        <Text style={styles.title}>{ texte }</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 16
    }
});