import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import useAuth from "./useAuth";

const useUser = (isLogin = false) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  console.log("currentUser", currentUser);
  useFocusEffect(
    React.useCallback(() => {
      if (!currentUser) navigation.navigate("Login" as never);
      if (currentUser && isLogin) navigation.navigate("Profile" as never);

      setLoading(false);
    }, [currentUser])
  );

  return { loading };
};

export default useUser;
