import React from 'react';
import Navigation from './Navigation/navigation';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
      <AuthProvider childrens={<Navigation />} />  
  )
}

export default App;
