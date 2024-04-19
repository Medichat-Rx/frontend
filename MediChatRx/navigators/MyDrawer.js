import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import React from "react";
import ArticleScreen from "../screens/ArticleScreen";
import DetailScreen from "../screens/DetailScreen";

const Drawer = createDrawerNavigator();

export default function MyDrawer({ isSignedIn }) {
  return (
    <Drawer.Navigator>
      {isSignedIn ? (
        <React.Fragment>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen
            name="Articles about health"
            component={ArticleScreen}
          />
          <Drawer.Screen name="Detail" component={DetailScreen} options={{ drawerLabel: () => null }} />
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

