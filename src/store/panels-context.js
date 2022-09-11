import React, { useContext } from 'react';

const PanelsContext = React.createContext({
  windowWidth: 375,
  windowHeight: 688,
  navWidth: 45,
  mainVisibleWidth: 275,
  isNavOpen: false,
  isColorsOpened: false,
  isColorsDetailed: false,
  setIsNavOpen: () => {},
  setNavWidth: () => {},
  toggleColorsOpened: () => {},
  toggleColorsDetailed: () => {}
});

export const usePanelsContext = () => {
  const panelsContext = useContext(PanelsContext);

  return panelsContext;
};

export default PanelsContext;
