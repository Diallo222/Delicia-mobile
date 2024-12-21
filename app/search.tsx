import React from "react";
import { useAppSelector } from "@/store/hooks";
import { FilterableList } from "@/components/shared";

const Search = () => {
  const { meal, mealLoading, mealError } = useAppSelector(
    (state) => state.meal
  );

  return <FilterableList data={meal} loading={mealLoading} error={mealError} />;
};

export default Search;
