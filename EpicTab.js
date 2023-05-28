import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GlobalContext } from './GlobalContext';

const EpicTab = () => {
  const [imageData, setImageData] = useState(null);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  const [day, SetDay] = useState([]);
  
  useEffect(() => {
    fetchEpicImage();
  }, []);

  const fetchEpicImage = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/images?api_key=${globalVariable}`
      );
      const data = await response.json();
      setImageData(data[0]);
      
    } catch (error) {
      console.log(error);
    }
    ParseDate();
  };
  // https://epic.gsfc.nasa.gov/archive/natural/2015/10/31/png/epic_1b_20151031074844.png
  function ParseDate(){
    let year = imageData.Date.split('-')[0];
    let month = imageData.Date.split('-')[1];
    let day = imageData.Date.split('-')[2];
    SetDay(year)[0];
    SetDay(month)[1];
    SetDay(day)[2];

  };
  return (
    <View style={styles.container}>
      {imageData && (
        <Image
          style={styles.image}
          source={{
            uri: `https://epic.gsfc.nasa.gov/archive/natural/2023/05/26/png/${imageData.image}.png`,
          }}
        />
      )}
      <Text style={styles.title}>Latest EPIC Image</Text>
      <Text style={styles.date}>
        {imageData && new Date(imageData.date).toLocaleDateString()}
      </Text>
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
    marginTop: 20,
  },
  date: {
    fontSize: 16,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});

export default EpicTab;
