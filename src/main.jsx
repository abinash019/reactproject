import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="abinash019.us.auth0.com"
      clientId="fpNlSA0pezmBci3smbPYwR0fZ6yFfS9d"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Provider store={store}> {/* Ensure that Redux Provider is here */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </StrictMode>
);

