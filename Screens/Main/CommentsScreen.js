import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  const [isCommentActive, setIsCommentActive] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);

  const addCommentHandler = () => {
    console.log(comment);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsKeyboard(false);
      }}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Коментувати"
          value={comment}
          onChangeText={(value) => setComment(value)}
          onFocus={() => {
            setIsKeyboard(true);
            setIsCommentActive(true);
          }}
          onBlur={() => setIsCommentActive(false)}
          style={{
            ...styles.input,
            borderColor: isCommentActive ? "#FF6C00" : "#E8E8E8",
            marginBottom: isKeyboard ? 32 : 43,
          }}
        />
        <TouchableOpacity
          onPress={addCommentHandler}
          activeOpacity={0.7}
          style={{
            ...styles.btn,
            backgroundColor: comment ? "#FF6C00" : "#F6F6F6",
          }}
        >
          <Text>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  btn: {
    height: 50,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "transparent",
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    marginHorizontal: 16,
  },
});

export default CommentsScreen;
