import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GlobalContext } from './GlobalContext';

const MarsTab = () => {
  const [data, setData] = useState(null);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${globalVariable}`
    )
      .then((response) => response.json())
      .then((json) => setData(json.photos[0]))
      .catch((error) => console.error(error));
  }, []);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: data.img_src }} />
      <Text style={styles.title}>{data.camera.full_name}</Text>
      <Text style={styles.description}>{data.camera.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

export default MarsTab;
