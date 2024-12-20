import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { Colors } from "@/constants";

const Loader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading ...</Text>
      <ActivityIndicator size={"large"} color={Colors.zinc900} />
    </View>
  );
};

export default Loader;

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
