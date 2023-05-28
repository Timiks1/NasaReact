import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GlobalContext } from './GlobalContext';

const EarthTab = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  useEffect(() => {
    fetchEarthData();
  }, []);

  const fetchEarthData = async () => {
    const apiKey = globalVariable;
    const response = await fetch(
      `https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2020-06-11&&dim=0.10&api_key=${apiKey}`
    );
    const data = await response.json();
    setImageUrl(data.url);
    setDate(data.date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Earth Image</Text>
      {imageUrl ? (
        <Image style={styles.image} source={{ uri: imageUrl }} />
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
      <Text style={styles.date}>Date: {date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  loading: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
  },
});

export default EarthTab;
