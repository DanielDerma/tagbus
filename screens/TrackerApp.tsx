import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Image, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { COORDINATES_ROUTE, COORDINATES_STOPS } from "../utils";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    const watchLocation = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        setLocation(location);
      }
    );

    getPermission();
  }, []);

  if (location === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline
          coordinates={COORDINATES_ROUTE}
          strokeColor={"#00b0fd"}
          strokeWidth={4}
        />
        {COORDINATES_STOPS.map((stop, index) => (
          <Marker
            key={index}
            coordinate={stop.coordinates}
            title={stop.title}
            pinColor={stop.pinColor}
          >
            <Image
              source={require("../assets/bus.png")}
              style={{ width: 50, height: 50 }}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
