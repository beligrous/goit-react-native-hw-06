import {
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignOut } from "../../redux/auth/authOperations.js";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authSignOut());
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../image/PhotoBG.jpg")}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.photo}></View>
          <TouchableOpacity>
            <Image
              style={styles.logOutBtn}
              source={require("../image/log-out.png")}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    position: "relative",
    height: 550,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  logOutBtn: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10,
  },
});

export default ProfileScreen;
