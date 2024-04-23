// import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button, Image } from "react-native"; // Added Image import
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import client from "./config/apolloClient";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import * as SecureStore from "expo-secure-store";
import MyDrawer from "./navigators/MyDrawer";
import { useFonts } from "expo-font";
import MyStack from "./navigators/MyStack";
import { GET_USER_COMPLAINT } from "./queries/GetUserComplaint";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  // const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [loaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-BoldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Lexend-Regular": require("./assets/fonts/Lexend-Regular.ttf"),
    "Lexend-Bold": require("./assets/fonts/Lexend-Bold.ttf"),
  });

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      // console.log(token);
      if (token) {
        setIsSignedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 1000); // 1 seconds splash screen delay
    getToken();
    // console.log(getToken())
  }, []);

  if (!isReady) {
    return (
      <View style={styles.splashScreen}>
        <Image
          source={require("./assets/i-icon.png")}
          style={styles.splashImage}
        />
      </View>
    );
  }

  if (!loaded) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        isNewUser,
        setIsSignedIn,
        setIsNewUser,
      }}
    >
      <ApolloProvider client={client}>
        <MyStack test={"test"} />
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  splashScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  splashImage: {
    width: 100,
    height: 100,
  },
});
