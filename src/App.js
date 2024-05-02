import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Profile from './pages/Profile'
import { NotificationContainer } from 'react-notifications';

function App() {
  return (
    <Router>
      <div className="App">
      <NotificationContainer />
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/profile' element={<Profile />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
