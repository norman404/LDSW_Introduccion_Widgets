// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = ''
const SUPABASE_ANON_KEY = ''

// Crear una instancia de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function HomeScreen() {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // Obtener la lista de películas desde Supabase
      let { data: movies, error } = await supabase
        .from('movies')
        .select('*');

        console.log(movies, error);

      if (error) {
        throw error;
      }

      setMoviesList(movies);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos de Supabase:', error);
    }
  };

  if (loading) {
    // Mostrar indicador de carga mientras se obtienen los datos
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff0000" />
        <Text>Cargando películas...</Text>
      </View>
    );
  }

  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.movieName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Películas</Text>
      <FlatList
        data={moviesList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movieName: {
    fontSize: 20,
  },
});
