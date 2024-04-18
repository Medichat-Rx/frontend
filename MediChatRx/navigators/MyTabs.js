import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Tab = createBottomTabNavigator();

const MyTabs = ({ isSignedIn }) => {
  return (
    <>
      <Tab.Navigator>
        {isSignedIn ? (
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="home-sharp" size={24} color="black" />;
              },
            }}
          />
          // ... rest of your code
        ) : (
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarIcon: () => {
                return (
                  <MaterialCommunityIcons
                    name="login-variant"
                    size={24}
                    color="black"
                  />
                );
              },
            }}
          />
          // ... rest of your code
        )}
      </Tab.Navigator>
    </>
  );
};

export default MyTabs;
