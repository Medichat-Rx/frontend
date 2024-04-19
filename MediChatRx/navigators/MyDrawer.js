import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen"; // Added import for ProfileScreen
import React from "react";
import ArticleScreen from "../screens/ArticleScreen";
import DetailScreen from "../screens/DetailScreen";
import MyStack from "./MyStack";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();

export default function MyDrawer({ isSignedIn }) {
  return (
    <Drawer.Navigator
     screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#020101",
        },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
      }}
     >
      {isSignedIn ? (
        <React.Fragment>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen
            name="Articles"
            component={ArticleScreen}
            // options={{drawerLabel: () => <Text>Articles</Text>}}
          />
          <Drawer.Screen  name="Detail" component={DetailScreen} 
          options={{ drawerLabel: () => null }} 
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
        </React.Fragment>
      )}
    </Drawer.Navigator>
  );
}