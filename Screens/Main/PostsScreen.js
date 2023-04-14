import { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { firestore } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const getPosts = async () => {
    try {
      onSnapshot(collection(firestore, "posts"), (snap) => {
        let items = [];
        snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        setPosts(items);
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      await getPosts();
    })();
  }, []);

  return (
    <View style={styles.container}>
      {error && (
        <View>
          <Text style={{ margin: 50 }}>{error}</Text>
        </View>
      )}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32 }}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text>{item.imageName}</Text>
            <View style={styles.nested}>
              <Pressable
                onPress={() =>
                  navigation.navigate("Коментарі", {
                    postId: item.id,
                    postPhoto: item.photo,
                  })
                }
              >
                <Image source={require("../image/message-circle.png")} />
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate("Локація", { location: item.location })
                }
              >
                <Image source={require("../image/map-pin.png")} />
              </Pressable>
              <Text>{item.locationName}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 340,
    height: 240,
    borderRadius: 8,
  },
  nested: {
    flexDirection: "row",
  },
});

export default PostsScreen;
