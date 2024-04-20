import { gql, useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";

const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      email
    }
  }
`;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsSignedIn } = useContext(AuthContext);

  const [loginInput, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => { 
    setIsLoading(true);
    setErrorMessage("");
    // console.log("Attempting to login with", email, password);

    try {
      const { data } = await loginInput({
        variables: {
            email,
            password,
          },
      });
      const test = await SecureStore.setItemAsync("access_token", data.login.access_token);
      // console.log(test)
      // const check = await SecureStore.getItemAsync('access_token')
      // console.log(check, "<<<<<")
      console.log("Login success")
      setIsSignedIn(true);
    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.log("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-white m-5`}>
      <StatusBar style="auto" />

      <Text style={tw`text-3xl text-center font-bold mb-5 text-blue-800`}>
        Selamat Datang di MediChat Rx
      </Text>
      <Text style={tw`text-base text-center text-black mb-5`}>
        Silahkan Log in
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
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={tw`text-base text-center text-black mt-5`}>
          Belum punya akun? Silahkan{" "}
          <Text style={tw`text-blue-500`}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
