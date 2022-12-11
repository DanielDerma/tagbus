import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useUser = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      navigation.navigate("Login" as never);
    }
  }, []);

  return { loading };
};

export default useUser;
