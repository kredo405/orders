import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAbZpGBIN1mrwFhDRqJsjhzPTFcAFybAOs",
  authDomain: "addorder-dc446.firebaseapp.com",
  projectId: "addorder-dc446",
  storageBucket: "addorder-dc446.appspot.com",
  messagingSenderId: "295149339103",
  appId: "1:295149339103:web:48be229334888d24d4846a"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App app={app}/>
    </Provider>
  </BrowserRouter>
);

