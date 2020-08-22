import React from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';

function App() {
  return (
    <div className="App">
      <DataTable classes={['table', 'table-bordered']} header={['name', 'age']} data={[{name: 'test', age: 20}, {name: 'test', age: 20}]}/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
