import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      // Obtener la lista de Pokémon
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
      const results = response.data.results;

      // Obtener detalles de cada Pokémon
      const detailedPokemon = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return pokemonDetails.data;
        })
      );

      setPokemonList(detailedPokemon);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    // Mostrar indicador de carga mientras se obtienen los datos
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff0000" />
        <Text>Cargando Pokémon...</Text>
      </View>
    );
  }

  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.sprites.front_default }} style={styles.pokemonImage} />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pokemonImage: {
    width: 60,
    height: 60,
  },
  pokemonName: {
    fontSize: 20,
    marginLeft: 20,
    textTransform: 'capitalize',
  },
});
