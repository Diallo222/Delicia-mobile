import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import CatItem from "./CatItem";
import { Colors } from "@/constants";

const CatList = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find meal by category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        contentContainerStyle={styles.listContent}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CatItem categorie={item} />}
      />
    </View>
  );
};

export default CatList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    color: "black",
    fontFamily: "Anton",
  },
  listContent: {
    gap: 5,
    paddingVertical: 5,
  },
});
