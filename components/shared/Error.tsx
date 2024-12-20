import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants";

const Error = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>An error occurred !</Text>
    </View>
  );
};

export default Error;

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
