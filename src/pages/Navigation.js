
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyAdd from './screens/add/AddKomisariat';
import MyHome from './screens/home/MyHome';
import MyProfile from './screens/profile/MyProfile';
import MorePopular from '../component/homePages/popular/ListAllCardTrainingHMI';
import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import Detail from './screens/home/DetailsTraining';
import DetailBerita from './screens/home/DetailBerita';
import SearchPages from '../component/homePages/search/SearchPages';
import MyMessages from './screens/messages/MyMessages';
import Chat from './screens/messages/Chat';
import SplashScreen from '../../SplashScreen';
import EditPicture from '../component/profile/EditPicture';
import EditInfo from '../component/profile/EditInfo';
import CardUser from '../component/profile/CardUser';
import Category from '../component/homePages/category/Category';
import CategoryRecipes from '../component/homePages/category/CategoryInfoTraining';
import Alquran from '../component/alquran/Alquran'
import DetailAlquran from '../component/alquran/DetailAlQuran'
import Qiblats from '../component/kiblat/Kiblat'
import Buku from '../component/buku/buku'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabArr = [
  { route: 'MyHome', label: 'Home', icon: 'home', component: MyHome },
  { route: 'MyAdd', label: 'Formulir', icon: 'file', component: MyAdd },
  {
    route: 'MyComment',
    label: 'Diskusi',
    icon: 'message-square',
    component: MyMessages,
  },
  { route: 'MyProfile', label: 'Profile', icon: 'user', component: MyProfile },

];

const TabButton = props => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.75 }]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: '#78ce7f', borderRadius: 25, marginRight: 10 },
          ]}
        />
        <View style={[styles.btn, { backgroundColor: focused ? null : 'white' }]}>
          <Icon
            name={item.icon}
            color={focused ? 'white' : 'green'}
            size={24}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  paddingHorizontal: 10,
                }}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          position: 'absolute',
          bottom: 30,
          right: 10,
          left: 10,
          borderRadius: 13,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{
            title: 'Total Pencarian',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
          name="SearchPages"
          component={SearchPages}
        />
        <Stack.Screen
          name="MorePopular"
          component={MorePopular}
          options={{
            title: 'Info Training HMI',
            headerStyle: {
              backgroundColor: '#eaf4f6',
            },
          }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={MyHome}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BukuScreen"
          component={Buku}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AlQuranScreen"
          component={Alquran}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DetailAlquran"
          component={DetailAlquran}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="KiblatScreen"
          component={Qiblats}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Details"
          component={Detail}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DetailsBerita"
          component={DetailBerita}
        />
        <Stack.Screen
          options={{
            title: 'Chat',
            headerStyle: {
              backgroundColor: '#e9f6ea',
            },
          }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{
            title: 'Edit Gambar',
            headerStyle: {
              backgroundColor: '#e9f6ea',
            },
          }}
          name="EditPicture"
          component={EditPicture}
        />
        <Stack.Screen
          options={{
            title: 'Edit Informasi',
            headerStyle: {
              backgroundColor: '#e9f6ea',
            },
          }}
          name="EditInfo"
          component={EditInfo}
        />
        <Stack.Screen
          options={{
            title: 'Kartu Anggota',
            headerStyle: {
              backgroundColor: '#e9f6ea',
            },
          }}
          name="CardUser"
          component={CardUser}
        />
        <Stack.Screen
          options={{
            title: 'Kategori',
            headerStyle: {
              backgroundColor: '#e9f6ea',
            },
          }}
          name="Category"
          component={Category}
        />
        <Stack.Screen
          options={{
            title: 'HMI Kategori',
            headerStyle: {
              backgroundColor: '#e9f6ea',
            },
          }}
          name="CategoryRecipes"
          component={CategoryRecipes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafbfa',
    borderRadius: 15,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 15,
  },
});
