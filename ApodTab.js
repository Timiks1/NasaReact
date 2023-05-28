import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { myGlobalVariable } from './Authorize';
import { GlobalContext } from './GlobalContext';

const ApodTab = () => {
  const [apodData, setApodData] = useState(null);
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${globalVariable}`)
      .then(response => response.json())
      .then(data => setApodData(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      {apodData ? (
        <>
          <Image style={styles.image} source={{ uri: apodData.url }} />
          <Text style={styles.title}>{apodData.title}</Text>
          <Text style={styles.date}>{apodData.date}</Text>
          <Text style={styles.description}>{apodData.explanation}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
    marginHorizontal: 10,
  },
});

export default ApodTab;
