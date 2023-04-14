import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/Main/HomeScreen";
import CreatePostsScreen from "../Screens/Main/CreatePostsScreen";
import ProfileScreen from "../Screens/Main/ProfileScreen";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import { authStateChange } from "../redux/auth/authOperations";
import RegistrationScreen from "../Screens/RegistrationScreen/RegistrationScreen";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.stateChange);

  useEffect(() => {
    dispatch(authStateChange());
  }, []);

  const authpath = (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Registration"
        options={{ headerShown: false }}
        component={RegistrationScreen}
      />
    </Stack.Navigator>
  );

  const homepath = (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
          headerTitleAlign: "center",
        }}
        name="Публікації"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="plus" size={size} color={color} />
          ),
          headerTitleAlign: "center",
        }}
        name="Створити публікацію"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );

  return !isAuth ? authpath : homepath;
};

export default Router;
