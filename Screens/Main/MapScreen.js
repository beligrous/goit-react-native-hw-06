import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 50.009781,
          longitude: 36.334315,
          latitudeDelta: 0.05,
          longitudeDelta: 0.001,
        }}
      >
        <Marker coordinate={{ latitude: 50.009781, longitude: 36.334315 }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MapScreen;
