
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-animatable';
import moment from 'moment-timezone';

const MySearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const onChangeSearch = query => setSearchQuery(query);

  const onSubmitSearch = () => {
    navigation.navigate('SearchPages', { searchQuery });
  };

  const [currentTime, setCurrentTime] = useState(moment().tz('Asia/Jakarta'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().tz('Asia/Jakarta'));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means useEffect runs once after initial render

  return (
    <View>
      <StatusBar backgroundColor="#ecf5f6" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../../assets/hmi.png')}
              style={{ width: 16, height: 40, marginRight: 8, marginBottom: 5 }}
            />
            <View>
              <Text style={{ fontSize: 15, fontWeight: 600 }}>Himpunan Mahasiswa Islam</Text>
              <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 10, fontStyle: 'italic' }}>Islamic Student Association</Text>
            </View>
            <View style={styles.container1}>
              <Text style={{ fontSize: 12, fontWeight: 900 }}>{currentTime.format('HH:mm:ss')} WIB</Text>
              <Text style={{ fontSize: 11, fontWeight: 900, marginBottom: 5, fontStyle: 'italic' }}>Jakarta, Indonesia</Text>
            </View>
          </View>
          <Searchbar
            placeholder="Pencarian..."
            placeholderTextColor={'white'}
            value={searchQuery}
            style={styles.searchbar}
            iconColor={'white'}
            inputStyle={styles.input}
            onChangeText={onChangeSearch}
            onSubmitEditing={onSubmitSearch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 15,
    marginTop: StatusBar.currentHeight,
    elevation: 3,
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 50,
    borderRadius: 10,
    elevation: 3,
    padding: 4
  },
  searchBarContainer: {
    margin: 10,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
  },
  searchbar: {
    borderRadius: 10,
    backgroundColor: '#c7f8d9',
    marginBottom: 10
  },
  input: {
    color: 'white',
  },
});

export default MySearchBar;
