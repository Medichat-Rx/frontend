import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const ArticleScreen = ({ navigation }) => {
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
    const article = articles.find(article => article.id === id);
    navigation.navigate('Detail', article);
  };

  return (
    <View style={tw`flex-1 p-4`}>
      {articles.map((article) => (
        <TouchableOpacity key={article.id} onPress={() => handleArticlePress(article.id)} style={tw`bg-gray-100 p-4 my-2 rounded-lg`}>
          <Text style={tw`text-lg font-bold mb-2`}>{article.title}</Text>
          <Text style={tw`text-base`}>{article.content}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ArticleScreen;