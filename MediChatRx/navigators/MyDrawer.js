import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import React from 'react';

const Drawer = createDrawerNavigator();

export default function MyDrawer({ isSignedIn }) {
  return (
    <Drawer.Navigator>
      {isSignedIn ? 
        <Drawer.Screen name="Home" component={HomeScreen} />  
        // <Drawer.Screen name="Article" component={''} />  
      : (
        <React.Fragment>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
        </React.Fragment>
      )}

    </Drawer.Navigator>
  );
}