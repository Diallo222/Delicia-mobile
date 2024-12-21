import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { Meal } from "@/store/meal/types";
import { useAppDispatch } from "@/store/hooks";
import { getMealDetails } from "@/store/meal/mealSlice";

interface MealProps {
  meal: Meal;
  variant?: "card" | "discover"; // Variant for different layouts
}

const { width, height } = Dimensions.get("screen");

const MealCard: React.FC<MealProps> = ({ meal, variant = "card" }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleClick = () => {
    dispatch(getMealDetails({ id: meal.idMeal }));
    navigation.navigate("mealDetail");
  };

  // Adjust styles based on variant
  const containerWidth = variant === "card" ? width * 0.46 : width * 0.65;
  const imageHeight = variant === "card" ? height * 0.26 : height * 0.4;

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={[styles.container, { width: containerWidth }]}
    >
      <Image
        source={{ uri: meal.strMealThumb }}
        style={[styles.image, { height: imageHeight }]}
      />
      <Text style={styles.name}>{meal.strMeal}</Text>
    </TouchableOpacity>
  );
};

export default MealCard;

const styles = StyleSheet.create({
  container: { padding: 10, gap: 5 },
  image: {
    width: "100%",
    borderRadius: 30,
  },
  name: {
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Anton",
  },
});
