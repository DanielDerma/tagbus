import { useEffect, useState } from "react";
import * as Location from "expo-location";

import { getRoute } from "../services/firebaseFunctions";

import { LatLng, routeType, UserInfoType } from "../types";
import useAuth from "./useAuth";

const useLocation = (loading: boolean) => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [route, setRoute] = useState<routeType>();
  const { infoUser } = useAuth();

  const handleRoutes = () => {
    if (!infoUser?.route) return;
    getRoute(infoUser?.route).then((res) => {
      setRoute(res);
    });
  };

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

    // const watchId = Location.watchPositionAsync(
    //   {
    //     accuracy: Location.Accuracy.Highest,
    //     timeInterval: 1000,
    //     distanceInterval: 1,
    //   },
    //   (newLocation) => {
    //     setLocation(newLocation);
    //   }
    // );

    getPermission();
    handleRoutes();

    // return () => {
    //   watchId.then((res) => res.remove);
    // };
  }, [loading]);

  if (!location) return { location: null, route };

  const myLocation = {
    latitude: location?.coords?.latitude,
    longitude: location?.coords?.longitude,
  } as LatLng;

  return { location: myLocation, route };
};

export default useLocation;
