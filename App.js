import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./redux/store";
import "./firebase/config";
import Router from "./src/router";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <View style={styles.container}>
          <Router />
        </View>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
