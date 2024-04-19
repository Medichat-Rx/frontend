import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function ProfileScreen() {
  // Dummy user data
  const user = {
    name: 'John Doe',
    username: 'johndoe123',
    email: 'johndoe@example.com',
    imageUrl: 'https://i2.wp.com/www.marismith.com/wp-content/uploads/2014/07/facebook-profile-blank-face.jpeg',
  };

  return (
    <View style={tw`flex-1 border-4 border-gray-300 rounded-full items-center justify-center p-5`}>
      <Image source={{ uri: user.imageUrl }} style={tw`w-40 h-40 rounded-full mb-5`} resizeMode="cover" />
      <Text style={tw`text-lg mb-2.5`}>Name: {user.name}</Text>
      <Text style={tw`text-lg mb-2.5`}>Username: {user.username}</Text>
      <Text style={tw`text-lg mb-2.5`}>Email: {user.email}</Text>
    </View>
  );
};

