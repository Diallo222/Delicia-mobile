import React, { useEffect, useState, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Meal } from "@/store/meal/types";
import BackButton from "./BackButton";
import Error from "./Error";
import SearchInput from "./SearchInput";
import Empty from "./Empty";
import ShimmerWrapper from "./Shimmer";
import { MealCard } from "../meals";
import { Colors } from "@/constants";
import { debounce } from "lodash";

interface Props {
  data: Meal[];
  loading: boolean;
  error: string | null;
}

const FilterableList: React.FC<Props> = ({ data, loading, error }) => {
  const [filteredData, setFilteredData] = useState<Required<Meal>[]>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Handle filter on change
  const handleFilter = (text: string) => {
    if (text.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.strMeal.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Debounced filter for better performance
  const debouncedFilter = useMemo(() => debounce(handleFilter, 300), [data]);

  const shimmerPlaceholders = Array(6).fill(null);

  return (
    <View style={styles.container}>
      <BackButton />
      {loading ? (
        <FlatList
          data={shimmerPlaceholders}
          numColumns={2}
          style={styles.listContainer}
          keyExtractor={(_, index) => `shimmer-${index}`}
          renderItem={() => (
            <ShimmerWrapper
              visible={loading}
              style={styles.shimmerItem}
              width={150}
              height={200}
            />
          )}
        />
      ) : error ? (
        <Error />
      ) : (
        <FlatList
          data={filteredData}
          numColumns={2}
          style={styles.listContainer}
          ListHeaderComponent={
            <ShimmerWrapper visible={loading}>
              <SearchInput
                placeholder="type to filter"
                onFilter={debouncedFilter}
              />
            </ShimmerWrapper>
          }
          ListEmptyComponent={
            !loading && !error && filteredData.length === 0 ? <Empty /> : null
          }
          renderItem={({ item }) => <MealCard variant="card" meal={item} />}
          keyExtractor={(item) => item.idMeal}
        />
      )}
    </View>
  );
};

export default FilterableList;

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
  shimmerItem: {
    margin: 10,
    borderRadius: 10,
  },
});
