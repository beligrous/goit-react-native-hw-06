import { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { collection, addDoc, doc } from "firebase/firestore";
import {
  Image,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [isCommentActive, setIsCommentActive] = useState(false);
  const postId = route.params.postId;
  const { nickName } = useSelector((state) => state.auth);

  const addCommentHandler = async () => {
    const docRef = doc(firestore, "posts", postId);
    await addDoc(collection(docRef, "comments"), {
      comment,
      nickName,
    });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
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
