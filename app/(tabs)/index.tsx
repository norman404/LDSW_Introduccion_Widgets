// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = ''

// Crear una instancia de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function HomeScreen({ }) {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // Obtener la lista de películas desde Supabase
      let { data: movies, error } = await supabase.from('movies').select('*');

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
    <TouchableOpacity onPress={() => navigation.navigate(`explore/${item.id}`, { movie: item })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image_url }} style={styles.movieImage} />
        <Text style={styles.movieName}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={moviesList}
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
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  movieImage: {
    width: 60,
    height: 90,
    marginRight: 10,
  },
  movieName: {
    fontSize: 20,
  },
});
