import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Image, RefreshControl } from "react-native";
import tw from "tailwind-react-native-classnames";
import Card from "../components/Card";
import generateArticle from "../utils/generateArticle";

const ArticleScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchData = async () => {
    try {
      const result = await generateArticle();
      setArticles(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleArticlePress = (id) => {
    const article = articles.find((article) => article.id === id);
    navigation.navigate("Detail", article);
  };

  if (loading) {
    console.log("masuk");
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Image source={require("../assets/i-icon.png")} style={tw`w-24 h-24`} />
        <Text>Generating article....</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={articles}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card
          key={item.id}
          post={{ ...item, onPress: () => handleArticlePress(item.id) }}
        />
      )}
      contentContainerStyle={tw`p-4`}
    />
  );
};

export default ArticleScreen;
