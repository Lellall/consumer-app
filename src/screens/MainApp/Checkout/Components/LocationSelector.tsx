import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../../../../components/Text/Text";
import { MapImage } from "../../../../assets/Images";

const LocationSelector = () => {
  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <View style={styles.deco}>
          <View style={styles.deco2} />
        </View>
        <Text>27 Heygate St. Kennington</Text>
      </View>

      <View>
        <Image style={styles.image} source={MapImage} />
      </View>
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F8",
    width: "100%",
    height: 45,
    borderRadius: 10,
    // padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  location: {
    flexDirection: "row",
  },
  deco: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(240, 109, 6, 0.3)",
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deco2: {
    width: 12,
    height: 12,
    backgroundColor: "rgba(240, 109, 6, 1)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
  image: {
    width: 30,
    height: 30,
  },
});
