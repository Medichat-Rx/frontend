// import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Button } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import * as SecureStore from "expo-secure-store";
import MyTabs from "./navigators/MyTabs";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  // const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      console.log(token);
      if (token) {
        setIsSignedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    // console.log(getToken())
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MyTabs isSignedIn={isSignedIn} />
        </NavigationContainer>
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
});
