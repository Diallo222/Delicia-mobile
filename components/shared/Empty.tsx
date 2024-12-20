import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants";

const Empty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No results found</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: Colors.zinc900,
    fontFamily: "Anton",
  },
});
