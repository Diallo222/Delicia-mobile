import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Meal } from "@/store/meal/types";
import BackButton from "./BackButton";
import Loader from "./Loader";
import Error from "./Error";
import SearchInput from "./SearchInput";
import Empty from "./Empty";
import { MealCard } from "../meals";
import { Colors } from "@/constants";

interface Props {
  data: Required<Meal>[];
  loading: boolean;
  error: string | null;
}

const FilterableList: React.FC<Props> = ({ data, loading, error }) => {
  const [filteredData, setFilteredData] = useState<Meal[]>([]);

  useEffect(() => {
    setFilteredData(data.length > 0 ? data.slice(0, 16) : []);
  }, [data]);

  const onType = (text: string) => {
    if (text.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.strMeal.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const Header = () => <SearchInput onFilter={onType} />;

  return (
    <View style={styles.container}>
      <BackButton />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <FlatList
          data={filteredData}
          numColumns={2}
          style={styles.listContainer}
          ListHeaderComponent={Header}
          ListEmptyComponent={!loading && !error ? <Empty /> : null}
          renderItem={({ item }) => <MealCard meal={item} />}
          keyExtractor={(item, index) => item.idMeal || index.toString()}
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
});
