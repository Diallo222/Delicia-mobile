import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { images, Colors } from "@/constants";

const WelcomeZone = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to Delicia</Text>
        <Text style={styles.subtitle}>THE ART OF COOKING</Text>
        <Text style={styles.question}>What do you want to cook today?</Text>
      </View>
      <Image style={styles.image} source={images.hamburger} />
    </View>
  );
};

export default WelcomeZone;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: "Anton",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "Anton",
    marginTop: 10,
  },
  question: {
    fontSize: 17,
    fontFamily: "Anton",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: Colors.amber400,
    borderRadius: 50,
  },
});
