import React from "react";
import { StyleSheet, View } from "react-native";

import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import useUser from "../hook/useUser";
import useAuth from "../hook/useAuth";
import useLocation from "../hook/useLocation";
import useStopInfo from "../hook/useStopInfo";

import Popup from "../components/Popup";

import { busLocation } from "../mock";
import TrackerAppPlaceHolder from "../components/TrackerAppPlaceHolder";

export default function App() {
  const { loading } = useUser();
  const { infoUser } = useAuth();
  const { location, route } = useLocation(loading, infoUser);
  const {
    setRoutingDataUser,
    setRoutingDataBus,
    selected,
    updateStop,
    cancelStop,
    routingDataUser,
    routingDataBus,
    stopTitle,
  } = useStopInfo();

  if (!(location && !loading && route)) {
    return <TrackerAppPlaceHolder />;
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
        }}
      >
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
            onPress={(e) => updateStop(e, stop)}
          />
        ))}
        {/* user location */}
        <Marker
          coordinate={location}
          onPress={cancelStop}
          title={"You are here"}
        />
        {/* bus location */}
        <Marker
          coordinate={busLocation.coords}
          pinColor={"#94345D"}
          title={"Bus"}
        />
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
      <Popup
        user={routingDataUser}
        bus={routingDataBus}
        stopTitle={stopTitle}
      />
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
