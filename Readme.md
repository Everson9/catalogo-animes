# 📱 Catálogo de Animes - React Native + Expo

Aplicativo mobile desenvolvido em **React Native utilizando Expo**, com consumo de dados de uma API pública de animes.

O projeto realiza requisições para a API **Jikan (MyAnimeList)** e exibe um catálogo de animes contendo imagem, nota, episódios, ano de lançamento e sinopse.

---

## 🚀 Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- Axios
- AsyncStorage
- Expo Vector Icons
- React Navigation
- Jikan API

---

## 📦 Dependências utilizadas

### Consumo de API

```bash
npm install axios
```

Responsável por realizar as requisições HTTP para a API.

---

### Ícones

```bash
npm install @expo/vector-icons
```

Utilizado para exibir ícones no aplicativo.

Exemplo:

- Favoritos
- Corações
- Navegação

---

### Navegação

```bash
npm install @react-navigation/native

npm install @react-navigation/native-stack
```

Responsável pela navegação entre telas.

---

### Dependências auxiliares do Expo

```bash
npx expo install react-native-screens

npx expo install react-native-safe-area-context

npx expo install react-native-gesture-handler

npx expo install react-native-reanimated
```

Funções:

- Melhor desempenho de telas
- Compatibilidade com notch
- Gestos
- Animações

---

### Armazenamento local

```bash
npx expo install @react-native-async-storage/async-storage
```

Utilizado para armazenar:

- Favoritos
- Cache
- Configurações locais

---

## 🌐 API utilizada

Jikan API

Endpoint utilizado:

```text
https://api.jikan.moe/v4/top/anime?limit=20
```

Documentação:

https://jikan.moe/

---

## ▶ Como executar o projeto

### Instalar dependências

```bash
npm install
```

---

### Iniciar aplicação

```bash
npx expo start
```

ou

```bash
npx expo start -c
```

---

### Executar no celular

1. Instalar o aplicativo **Expo Go**
2. Abrir o Expo Go
3. Escanear o QR Code exibido no terminal

---

## 📱 Funcionalidades

✅ Consumo de API pública

✅ Exibição de catálogo de animes

✅ Imagens dos animes

✅ Nota do anime

✅ Quantidade de episódios

✅ Ano de lançamento

✅ Sinopse resumida

✅ Sistema de favoritos

✅ Armazenamento local utilizando AsyncStorage

---

## 📂 Estrutura do projeto

```text
catalogo-animes

│── assets
│
│── node_modules
│
│── App.js
│
│── package.json
│
└── README.md
```

---

## 👨‍💻 Autor

Projeto desenvolvido para atividade prática de consumo de API utilizando React Native e Expo.

Aluno: Everson josé