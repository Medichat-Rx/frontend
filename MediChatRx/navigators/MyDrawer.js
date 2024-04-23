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
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_LOG_PROFILE } from "../queries/GetCurrentLogProfile";
import Loading from "../components/LoadingComponent";
import { createAvatar } from "@dicebear/core";

import { notionists } from "@dicebear/collection";
import { SvgXml } from "react-native-svg";

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ isSignedIn, ...props }) {
  const { loading, error, data } = useQuery(GET_CURRENT_LOG_PROFILE);
  if (loading) {
    console.log("fetching profile... from drawer");
    return <Loading />;
  }

  const avatar = createAvatar(notionists, {
    seed: `${data.findCurrentLogUser.name}`,
    backgroundColor: ["ffdfbf"],
  }).toString();

  return (
    <DrawerContentScrollView {...props}>
      <StyledView className="flex items-center p-5 font-poppins-regular pt-10">
        <SvgXml xml={avatar} style={tw`w-24 h-24 rounded-lg m-3`} />

        <StyledText className="text-lg text-white font-poppins-bold">
          Hai, {data.findCurrentLogUser.name}
        </StyledText>
        <StyledText className="text-white font-poppins-regular">
          {`@${data.findCurrentLogUser.username}`}
        </StyledText>
      </StyledView>

      <DrawerItemList {...props} />

      <StyledView className="mt-5">
        <LogoutButton />
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
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          drawerContentContainerStyle: { backgroundColor: "white" },
          drawerType: "back",
          drawerActiveTintColor: "#00b5e3",
          drawerInactiveTintColor: "white",
          drawerLabelStyle: {
            fontFamily: "Poppins-Bold", // Ganti dengan nama font yang Anda inginkan
          },
          // drawerItemStyle: {backgroundColor: "white", marginTop: ""},
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
