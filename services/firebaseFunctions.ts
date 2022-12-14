import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./client";
import { routeType, UserInfoType } from "../types";

export const getRoute = async (route: string) => {
  const userRef = doc(firestore, "routes", route);
  const userSnap = await getDoc(userRef);
  return userSnap.data() as routeType;
};

export const getCurrentUser = async (uid: string) => {
  const userRef = doc(firestore, "users", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.data() as UserInfoType;
};
