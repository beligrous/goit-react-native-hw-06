import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  Keyboard,
} from "react-native";
// import { useUser } from "../../src/userContext";
import { useDispatch, useSelector } from "react-redux";
// import { Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { authSignUp } from "../../redux/auth/authOperations";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

function RegistrationScreen({ navigation }) {
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { logIn } = useUser();
  const dispatch = useDispatch();
  const { isLoad } = useSelector((state) => state.auth);

  // const [dimensions, setDimensions] = useState(
  //   Dimensions.get("window").width - 16 * 2
  // );
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../font/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../font/Roboto-Regular.ttf"),
  });

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width - 16 * 2;
  //     Dimensions.addEventListener("change", onChange);
  //     return () => {
  //       Dimensions.removeEventListener("change", onChange);
  //     };
  //   };
  // }, []);

  const formSubmit = () => {
    dispatch(authSignUp({ email, password, login }));
    setEmail("");
    setLogin("");
    setPassword("");
  };

  if (!fontsLoaded) {
    return null;
  }

  const renderScreen = (
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
            <View style={styles.photo}></View>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              placeholder="Логін"
              value={login}
              onChangeText={(value) => setLogin(value)}
              onFocus={() => {
                setIsKeyboard(true);
                setIsLoginActive(true);
              }}
              onBlur={() => setIsLoginActive(false)}
              style={{
                ...styles.input,
                borderColor: isLoginActive ? "#FF6C00" : "#E8E8E8",
              }}
            />
            <TextInput
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={(value) => setEmail(value)}
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
              secureTextEntry={true}
              placeholder="Пароль"
              value={password}
              onChangeText={(value) => setPassword(value)}
              onFocus={() => {
                setIsKeyboard(true);
                setIsPasswordActive(true);
              }}
              onBlur={() => setIsPasswordActive(false)}
              style={{
                ...styles.input,
                borderColor: isPasswordActive ? "#FF6C00" : "#E8E8E8",
                marginBottom: isKeyboard ? 32 : 43,
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
                  onPress={() => navigation.navigate("Login")}
                >
                  Вже є акаунт? Увійти
                </Text>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
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

export default RegistrationScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    position: "relative",
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginTop: 92,
    marginBottom: 16,
    textAlign: "center",
  },
  photo: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
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
    marginBottom: 78,
    textAlign: "center",
  },
});
