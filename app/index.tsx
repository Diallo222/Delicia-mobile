import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { filterByCategory } from "@/store/categories/categoriesSlice";
import { Colors } from "@/constants";
import { SearchInput } from "@/components/shared";
import { getMealByName } from "@/store/meal/mealSlice";
import { WelcomeZone, DiscoverList } from "@/components/home";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

export default function HomeScreen() {
  const { filteredData, filterLoading, filterError } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(filterByCategory({ category: "Breakfast" }));
  }, []);
  const handleSearch = (query: string) => {
    dispatch(getMealByName({ name: query }));
    navigation.navigate("search");
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <WelcomeZone />
      <SearchInput onSearch={handleSearch} />
      <DiscoverList title="For your Breakfast" data={filteredData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.amber100,
    paddingHorizontal: 18,
  },
  content: {
    justifyContent: "center",
  },
});
