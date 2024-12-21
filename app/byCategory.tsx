import React from "react";
import { useAppSelector } from "@/store/hooks";
import { FilterableList } from "@/components/shared";

const ByCategory = () => {
  const { filteredData, filterLoading, filterError } = useAppSelector(
    (state) => state.categories
  );

  return (
    <FilterableList
      data={filteredData}
      loading={filterLoading}
      error={filterError}
    />
  );
};

export default ByCategory;
