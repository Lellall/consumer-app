import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
interface SlideIndicatorProps {
  scrollOffset: any;
  index: number;
}
const { width } = Dimensions.get("window");
export default function SlideIndicator({
  scrollOffset,
  index,
}: SlideIndicatorProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / width;
    const inputRange = [index - 1, index, index + 1];
    const animatedColor = interpolateColor(input, inputRange, [
      "#AAAAAA",
      "#F06D06",
      "#AAAAAA",
    ]);

    return {
      //   width: interpolate(input, inputRange, [20, 100,20], Extrapolate.CLAMP),
      backgroundColor: animatedColor,
    };
  });
  return (
    <Animated.View style={[styles.indicator, animatedStyle]}></Animated.View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 9,
    borderRadius: 9,
    width: 9,
    marginRight: 10,
  },
});
