import React from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import tw from "tailwind-react-native-classnames";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import ArticleScreen from '../screens/ArticleScreen';
import DetailScreen from '../screens/DetailScreen';
import LogoutButton from '../components/LogoutButton';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ isSignedIn, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      {isSignedIn && ( 
      <View style={tw`items-center p-5`}>
        <Image source={{ uri: "https://assets.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png?t=o&v=300" }} style={tw`w-24 h-24 rounded-full m-3`} />
        <Text style={tw`text-lg text-white font-bold`}>Username</Text>
        <Text style={tw`text-white`}>{"@username"}</Text>
      </View>
      )}
      <DrawerItemList {...props} />

      {isSignedIn && (
        <View style={tw`justify-end`}>
          <LogoutButton />
        </View>
      )}
    </DrawerContentScrollView>
  );
}

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
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen name="Articles" component={ArticleScreen} />
          <Drawer.Screen name="Detail" component={DetailScreen} options={{ drawerLabel: () => null }} />
        </>
      ) : (
        <>
          <Drawer.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Drawer.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
}