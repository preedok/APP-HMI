
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function CategoryRecipes({route}) {
  const navigation = useNavigation();
  const {category} = route.params;
  const Category = category.toLowerCase();
  const [recipes, setRecipes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://odd-plum-cougar-cuff.cyclic.app/recipes?category=${Category}`,
        );
        setRecipes(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [Category]);

  return (
    <View style={styles.container}>
      <View style={styles.recipeContainer}>
        {recipes && recipes?.length === 0 ? (
          <View>
            <Text style={styles.emptyText}>Tidak Ada Info Training</Text>
          </View>
        ) : (
          <ScrollView>
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
                      <Image source={{uri: item.photo}} style={styles.image} />
                      <View>
                        <Title style={styles.text}>{item.tittle}</Title>
                        <Paragraph style={styles.text}>
                          {item.category}
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
                  textColor="black"
                  style={styles.btnPagination}>
                  {currentPage - 1}
                </Button>
              )}
              <Button
                onPress={() => setCurrentPage(currentPage)}
                textColor="black"
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -20,
  },
  recipeContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
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
    backgroundColor: '#eaf4f6',
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
    backgroundColor: '#eaf4f6',
    borderRadius: 10,
    margin: 5,
    width: 50,
    height: '50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
