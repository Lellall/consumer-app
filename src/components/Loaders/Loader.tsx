import { View, Text, StyleSheet, Modal } from "react-native";
import React, { useEffect } from "react";
import Lottie from "lottie-react-native";

export default function Loader({ loading }) {
  return loading ? (
    <Modal
      statusBarTranslucent
      transparent
      animationType={"fade"}
      visible={loading}
    >
      <View style={styles.container}>
        <Lottie
          style={{
            width: 100,
            height: 100,
          }}
          source={require("../../assets/Lottie/loading.json")}
          autoPlay
          loop={true}
        />
      </View>
    </Modal>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 99999999999999,
    justifyContent: "center",
    alignItems: "center",
  },
});
