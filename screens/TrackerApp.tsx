import React, { useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

import MapView, { Marker, MarkerPressEvent, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import useUser from "../hook/useUser";
import useAuth from "../hook/useAuth";
import useLocation from "../hook/useLocation";
import useAnimation from "../hook/useAnimation";

import Popup from "../components/Popup";

import { coordinatesStopsTypes, LatLng, MapDirectionsResponse } from "../types";
import { busLocation } from "../mock";

export default function App() {
  const { loading } = useUser();
  const { infoUser } = useAuth();
  const { location, route } = useLocation(loading, infoUser);
  const { translation } = useAnimation(location, loading, route);

  const [routingDataUser, setRoutingDataUser] = useState<MapDirectionsResponse>();
  const [routingDataBus, setRoutingDataBus] = useState<MapDirectionsResponse>();
  const [selected, setSelected] = useState<LatLng>();
  const [stopTitle, setStopTitle] = useState<string>("");

  const handlePressRouter = (e: MarkerPressEvent, stop: coordinatesStopsTypes) => {
    setSelected(e.nativeEvent.coordinate);
    setStopTitle(stop.title);
  };

  const isScreenReady = location && !loading && route;

  if (!isScreenReady) {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "red",
            transform: [{ translateX: translation }],
          }}
        />
        {/* <Animated.View style={[styles.skeleton, styles.skeletonPopup]} /> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/* bus route */}
        <Polyline
          coordinates={route?.coords}
          strokeColor={"#ADE792"}
          strokeWidth={4}
          style={{
            zIndex: -1,
          }}
        />
        {/* stops */}
        {route?.stops.map((stop, index) => (
          <Marker
            key={index}
            coordinate={stop?.coordinates}
            pinColor={stop.pinColor}
            onPress={(e) => handlePressRouter(e, stop)}
          />
        ))}
        {/* user location */}
        <Marker
          coordinate={location}
          onPress={() => console.log("pressed")}
          title={"You are here"}
        />
        {/* bus location */}
        <Marker coordinate={busLocation.coords} pinColor={"#94345D"} title={"Bus"} />
        {/* user location to stop */}
        <MapViewDirections
          origin={location}
          destination={selected}
          onReady={(result) => {
            setRoutingDataUser(result);
          }}
          strokeColor={"#ff0000"}
          strokeWidth={3}
          apikey={process.env.GOOGLE_MAPS_APIKEY || ""}
        />
        {/* bus location to stop */}
        <MapViewDirections
          origin={busLocation.coords}
          onReady={(result) => {
            setRoutingDataBus(result);
          }}
          destination={selected}
          strokeColor={"#0000ff"}
          strokeWidth={4}
          apikey={process.env.GOOGLE_MAPS_APIKEY || ""}
        />
      </MapView>
      <Popup user={routingDataUser} bus={routingDataBus} stopTitle={stopTitle} />
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
  skeleton: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "green",
  },
  skeletonMap: {
    backgroundColor: "green",
    flex: 4,
  },
  skeletonPopup: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "red",
  },
});
