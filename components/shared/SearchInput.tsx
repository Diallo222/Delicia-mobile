import { Colors } from "@/constants";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface SearchInputProps {
  placeholder?: string;
  onFilter?: (query: string) => void;
  onSearch?: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onFilter,
  onSearch,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  useEffect(() => {
    if (onFilter) {
      onFilter(searchText);
    }
  }, [searchText, onFilter]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { width: onSearch && searchText ? "66%" : "100%" },
        ]}
        placeholder={placeholder}
        placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
        value={searchText}
        onChangeText={setSearchText}
      />
      {onSearch && searchText && (
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text ellipsizeMode="tail" style={styles.buttonText}>
            Find Meal
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default SearchInput;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: Colors.zinc900,
    color: "#fff",
    paddingLeft: 20,
    fontFamily: "Anton",
  },
  button: {
    width: "30%",
    height: 50,
    backgroundColor: Colors.amber400,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.zinc900,
    fontFamily: "Anton",
  },
});
