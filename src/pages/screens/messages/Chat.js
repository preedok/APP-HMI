
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text>
        coming soon
      </Text>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf4f6',
  },
});

export default Chat;
