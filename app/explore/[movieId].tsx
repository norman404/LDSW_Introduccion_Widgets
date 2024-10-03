import { Stack, Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = ''

// Crear una instancia de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export default function MovieDetailScreen() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useLocalSearchParams();
  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      let { data: movies, error } = await supabase.from('movies').select('*').eq('id', movieId);
      if (error) {
        throw error;
      }
      console.log('movies:', movies);
      setMovie(movies[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos de Supabase:', error);
    }
  }
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff0000" />
        <Text>Cargando película...</Text>
      </View>
    );
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Detalles de la película' }} />
      <Link href="/" style={styles.link}>
          <ThemedText type="link">Regresar</ThemedText>
      </Link>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: movie.image_url }} style={styles.movieImage} />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.label}>
          Año: <Text style={styles.value}>{movie.year}</Text>
        </Text>
        <Text style={styles.label}>
          Director: <Text style={styles.value}>{movie.director}</Text>
        </Text>
        <Text style={styles.label}>
          Género: <Text style={styles.value}>{movie.genre}</Text>
        </Text>
        <Text style={styles.label}>Sinopsis:</Text>
        <Text style={styles.synopsis}>{movie.synopsis}</Text>
      </ScrollView>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  movieImage: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  value: {
    fontWeight: 'normal',
  },
  synopsis: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'justify',
  },
});
