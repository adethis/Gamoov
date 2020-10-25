import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './assets/css/custom.css'
import { AuthProvider } from './context/Auth'
import Routes from './config/Routes'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
