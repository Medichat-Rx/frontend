import { useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import gql from "graphql-tag";
import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
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

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMessage("");
    console.log("Attempting to register with", email, password, name, username);

    if (!password || !name || !username || !email) {
      if (!name) {
        setErrorMessage("Please input your name");
      } else if (!username) {
        setErrorMessage("Please input in your username");
      } else if (!email) {
        setErrorMessage("Please input in your email");
      } else if (!password) {
        setErrorMessage("Please input in your password");
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
        value={name}
        onChangeText={setName}
        placeholder="Name"
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
        secureTextEntry={true}
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
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={tw`text-base text-center text-black mt-5`}>
          Sudah punya akun? Silahkan{" "}
          <Text style={tw`text-blue-500`}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

