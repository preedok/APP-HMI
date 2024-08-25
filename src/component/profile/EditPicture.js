
import { View, Text, StyleSheet, Image, Card } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateUserPhoto } from '../../../store/reducers/userSlice';
import { PERMISSIONS, request } from 'react-native-permissions';

export default function EditPicture() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector(state => state?.auth);
  const user = useSelector(state => state?.user);
  const [photo, setPhoto] = React.useState(
    user?.data?.photo || user?.data[0]?.photo || '',
  );
  const [buttonMode, setButtonMode] = useState('outlined');
  const [newPhotoChosen, setNewPhotoChosen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Gallery permission given');
        chooseImage();
      } else {
        const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        if (result === 'granted') {
          console.log('Gallery permission given');
          chooseImage();
        } else {
          console.log('Gallery permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        takeImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takeImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setPhoto(source.uri);
        setNewPhotoChosen(true);
      }
    });
  };

  const chooseImage = () => {
    setButtonMode('contained');
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setPhoto(source.uri);
        setNewPhotoChosen(true);
      }
    });
  };
  const removeImage = () => {
    setPhoto(null);
    setNewPhotoChosen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = auth?.token;
      let formData = new FormData();
      formData.append('photo', {
        uri: photo,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      await axios
        .patch(`https://odd-plum-cougar-cuff.cyclic.app/profile/photo`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          dispatch(updateUserPhoto(res?.data?.data?.photo));
          if (res.data.message === 'Success upload') {
            const userId = user.data.id.toString();
            firestore()
              .collection('users')
              .doc(userId)
              .update({
                photo: res?.data?.data?.photo,
              })
              .then(() => {
                navigation.navigate('MyProfile');
              })
              .catch(error => {
                console.error('Error updating document: ', error);
              });
          }
        })
        .catch(error => {
          console.log(error);
          // handle error
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card1} >
        <View style={{ position: 'absolute', top: 0, left: 0, flexDirection: 'row', alignItems: 'center', margin: 10 }}>
          <Image
            source={require('../../assets/hmi.png')}
            style={{ width: 16, height: 40, marginRight: 8, marginBottom: 10 }}
          />
          <View>
            <Text style={{ fontSize: 15, fontWeight: 600 }}>Himpunan Mahasiswa Islam</Text>
            <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 15, fontStyle: 'italic' }}>Islamic Student Association</Text>
          </View>
        </View>
        <Avatar.Image
          size={250}
          icon="account-outline"
          source={
            photo
              ? { uri: photo }
              : {
                uri: 'https://res.cloudinary.com/dkp658sgi/image/upload/v1689998202/2023-07-22T03:56:42.129Z.jpg',
              }
          }
          style={styles.avatar}
        />
        {photo && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: photo }} style={styles.imageGalery} />
            <Button
              mode="contained"
              style={styles.buttonStyle2}
              labelStyle={{ color: 'white' }}
              title="Remove Photo"
              onPress={removeImage}>
              Hapus Gambar
            </Button>
          </View>
        )}
        {!newPhotoChosen && (
          <Button
            style={styles.buttonUpload}
            mode="outlined"
            labelStyle={{ color: 'green' }}
            theme={{ colors: { outline: 'green' } }}
            onPress={requestGalleryPermission}>
            Ambil dari Galeri
          </Button>
        )}
        {!newPhotoChosen && (
          <Button
            style={styles.buttonUpload}
            mode="outlined"
            labelStyle={{ color: 'green' }}
            theme={{ colors: { outline: 'green' } }}
            onPress={requestCameraPermission}>
            Ambil dari Kamera
          </Button>
        )}
        {newPhotoChosen && (
          <Button
            mode="contained"
            style={styles.buttonStyle3}
            labelStyle={{ color: 'white' }}
            theme={{ colors: { outline: 'green' } }}
            title="Submit Photo"
            onPress={handleSubmit}
            loading={loading}>
            Simpan Photo
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f6ea',
    alignItems: 'center',
  },
  card1: {
    width: 350,
    height: 580,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: '#50c058',
    justifyContent: 'center',
  },
  buttonUpload: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 50,
    width: 200,
    justifyContent: 'center',
  },
  buttonStyle2: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    height: 50,
    width: 200,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  buttonStyle3: {
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    height: 50,
    width: 200,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});
