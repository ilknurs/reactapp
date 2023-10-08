import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from "./context";


// ReactDOM.render(
//   <UserProvider>
//     <App />
//   </UserProvider>,
//   document.getElementById('root')
// );

const root = document.getElementById('root');
const rootElement = (
  <React.StrictMode>
  <UserProvider>
  <App />
  </UserProvider>
  </React.StrictMode>
);

const rootReactDOM = ReactDOM.createRoot(root);
rootReactDOM.render(rootElement);



reportWebVitals();
