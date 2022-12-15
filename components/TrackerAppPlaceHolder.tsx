import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";

const TrackerAppPlaceHolder = () => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.4, { duration: 1500 })
      ),
      -1,
      true
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.skeleton, styles.skeletonMap, animatedStyle]}
      />
      <Animated.View
        style={[styles.skeleton, styles.skeletonPopup, animatedStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skeleton: {
    margin: 10,
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.11)",
  },
  skeletonMap: {
    flex: 4,
  },
  skeletonPopup: {
    marginTop: 10,
    flex: 1,
  },
});

export default TrackerAppPlaceHolder;
