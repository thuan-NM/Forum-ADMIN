import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import App from './App.tsx'
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
