import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Componente Header (Cabeçalho)
 * Exibe o título do aplicativo e a legenda de fonte dos dados.
 * Componente puramente funcional e estático.
 */
export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.titulo}>Catálogo Anime</Text>
      <Text style={styles.subtitulo}>API pública Jikan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Espaçamento interno do cabeçalho
  header: {
    padding: 20,
  },
  // Estilo do título principal, com fonte grande e negrito
  titulo: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  // Subtítulo em cinza claro para criar uma boa hierarquia visual
  subtitulo: {
    color: "#aaa",
  },
});
