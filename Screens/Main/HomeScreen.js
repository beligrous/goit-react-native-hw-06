import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import MapScreen from "./MapScreen";
import PostsScreen from "./PostsScreen";
import CommentsScreen from "./CommentsScreen";

const HomeScreen = ({ navigation, route }) => {
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen
          name={"Posts"}
          options={{ headerShown: false }}
          component={PostsScreen}
        />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default HomeScreen;
