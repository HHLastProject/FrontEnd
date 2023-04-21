import React, { useState } from 'react';
import Router from './shared/Router';
import './shared/reset.css';
import { NavermapsProvider } from 'react-naver-maps';
import { NAVER_MAPS_CLIENT } from './custom/ym/variables';
import { RangeContext } from './apis/context';


function App() {
  const [range, setRange] = useState<number>(500);

  return (
    <RangeContext.Provider value={{ range, setRange }}>
      <NavermapsProvider ncpClientId={NAVER_MAPS_CLIENT}>
        <Router />
      </NavermapsProvider>
    </RangeContext.Provider>
  );
}

export default App;
