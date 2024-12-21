import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useAppDispatch } from "@/store/hooks";
import { Category } from "@/store/categories/types";
import { filterByCategory } from "@/store/categories/categoriesSlice";
import { Colors } from "@/constants";

type Props = {
  categorie: Category;
};

const CatItem: React.FC<Props> = ({ categorie }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const handleClick = () => {
    dispatch(filterByCategory({ category: categorie.strCategory }));
    navigation.navigate("byCategory");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Text style={styles.text}>{categorie.strCategory}</Text>
    </TouchableOpacity>
  );
};

export default CatItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Colors.zinc900,
    borderRadius: 30,
  },
  text: {
    fontSize: 15,
    color: Colors.amber400,
    fontFamily: "Anton",
  },
});
