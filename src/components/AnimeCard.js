import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Componente AnimeCard
 * Renderiza o cartão de visualização de cada anime individual na lista.
 * 
 * Props:
 * - item: Objeto contendo as informações completas do anime fornecido pela API.
 * - isFavorite: Boolean indicando se este anime específico está marcado como favorito.
 * - onToggleFavorite: Callback acionada ao tocar no botão de coração (favoritar/desfavoritar).
 */
export default function AnimeCard({ item, isFavorite, onToggleFavorite }) {
  return (
    <View style={styles.card}>
      {/* Imagem do anime */}
      <Image
        source={{ uri: item.images.jpg.image_url }}
        style={styles.imagem}
      />
      
      {/* Container de informações textuais e botão de ação */}
      <View style={styles.info}>
        {/* Título do Anime limitado a 2 linhas para evitar quebra de layout */}
        <Text style={styles.nome} numberOfLines={2}>
          {item.title}
        </Text>
        
        {/* Detalhes específicos com tratamento fallback de valor nulo (?? "N/A") */}
        <Text style={styles.detalhe}>⭐ Nota: {item.score ?? "N/A"}</Text>
        <Text style={styles.detalhe}>🎬 Episódios: {item.episodes ?? "N/A"}</Text>
        <Text style={styles.detalhe}>📅 Ano: {item.year ?? "N/A"}</Text>
        
        {/* Sinopse resumida limitada a 3 linhas */}
        <Text numberOfLines={3} style={styles.sinopse}>
          {item.synopsis}
        </Text>
        
        {/* Botão interativo para favoritar/desfavoritar com feedback tátil suave */}
        <TouchableOpacity
          onPress={() => onToggleFavorite(item)}
          style={styles.botaoFavorito}
          activeOpacity={0.7}
        >
          {/* Ícone dinâmico: coração preenchido ("heart") ou contorno ("heart-outline") */}
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={28}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilo do container do cartão: layout horizontal (row), cor de fundo branca, margens e cantos arredondados.
  // Inclui sombras tanto para iOS (shadow*) quanto para Android (elevation) para dar profundidade de design "premium"
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Imagem do pôster do anime com proporção padrão e cantos levemente arredondados
  imagem: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  // Container de informações que expande para ocupar o espaço horizontal restante (flex: 1)
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between", // Distribui o conteúdo vertical uniformemente
  },
  // Estilo de fonte destacada e escura para o título do anime
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  // Informações menores (nota, episódios, ano) com cor mais suave
  detalhe: {
    fontSize: 13,
    color: "#555",
  },
  // Texto descritivo em cinza claro e tamanho menor para a sinopse
  sinopse: {
    marginTop: 6,
    fontSize: 12,
    color: "#777",
  },
  // Alinha o ícone do coração na extremidade inferior direita do cartão
  botaoFavorito: {
    alignSelf: "flex-end",
    padding: 4,
  },
});
