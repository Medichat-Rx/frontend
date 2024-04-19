import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

export default function ProfileScreen() {
  // Dummy user data
  const user = {
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    imageUrl:
      "https://i2.wp.com/www.marismith.com/wp-content/uploads/2014/07/facebook-profile-blank-face.jpeg",
    location: ""
  };

  return (
    <View style={tw`bg-white h-full p-1`}>
      <View style={tw`mt-20 items-center justify-center`}>

        <View style={tw`mt-1 mb-6`}>
          <Image source={{ uri: user.imageUrl }} style={tw`w-28 h-28 rounded-full`} />
        </View>

        <Text style={tw`text-lg mb-1 font-semibold`}>Name</Text>
        <Text style={tw`text-base text-gray-800 mb-1`}>{user.name}</Text>
        <Text style={tw`text-lg mb-1 font-semibold`}>Username</Text>
        <Text style={tw`text-base text-gray-800 mb-1`}>{user.username}</Text>
        <Text style={tw`text-lg mb-1 font-semibold`}>Email</Text>
        <Text style={tw`text-base text-gray-800 mb-1`}>{user.email}</Text>
        <Text style={tw`text-lg mb-1 font-semibold`}>Location</Text>
        <Text style={tw`text-base text-gray-800 mb-4`}>somewhere</Text>

        <TouchableOpacity style={tw`mt-10 w-full bg-blue-500 p-3 rounded-full mx-4`}>
          <Text style={tw`text-white text-center text-lg`}>Action Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
