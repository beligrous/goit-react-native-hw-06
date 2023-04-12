import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  Text,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

const CreatePostsScreen = ({ navigation }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [imageName, setImageName] = useState("");
  const [location, setLocation] = useState(null);
  const [isLocationActive, setIsLocationActive] = useState(false);
  const [isImageNameActive, setIsImageNameActive] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);
  const { userId, nickName } = useSelector((state) => state.auth);

  const takePhoto = async () => {
    const photo = await snap.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri);
  };

  const uploadPhoto = async () => {
    const response = await fetch(photo);
    const blobFile = await response.blob();
    const photoId = Date.now().toString();
    const storage = getStorage();
    const storageRef = ref(storage, `posts/${photoId}.jpg`);
    const metadata = {
      contentType: "image/jpeg",
    };
    await uploadBytes(storageRef, blobFile, metadata);

    const loadedPhoto = await getDownloadURL(storageRef);
    return loadedPhoto;
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhoto();
      const postRef = await addDoc(collection(firestore, "posts"), {
        photo,
        imageName,
        location: location.coords,
        userId,
        nickName,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Posts");
  };

  const deletePhoto = () => {
    setPhoto("");
  };

  useEffect(() => {
    (async () => {
      await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsKeyboard(false);
      }}
    >
      <View style={styles.container}>
        <Camera style={styles.camera} type={CameraType.back} ref={setSnap}>
          {photo && (
            <View style={styles.photo}>
              <Image
                source={{ uri: photo }}
                style={{ width: 300, height: 200, resizeMode: "cover" }}
              />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto}>
            <Image source={require("../image/camera.png")} />
          </TouchableOpacity>
        </Camera>
        <View>
          <TextInput
            placeholder="Назва"
            value={imageName}
            onChangeText={(value) => setImageName(value)}
            onFocus={() => {
              setIsKeyboard(true);
              setIsImageNameActive(true);
            }}
            onBlur={() => setIsImageNameActive(false)}
            style={{
              ...styles.input,
              borderColor: isImageNameActive ? "#FF6C00" : "#E8E8E8",
              marginBottom: isKeyboard ? 32 : 43,
            }}
          />
          <TextInput
            placeholder="Місцевість"
            value={location}
            onChangeText={(value) => setLocation(value)}
            onFocus={() => {
              setIsKeyboard(true);
              setIsLocationActive(true);
            }}
            onBlur={() => setIsLocationActive(false)}
            style={{
              ...styles.input,
              borderColor: isLocationActive ? "#FF6C00" : "#E8E8E8",
              marginBottom: isKeyboard ? 32 : 43,
            }}
          />
          <TouchableOpacity
            onPress={sendPhoto}
            activeOpacity={0.7}
            style={{
              ...styles.btn,
              backgroundColor: imageName && photo ? "#FF6C00" : "#F6F6F6",
            }}
          >
            <Text>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={deletePhoto}
            style={{
              marginTop: 100,
              alignSelf: "center",
            }}
          >
            <Image source={require("../image/trash.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  camera: {
    position: "relative",
    height: 240,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 59,
  },
  photo: {
    position: "absolute",
    top: 20,
    left: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
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

export default CreatePostsScreen;
