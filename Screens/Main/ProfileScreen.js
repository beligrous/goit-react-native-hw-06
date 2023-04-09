import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOut } from "../../redux/auth/authOperations.js";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authSignOut());
  };

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <TouchableOpacity
        onPress={handleLogOut}
        activeOpacity={0.7}
        style={styles.btn}
      >
        <Image source={require("../image/log-out.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
