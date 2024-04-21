import { Image, View } from "react-native";
import tw from "tailwind-react-native-classnames";
export default function Loading() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Image source={require("../assets/i-icon.png")} style={tw`w-24 h-24`} />
    </View>
  );
}
