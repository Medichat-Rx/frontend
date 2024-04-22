import React from "react";
import { StyleSheet, View, Text, Alert, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import tw from "tailwind-react-native-classnames";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import ArticleScreen from "../screens/ArticleScreen";
import DetailScreen from "../screens/DetailScreen";
import LogoutButton from "../components/LogoutButton";
import UserComplaintScreen from "../screens/UserComplaintScreen";
import { styled } from "nativewind";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ isSignedIn, ...props }) {
  return (
    <DrawerContentScrollView {...props}>
      <StyledView className="flex items-center p-5 font-poppins-regular">
        <Image
          source={{
            uri: "https://assets.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png?t=o&v=300",
          }}
          style={tw`w-24 h-24 rounded-full m-3`}
        />
        <StyledText className="text-lg text-white font-poppins-bold">
          Username
        </StyledText>
        <StyledText className="text-white font-poppins-regular">
          {"@username"}
        </StyledText>
      </StyledView>

      <StyledView className="flex justify-between">
        <DrawerItemList {...props} />

        <View className="bg-white justify-end">
          <LogoutButton />
        </View>
      </StyledView>
    </DrawerContentScrollView>
  );
}

export default function MyDrawer({ isSignedIn }) {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: true,
          drawerStyle: {
            backgroundColor: "#020101",
          },
          drawerActiveTintColor: "#00b5e3",
          drawerInactiveTintColor: "white",
          drawerIcon: (props) => {
            if (route.name == "Chat") {
              return <Ionicons name="chatbubbles" size={24} color="white" />;
            }

            if (route.name == "Profil") {
              return (
                <MaterialCommunityIcons
                  name="face-man-profile"
                  size={24}
                  color="white"
                />
              );
            }

            if (route.name == "KeluhanMu") {
              return <FontAwesome5 name="disease" size={24} color="white" />;
            }

            if (route.name == "Map") {
              return <Entypo name="map" size={24} color="white" />;
            }

            if (route.name == "Artikel") {
              return (
                <MaterialCommunityIcons
                  name="newspaper-variant-multiple-outline"
                  size={24}
                  color="white"
                />
              );
            }
          },
        };
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Chat" component={HomeScreen} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
      <Drawer.Screen name="KeluhanMu" component={UserComplaintScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Artikel" component={ArticleScreen} />
    </Drawer.Navigator>
  );
}
