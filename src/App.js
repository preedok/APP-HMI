/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './pages/Navigation';
import {PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const screenHeight = Dimensions.get('window').height;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
            },
          }}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
                // height: screenHeight + 30 || 790,
                height: screenHeight + StatusBar.currentHeight,
              }}>
              <Navigation />
            </View>
          </SafeAreaView>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
