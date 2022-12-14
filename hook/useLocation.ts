import { useEffect, useState } from "react";
import * as Location from "expo-location";

import { getRoute } from "../services/firebaseFunctions";

import { LatLng, routeType, UserInfoType } from "../types";

const useLocation = (loading: boolean, infoUser: UserInfoType | null | undefined) => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [route, setRoute] = useState<routeType>();

  const handleRoutes = () => {
    if (!infoUser) return;
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
    handleRoutes();
  }, [loading]);

  if (!location) {
    return { location: null, route };
  }

  const myLocation = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
  } as LatLng;

  return { location: myLocation, route };
};

export default useLocation;