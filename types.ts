import type { UserInfo as User } from "firebase/auth";
import type { LatLng as LatLngT } from "react-native-maps";
import type { MapDirectionsResponse as MapDirectionsResponseT } from "react-native-maps-directions";

export type LatLng = LatLngT;
export type MapDirectionsResponse = MapDirectionsResponseT;

export type coordinatesStopsTypes = {
  id: number;
  coordinates: LatLng;
  title: string;
  pinColor: string;
};

export type routeType = {
  coords: LatLng[];
  stops: coordinatesStopsTypes[];
};

export type routingDataType = {
  coords: LatLng[];
  stops: coordinatesStopsTypes[];
};

export type UserInfoType = {
  email: string;
  name: string;
  role: string;
  route: string;
};

export type AuthContextValueType = {
  currentUser: User | null | undefined;
  infoUser: UserInfoType | null | undefined;
  isAuthenticated: boolean;
  company: string | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
};
