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

      console.log(data.login.email, "<<<<<<<<<<<<");
      const test = await SecureStore.setItemAsync(
        "access_token",
        data.login.access_token
      );
      console.log(test);
      const check = await SecureStore.getItemAsync("access_token");
      console.log(check, "<<<<<");
      console.log("Login success");
      setIsSignedIn(true);
    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.log("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="auto" />

      <View style={tw`relative flex-1`}>
        <View style={tw`bg-white pt-6`}></View>
        <Image
          style={tw`w-full h-full pt-10`}
          src="https://img.freepik.com/premium-vector/blue-abstract-background-health_66029-25.jpg?w=740"
        ></Image>
        <Text
          style={tw`absolute top-28 left-0 right-0 text-center text-black text-3xl font-bold`}
        >
          Selamat Datang di MediChat Rx
        </Text>

        <Image
          source={require("../assets/i-icon.png")}
          style={tw`absolute left-1/2 top-48 w-1/2 h-1/2`}
        ></Image>
      </View>

      <View
        className="flex-1 items-center justify-center p-6 rounded-t-3xl bg-white"
      >
        <Text className="text-xl text-slate-800 self-start mb-5 font-bold ml-2">
          Silahkan Login
        </Text>
        {errorMessage && (
          <Text style={tw`text-red-500 mb-3`}>{errorMessage}</Text>
        )}
        <TextInput
          className="h-12 my-2 border border-gray-300 px-4 w-full  bg-white rounded-full"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          className="h-12 my-2 border border-gray-300 px-4 w-full  bg-white rounded-full"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <TouchableOpacity
            className="items-center bg-blue-400 p-3 w-full rounded-2xl mt-4"
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
    </View>
  );
}
