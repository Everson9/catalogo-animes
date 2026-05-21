import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Hook customizado useAnimes
 * Concentra toda a lógica de estado do aplicativo: busca da API, 
 * controle do estado de carregamento e persistência dos favoritos.
 */
export function useAnimes() {
  // Lista de animes carregada do catálogo (API)
  const [animes, setAnimes] = useState([]);
  
  // Lista de animes marcados como favoritos pelo usuário (lida e salva no AsyncStorage)
  const [favoritos, setFavoritos] = useState([]);
  
  // Estado para controlar a exibição da tela de carregamento (ActivityIndicator)
  const [loading, setLoading] = useState(true);

  /**
   * Busca a lista dos principais animes na API pública do Jikan
   */
  async function buscarAnimes() {
    try {
      // Fazemos a chamada HTTP assíncrona limitando aos top 20 animes
      const resposta = await axios.get("https://api.jikan.moe/v4/top/anime?limit=20");
      // Atualiza o estado com a lista de animes retornada
      setAnimes(resposta.data.data);
    } catch (erro) {
      console.log("Erro ao carregar catálogo da API:", erro);
    } finally {
      // Finaliza o estado de carregamento independente do sucesso ou erro
      setLoading(false);
    }
  }

  /**
   * Carrega a lista de favoritos anteriormente persistida no armazenamento local do dispositivo
   */
  async function carregarFavoritos() {
    try {
      const dados = await AsyncStorage.getItem("favoritos");
      if (dados) {
        // Converte a string JSON de volta para array JavaScript e atualiza o estado
        setFavoritos(JSON.parse(dados));
      }
    } catch (erro) {
      console.log("Erro ao carregar favoritos do AsyncStorage:", erro);
    }
  }

  /**
   * Adiciona ou remove um anime da lista de favoritos do usuário e salva a mudança no AsyncStorage
   * @param {Object} anime - O objeto do anime a ser favoritado/desfavoritado
   */
  async function favoritar(anime) {
    let novaLista = [];
    
    // Verifica se o anime já existe na lista atual de favoritos
    const existe = favoritos.find((item) => item.mal_id === anime.mal_id);

    if (existe) {
      // Se já existe, remove filtrando todos os itens com ID diferente deste
      novaLista = favoritos.filter((item) => item.mal_id !== anime.mal_id);
    } else {
      // Se não existe, adiciona na lista utilizando o operador spread (...)
      novaLista = [...favoritos, anime];
    }

    // Atualiza o estado em memória para renderizar a alteração na UI instantaneamente
    setFavoritos(novaLista);
    
    // Grava permanentemente no AsyncStorage como string JSON
    await AsyncStorage.setItem("favoritos", JSON.stringify(novaLista));
  }

  /**
   * Retorna se um determinado anime (pelo ID) está na lista de favoritos
   * @param {number} id - ID único do anime
   * @returns {boolean} - true se o anime for favorito, false caso contrário
   */
  function verificarFavorito(id) {
    return favoritos.some((item) => item.mal_id === id);
  }

  // Executa uma única vez no carregamento inicial do aplicativo (array de dependências vazio [])
  useEffect(() => {
    buscarAnimes();
    carregarFavoritos();
  }, []);

  // Retorna os dados e as funções que os componentes de interface precisam usar
  return {
    animes,
    loading,
    favoritos,
    favoritar,
    verificarFavorito,
  };
}
