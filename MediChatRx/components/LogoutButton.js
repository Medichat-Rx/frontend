import { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import { DrawerItem } from "@react-navigation/drawer";
import tw from "tailwind-react-native-classnames";

const LogoutButton = () => {
  const { setIsSignedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");

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

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default LogoutButton;
