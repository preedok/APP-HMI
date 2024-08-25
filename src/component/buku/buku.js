import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { Provider as PaperProvider, Card, Title, Paragraph, Searchbar } from 'react-native-paper';

const BookApp = () => {
  const data = [
    {
      id: '1',
      title: 'Book 1',
      author: 'Author 1',
      description: 'Description 1',
      image: require('../../assets/buku.png'),
    },
    {
      id: '2',
      title: 'Book 2',
      author: 'Author 2',
      description: 'Description 2',
      image: require('../../assets/buku.png'),
    },
    {
      id: '3',
      title: 'Book 2',
      author: 'Author 2',
      description: 'Description 2',
      image: require('../../assets/buku.png'),
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    const filteredBooks = data.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredBooks);
  };

  const BookCard = ({ title, author, description, image }) => (
    <Card>
      <Card.Cover source={image} />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>Author: {author}</Paragraph>
        <Paragraph>{description}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <ScrollView>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BookCard
                title={item.title}
                author={item.author}
                description={item.description}
                image={item.image}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 10,
    marginTop: 50
  },
});

export default BookApp;
