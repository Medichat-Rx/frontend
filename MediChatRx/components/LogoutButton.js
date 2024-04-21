import { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { DrawerItem } from "@react-navigation/drawer";
import tw from "tailwind-react-native-classnames";
import { useApolloClient } from "@apollo/client";

const LogoutButton = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const client = useApolloClient()

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await client.clearStore()

    setIsSignedIn(false);
  };

  return (
    <DrawerItem
      label="Log out"
      onPress={handleLogout}
      labelStyle={tw`text-white`}
      style={tw`bg-red-500`}
    />
  );
};

export default LogoutButton;
