
import React, {useState, useEffect} from 'react';
import {Text, Card, Title, Paragraph, Button} from 'react-native-paper';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Rating} from 'react-native-ratings';

const MyPopularCard = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      axios
        .get(`https://odd-plum-cougar-cuff.cyclic.app/recipes?popular=popular`)
        .then(response => {
          const jsonData = response.data.data;
          setRecipes(jsonData);
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.status === 503) {
            alert(
              'The server is currently unavailable. Please try again later.',
            );
          } else {
            console.error(error);
          }
        });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text variant="titleMedium" style={styles.title}>
          Info Training HMI
        </Text>
      </View>
      <View>
        <ScrollView>
          {recipes.slice(0, 3).map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.card}
              onPress={() => navigation.navigate('Details', {itemData: item})}>
              <Card>
                <Card.Content style={styles.cardContent}>
                  {/* <Image source={{uri: item.photo}} style={styles.image} /> */}
                  <Image source={require('../../../assets/kongres.jpg')} style={styles.image} />
                  <View>
                    {/* <Title style={styles.text}>{item.tittle}</Title> */}
                    <Title style={styles.text}>Test Judul Training</Title>
                    <Paragraph
                      style={[
                        styles.text,
                      ]}>
                      {/* <Rating
                        type="custom"
                        ratingColor="#FFD700"
                        ratingBackgroundColor="gray"
                        ratingCount={5}
                        imageSize={20}
                        startingValue={item.average_score || 0}
                        tintColor="#eaf4f6"
                      /> */}
                      Test Komisariat
                    </Paragraph>
                    {/* <Paragraph style={styles.text}>{item.category}</Paragraph> */}
                    <Paragraph style={styles.text}>07 Oktober 2023</Paragraph>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('MorePopular')}>
          <Button mode="contained" textColor={'white'} style={styles.button}>
            Semua Info
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 100,
    elevation: 5,
  },
  titleWrapper: {
    borderBottomWidth: 3,
    borderBottomColor: '#c7f8d9',
    paddingBottom: 5,
    alignSelf: 'center',
  },
  searchbar: {
    borderRadius: 10,
    backgroundColor: '#c7f8d9'
  },
  input: {
    color: 'white',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
  },
  text: {
    color: 'black',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7ffe9',
    borderRadius: 15,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 5,
    borderRadius: 10,
  },
  button: {
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#78ce7f',
    height: 50,
    justifyContent: 'center',
  },
});

export default MyPopularCard;
