import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import {
    ImgIcon,
} from 'urip-rn-kit';
import Colors from '../../constants/color.constant';
const App = (props) => {
    const [compassHeading, setCompassHeading] = useState(0);
    const [qiblad, setQiblad] = useState(0);

    const calculate = (latitude, longitude) => {
        const PI = Math.PI;
        let latk = (21.4225 * PI) / 180.0;
        let longk = (39.8264 * PI) / 180.0;
        let phi = (latitude * PI) / 180.0;
        let lambda = (longitude * PI) / 180.0;
        let qiblad =
            (180.0 / PI) *
            Math.atan2(
                Math.sin(longk - lambda),
                Math.cos(phi) * Math.tan(latk) -
                Math.sin(phi) * Math.cos(longk - lambda),
            );
        setQiblad(qiblad);
    };

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log(latitude, longitude);
                calculate(latitude, longitude);
            },
            error => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };

    useEffect(() => {
        getLocation();
        const degree_update_rate = 3;

        CompassHeading.start(degree_update_rate, degree => {
            setCompassHeading(degree);
        });

        return () => {
            CompassHeading.stop();
        };
    }, []);

    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../assets/hmibg.png')} 
            style={styles.container}
        >
            <View style={styles.topLeft}>
                <ImgIcon
                    onPress={() => navigation.goBack()}
                    source={require('../../assets/back.png')}
                    size={35}
                    tintColor={Colors.grey2}
                />
            </View>
            <View style={styles.centeredContainer}>
                <ImageBackground
                    source={require('../../assets/kompas.png')}
                    style={[
                        styles.imageBackground,
                        { transform: [{ rotate: `${360 - compassHeading}deg` }] },
                    ]}
                >
                    <View style={styles.centeredContainer}>
                        <Image source={require('../../assets/kakbah.png')} style={styles.centeredImage} />
                    </View>
                </ImageBackground>
            </View>
        </ImageBackground>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {  flex: 1, },
    topLeft: { position: 'absolute', top: 20, left: 0, padding: 16 },
    centeredContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    imageBackground: { width: '90%', flex: 0.5, resizeMode: 'contain', alignSelf: 'center', marginLeft: 25 },
    centeredImage: { marginBottom: '45%', resizeMode: 'contain', flex: 0.7 },
});