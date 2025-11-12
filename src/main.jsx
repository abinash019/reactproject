import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="abinash019.us.auth0.com"
      clientId="fpNlSA0pezmBci3smbPYwR0fZ6yFfS9d"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Provider store={store}> {/* Ensure that Redux Provider is here */}
        <PersistGate loading={null} persistor={persistor}>

          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>

      </Provider>
    </Auth0Provider>
  </StrictMode>
);

