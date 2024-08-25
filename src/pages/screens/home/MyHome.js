
import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';
import MySearchBar from '../../../component/homePages/search/MySearchBar';
import MyNewRecipes from '../../../component/homePages/MyNewRecipes';
import MyPopularCard from '../../../component/homePages/popular/ListCardTrainingHMI';

const screenHeight = Dimensions.get('window').height;
export default function MyHome() {
  return (
    <View style={[styles.container, {height: screenHeight}]}>
      <ScrollView>
        <MySearchBar />
        <MyNewRecipes />
        <MyPopularCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f6ea',
    height: screenHeight,
    padding: 10,
  },
});
