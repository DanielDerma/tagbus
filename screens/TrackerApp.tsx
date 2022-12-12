import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Image, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { COORDINATES_ROUTE, COORDINATES_STOPS } from "../utils";
import useUser from "../hook/useUser";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const { loading } = useUser();

  useEffect(() => {
    if (loading) return;
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    const watchId = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLocation) => {
        setLocation(newLocation);
      }
    );

    getPermission();
  }, [loading]);

  if (location === null || loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
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
        }}>
        <Polyline coordinates={COORDINATES_ROUTE} strokeColor={"#00b0fd"} strokeWidth={4} />
        {COORDINATES_STOPS.map((stop, index) => (
          <Marker
            key={index}
            coordinate={stop.coordinates}
            title={stop.title}
            pinColor={stop.pinColor}
          />
        ))}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title={"You are here"}
        />
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
