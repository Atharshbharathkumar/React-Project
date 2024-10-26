import React from 'react';
import './assets/css/App.css';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import UserForm from './components/UserForm';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<UserForm />} />
        <Route path='/user-profile/:id' element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
