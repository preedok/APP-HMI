
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Rating} from 'react-native-ratings';
import { Searchbar } from 'react-native-paper';
const MorePopular = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    axios
      .get(`https://odd-plum-cougar-cuff.cyclic.app/recipes?popular=popular`)
      .then(response => {
        setTotalItem(response.data.total);
        const jsonData = response.data.data;
        setRecipes(jsonData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const totalPages = recipes ? Math.ceil(recipes.length / itemsPerPage) : 0;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = recipes
    ? Math.min(startIndex + itemsPerPage, recipes.length)
    : 0;
  return (
    <View style={styles.container}>
      <View style={styles.recipeContainer}>
        {/* <Text style={{color: 'black'}}>Total Recipe: {totalItem}</Text> */}
        {recipes && recipes?.length === 0 ? (
          <View>
            <Text style={styles.emptyText}>Tidak Ada data</Text>
          </View>
        ) : (
            <ScrollView>
              <Searchbar
                placeholder="Pencarian..."
                placeholderTextColor={'white'}
                // value={searchQuery}
                style={styles.searchbar}
                iconColor={'white'}
                inputStyle={styles.input}
              // onChangeText={onChangeSearch}
              // onSubmitEditing={onSubmitSearch}
              />
            {recipes &&
              recipes.slice(startIndex, endIndex).map((item, key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('Details', {itemData: item})
                  }>
                  <Card>
                    <Card.Content style={styles.cardContent}>
                      {/* <Image source={{uri: item.photo}} style={styles.image} /> */}
                      <Image source={require('../../../assets/kongres.jpg')} style={styles.image} />
                      <View>
                        {/* <Title style={styles.text}>{item.tittle}</Title> */}
                        <Title style={styles.text}>Test Judul Training</Title>
                        {/* <Paragraph style={styles.text}>
                          {item.category}
                        </Paragraph> */}
                        <Paragraph style={styles.text}>
                          Test Komisariat
                        </Paragraph>
                        <Paragraph style={styles.text}>
                          {/* {item.average_score
                            ? parseFloat(item.average_score).toFixed(1)
                            : ''} */}
                          {/* <Rating
                            type="custom"
                            ratingColor="#FFD700"
                            ratingBackgroundColor="gray"
                            ratingCount={5}
                            imageSize={20}
                            startingValue={item.average_score || 0}
                            tintColor="#eaf4f6"
                          /> */}
                          <Text>07 Oktober 2023</Text>
                        </Paragraph>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            <View style={styles.paginationContainer}>
              {currentPage > 1 && (
                <Button
                  style={styles.btnPagination}
                  buttonColor="black"
                  textColor="black"
                  onPress={handlePrevPage}>
                  Prev
                </Button>
              )}
              {currentPage > 2 && (
                <Button
                  onPress={() => setCurrentPage(currentPage - 1)}
                  buttonColor="black"
                  style={styles.btnPagination}>
                  {currentPage - 1}
                </Button>
              )}
              <Button
                onPress={() => setCurrentPage(currentPage)}
                style={styles.btnPagination}
                disabled>
                {currentPage}
              </Button>
              {currentPage < totalPages && (
                <Button
                  onPress={() => setCurrentPage(currentPage + 1)}
                  textColor="black"
                  style={styles.btnPagination}>
                  {currentPage + 1}
                </Button>
              )}
              {currentPage < totalPages - 1 && (
                <Button
                  style={styles.btnPagination}
                  buttonColor="white"
                  textColor="black"
                  onPress={handleNextPage}>
                  Next
                </Button>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -20,
  },
  searchbar: {
    borderRadius: 10,
    backgroundColor: '#c7f8d9',
    margin: 6,
  },
  input: {
    color: 'white',
  },
  recipeContainer: {
    flex: 1,
    backgroundColor: '#e9f6ea',
    marginTop: 20,
    marginBottom: 30,
  },
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d7ffda',
    borderRadius: 15,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 5,
    borderRadius: 10,
  },
  text: {
    color: 'black',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  emptyText: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  totalRecipe: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 0,
    marginLeft: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  btnPagination: {
    backgroundColor: '#d7ffda',
    borderRadius: 10,
    margin: 5,
    width: 50,
    height: '50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MorePopular;
