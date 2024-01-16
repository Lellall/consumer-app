import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../../components/Text/Text";
import { StarIcon } from "../../../../assets/Svg/Index";

export default function RatingDetail() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 14 }} h2>
          Mubarak Ibrahim
        </Text>
        <Text style={{ color: "#aaaaaa" }}>Nov 09, 2022</Text>
      </View>
      <View style={styles.star}>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  star: {
    flexDirection: "row",
  },
});
