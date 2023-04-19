import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './shared/Router';
import './shared/reset.css';
import { NavermapsProvider } from 'react-naver-maps';
import { NAVER_MAPS_CLIENT } from './custom/ym/variables';
import { RangeContext } from './apis/context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3000,
      retry: 0,
    }
  }
});

function App() {
  const [range, setRange] = useState<number>(500);

  return (
    <RangeContext.Provider value={{range, setRange}}>
      <QueryClientProvider client={queryClient}>
        <NavermapsProvider ncpClientId={NAVER_MAPS_CLIENT}>
          <Router />
        </NavermapsProvider>
      </QueryClientProvider>
    </RangeContext.Provider>
  );
}

export default App;
