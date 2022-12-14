import { useEffect, useRef } from "react";

import { Animated } from "react-native";

const useAnimation = (location: any, loading: any, route: any) => {
  const translation = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translation, {
          toValue: 20,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animate();
  }, []);

  useEffect(() => {
    if (!(location && !loading && route)) return;
    translation.stopAnimation();
  }, [location, loading, route]);

  return { translation };
};

export default useAnimation;
