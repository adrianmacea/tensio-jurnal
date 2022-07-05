import { useState, useEffect } from 'react';

import PanelsContext from './panels-context';

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const PanelsProvider = (props) => {
  /* windowWidth context */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 480);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* LeftNav context */
  const [isNavOpen, setIsNavOpen] = useState(windowWidth > 688);

  /* HyperColorsSummary context */
  const [isColorsOpened, setIsColorsOpened] = useState(false);
  const [isColorsDetailed, setIsColorsDetailed] = useState(false);

  const toggleColorsOpened = () => {
    setIsColorsOpened((prevVal) => !prevVal);
  };
  const toggleColorsDetailed = () => {
    setIsColorsDetailed((prevVal) => !prevVal);
  };

  const panelsContext = {
    isNavOpen,
    setIsNavOpen,
    windowWidth,
    isColorsOpened,
    isColorsDetailed,
    toggleColorsOpened,
    toggleColorsDetailed
  };

  return (
    <PanelsContext.Provider value={panelsContext}>
      {props.children}
    </PanelsContext.Provider>
  );
};

export default PanelsProvider;
