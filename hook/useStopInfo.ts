import { coordinatesStopsTypes, LatLng, MapDirectionsResponse } from "../types";
import { useState } from "react";
import type { MarkerPressEvent } from "react-native-maps";

const useStopInfo = () => {
  const [routingDataUser, setRoutingDataUser] =
    useState<MapDirectionsResponse>();
  const [routingDataBus, setRoutingDataBus] = useState<MapDirectionsResponse>();
  const [selected, setSelected] = useState<LatLng>();
  const [stopTitle, setStopTitle] = useState<string>("");

  const updateStop = (e: MarkerPressEvent, stop: coordinatesStopsTypes) => {
    setSelected(e.nativeEvent.coordinate);
    setStopTitle(stop.title);
  };

  const cancelStop = () => {
    setRoutingDataUser(undefined);
    setRoutingDataBus(undefined);
    setSelected(undefined);
    setStopTitle("");
  };

  return {
    routingDataUser,
    routingDataBus,
    setRoutingDataUser,
    setRoutingDataBus,
    selected,
    stopTitle,
    updateStop,
    cancelStop,
  };
};

export default useStopInfo;
