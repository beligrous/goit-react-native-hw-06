import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isCommentActive, setIsCommentActive] = useState(false);
  const postId = route.params.postId;
  const postPhoto = route.params.postPhoto;
  const { nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const addCommentHandler = async () => {
    const docRef = doc(firestore, "posts", postId);
    await addDoc(collection(docRef, "comments"), {
      comment,
      nickName,
    });
    setComment("");
    Keyboard.dismiss();
  };

  const getAllComments = async () => {
    const docRef = doc(firestore, "posts", postId);
    onSnapshot(collection(docRef, "comments"), (snap) => {
      let items = [];
      snap.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
      setAllComments(items);
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: postPhoto }} style={styles.image} />
        <SafeAreaView style={styles.container}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View>
                <Text>{item.nickName}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <TextInput
          placeholder="Коментувати"
          value={comment}
          onChangeText={(value) => setComment(value)}
          onFocus={() => {
            setIsCommentActive(true);
          }}
          onBlur={() => setIsCommentActive(false)}
          style={{
            ...styles.input,
            borderColor: isCommentActive ? "#FF6C00" : "#E8E8E8",
          }}
        />
        <TouchableOpacity
          onPress={addCommentHandler}
          activeOpacity={0.7}
          style={styles.btn}
        >
          <Image source={require("../image/Send.png")} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  btn: {
    position: "absolute",
    right: 10,
    bottom: 32,
    height: 50,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "transparent",
  },
  comment: {
    borderColor: "#BDBDBD",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 55,
  },
  image: {
    alignSelf: "center",
    width: 340,
    height: 240,
    borderRadius: 8,
  },
  input: {
    position: "relative",
    fontFamily: "Roboto-Regular",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 25,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
  },
});

export default CommentsScreen;
