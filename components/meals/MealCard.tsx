import {
  View,
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
}
const { width, height } = Dimensions.get("screen");
const MealCard: React.FC<MealProps> = ({ meal }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleClick = () => {
    dispatch(getMealDetails({ id: meal.idMeal }));
    navigation.navigate("mealDetail");
  };
  return (
    <TouchableOpacity onPress={handleClick} style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.name}>{meal.strMeal}</Text>
    </TouchableOpacity>
  );
};

export default MealCard;

const styles = StyleSheet.create({
  container: { padding: 10, width: width * 0.46, gap: 5 },
  image: {
    width: "100%",
    height: height * 0.26,
    borderRadius: 30,
  },
  name: {
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Anton",
  },
});