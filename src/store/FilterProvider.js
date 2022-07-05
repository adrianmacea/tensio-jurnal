import { useState } from 'react';

import FilterContext from './flter-context';
import { F_24H, F_BOTH, MIN_START_DATE } from '../helpers/global-constants';

const FilterProvider = (props) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [criteria, setCriteria] = useState({
    days: `6${MIN_START_DATE}`,
    hours: F_24H,
    arm: F_BOTH
  });
  const changeDaysHandler = (event) => {
    setCriteria((prevCriteria) => {
      return { ...prevCriteria, days: event.target.value };
    });
  };
  const changeHoursHandler = (event) => {
    setCriteria((prevCriteria) => {
      return { ...prevCriteria, hours: event.target.value };
    });
  };
  const changeArmHandler = (event) => {
    setCriteria((prevCriteria) => {
      return { ...prevCriteria, arm: event.target.value };
    });
  };
  const expandFilterHandler = () => {
    setIsFilterOpen((prevIsFilterOpen) => !prevIsFilterOpen);
  };

  const filterContext = {
    criteria,
    isFilterOpen,
    changeDaysHandler,
    changeHoursHandler,
    changeArmHandler,
    expandFilterHandler
  };

  return (
    <FilterContext.Provider value={filterContext}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
