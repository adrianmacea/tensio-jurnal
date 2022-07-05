import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

import App from './App';
import './index.css';
import AuthProvider from './store/AuthProvider';
import ModalProvider from './store/ModalProvider';
import PanelsProvider from './store/PanelsProvider';
import FilterProvider from './store/FilterProvider';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <PanelsProvider>
              <FilterProvider>
                <App />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              </FilterProvider>
            </PanelsProvider>
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
