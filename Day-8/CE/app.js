import React from 'react';
import './assets/css/App.css';
import Counter from './components/Counter';
import { Provider } from "react-redux";
import { Store } from "./redux/Store";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
