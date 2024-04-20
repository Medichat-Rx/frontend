import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

const Card = ({ post }) => {
  // Function to truncate content to 20 words
  const truncateContent = (content) => {
    return content.split(" ").slice(0, 20).join(" ") + "... Lihat Selengkapnya";
  };

  return (
    <TouchableOpacity
      onPress={post.onPress}
      style={tw`p-4 bg-white rounded-lg shadow-md mb-4`}
    >
      <View>
        {post.imgUrl && (
          <Image
            style={tw`w-full h-40 mb-4 rounded-lg`}
            source={{ uri: post.imgUrl }}
          />
        )}
        <Text style={tw`font-bold text-xl mb-2`}>{post.title}</Text>
        <Text style={tw`text-base mb-4 text-gray-700`}>
          {truncateContent(post.content)}
        </Text>
        {post.tags && post.tags.length > 0 && (
          <View style={tw`flex-row flex-wrap mb-2`}>
            {post.tags.map((tag, index) => (
              <Text
                key={index}
                style={tw`bg-gray-200 py-1 px-2 mr-2 mb-2 rounded text-sm text-gray-600`}
              >
                {tag}
              </Text>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
