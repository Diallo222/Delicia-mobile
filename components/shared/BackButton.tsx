import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants";

interface BackButtonProps {
  absolute?: boolean;
}
const BackButton: React.FC<BackButtonProps> = ({ absolute }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity
      style={[styles.container, absolute && styles.absolute]}
      onPress={goBack}
    >
      <Text style={styles.text}>Return</Text>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 50,
    zIndex: 1,
    alignSelf: "flex-start",
    backgroundColor: Colors.zinc900,
  },
  text: {
    color: Colors.amber400,
    fontFamily: "Anton",
  },
  absolute: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
