import React, { useContext } from 'react';

const FilterContext = React.createContext({
  criteria: {},
  isFilterOpen: false,
  changeDaysHandler: (event) => {},
  changeHoursHandler: (event) => {},
  changeArmHandler: (event) => {},
  expandFilterHandler: () => {}
});

export const useFilterContext = () => {
  const filterContext = useContext(FilterContext);

  return filterContext;
};

export default FilterContext;
