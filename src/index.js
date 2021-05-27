import React from 'react';
import ReactDOM from 'react-dom';
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import App from './App';
import Hello from './Hello'
import reportWebVitals from './reportWebVitals';
import { EmployeeManagement } from './components/EmployeeManagement';

ReactDOM.render(
  <React.StrictMode>
    <EmployeeManagement />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
