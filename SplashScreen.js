
import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {Button, List} from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

const SplashScreen = () => {
  const pagerRef = useRef(null);
  const navigation = useNavigation();
  // useEffect(() => {
  //   if (auth.token) {
  //     navigation.navigate('MyTabs');
  //   }
  // }, [auth.token, navigation]);
  // const handleButtonPress = () => {
  //   pagerRef.current.setPage(1);
  // };
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MyTabs');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      scrollEnabled={false}
      ref={pagerRef}>
      <View key="1">
        <LinearGradient
          colors={['#67b5b8', '#67b5b8']}
          style={styles.container}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.text}>Selamat Datang</Text>
          <Text style={styles.text2}>Di HMI Mobile Apps</Text>
          <Text style={styles.text3}>
          Aplikasi Iman, Ilmu, Amal
          </Text>
          <LottieView
            source={require('./src/assets/animation_ljyzjsnb.json')}
            autoPlay
            style={{width: 400, height: 450}}
            loop={true}
            resizeMode="cover"
            onAnimationFinish={() => {
              console.log('animation finished');
            }}
          />
        </LinearGradient>
      </View>
    </PagerView>
  );
};
const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#67b5b8',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#67b5b8',
    textAlign: 'center',
  },
  fade: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNext: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    width: '30%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
    margin: 0,
    padding: 0,
    left: 0,
    right: 0,
  },
  text: {
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 20,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  textKey2: {
    color: 'black',
    fontSize: 42,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  text2: {
    color: 'white',
    fontSize: 27,
    width: '60%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text3: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    width: '60%',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 3},
    textShadowRadius: 10,
  },
  textButton: {
    position: 'absolute',
    fontSize: 18,
    color: 'black',
    top: 690,
    height: 35,
    justifyContent: 'center',
    textDecorationLine: 'underline',
  },
  button: {
    position: 'absolute',
    top: 550,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 2,
  },
  button2: {
    position: 'absolute',
    top: 620,
    width: '80%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textButton2: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
  },
  textButton3: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
  },
});
export default SplashScreen;
