import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  scrollTo,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import SlideDetail from "./components/SlideDetail";
import SlideIndicator from "./components/SlideIndicator";
import Button from "../../components/Buttons/Button";
import Text from "../../components/Text/Text";
import { GetStartedIcon } from "../../assets/Svg/Index";
import { AuthBg } from "../../assets/Images";
// import SlideDetail from './components/SlideDetail';
// import SlideIndicator from './components/SlideIndicator';
const { height, width } = Dimensions.get("window");

export default function OnboardingHomeScreen({ navigation }) {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const scrollRef = useRef();
  const [step, setStep] = useState(1);
  const sharedValue = useSharedValue(0);
  const manualScrolling = useSharedValue(false);
  const aref = useAnimatedRef();
  // const navigate=useNavigation()
  const animatedProps = useAnimatedProps(() => {
    return {
      contentOffset: { x: sharedValue.value, y: 0 },
    };
  });

  const handleSwipe = (val: number) => {
    if (val === 0) setStep(1);
    if (val === width) setStep(2);
  };

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        if (manualScrolling.value) return;
        sharedValue.value = event.contentOffset.x;
      },
    },
    [manualScrolling]
  );

  const incrementScroll = (x: number) => {
    sharedValue.value = withTiming(x);
    scrollViewRef.current?.scrollTo({
      x: sharedValue.value + width,
      y: 0,
      animated: true,
    });
  };

  const text = useDerivedValue(() => {
    return sharedValue.value === width * 2 ? "Finish" : "Next";
  });

  useDerivedValue(() => {
    manualScrolling.value = true;
    scrollTo(aref, sharedValue.value, 0, true);
    manualScrolling.value = false;
  });

  const decrementScroll = (x: number) => {
    sharedValue.value = withTiming(x);
    scrollViewRef.current?.scrollTo({
      x: sharedValue.value - width,
      y: 0,
      animated: true,
    });
  };
  //   const { colors } = useTheme();
  const slides = [
    {
      title: "easy Shopping anytime and anywhere",
      body: `No more rush-hour traffic, crowded stores, or long checkout lines. Shop smarter, not harder.`,
      image: require("../../assets/Images/0.png"),
    },
    {
      title: "Prompt and secure delivery services",
      body: `Done with shopping? Great. Now leave your delivery to us, and we won't disappoint.`,
      image: require("../../assets/Images/1.png"),
    },
    {
      title: "You Product is finally Here, Enjoy",
      body: `Now you have your product, you can enjoy it with smiles and satisfaction.`,
      image: require("../../assets/Images/2.png"),
    },
  ];

  return (
    <ImageBackground source={AuthBg} style={[styles.container]}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.imagesContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          animatedProps={animatedProps}
          onScroll={scrollHandler}
          onMomentumScrollEnd={(e) =>
            handleSwipe(e.nativeEvent.contentOffset.x)
          }
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          style={[styles.scrollImages]}
        >
          {slides.map((slide, index) => (
            <View key={index.toString()} style={styles.imageSlide}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={slide.image}
              />
              <View style={{ paddingHorizontal: 20 }}>
                <Text
                  style={{
                    marginBottom: 20,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#000",
                    textAlign: "center",
                    marginTop: 20,
                    textTransform: "uppercase",
                  }}
                >
                  {slide.title}
                </Text>
                <Text
                  style={{
                    color: "#000",
                    textAlign: "center",
                    fontWeight: "100",
                  }}
                >
                  {slide.body}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>

      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <SlideIndicator
            index={index}
            scrollOffset={sharedValue}
            key={index.toString()}
          />
        ))}
      </View>
      <Animated.View style={styles.buttons}>
        <Button
          // IconRight={<GetStartedIcon />}
          onPress={() => navigation.navigate("Authentication")}
          fontStyle={{
            color: "#fff",
            textTransform: "uppercase",
          }}
          style={{
            width: "90%",
            backgroundColor: "#0E5D37",
            borderRadius: 25,
          }}
          label="Get Started"
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  imagesContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: width,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  image: {
    height: 250,
    width: "100%",
  },
  scrollImages: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
  imageSlide: {
    width: width,
    height: "auto",
    backgroundColor: "transparent",
    justifyContent: "center",
    position: "relative",
  },
  svg: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  detailSlide: {
    minWidth: width,
    height: "50%",
    backgroundColor: "transparent",
  },
  buttons: {
    height: 120,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingBottom: 30,
    marginTop: 20,
  },
  indicatorContainer: {
    width: "100%",
    backgroundColor: "transparent",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 90,
  },
});
