import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen"; // Added import for ProfileScreen
import React from "react";
import ArticleScreen from "../screens/ArticleScreen";
import DetailScreen from "../screens/DetailScreen";
// import MyStack from "./MyStack";
import { Text, Alert, View, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import MapScreen from "../screens/MapScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* tombol logout paling bawah */}
      {props.isSignedIn && (
        <View style={tw`justify-end`}>
          <DrawerItem
            label="Log out"
            onPress={() => {
              // Handle logout logic here
              Alert.alert("Logged Out", "You have been logged out.");
              // For example, navigate to a login screen or reset auth state
            }}
            labelStyle={{ color: "white" }}
            style={styles.logoutButton}
          />
        </View>
      )}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "red",
  },
});

export default function MyDrawer({ isSignedIn }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#020101",
        },
        drawerActiveTintColor: "#00b5e3",
        drawerInactiveTintColor: "white",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} isSignedIn={isSignedIn} />}
    >
      {isSignedIn ? (
        <React.Fragment>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen}
          //  options={{
          //   drawerLabel: () => <Text style={tw`text-white`} color="#00b5e3">Profile</Text>
          //  }}
           />
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen
            name="Articles"
            component={ArticleScreen}
            // options={{
            //   drawerLabel: () => <Text style={tw`text-white`}>Articles</Text>,
            // }}
          />
          <Drawer.Screen
            name="Detail"
            component={DetailScreen}
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
