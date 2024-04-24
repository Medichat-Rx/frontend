import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "../screens/DetailScreen";
import { AuthContext } from "../context/AuthContext";
import MyDrawer from "./MyDrawer";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import CreateUserComplaint from "../screens/CreateUserComplaintScreen";
import { GET_USER_COMPLAINT } from "../queries/GetUserComplaint";
import { useLazyQuery, useQuery } from "@apollo/client";
import Loading from "../components/LoadingComponent";
import { GET_CURRENT_LOG_PROFILE } from "../queries/GetCurrentLogProfile";
import * as SecureStore from "expo-secure-store";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function MyStack(test) {
  const { isSignedIn, setIsSignedIn, isNewUser, setIsNewUser } =
    useContext(AuthContext);

  // const { loading, error, data } = useQuery(GET_USER_COMPLAINT);
  // const [getUserComplaint, { data, loading, error }] =
  //   useLazyQuery(GET_USER_COMPLAINT);

  // console.log(isNewUser, "<<<<<<< isNewUser")
  // const {
  //   loading: loading2,
  //   error: error2,
  //   data: data2,
  // } = useQuery(GET_CURRENT_LOG_PROFILE);

  // console.log(!data.getUserComplaint, "<<<<<<<<");

  // console.log(check, "<<<<<<<<access token")

  // console.log(data2, "<<<<<<<<< user yang sedang login")
  // console.log(data, "<<<<< data userComplaint")
  // useEffect(() => {
  //   console.log(isSignedIn, "<<<<<<< isSignedIn");
  //   if (isSignedIn) {
  //     SecureStore.getItemAsync("access_token").then((res) => {
  //       console.log(res, "<<<<<<< response App");
  //       getUserComplaint()
  //         .then((data) => {
  //           // console.log(data, "<<<<< getUserComplaint");
  //         })
  //         .catch((error) => console.log(error));
  //     });
  //   }
  // }, [isSignedIn]);
  // useEffect(() => {
  //   if (!loading && !error && data) {
  //     if (data?.getUserComplaint) {
  //       console.log(data.getUserComplaint, "<<<<< user lama");
  //       setIsNewUser(false);
  //     } else {
  //       console.log(data?.getUserComplaint, "<<<<< user baru");
  //       setIsNewUser(true);
  //     }
  //   }
  // }, [loading, data]);
  // if (loading || loading2) {
  //   return <Loading />;
  // }
  // console.log(error, loading, data, "<<<<<< LAZYQUERY");

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            {isNewUser ? (
              <>
                <Stack.Screen
                  name="Keluhan"
                  component={CreateUserComplaint}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MyDrawer"
                  component={MyDrawer}
                  options={{ headerShown: false }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="MyDrawer"
                  component={MyDrawer}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="Detail"
                  component={DetailScreen}
                  options={{ headerTransparent: true }}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
