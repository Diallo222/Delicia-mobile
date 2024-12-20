import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Colors } from "@/constants";
import {
  BackButton,
  Empty,
  Error,
  Loader,
  SearchInput,
} from "@/components/shared";
import { MealCard } from "@/components/meals";
import { Meal } from "@/store/meal/types";

const Search = () => {
  const { meal, mealLoading, mealError } = useAppSelector(
    (state) => state.meal
  );
  const [filteredData, setFilteredData] = useState<Meal[]>([]);

  useEffect(() => {
    if (meal.length > 0) {
      setFilteredData(meal.slice(0, 16));
    }
  }, [meal]);
  const onType = (text: string) => {
    if (text.trim() === "") {
      setFilteredData(meal);
    } else {
      const filtered = meal.filter((item) =>
        item.strMeal.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      {mealLoading ? (
        <Loader />
      ) : mealError ? (
        <Error />
      ) : (
        <FlatList
          data={filteredData}
          numColumns={2}
          style={styles.listContainer}
          ListHeaderComponent={<SearchInput onFilter={onType} />}
          ListEmptyComponent={
            <> {!mealLoading && !mealError ? <Empty /> : ""}</>
          }
          renderItem={({ item }) => <MealCard meal={item} />}
          keyExtractor={(item) => item.idMeal}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.amber100,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
});
