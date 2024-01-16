import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Rating({ rate = 1 }) {
  return (
    <View style={styles.mainRating}>
      <Text style={styles.text}>{rate}</Text>
      <View style={{ flex: 1 }}>
        <View style={styles.rating2}>
          <View style={[styles.rating, { width: `${20 * rate}%` }]}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    width: "100%",
    height: 8,
    backgroundColor: "#F06D06",
    borderRadius: 10,
  },
  mainRating: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    marginRight: 10,
  },
  rating2: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
  },
});
