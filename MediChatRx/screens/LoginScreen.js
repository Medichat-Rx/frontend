import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
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
import { Ionicons, Entypo } from "@expo/vector-icons";
import { styled } from "nativewind";
import { GET_USER_COMPLAINT } from "../queries/GetUserComplaint";
import Loading from "../components/LoadingComponent";

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
  const { setIsSignedIn, setIsNewUser } = useContext(AuthContext);

  const StyledTouchableOpacity = styled(TouchableOpacity);

  const [loginInput] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [GET_USER_COMPLAINT],
  });

  const [getUserComplaint, { data, loading, error }] =
    useLazyQuery(GET_USER_COMPLAINT);

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

      // console.log(data.login.email, "<<<<<<<<<<<<");
      const test = await SecureStore.setItemAsync(
        "access_token",
        data.login.access_token
      );
      // console.log(test);
      const check = await SecureStore.getItemAsync("access_token");
      // console.log(check, "<<<<<");
      console.log("Login success");

      getUserComplaint().then((res) => {
        setIsSignedIn(true);
      });
    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.log("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(error, loading, data, "<<<<<<< LAZYQUERY");

  useEffect(() => {
    if (!loading && data) {
      if (data.getUserComplaint) {
        setIsNewUser(false);
      } else {
        setIsNewUser(true);
      }
    }
  }, [loading, data]);
  return (
    <View className="flex-1 bg-blue-100">
      <StatusBar style="auto" />

      <View className="relative flex-1">
        <View className="bg-blue-100 pt-6"></View>
        <Image
          className="w-full h-full pt-10"
          src="https://img.freepik.com/premium-vector/blue-abstract-background-health_66029-25.jpg?w=740"
        ></Image>
        <Text className="absolute top-28 left-0 right-0 text-center text-black text-3xl font-lexend-bold">
          Selamat Datang di{" "}
          <Text className="text-green-500 font-poppins-boldItalic">
            MediChat
          </Text>{" "}
          <Text className="text-blue-600 font-poppins-bold">Rx</Text>
        </Text>

        <Image
          source={require("../assets/i-icon.png")}
          style={tw`absolute left-1/2 top-48 w-1/2 h-1/2`}
        ></Image>
      </View>

      <View className="flex-1 items-center justify-center p-6 rounded-t-3xl bg-white font-poppins-regular shadow-lg">
        <Text className="text-xl text-blue-900 self-start mb-5 ml-2 font-poppins-bold">
          Silahkan Login
        </Text>
        {errorMessage && (
          <Text style={tw`text-red-500 mb-3`}>{errorMessage}</Text>
        )}
        <View className="flex flex-row items-center">
          <View className="flex flex-row items-center px-5 gap-5 ">
            <Ionicons name="people-outline" size={24} color="black" />
            <TextInput
              className="h-12 my-2 border-gray-300 border-b  px-4 w-64 bg-white font-poppins-regular "
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </View>
        </View>

        <View className="flex flex-row items-center">
          <View className="flex flex-row items-center px-5 gap-5 ">
            <Entypo name="key" size={24} color="black" />
            <TextInput
              className="h-12 my-2 border-gray-300 border-b  px-4 w-64 bg-white font-poppins-regular "
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#1DA1F2" />
        ) : (
          <StyledTouchableOpacity
            className="items-center bg-blue-600 p-3 w-full rounded-2xl mt-4 shadow"
            onPress={handleLogin}
          >
            <Text style={tw`text-white font-bold`}>LOGIN</Text>
          </StyledTouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className=" text-center text-black mt-5 font-poppins-regular">
            Belum punya akun? Silahkan{" "}
            <Text className="text-blue-500 font-bold">Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
