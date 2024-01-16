import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { ShoeImage } from "../../../../assets/Images";
import Text from "../../../../components/Text/Text";

export default function NotificationItem({ read = false }) {
  return (
    <View style={styles.container}>
      <Image source={ShoeImage} style={styles.image} />
      {read ? (
        <View style={styles.text}>
          <View>
            <Text>Your package is on its way. Estimated time is 02:00:34</Text>
          </View>
          <Text style={{ fontSize: 14, marginTop: 10 }}>12 mins ago</Text>
        </View>
      ) : (
        <View style={styles.text}>
          <View>
            <Text style={{ fontSize: 14 }} h2>
              Your package is on its way. Estimated time is
              <Text style={{ color: "#F06D06", fontSize: 14 }} h2>
                02:00:34
              </Text>
            </Text>
          </View>
          <Text style={{ fontSize: 14, marginTop: 10 }} h2>
            12 mins ago
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 85,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 55,
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});
