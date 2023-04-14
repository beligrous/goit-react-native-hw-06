import { useState } from "react";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { authSignIn } from "../../redux/auth/authOperations";

function LoginScreen({ navigation }) {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setPasswordActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoad } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.auth);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../font/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../font/Roboto-Regular.ttf"),
  });

  formSubmit = () => {
    dispatch(authSignIn({ email, password }));
    setEmail("");
    setPassword("");
  };

  if (!fontsLoaded) {
    return null;
  }

  const renderScreen = (
    <>
      {error && (
        <View style={{ margin: 50 }}>
          <Text>{error}</Text>
        </View>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setIsKeyboard(false);
        }}
      >
        <ImageBackground
          style={styles.image}
          source={require("../image/PhotoBG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholder="Адреса електронної пошти"
                onFocus={() => {
                  setIsKeyboard(true);
                  setIsEmailActive(true);
                }}
                onBlur={() => setIsEmailActive(false)}
                style={{
                  ...styles.input,
                  borderColor: isEmailActive ? "#FF6C00" : "#E8E8E8",
                }}
              />
              <TextInput
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                }}
                secureTextEntry={true}
                placeholder="Пароль"
                style={{
                  ...styles.input,
                  borderColor: isPasswordActive ? "#FF6C00" : "#E8E8E8",
                  marginBottom: isKeyboard ? 32 : 43,
                }}
                onBlur={() => setPasswordActive(false)}
                onFocus={() => {
                  setIsKeyboard(true);
                  setPasswordActive(true);
                }}
              />
              {!isKeyboard && (
                <>
                  <TouchableOpacity
                    onPress={formSubmit}
                    activeOpacity={0.7}
                    style={styles.btn}
                  >
                    <Text style={styles.btnTitle}>Увійти</Text>
                  </TouchableOpacity>
                  <Text
                    style={styles.noAcountTitle}
                    onPress={() => navigation.navigate("Registration")}
                  >
                    Ще немає акаунта? Зареєструватися
                  </Text>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </>
  );

  return isLoad ? (
    <View
      style={{
        flex: 1,
        borderTopWidth: 2,
        borderColor: "#F6F6F6",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  ) : (
    renderScreen
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 32,
    textAlign: "center",
  },

  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 50,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  noAcountTitle: {
    fontFamily: "Roboto-Regular",
    marginTop: 16,
    marginBottom: 144,
    textAlign: "center",
  },
});
