import React, { useContext } from 'react';

const PanelsContext = React.createContext({
  isNavOpen: false,
  setIsNavOpen: () => {},
  windowWidth: 375,
  windowHeight: 688,
  isColorsOpened: false,
  isColorsDetailed: false,
  toggleColorsOpened: () => {},
  toggleColorsDetailed: () => {}
});

export const usePanelsContext = () => {
  const panelsContext = useContext(PanelsContext);

  return panelsContext;
};

export default PanelsContext;
