import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, CommonActions } from '@react-navigation/native';
const ChatScreen = () => {
  const auth = useSelector(state => state?.auth);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
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

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Salam Kenal Saya dari Cabang XXX',
      sender: 'Friend',
      time: '10:00 AM',
    },
    {
      id: 2,
      text: 'Halo, Saya Hanya Anggota Biasa',
      sender: 'Me',
      time: '11:05 AM',
    },
    {
      id: 3,
      text: 'Apa Tema Diskusi Hari ini?',
      sender: 'Friend',
      time: '12:10 AM',
    },
    {
      id: 4,
      text: 'Tutorial Mengolah Senior',
      sender: 'Me',
      time: '13:15 AM',
    },
    {
      id: 5,
      text: 'Ajarin dong puh, Sepuh, Sepuh',
      sender: 'friend',
      time: '14:15 AM',
    },
    {
      id: 6,
      text: 'Ajak Ngopi yang berkedok Silaturahmi',
      sender: 'Me',
      time: '15:15 AM',
    }
  ]);
  const [text, setText] = useState('')
  const handleSendMessage = () => {
    if (text.trim() === '') {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'Me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setText('');
  };
  const renderMessage = ({ item }) => {
    const isMyMessage = item.sender === 'Me';

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.otherMessage,
        ]}
      >
        {!isMyMessage && (
          <Image
            source={require('../../../assets/iqbal.jpg')}
            style={styles.avatar}
          />
        )}
        <View >
          <Text style={styles.messageText}>{item.text}</Text>
          {item.time && <Text style={styles.timeText}>{item.time}</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container} ref={scrollViewRef}>
      <View style={styles.header} >
        <Image
          source={require('../../../assets/kongres.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Forum Diskusi Kader HMI</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
      />
      <View style={[styles.inputContainer, { marginBottom: 93 }]}>
        <TextInput
          style={styles.input}
          placeholder="Tuliskan pesan anda"
          value={text}
          onChangeText={(newText) => setText(newText)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}> <Icon name="send" size={21} color="white" /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    marginTop: 20
  },
  header: {
    backgroundColor: '#075E54',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: 12,
    marginVertical: 4,
    maxWidth: '80%',
    borderRadius: 8,
    flexDirection: 'row'
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 12,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
