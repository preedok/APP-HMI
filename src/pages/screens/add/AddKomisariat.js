
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView,
    Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';
import { PERMISSIONS, request } from 'react-native-permissions';
import { SelectList } from 'react-native-dropdown-select-list';

export default function MyAdd() {
    const [tittle, setTittle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const auth = useSelector(state => state?.auth);
    const navigation = useNavigation();
    const [newPhotoChosen, setNewPhotoChosen] = useState(false);
    const scrollViewRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [photoSize, setPhotoSize] = useState(0);
    const [photoFormat, setPhotoFormat] = useState('');
    const [category, setCategory] = useState(null);
    console.log(category);
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
                console.log(result);

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
            Alert.alert(err);
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
                setPhotoSize(response.assets[0].fileSize);
                setPhotoFormat(response.assets[0].type);
                setPhoto(source.uri);
                setNewPhotoChosen(true);
            }
        });
    };
    const chooseImage = () => {
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
                setPhotoSize(response.assets[0].fileSize);
                setPhotoFormat(response.assets[0].type);
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

    const handleAdd = async () => {
        setLoading(true);
        try {
            if (tittle.current === '') {
                Alert.alert('Tittle cant be empty');
            } else if (ingredients.current === '') {
                Alert.alert('Ingredients cant be empty');
            } else if (videoLink.current === '') {
                Alert.alert('Video Link cant be empty');
            } else if (category === null) {
                Alert.alert('Category cant be empty');
            } else if (photo === null) {
                Alert.alert('Image cant be empty');
            } else if (description.current === '') {
                Alert.alert('Image cant be empty');
            } else if (photoSize > 2000000) {
                Alert.alert('Image size cant be more than 2MB');
            } else if (
                photoFormat !== 'image/jpeg' &&
                photoFormat !== 'image/png' &&
                photoFormat !== 'image/jpg' &&
                photoFormat !== 'image/webp'
            ) {
                Alert.alert('Image format must be jpeg or png or jpg or webp');
            }
            const token = auth?.token;
            const formData = new FormData();
            formData.append('tittle', tittle);
            formData.append('ingredients', ingredients);
            formData.append('videoLink', videoLink);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('photo', {
                uri: photo,
                type: 'image/jpeg',
                name: 'image',
            });
            await axios
                .post(`https://odd-plum-cougar-cuff.cyclic.app/recipes`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(res => {
                    setPhoto(null);
                    setTittle('');
                    setIngredients('');
                    setVideoLink('');
                    setCategory('');
                    setDescription('');
                    setNewPhotoChosen(false);
                    if (res.data.message === 'Success insert data') {
                        navigation.navigate('MyHome');
                    }
                    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
                });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!auth.token) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                }),
            );
        }
    }, [auth.token, navigation]);

    const categoryListBadko = [
        {
            key: 'Aceh',
            value: 'Badko HMI Aceh',
        },
        {
            key: 'SumatraUtara',
            value: 'Badko HMI Sumatra Utara',
        },
        {
            key: 'SumatraBarat',
            value: 'Badko HMI Sumatra Barat',
        },
        {
            key: 'Riau',
            value: 'Badko HMI Riau',
        },
        {
            key: 'KepulauanRiau',
            value: 'Badko HMI Kepulauan Riau',
        },
        {
            key: 'Jambi',
            value: 'Badko HMI Jambi',
        },
        {
            key: 'SumatraSelatan',
            value: 'Badko HMI Sumatra Selatan',
        },
        {
            key: 'BangkaBelitung',
            value: 'Badko HMI Bangka Belitung',
        },
        {
            key: 'Bengkulu',
            value: 'Badko HMI Bengkulu',
        },
        {
            key: 'Lampung',
            value: 'Badko HMI Lampung',
        },
        {
            key: 'DKIJakarta',
            value: 'Badko HMI DKI Jakarta',
        },
        {
            key: 'JawaBarat',
            value: 'Badko HMI Jawa Barat',
        },
        {
            key: 'Banten',
            value: 'Badko HMI Banten',
        },
        {
            key: 'JawaTengah',
            value: 'Badko HMI Jawa Tengah',
        },
        {
            key: 'Yogyakarta',
            value: 'Badko HMI Yogyakarta',
        },
        {
            key: 'JawaTimur',
            value: 'Badko HMI Jawa Timur',
        },
        {
            key: 'Bali',
            value: 'Badko HMI Bali',
        },
        {
            key: 'NusaTenggaraBarat',
            value: 'Badko HMI Nusa Tenggara Barat',
        },
        {
            key: 'NusaTenggaraTimur',
            value: 'Badko HMI Nusa Tenggara Timur',
        },
        {
            key: 'KalimantanBarat',
            value: 'Badko HMI Kalimantan Barat',
        },
        {
            key: 'KalimantanTengah',
            value: 'Badko HMI Kalimantan Tengah',
        },
        {
            key: 'KalimantanSelatan',
            value: 'Badko HMI Kalimantan Selatan',
        },
        {
            key: 'KalimantanTimur',
            value: 'Badko HMI Kalimantan Timur',
        },
        {
            key: 'KalimantanUtara',
            value: 'Badko HMI Kalimantan Utara',
        },
        {
            key: 'SulawesiUtara',
            value: 'Badko HMI Sulawesi Utara',
        },
        {
            key: 'SulawesiTengah',
            value: 'Badko HMI Sulawesi Tengah',
        },
        {
            key: 'SulawesiSelatan',
            value: 'Badko HMI Sulawesi Selatan',
        },
        {
            key: 'SulawesiBarat',
            value: 'Badko HMI Sulawesi Barat',
        },
        {
            key: 'Gorontalo',
            value: 'Badko HMI Gorontalo',
        },
        {
            key: 'Maluku',
            value: 'Badko HMI Maluku',
        },
        {
            key: 'MalukuUtara',
            value: 'Badko HMI Maluku Utara',
        },
        {
            key: 'PapuaBarat',
            value: 'Badko HMI Papua Barat',
        },
        {
            key: 'Papua',
            value: 'Badko HMI Papua',
        },
    ];
    const categoryListCabang = [
        {
            key: 'Padang',
            value: 'HMI Cabang Padang',
        },
        {
            key: 'Sarolangun',
            value: 'HMI Cabang Sarolangun',
        }
    ];
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ecf5f6" barStyle="dark-content" />
            <ScrollView style={styles.scroll} ref={scrollViewRef}>
                <Text style={styles.text}>Formulir Komisariat HMI</Text>
                <View style={styles.formContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 10 }}>
                        <Image
                            source={require('../../../assets/hmi.png')}
                            style={{ width: 16, height: 40, marginRight: 8, marginBottom: 5 }}
                        />
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: 600 }}>Himpunan Mahasiswa Islam</Text>
                            <Text style={{ fontSize: 11, fontWeight: 600, marginBottom: 10, fontStyle: 'italic' }}>Islamic Student Association</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 6 }}>
                        <SelectList
                            setSelected={val => setCategory(val)}
                            data={categoryListBadko}
                            save="value"
                            boxStyles={{
                                borderRadius: 10,
                                color: '#50c058',
                                borderColor: '#50c058',
                                height: 50,
                            }}
                            inputStyles={{
                                color: '#50c058',
                            }}
                            dropdownStyles={{
                                borderColor: '#50c058',
                            }}
                            dropdownTextStyles={{
                                color: '#50c058',
                            }}
                            placeholder="Pilih Badko"
                        />
                    </View>
                    <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                        <SelectList
                            setSelected={val => setCategory(val)}
                            data={categoryListCabang}
                            save="value"
                            boxStyles={{
                                borderRadius: 10,
                                color: '#50c058',
                                borderColor: '#50c058',
                                height: 50,
                            }}
                            inputStyles={{
                                color: '#50c058',
                            }}
                            dropdownStyles={{
                                borderColor: '#50c058',
                            }}
                            dropdownTextStyles={{
                                color: '#50c058',
                            }}
                            placeholder="Pilih Cabang"
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh Format : HMI Komisariat XXX"
                        placeholderTextColor="#50c058"
                        keyboardType="default"
                        underlineColor="transparent"
                        theme={{ roundness: 10 }}
                        value={tittle}
                        onChangeText={value => setTittle(value)}
                        mode="outlined"
                        outlineColor={'#50c058'}
                        activeOutlineColor="#206b73"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Jumlah Anggota"
                        placeholderTextColor="#50c058"
                        keyboardType="numeric" 
                        underlineColor="transparent"
                        theme={{ roundness: 10 }}
                        // value={tittle.toString()}
                        // onChangeText={value => setTittle(value)}
                        mode="outlined"
                        outlineColor={'#50c058'}
                        activeOutlineColor="#206b73"
                    />
                    <Text style={styles.textAdd}>Tambah Gambar Sekretariat Komisariat</Text>
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
                            style={styles.buttonImageUpload}
                            mode="outlined"
                            labelStyle={{ color: '#50c058' }}
                            theme={{ colors: { outline: '#50c058' } }}
                            onPress={requestGalleryPermission}>
                            Ambil dari galeri
                        </Button>
                    )}
                    {!newPhotoChosen && (
                        <Button
                            style={styles.buttonImageUpload}
                            mode="outlined"
                            labelStyle={{ color: '#50c058' }}
                            theme={{ colors: { outline: '#50c058' } }}
                            onPress={requestCameraPermission}>
                            Ambil dari kamera
                        </Button>
                    )}

                    <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={{ color: 'white' }}
                        theme={{ colors: { outline: '#298994' } }}
                        title="Submit Recipe"
                        disabled={loading}
                        onPress={handleAdd}>
                        <Text style={{ width: '100%' }}>
                            {loading ? 'Loading...' : 'Kirim Formulir'}
                        </Text>
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf5f6',
    },
    scroll: {
        marginBottom: 90,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        color: '#50c058',
    },
    textAdd: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#50c058',
    },
    input: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        height: 50,
    },
    input2: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        height: 150,
    },
    button: {
        backgroundColor: '#50c058',
        borderRadius: 10,
        margin: 10,
        height: 50,
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    imageGalery: {
        width: 300,
        height: 200,
        marginBottom: 16,
        resizeMode: 'cover',
        borderRadius: 13
    },
    buttonImageUpload: {
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        height: 50,
        justifyContent: 'center',
        backgroundColor: '',
    },
    buttonStyle2: {
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'red',
    },
});
