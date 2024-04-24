import { styled } from "nativewind";
import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

const Card = ({ post }) => {
  // Function to truncate content to 20 words
  const truncateContent = (content) => {
    return content.split(" ").slice(0, 20).join(" ") + "... Lihat Selengkapnya";
  };

  const StyledView = styled(View)
  const StyledText = styled(Text)
  return (
    <TouchableOpacity
      onPress={post.onPress}
      style={tw`bg-white rounded-2xl shadow-lg mb-4`}
    >
      <View>
        {post.imgUrl && (
          <Image
            style={tw`w-full h-40 rounded-t-lg`}
            source={{ uri: post.imgUrl }}
          />
        )}
        <View style={tw`p-6`}>
          <StyledText className="text-xl mb-2 font-poppins-bold">{post.title}</StyledText>
          <StyledText className="text-base mb-4 mt-4 text-gray-700 font-poppins-regular">
            {truncateContent(post.content)}
          </StyledText>
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
      </View>
    </TouchableOpacity>
  );
};

export default Card;
