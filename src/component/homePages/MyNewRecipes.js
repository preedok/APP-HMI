
import React, { useEffect, useState } from 'react';
import { Text, Button, Portal, BottomSheet } from 'react-native-paper';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import Modal from 'react-native-modal';
import Category from '../homePages/category/Category'
import Icon from 'react-native-vector-icons/Ionicons';
const items = [
  { source: require('../../assets/quran.png'), text: 'Al-Quran', screen: 'AlQuranScreen' },
  { source: require('../../assets/kiblat.png'), text: 'Kiblat', screen: 'KiblatScreen' },
  { source: require('../../assets/donasi1.png'), text: 'Donasi', screen: 'DonasiScreen' },
  { source: require('../../assets/database.png'), text: 'Database', screen: 'DatabaseScreen' },
  { source: require('../../assets/book.png'), text: 'Buku', screen: 'BukuScreen' },
];
const MyNewRecipes = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();
  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const handleItemPress = (screen) => {
    navigation.navigate(screen);
  };
  useEffect(() => {
    if (isFocused) {
      axios
        .get(`https://odd-plum-cougar-cuff.cyclic.app/recipes?sortType=desc`)
        .then(response => {
          const jsonData = response.data.data;
          setRecipes(jsonData);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [isFocused]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.titleWrapper}>
            <Text variant="titleMedium" style={styles.title}>
              Menu
            </Text>
          </View>
          <View style={styles.iconsContainer}>
            {items.slice(0, 5).map((item, index) => (
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
          <View>
            <TouchableOpacity onPress={showModal}>
              <Button mode="contained" textColor={'white'} style={styles.button}>
                {/* <Icon name="menu" size={24} color="white" /> */}
                <Text style={styles.btnText}>Semua Menu</Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.titleWrapper}>
          <Text variant="titleMedium" style={styles.title}>
            Berita HMI
          </Text>
        </View>
        <View style={styles.container}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recipes.slice(0, 5).map((item, key) => (
              <TouchableOpacity
                key={key}
                onPress={() => navigation.navigate('DetailsBerita', { itemData: item })}>
                <View style={styles.imageContainer}>
                  {/* <Image source={{ uri: item.photo }} style={styles.image} /> */}
                  <Image
                    source={require('../../assets/default.jpg')}
                    style={styles.image}
                  />
                  <View style={styles.overlay} />
                  {/* <Text style={styles.textOverlay}>{item.tittle}</Text> */}
                  <Text style={styles.textOverlay2}>Test Berita</Text>
                  <Text style={styles.textOverlay1}>Selengkapnya..</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}
        style={styles.modalContainer}
      >

        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton1}
            onPress={hideModal}
          >
            <Icon name="close-outline" size={30} color="red" />
          </TouchableOpacity>
          <Category />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginTop: 1,
    marginBottom: 10,
    elevation: 5,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    height: '50%', // Adjust the height as needed
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 24,  // Border radius for top-left corner
    borderTopRightRadius: 24, // Border radius for top-right corner
  },

  closeButton1: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  container1: {
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
  },
  button: {
    backgroundColor: 'red'
  },
  bottomSheetContent: {
    padding: 16,
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  closeButtonText: {
    color: 'blue',
  },
  titleWrapper: {
    borderBottomWidth: 3,
    borderBottomColor: '#c7f8d9',
    paddingBottom: 5,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center'
  },
  imageContainer: {
    marginRight: 8,
    position: 'relative',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#a3ffff',
    opacity: 0.1,
  },
  image: {
    width: 150,
    height: 160,
    borderRadius: 15,
    margin: 0,
    resizeMode: 'cover',
  },
  textOverlay: {
    bottom: 30,
    position: 'absolute',
    left: 10,
    color: 'white',
    fontSize: 20,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    width: 130,
    textTransform: 'capitalize',
  },
  textOverlay2: {
    bottom: 30,
    position: 'absolute',
    left: 10,
    color: 'black',
    fontSize: 20,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    width: 130,
    textTransform: 'capitalize',
  },
  textOverlay1: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 5,
    fontSize: 11,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    textTransform: 'capitalize',
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
    padding: 7,
  },
  btnText: {
    color: 'white',
  },
  icon: {
    width: 55,
    height: 55,
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

export default MyNewRecipes;
