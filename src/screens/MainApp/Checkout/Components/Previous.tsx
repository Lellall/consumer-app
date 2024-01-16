import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../../components/Text/Text";
import { ClockIcon, ClockIcon2 } from "../../../../assets/Svg/Index";

export default function Previous() {
  return (
    <View style={styles.container}>
      <View>
        <ClockIcon color="#000" />
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 16 }} h2>
          Summer Hall
        </Text>
        <Text style={{ color: "#AAAAAA" }}>
          12 King’s Landing Street, Westeros
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 10,
  },
});
