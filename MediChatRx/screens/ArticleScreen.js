import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ArticleScreen = () => {
  const articles = [
    {
      id: 1,
      title: 'Manfaat Tidur yang Cukup Bagi Kesehatan',
      content: 'Tidur yang cukup memiliki banyak manfaat bagi kesehatan tubuh, seperti meningkatkan daya tahan tubuh dan memperbaiki mood.',
    },
    {
      id: 2,
      title: 'Tips Menjaga Kesehatan Mental di Tengah Pandemi',
      content: 'Di tengah pandemi, menjaga kesehatan mental sama pentingnya dengan menjaga kesehatan fisik. Berikut beberapa tips yang bisa dilakukan.',
    },
    {
      id: 3,
      title: 'Rahasia Makanan Sehat untuk Menjaga Berat Badan Ideal',
      content: 'Memilih makanan sehat dan seimbang merupakan kunci untuk menjaga berat badan ideal. Temukan rahasianya di sini.',
    },
  ];

  const handleArticlePress = (id) => {
    // Navigate to detail screen based on article id
    console.log(`Article with id ${id} is pressed`);
  };

  return (
    <View style={styles.container}>
      {articles.map((article) => (
        <TouchableOpacity key={article.id} onPress={() => handleArticlePress(article.id)} style={styles.card}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.content}>{article.content}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
});

export default ArticleScreen;

