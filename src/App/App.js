import React from 'react';
import Auth from '../components/Auth/Auth';
import BoardContainer from '../components/BoardContainer/BoardContainer';
import MyNavBar from '../components/MyNavbar/MyNavbar';
// 1. import the component

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>React Pinterest</h1>
        <MyNavBar/>
        {/* 2. put the component where you need it */}
        <Auth />
        <BoardContainer />
      </div>
    );
  }
}

export default App;
