import { Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Text from "../../../components/Text/Text";
const { width } = Dimensions.get("window");
interface SlideDetailProps {
  slide: any;
  scrollOffset: any;
  index: number;
}
const SlideDetail = ({ slide, scrollOffset, index }: SlideDetailProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const input = scrollOffset.value / width;
    const inputRange = [index - 1, index, index + 1];

    return {
      transform: [
        {
          scale: interpolate(input, inputRange, [0, 1, 0], Extrapolate.CLAMP),
        },
      ],
      opacity: interpolate(input, inputRange, [0, 1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <Animated.View
      key={index}
      style={[
        {
          flex: 1,
          width: width,
          paddingHorizontal: 20,
          position: "absolute",

          marginTop: 20,
        },
        animatedStyle,
      ]}
    >
      <Text
        style={{
          marginBottom: 20,
          fontSize: 30,
          fontWeight: "bold",
          color: "#000",
          textAlign: "center",
        }}
      >
        {slide.title}
      </Text>
      <Text
        style={{
          color: "#000",
          textAlign: "justify",
          fontWeight: "100",
        }}
      >
        {slide.body}
      </Text>
    </Animated.View>
  );
};
export default SlideDetail;
