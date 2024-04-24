import React, { useEffect } from "react";
import { ScrollView, Text, Image, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const DetailScreen = ({ route, navigation }) => {
  const title = route?.params?.title;
  const content = route?.params?.content;
  const imageUrl = route?.params?.imgUrl;

  useEffect(() => {
    if (!title || !content) {
      navigation.navigate("Articles");
    }
  }, [navigation, title, content]);

  return (
    <ScrollView className="flex-1 bg-white">
      {title ? (
        <View style={tw`shadow-lg`}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={tw`w-full h-64 mb-5`} />
          )}
          <View className="p-6">
            <Text className="text-3xl text-black mb-5 font-poppins-bold ">
              {title}
            </Text>
            <Text className="text-base text-black mb-5 font-poppins-regular text-justify">
              {content}
            </Text>
          </View>
        </View>
      ) : (
        <View style={tw`items-center justify-center p-6`}>
          <Text className="text-2xl text-center text-black font-poppins-regular mb-5">
            "Health is a state of complete physical, mental and social
            well-being, and not merely the absence of disease or infirmity."
          </Text>
          <Text style={tw`text-2xl text-center text-black mb-5`}>
            - World Health Organization
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default DetailScreen;
