import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

/**
 * Componente Loading (Tela de Carregamento)
 * Renderizado centralizado na tela enquanto a busca de animes está ativa.
 */
export default function Loading() {
  return (
    <View style={styles.loading}>
      {/* ActivityIndicator nativo do React Native para animação de loading */}
      <ActivityIndicator size="large" color="red" />
      <Text style={styles.texto}>Carregando catálogo...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Garante que o loading ocupe a tela inteira e centralize os itens horizontal e verticalmente
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111", // Ajustado para tema escuro, mantendo coerência com o fundo do app
  },
  // Texto descritivo com margem no topo para desgrudar do indicador e cor branca para leitura
  texto: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
});
