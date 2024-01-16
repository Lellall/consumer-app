import React, { useEffect } from "react";
import Lottie from "lottie-react-native";
import Container from "../../components/Containers/Container";
import Button from "../../components/Buttons/Button";
import { StyleSheet, View } from "react-native";
import Text from "../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";

export default function StatusScreen() {
  const navigate = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate.navigate("MainApp");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Container>
      <Lottie
        source={require("../../assets/Lottie/success.json")}
        autoPlay
        loop={false}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: "auto",
    marginBottom: 40,
  },
});
