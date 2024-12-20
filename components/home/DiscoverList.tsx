import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { DiscoverMeal } from "../meals";

interface ListProps {
  title: string;
  data: string[];
}

const DiscoverList: React.FC<ListProps> = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <DiscoverMeal meal={item} />}
        keyExtractor={(item) => item.idMeal}
      />
    </View>
  );
};

export default DiscoverList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
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
});
