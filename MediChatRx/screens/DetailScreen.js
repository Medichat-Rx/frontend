import React, { useEffect } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const DetailScreen = ({ route, navigation }) => {
  const title = route?.params?.title;
  const content = route?.params?.content;
  const imageUrl = route?.params?.imgUrl;

  useEffect(() => {
    if (!title || !content) {
      navigation.navigate('Articles');
    }
  }, [navigation, title, content]);

  return (
    <ScrollView style={tw`flex-1 bg-white m-5`}>
      {title ?  
        <View>
          {imageUrl && <Image source={{ uri: imageUrl }} style={tw`w-full h-64 mb-5`} />}
          <Text style={tw`text-3xl text-left text-black font-bold mb-5`}>{title}</Text>
          <Text style={tw`text-base text-left text-black mb-5`}>{content}</Text>
        </View>
        : <View style={tw`items-center justify-center`}>
            <Text style={tw`text-2xl text-center text-black italic mb-5`}>
              "Health is a state of complete physical, mental and social well-being, and not merely the absence of disease or infirmity."
            </Text> 
            <Text style={tw`text-2xl text-center text-black mb-5`}>- World Health Organization</Text>
          </View>
      }
    </ScrollView>
  );
};

export default DetailScreen;
