
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import MySearchBar from '../../homePages/search/MySearchBar';
import axios from 'axios';

const SearchPage = searchQuery => {
  const keyword = searchQuery.route.params.searchQuery;
  const [searchResults, setSearchResults] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = searchResults
    ? Math.ceil(searchResults.length / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = searchResults
    ? Math.min(startIndex + itemsPerPage, searchResults.length)
    : 0;

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://odd-plum-cougar-cuff.cyclic.app/recipes?keyword=${keyword}`,
      );
      setSearchResults(response?.data?.data);
      setTotalItem(response?.data?.total);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [keyword]);

  useEffect(() => {
    if (searchResults) {
      handleSearch(keyword);
    }
  }, []);
  return (
    <View style={styles.container}>
      <MySearchBar />
      <StatusBar backgroundColor="#ecf5f6" />
      <View style={styles.searchContainer}>
        {searchResults && searchResults.length === 0 ? (
          <View>
            <Text style={styles.totalRecipe}>
              Total Pencarian  {keyword} : {totalItem}
            </Text>
            <Text style={styles.emptyText}>Tidak ada data</Text>
          </View>
        ) : (
          <ScrollView>
            <Text style={styles.totalRecipe}>
              Total Pencarian {keyword} : {totalItem}
            </Text>
            {searchResults &&
              searchResults.slice(startIndex, endIndex).map((result, index) => (
                <Card key={index} style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    <Image source={{uri: result.photo}} style={styles.image} />
                    <View>
                      <Title style={styles.text}>{result.tittle}</Title>
                      <Paragraph style={styles.text}>
                        {result.category}
                      </Paragraph>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            <View style={styles.paginationContainer}>
              {currentPage > 1 && (
                <Button style={styles.btnPagination} onPress={handlePrevPage}>
                  Prev
                </Button>
              )}
              {Array.from({length: totalPages}, (_, index) => index + 1).map(
                page => (
                  <Button
                    key={page}
                    onPress={() => setCurrentPage(page)}
                    style={styles.btnPagination}
                    disabled={page === currentPage}>
                    {page}
                  </Button>
                ),
              )}
              {currentPage < totalPages && (
                <Button style={styles.btnPagination} onPress={handleNextPage}>
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
    marginTop: -30,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 105,
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

export default SearchPage;
