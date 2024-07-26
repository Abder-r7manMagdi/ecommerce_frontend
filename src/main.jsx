import React from 'react';
import App from './App.jsx';
import './index.css';
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
