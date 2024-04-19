import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tw from 'tailwind-react-native-classnames';

const Card = ({ post }) => {
  // Function to truncate content to 20 words
  const truncateContent = (content) => {
    return content.split(" ").slice(0, 20).join(" ") + "... Lihat Selengkapnya";
  };

  return (
    <TouchableOpacity onPress={post.onPress} style={tw`p-2.5 border border-gray-300 rounded mb-2.5`}>
      <View>
        {post.imgUrl && (
          <Image style={tw`w-full h-40 mb-2.5 rounded`} source={{ uri: post.imgUrl }} />
        )}
        <Text style={tw`text-base mb-2.5 text-left`}>{truncateContent(post.content)}</Text>
        {post.tags && post.tags.length > 0 && (
          <View style={tw`flex-row flex-wrap mb-2.5`}>
            {post.tags.map((tag, index) => (
              <Text key={index} style={tw`bg-gray-200 py-1 px-2 mr-1.5 mb-1.5 rounded text-left`}>
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


