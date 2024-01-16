import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { CarouselImage } from "../../../../assets/Images";
import Colors from "../../../../constants/Colors";

export default function HomeCarousel() {
  const width = Dimensions.get("window").width;
  const [currentIndex, setCurrent] = useState(0);
  const data = [...new Array(6).keys()];
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width - 20}
        height={130}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrent(index)}
        renderItem={({ index }) => (
          <ImageBackground style={styles.content} source={CarouselImage} />
        )}
      />
      <View style={styles.indicator}>
        {data.map((_, ind) => (
          <View
            key={ind}
            style={{
              width: currentIndex == ind ? 20 : 7,
              height: 7,
              backgroundColor:
                currentIndex == ind ? Colors.general.secondary : "#fff",
              marginRight: 5,
              borderRadius: 7,
            }}
          />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 130,
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  indicator: {
    marginTop: "auto",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
