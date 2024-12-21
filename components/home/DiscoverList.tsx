import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { ShimmerWrapper } from "../shared";
import { DiscoverMeal, MealCard } from "../meals";

interface ListProps {
  title: string;
  data: string[];
  loading: boolean;
}

const DiscoverList: React.FC<ListProps> = ({ title, data, loading }) => {
  const shimmerPlaceholders = Array(3).fill(null); // Simulate shimmer items
  return (
    <View style={styles.container}>
      <ShimmerWrapper visible={loading} style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </ShimmerWrapper>
      {loading ? (
        <FlatList
          data={shimmerPlaceholders}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `shimmer-${index}`}
          renderItem={() => (
            <ShimmerWrapper
              visible={loading}
              style={styles.shimmerItem}
              width={200}
              height={300}
            />
          )}
        />
      ) : (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => <MealCard variant="discover" meal={item} />}
        />
      )}
    </View>
  );
};

export default DiscoverList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  titleWrapper: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 19,
    fontWeight: "500",
    fontFamily: "Anton",
  },
  shimmerItem: {
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
