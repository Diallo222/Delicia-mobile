import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useAppSelector } from "@/store/hooks";
import { ShimmerWrapper } from "../shared";
import CatItem from "./CatItem";

const CatList = () => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  const shimmerPlaceholders = Array(5).fill(null); // For simulating shimmer placeholders

  return (
    <View style={styles.container}>
      <ShimmerWrapper visible={loading} style={styles.titleWrapper}>
        <Text style={styles.title}>Find meal by category</Text>
      </ShimmerWrapper>

      {loading ? (
        <FlatList
          data={shimmerPlaceholders}
          keyExtractor={(_, index) => `shimmer-${index}`}
          contentContainerStyle={styles.listContent}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => (
            <ShimmerWrapper
              visible={loading}
              style={styles.shimmerItem}
              width={100}
              height={40}
            />
          )}
        />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.idCategory}
          contentContainerStyle={styles.listContent}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CatItem categorie={item} />}
        />
      )}
    </View>
  );
};

export default CatList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  titleWrapper: {
    marginBottom: 5,
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
  shimmerItem: {
    borderRadius: 30,
    marginHorizontal: 5,
  },
});
