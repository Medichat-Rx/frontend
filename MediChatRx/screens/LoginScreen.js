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

export default function LoginScreen() {
  const [email, setEmail] = useState("user@mail.com");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    console.log("Attempting to login with", email, password);

    setTimeout(() => {
      if (username === "user@mail.com" && password === "password") {
        console.log("Login successful");
      } else {
        setErrorMessage("Invalid username or password");
        console.log("Login failed");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-white m-5`}>
      <StatusBar style="auto" />

      <Text style={tw`text-3xl text-center text-black font-bold mb-5`}>
        Selamat Datang di MediChat Rx
      </Text>
      <Text style={tw`text-md text-center text-black mb-5`}>
        Silahkan Log in
      </Text>
      {errorMessage && (
        <Text style={tw`text-red-500 mb-3`}>{errorMessage}</Text>
      )}
      <TextInput
        style={tw`h-12 my-2 border border-gray-300 px-4 w-4/5 bg-white rounded-full`}
        value={email}
        onChangeText={setEmail}
        placeholder="Username"
      />
      <TextInput
        style={tw`h-12 my-2 border border-gray-300 px-4 w-4/5 bg-white rounded-full`}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#1DA1F2" />
      ) : (
        <TouchableOpacity
          style={tw`items-center bg-blue-400 p-3 w-4/5 rounded-md mt-4`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white font-bold`}>Log in</Text>
        </TouchableOpacity>
      )}
      <Text style={tw`text-md text-center text-black mt-5`}>
        Belum punya akun? Silahkan Register
      </Text>
    </View>
  );
}