import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./client";
import { UserInfoType } from "../types";

export const getRoute = async (uid: string) => {
  const userRef = doc(firestore, "user", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.data();
};

export const getCurrentUser = async (uid: string) => {
  const userRef = doc(firestore, "user", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.data() as UserInfoType;
};
