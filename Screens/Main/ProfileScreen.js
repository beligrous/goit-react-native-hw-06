import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOut } from "../../redux/auth/authOperations.js";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userId, nickName } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  const getUserPosts = async () => {
    const postsRef = collection(firestore, "posts");
    const q = query(postsRef, where("userId", "==", userId));
    onSnapshot(q, (snap) => {
      let items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      setUserPosts(items);
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const handleLogOut = () => {
    dispatch(authSignOut());
  };

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require("../image/PhotoBG.jpg")}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.photo}></View>
          <TouchableOpacity onPress={handleLogOut}>
            <Image
              style={styles.logOutBtn}
              source={require("../image/log-out.png")}
            />
          </TouchableOpacity>
          <View style={styles.user}>
            <Text style={{ alignSelf: "center" }}>{nickName}</Text>
          </View>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 32, marginHorizontal: 25 }}>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <Text>{item.imageName}</Text>
                <View style={styles.nested}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Коментарі", {
                        postId: item.id,
                        postPhoto: item.photo,
                      })
                    }
                  >
                    <Image source={require("../image/message-circle.png")} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Map", { location: item.location })
                    }
                  >
                    <Image source={require("../image/map-pin.png")} />
                  </TouchableOpacity>
                  <Text>{item.locationName}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  user: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 10,
    justifyContent: "center",
  },
  image: {
    width: 340,
    height: 240,
    borderRadius: 8,
  },
  container: {
    position: "relative",
    height: 600,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  nested: {
    flexDirection: "row",
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
    marginTop: 15,
    marginRight: 10,
  },
});

export default ProfileScreen;
