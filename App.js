import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";

// Importação dos componentes modulares da nossa aplicação
import Header from "./src/components/Header";
import Loading from "./src/components/Loading";
import AnimeCard from "./src/components/AnimeCard";

// Importação do nosso hook customizado que isola a lógica de negócios
import { useAnimes } from "./src/hooks/useAnimes";

export default function App() {
  // Desestruturamos as funções e estados do hook customizado useAnimes
  const { animes, loading, favoritar, verificarFavorito } = useAnimes();

  // Caso o aplicativo esteja buscando os dados, renderiza a tela de carregamento
  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Exibe o cabeçalho estático do aplicativo */}
      <Header />

      {/* Lista otimizada para renderizar os animes vindos da API */}
      <FlatList
        data={animes}
        // Utiliza o mal_id (ID único fornecido pela API Jikan) como chave de cada item
        keyExtractor={(item) => item.mal_id.toString()}
        // Renderiza cada card de anime passando as propriedades necessárias
        renderItem={({ item }) => (
          <AnimeCard
            item={item}
            // Verifica dinamicamente se o anime atual está favoritado
            isFavorite={verificarFavorito(item.mal_id)}
            // Passa a função de alternar favoritos
            onToggleFavorite={favoritar}
          />
        )}
      />
    </SafeAreaView>
  );
}

// Estilo principal para garantir que a tela ocupe todo o espaço e tenha o fundo escuro
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
});