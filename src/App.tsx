import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './shared/Router';
import './shared/reset.css';
import { NavermapsProvider } from 'react-naver-maps';
import { NAVER_MAPS_CLIENT } from './custom/ym/variables';


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
  return (
    <QueryClientProvider client={queryClient}>
      <NavermapsProvider ncpClientId={NAVER_MAPS_CLIENT}>
        <Router />
      </NavermapsProvider>
    </QueryClientProvider>
  );
}

export default App;
