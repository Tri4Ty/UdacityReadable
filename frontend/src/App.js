import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MainScreen from './MainScreen';
import store from './AppStore';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    );
  }
}

export default App;
