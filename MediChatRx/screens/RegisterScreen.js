import { useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import gql from "graphql-tag";
import { useState, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import tw from "tailwind-react-native-classnames";

const REGISTER_MUTATION = gql`
  mutation Mutation($newUser: NewUser) {
    register(newUser: $newUser) {
      _id
      name
      username
      email
      password
      createdAt
    }
  }
`;

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMessage("");
    console.log("Attempting to register with", email, password, name, username);

    if (!password || !name || !username || !email) {
      if (!name) {
        setErrorMessage("Please input your name");
      } else if (!username) {
        setErrorMessage("Please input your username");
      } else if (!email) {
        setErrorMessage("Please input your email");
      } else if (!password) {
        setErrorMessage("Please input your password");
      }
      console.log("Registration failed");
    }

    try {
      await register({
        variables: {
          newUser: {
            name,
            username,
            email,
            password,
          },
        },
      });
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 relative bg-white">
        <StatusBar style="auto" />
        <View style={tw`bg-green-400 p-2 pt-16 rounded-b-3xl shadow-lg`}>
          <Text className="text-4xl ml-6 text-white font-poppins-bold">
            Halo!
          </Text>
          <Text className="ml-6 text-lg text-white mb-28 font-poppins-regular">
            Silahkan buat akun
          </Text>
        </View>

        {errorMessage && (
          <Text style={tw`text-red-500 mb-3`}>{errorMessage}</Text>
        )}

        <View
          style={
            isFocused
              ? tw`flex absolute top-10 left-5 right-5 pt-12 pb-6 items-center mt-6 rounded-2xl bg-white shadow-lg`
              : tw`flex absolute top-40 left-5 right-5 pt-12 pb-6 items-center mt-6 rounded-2xl bg-white shadow-lg`
          }
        >
          <TextInput
            style={tw`h-12 my-2 border border-gray-300 px-4 w-4/5 bg-white rounded-full`}
            value={name}
            onChangeText={setName}
            placeholder="Nama"
          />
          <TextInput
            style={tw`h-12 my-2 border border-gray-300 px-4 w-4/5 bg-white rounded-full`}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={true}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#1DA1F2" />
          ) : (
            <TouchableOpacity
              style={tw`items-center bg-green-600 p-3 w-4/5 rounded-2xl mt-4 `}
              onPress={handleRegister}
            >
              <Text className="text-white font-poppins-bold">DAFTAR</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-center text-black mt-5 font-poppins-regular">
              Sudah punya akun? Silahkan{" "}
              <Text style={tw`text-blue-500 font-bold`}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
