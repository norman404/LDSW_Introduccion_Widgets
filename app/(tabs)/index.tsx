import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Hola, este es un texto!</Text>

      <View style={styles.row}>
        <Text style={styles.box}>Elemento 1</Text>
        <Text style={styles.box}>Elemento 2</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.box}>Elemento A</Text>
        <Text style={styles.box}>Elemento B</Text>
      </View>

      <View style={styles.stackContainer}>
        <View style={styles.stackBoxRed} />
        <View style={styles.stackBoxBlue} />
      </View>

      <View style={styles.containerBox}>
        <Text>Contenido dentro de un contenedor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  column: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#ccc',
    padding: 10,
    margin: 5,
  },
  stackContainer: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  stackBoxRed: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    position: 'absolute',
  },
  stackBoxBlue: {
    backgroundColor: 'blue',
    width: 80,
    height: 80,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  containerBox: {
    padding: 20,
    backgroundColor: '#e0e0e0',
  },
});
