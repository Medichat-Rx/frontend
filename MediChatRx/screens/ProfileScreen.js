import { useQuery } from "@apollo/client";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GET_CURRENT_LOG_PROFILE } from "../queries/GetCurrentLogProfile";
import Loading from "../components/LoadingComponent";
import { createAvatar } from "@dicebear/core";
import { notionists } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";

export default function ProfileScreen() {
  const { loading, error, data } = useQuery(GET_CURRENT_LOG_PROFILE);

  if (loading) {
    console.log("Fetching Profile.... from profile screen");
    return <Loading />;
  }

  // Dummy user data
  const user = {
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    imageUrl:
      "https://i2.wp.com/www.marismith.com/wp-content/uploads/2014/07/facebook-profile-blank-face.jpeg",
    location: "",
  };

  const avatar = createAvatar(notionists, {
    seed: `${data.findCurrentLogUser.name}`,
    backgroundColor: ["ffdfbf"],
  }).toString();

  return (
    <View style={tw`bg-white h-full p-1`}>
      <View style={tw`mt-20 items-center justify-center`}>
        <View style={tw`mt-1 mb-6`}>
          <SvgXml xml={avatar} style={tw`w-24 h-24 rounded-full m-3`} />
        </View>

        <Text style={tw`text-lg mb-1 font-semibold`}>Name</Text>
        <Text style={tw`text-base text-gray-800 mb-1`}>
          {data.findCurrentLogUser.name}
        </Text>
        <Text style={tw`text-lg mb-1 font-semibold`}>Username</Text>
        <Text style={tw`text-base text-gray-800 mb-1`}>
          {data.findCurrentLogUser.username}
        </Text>
        <Text style={tw`text-lg mb-1 font-semibold`}>Email</Text>
        <Text style={tw`text-base text-gray-800 mb-1`}>
          {data.findCurrentLogUser.email}
        </Text>
        <Text style={tw`text-lg mb-1 font-semibold`}>Location</Text>
        <Text style={tw`text-base text-gray-800 mb-4`}>somewhere</Text>

        <TouchableOpacity
          style={tw`mt-10 w-full bg-blue-500 p-3 rounded-full mx-4`}
        >
          <Text style={tw`text-white text-center text-lg`}>Action Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
