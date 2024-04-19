import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMessage("");
    console.log("Attempting to register with", email, password, photoProfile);

    setTimeout(() => {
      if (!photoProfile) {
        setErrorMessage("Photo profile  is required");
        console.log("Registration failed");
      } else {
        console.log("Registration successful");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-white m-5`}>
      <StatusBar style="auto" />

      <Text style={tw`text-3xl text-center text-blue-800 font-bold mb-5`}>
        Selamat Datang di MediChat Rx
      </Text>
      <Text style={tw`text-base text-center text-black mb-5`}>
        Silahkan Register
      </Text>
      {errorMessage && (
        <Text style={tw`text-red-500 mb-3`}>{errorMessage}</Text>
      )}
      <TextInput
        style={tw`h-12 my-2 border border-gray-300 px-4 w-4/5 bg-white rounded-full`}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={tw`h-12 my-2 border border-gray-300 px-4 w-4/5 bg-white rounded-full`}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={tw`h-12 my-2 border border-gray-300 px-4 w-4/5 bg-white rounded-full`}
        value={photoProfile}
        onChangeText={setPhotoProfile}
        placeholder="Photo Profile URL"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#1DA1F2" />
      ) : (
        <TouchableOpacity
          style={tw`items-center bg-blue-400 p-3 w-4/5 rounded-md mt-4`}
          onPress={handleRegister}
        >
          <Text style={tw`text-white font-bold`}>Daftar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={tw`text-base text-center text-black mt-5`}>
          Sudah punya akun? Silahkan <Text style={tw`text-blue-500`}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
