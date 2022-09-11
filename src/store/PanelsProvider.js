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
  /* windowHeight context (for mobile vh fix) */
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  /* windowWidth context */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {    
    const handleResize = debounce(() => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }, 480);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* LeftNav context */
  const [isNavOpen, setIsNavOpen] = useState(windowWidth > 688);
  const [navWidth, setNavWidth] = useState(0);
  const mainVisibleWidth = windowWidth - navWidth;

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
    windowWidth,
    windowHeight,
    navWidth,
    mainVisibleWidth,
    isNavOpen,
    isColorsOpened,
    isColorsDetailed,
    setIsNavOpen,
    setNavWidth,
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
