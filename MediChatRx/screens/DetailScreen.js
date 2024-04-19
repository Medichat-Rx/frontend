import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const DetailScreen = ({ route, navigation }) => {
  const title = route?.params?.title;
  const content = route?.params?.content;

  useEffect(() => {
    if (!title || !content) {
      navigation.navigate('Articles about health');
    }
  }, []);

  return (
    <>
      {title ?  
      <View style={tw`flex-1 items-center justify-center bg-white m-5`}>
        <Text style={tw`text-3xl text-center text-black font-bold mb-5`}>{title}</Text>
        <Text style={tw`text-base text-center text-black mb-5`}>{content}</Text>
      </View>
      : <View style={tw`flex-1 items-center justify-center bg-white m-5`}>
      <Text style={tw`text-3xl text-center text-black font-bold mb-5`}>Check Articles</Text>
      </View>
      }
    </>
  );
};

export default DetailScreen;
