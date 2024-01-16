import { Modal, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "../../../components/Text/Text";
import Rating from "./components/Rating";
import { LeaveRating, RatingIcon, StarIcon } from "../../../assets/Svg/Index";
import Button from "../../../components/Buttons/Button";
import Colors from "../../../constants/Colors";
import MenuItem from "./components/MenuItem";
import RatingDetail from "./components/RatingDetail";
const MENUS = ["Most relevant", "Newest", "Highest", "Lowest"];
export default function ReviewPage() {
  const [activeMenu, setActiveMenu] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = (ind) => {
    setActiveMenu(ind);
  };
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text h2>Reviews</Text>
      <View style={styles.reviewDetails}>
        <View style={styles.ratings}>
          <Rating rate={5} />
          <Rating rate={4} />
          <Rating rate={3} />
          <Rating rate={2} />
          <Rating rate={1} />
        </View>

        <View style={styles.ratingDetail}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginRight: 5 }} h2>
              4.5
            </Text>
            <RatingIcon />
          </View>
          <Text style={{ textAlign: "center", fontSize: 10 }}>
            273 Comments
          </Text>
        </View>
      </View>
      <Button
        onPress={() => setModalVisible(true)}
        fontStyle={{ color: "#AAAAAA" }}
        style={styles.button}
        label="Leave a rating"
      />
      <Text
        style={{
          textAlign: "center",
          color: "#AAAAAA",
          fontSize: 10,
          marginTop: 10,
        }}
      >
        You must be logged in befoure you can review
      </Text>

      <Text
        style={{
          color: "#000",
          marginTop: 10,
        }}
      >
        Sort by
      </Text>

      <ScrollView
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.menus}
        contentContainerStyle={styles.menuItems}
      >
        {MENUS.map((menu, ind) => (
          <MenuItem
            onPress={() => handlePress(ind)}
            title={menu}
            key={menu}
            active={ind == activeMenu}
          />
        ))}
      </ScrollView>
      <RatingDetail />
      <RatingDetail />
      <RatingDetail />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.rate}>
            <Text>How do you rate this vendor?</Text>
            <View style={styles.leaveRating}>
              <LeaveRating />
              <LeaveRating />
              <LeaveRating />
              <LeaveRating />
              <LeaveRating />
            </View>

            <Button
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 20 }}
              label="Cancel"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  reviewDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratings: {
    width: "70%",
  },
  ratingDetail: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    marginTop: 20,
  },
  menuItems: {
    flexDirection: "row",
  },
  menus: {
    overflow: "scroll",
    maxHeight: 70,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  rate: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  leaveRating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
