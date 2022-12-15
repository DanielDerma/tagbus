import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Animated, {
  BounceInDown,
  BounceOutDown,
  FadeInDown,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

import { MapDirectionsResponse } from "../types";

type PopupProps = {
  user: MapDirectionsResponse | undefined;
  bus: MapDirectionsResponse | undefined;
  stopTitle: string;
};

const Popup = (props: PopupProps) => {
  const { user, bus, stopTitle } = props;
  if (!user || !bus) return null;
  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={styles.container}
    >
      <Text>{stopTitle}</Text>
      {[bus, user].map((elem, i) => {
        const { distance, duration } = elem;
        const distanceKms = (Math.round(distance * 100) / 100).toFixed(2);
        const durationMins = Math.ceil(duration);
        return (
          <View key={i}>
            <View style={styles.infoRouteCard}>
              <View>
                <Image
                  style={styles.image}
                  source={{ uri: "https://picsum.photos/200" }}
                />
              </View>
              <View>
                <Text>{i === 0 ? "Camion" : "Usuario"}</Text>
                <Text>
                  ({distanceKms}Kms,{durationMins} minutes)
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </Animated.View>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    minHeight: 100,
    bottom: 10,
    alignSelf: "center",
    position: "absolute",
    backgroundColor: "#103458",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  infoRouteCard: {
    flexDirection: "row",
  },
});
