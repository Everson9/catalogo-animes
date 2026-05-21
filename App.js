import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

export default function App() {

  const [animes, setAnimes] = useState([]);

  const [favoritos, setFavoritos] = useState([]);

  const [loading, setLoading] = useState(true);

  async function buscarAnimes() {

    try {

      const resposta = await axios.get(
        "https://api.jikan.moe/v4/top/anime?limit=20"
      );

      setAnimes(resposta.data.data);

    }

    catch (erro) {

      console.log(erro);

    }

    finally {

      setLoading(false);

    }

  }

  async function carregarFavoritos() {

    try {

      const dados =
        await AsyncStorage.getItem(
          "favoritos"
        );

      if (dados) {

        setFavoritos(
          JSON.parse(dados)
        );

      }

    }

    catch (erro) {

      console.log(erro);

    }

  }

  async function favoritar(anime) {

    let novaLista = [];

    const existe =
      favoritos.find(
        item =>
          item.mal_id === anime.mal_id
      );

    if (existe) {

      novaLista =
        favoritos.filter(
          item =>
            item.mal_id !== anime.mal_id
        );

    }

    else {

      novaLista = [
        ...favoritos,
        anime
      ];

    }

    setFavoritos(
      novaLista
    );

    await AsyncStorage.setItem(
      "favoritos",
      JSON.stringify(
        novaLista
      )
    );

  }

  function verificarFavorito(id) {

    return favoritos.some(
      item =>
        item.mal_id === id
    );

  }

  useEffect(() => {

    buscarAnimes();

    carregarFavoritos();

  }, []);

  if (loading) {

    return (

      <View style={styles.loading}>

        <ActivityIndicator
          size="large"
          color="red"
        />

        <Text>
          Carregando catálogo...
        </Text>

      </View>

    );

  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      <View style={styles.header}>

        <Text style={styles.titulo}>
          Catálogo Anime
        </Text>

        <Text style={styles.subtitulo}>
          API pública Jikan
        </Text>

      </View>

      <FlatList

        data={animes}

        keyExtractor={item =>
          item.mal_id.toString()
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Image

              source={{
                uri:
                  item.images.jpg.image_url
              }}

              style={styles.imagem}

            />

            <View style={styles.info}>

              <Text
                style={styles.nome}
              >

                {item.title}

              </Text>

              <Text>

                ⭐ Nota:
                {" "}
                {item.score}

              </Text>

              <Text>

                🎬 Episódios:
                {" "}
                {item.episodes}

              </Text>

              <Text>

                📅 Ano:
                {" "}
                {item.year}

              </Text>

              <Text

                numberOfLines={3}

                style={styles.sinopse}

              >

                {item.synopsis}

              </Text>

              <TouchableOpacity

                onPress={() =>
                  favoritar(item)
                }

              >

                <Ionicons

                  name={
                    verificarFavorito(
                      item.mal_id
                    )

                      ?

                      "heart"

                      :

                      "heart-outline"
                  }

                  size={28}

                  color="red"

                />

              </TouchableOpacity>

            </View>

          </View>

        )}

      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor:
      "#111"

  },

  header: {

    padding: 20

  },

  titulo: {

    color:
      "white",

    fontSize: 28,

    fontWeight:
      "bold"

  },

  subtitulo: {

    color:
      "#aaa"

  },

  card: {

    flexDirection:
      "row",

    backgroundColor:
      "white",

    margin: 10,

    padding: 10,

    borderRadius: 12

  },

  imagem: {

    width: 100,

    height: 150,

    borderRadius: 10

  },

  info: {

    flex: 1,

    marginLeft: 10

  },

  nome: {

    fontSize: 18,

    fontWeight:
      "bold",

    marginBottom: 5

  },

  sinopse: {

    marginTop: 8

  },

  loading: {

    flex: 1,

    justifyContent:
      "center",

    alignItems:
      "center"

  }

});