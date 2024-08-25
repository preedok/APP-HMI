
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const items = [
  { source: require('../../../assets/quran.png'), text: 'Al-Quran', screen: 'AlQuranScreen' },
  { source: require('../../../assets/sholat.png'), text: 'Jadwal Sholat' },
  { source: require('../../../assets/kiblat.png'), text: 'Arah Kiblat', screen: 'KiblatScreen' },
  { source: require('../../../assets/donasi1.png'), text: 'Donasi' },
  { source: require('../../../assets/database.png'), text: 'Database HMI' },
  { source: require('../../../assets/card.png'), text: 'Kartu Anggota', screen:'CardUser' },
  { source: require('../../../assets/book.png'), text: 'Buku Kader' },
  { source: require('../../../assets/news.png'), text: 'Berita HMI', screen: 'DetailsBerita' },
  { source: require('../../../assets/training.png'), text: 'Info Training', screen: 'MorePopular' },
];
export default function Category() {
  const navigation = useNavigation();
  const handleItemPress = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item.screen)}
            key={index}>
            <View style={styles.iconsContainer}>
              <View style={styles.iconWrapper}>
                <Image source={item.source} style={styles.icon} />
                <Text style={styles.iconText}>{item.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  iconWrapper: {
    width: Dimensions.get('window').width / 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  iconText: {
    fontSize: 10,
    marginTop: 5,
    color: 'black',
  },
});
