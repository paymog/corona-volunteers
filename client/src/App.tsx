import React from 'react';
import logo from './logo.svg';
import './App.css';
import {type} from "os";

type Props = {

}

type AppState = {
  result: string
}

class App extends React.Component<Props>{
  state: AppState = { result: ''};

  constructor(props: Readonly<Props>) {
    super(props);
  }

  componentDidMount(): void {
    fetch('http://localhost:8080/').then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            error
          });
        }
      )
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className="App">
        <p>{this.state.result}</p>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}

export default App;
