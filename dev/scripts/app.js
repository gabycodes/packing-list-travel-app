import React from 'react';
import ReactDOM from 'react-dom';
import AddClothing from './components/AddClothing.js';
import AddShoes from './components/AddShoes.js';
import AddToiletries from './components/AddToiletries';
import AddElectronics from './components/AddElectronics';
import AddMiscellaneous from './components/AddMiscellaneous';
import Header from './components/Header'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddClothing />
        <AddShoes />
        <AddToiletries />
        <AddElectronics />
        <AddMiscellaneous />
        </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
