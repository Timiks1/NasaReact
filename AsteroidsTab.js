import React, { useState, useEffect,useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { GlobalContext } from './GlobalContext';

const AsteroidsTab = () => {
  const [asteroids, setAsteroids] = useState([]);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  useEffect(() => {
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-05-15&end_date=2023-05-15&api_key=${globalVariable}`)
      .then((response) => response.json())
      .then((data) => {
        const todayAsteroids = data.near_earth_objects['2023-05-15'];
        setAsteroids(todayAsteroids);
      })
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>Estimated diameter (m): {item.estimated_diameter.meters.estimated_diameter_max}</Text>
        <Text style={styles.subtitle}>Close approach date: {item.close_approach_data[0].close_approach_date_full}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Asteroids</Text>
      <FlatList
        data={asteroids}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120f2c', // Темно-синий цвет заднего фона
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ffffff', // Белый цвет текста
  },
  item: {
    backgroundColor: '#1d1b3a', // Глубокий фиолетовый цвет
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff', // Белый цвет текста
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#ffffff', // Белый цвет текста
  },
});


export default AsteroidsTab;
