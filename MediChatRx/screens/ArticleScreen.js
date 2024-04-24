import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Image, RefreshControl } from "react-native";
import tw from "tailwind-react-native-classnames";
import Card from "../components/Card";
import generateArticle from "../utils/generateArticle";
import { GET_USER_COMPLAINT } from "../queries/GetUserComplaint";
import { useQuery } from "@apollo/client";
// import Loading from "../components/LoadingComponent";

const ArticleScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, loading: loading1, error } = useQuery(GET_USER_COMPLAINT);

  const fetchData = async (data) => {
    try {
      const result = await generateArticle(data);
      setArticles(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData(data).then(() => setRefreshing(false));
  }, [data, loading1]);

  useEffect(() => {
    if (!loading1 && data) {
      fetchData(data);
    }
  }, [data, loading1]);

  if (loading1 || loading) {
    console.log("Generating article...");
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Image source={require("../assets/i-icon.png")} style={tw`w-24 h-24`} />
        <Text className="font-poppins-regular">Membuatkan artikel untukmu...</Text>
      </View>
    );
  }

  const handleArticlePress = (id) => {
    const article = articles.find((article) => article.id === id);
    navigation.navigate("Detail", article);
  };

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
