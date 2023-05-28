import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Button, TextInput} from 'react-native';
import WebView from 'react-native-webview';
import { GlobalContext } from './GlobalContext';

const Authorize = ({ onSubmitted }) => {
  const [inputValue, setInputValue] = useState('');
   const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  const handleInputChange = (text) => {
    setInputValue(text);
    setGlobalVariable(text);
  };

  const handleSubmit = () => {
    // Здесь можно обработать отправку информации
    // Например, можно вызвать API или выполнить другую логику
  
    if(inputValue!='')
    {
      onSubmitted(true);
    }
    // Очищаем поле ввода после отправки
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Введите информацию:"
        style={styles.textinput}
        placeholderTextColor="black"
      />
      <Button title="Отправить" onPress={handleSubmit} />
      <WebView
      style={styles.Authorize}
        source={{
          uri: 'https://api.nasa.gov/',
        }}
      />
            {/* <WebView
      style={styles.Google}
        source={{
          uri: 'https://www.google.com/',
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Authorize: {
    backgroundColor: '#120f2c', // Темно-синий цвет
    width: 430,
  },
  Google: {
    backgroundColor: '#120f2c', // Темно-синий цвет
    width: 430,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Белый цвет текста
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#ffffff', // Белый цвет текста
  },
  loading: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#ffffff', // Белый цвет текста
  },
  textinput: {
    backgroundColor: '#120f2c', // Темно-синий цвет
    width: '100%',
    textAlign: 'center',
    height: 70,
    color: '#ffffff', // Белый цвет текста
    placeholderTextColor: '#999999', // Цвет placeholder
  },
});

export default Authorize;
