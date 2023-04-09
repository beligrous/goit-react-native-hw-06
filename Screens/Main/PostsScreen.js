import { useState, useEffect } from "react";
import { Image, View, StyleSheet, FlatList, Pressable } from "react-native";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!route.params) {
      return;
    }
    setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32 }}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View style={styles.nested}>
              <Pressable onPress={() => navigation.navigate("Comments")}>
                <Image source={require("../image/message-circle.png")} />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Map")}>
                <Image source={require("../image/map-pin.png")} />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
