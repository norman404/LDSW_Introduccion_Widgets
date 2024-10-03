// AdminScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

// Crear una instancia de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function AdminScreen() {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
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

  const addMovie = async () => {
    console.log('Agregando película...');
    if (!title || !year || !director || !genre || !synopsis || !imageUrl) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const { data, error } = await supabase.from('movies').insert([
        {
          title,
          year,
          director,
          genre,
          synopsis,
          image_url: imageUrl,
        },
      ]);
      console.log('data:', data);
      if (error) {
        throw error;
      }

      // Limpiar el formulario
      setTitle('');
      setYear('');
      setDirector('');
      setGenre('');
      setSynopsis('');
      setImageUrl('');

      // Actualizar la lista de películas
      fetchMovies();
    } catch (error) {
      console.error('Error al agregar la película:', error);
      Alert.alert('Error', 'No se pudo agregar la película');
    }
  };

  const deleteMovie = async (id) => {
    try {
      const { data, error } = await supabase.from('movies').delete().eq('id', id);

      if (error) {
        throw error;
      }

      // Actualizar la lista de películas
      fetchMovies();
    } catch (error) {
      console.error('Error al eliminar la película:', error);
      Alert.alert('Error', 'No se pudo eliminar la película');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Cargando películas...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteMovie(item.id)}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nueva Película</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Director"
        value={director}
        onChangeText={setDirector}
      />
      <TextInput
        style={styles.input}
        placeholder="Género"
        value={genre}
        onChangeText={setGenre}
      />
      <TextInput
        style={styles.input}
        placeholder="Sinopsis"
        value={synopsis}
        onChangeText={setSynopsis}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la Imagen"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Button title="Agregar Película" onPress={addMovie} />
      <Text style={styles.title}>Películas en el Catálogo</Text>
      <FlatList
        data={moviesList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movieTitle: {
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});
