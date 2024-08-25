
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Button, Modal, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const items = [
  { source: require('../../../assets/quran.png'), text: 'Al-Quran' },
  { source: require('../../../assets/kiblat.png'), text: 'Kiblat' },
  { source: require('../../../assets/donasi1.png'), text: 'Donasi' },
  { source: require('../../../assets/database.png'), text: 'Database' },
  { source: require('../../../assets/book.png'), text: 'Buku' },
];

const MyPopular = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text variant="titleMedium" style={styles.title}>
          Menu
        </Text>
      </View>
      <View style={styles.iconsContainer}>
        {items.slice(0, 5).map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryRecipes', {category: item.text})
            }
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
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
          <Button mode="contained" textColor={'white'} style={styles.button}>
            <Text style={styles.btnText}>Semua Menu</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
  },
  ModalStyle: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
  },
  titleWrapper: {
    borderBottomWidth: 3,
    borderBottomColor: '#c7f8d9',
    paddingBottom: 5,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginTop: 10,
    marginBottom: 10,
    padding: 6,
  },
  btnText: {
    color: 'white',
  },
  icon: {
    width: 65,
    height: 60,
    borderRadius: 10,
    // backgroundColor: '#c7f8d9',
  },
  iconText: {
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: '#78ce7f',
    justifyContent: 'center',
  },
  iconsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default MyPopular;
