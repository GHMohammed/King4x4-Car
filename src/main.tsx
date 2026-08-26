import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import {RepositoryProvider} from './data/RepositoryProvider';
import {CartProvider} from './context/CartContext';
import {AppStateProvider} from './context/AppStateContext';
import {LanguageProvider} from './i18n/LanguageContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <RepositoryProvider>
        <AppStateProvider>
          <CartProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CartProvider>
        </AppStateProvider>
      </RepositoryProvider>
    </LanguageProvider>
  </StrictMode>,
);
