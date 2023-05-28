import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import ApodTab from './ApodTab';
import AsteroidsTab from './AsteroidsTab';
import EarthTab from './EarthTab';
import MarsTab from './MarsTab';
import EpicTab from './EpicTab';
import Authorize from './Authorize';
import { GlobalProvider } from './GlobalContext';
import { GlobalContext } from './GlobalContext';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAuthorizeSubmitted, setIsAuthorizeSubmitted] = useState(false);
  
  const handleAuthorizeSubmitted = (success) => {
    setIsAuthorizeSubmitted(success);
  };

  const tabs = [
    {content: <Authorize onSubmitted={handleAuthorizeSubmitted} />},
    { title: 'APOD', content: <ApodTab />, disabled: !isAuthorizeSubmitted },
    { title: 'Asteroids', content: <AsteroidsTab />, disabled: !isAuthorizeSubmitted },
    { title: 'Earth', content: <EarthTab />, disabled: !isAuthorizeSubmitted },
    { title: 'Mars', content: <MarsTab />, disabled: !isAuthorizeSubmitted },
    { title: 'EPIC', content: <EpicTab />, disabled: !isAuthorizeSubmitted }
  ];

  return (
    <GlobalProvider>
      <View style={styles.container}>
        <View style={styles.tabs}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                activeTab === index ? styles.activeTab : null,
                tab.disabled ? styles.disabledTab : null
              ]}
              onPress={() => setActiveTab(index)}
              disabled={tab.disabled}
            >
              {index === 0 ? (
                <View style={styles.profileIconContainer}>
                  <Image
                    source={{uri: 'https://thumbs.dreamstime.com/b/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82%D0%B0-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80-%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%B9-196482136.jpg'}} // Replace with the actual path to the profile photo
                    style={styles.profileIcon}
                  />
                </View>
              ) : null}
              <Text style={styles.tabTitle}>{tab.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.content}>{tabs[activeTab].content}</View>
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000'
  },
  disabledTab: {
    opacity: 0.5
  },
  tabTitle: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  content: {
    flex: 1
  },
  profileIconContainer: {
    width: 30,
    height: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
