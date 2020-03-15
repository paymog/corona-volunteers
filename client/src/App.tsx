import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase';
import {analytics} from './firebase'
import * as firebaseui from 'firebaseui'
import {LogoutButton} from './components/logout'


type Props = {}

type AppState = {
  result: string
  token?: string
  user?: any
}

class App extends React.Component<Props> {
  state: AppState = {result: ''};
  ui: firebaseui.auth.AuthUI | undefined;

  // authConfig:

  constructor(props: Props) {
    super(props);

    this.registerFirebaseAuthListener();

    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
    }
  }

  registerFirebaseAuthListener(): void {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user ' + user + ' is logged in');
        this.setState({user});

        user.getIdToken().then((idToken) => {

          console.log('user id token is ' + idToken);
          this.setState({token: idToken})
        });

      } else {
        console.log('user logged out');
        this.setState({user: null})
        var uiConfig = {
          'signInSuccessUrl': '/',
          'signInOptions': [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          // Terms of service url
          'tosUrl': '<your-tos-url>',
        };
        if (this.ui) {
          this.ui.start('#firebaseui-auth-container', uiConfig);
        }
      }

    });
  }

  // Firebase log-in widget
  configureFirebaseLoginWidget() {
  }


  componentDidMount(): void {
    this.configureFirebaseLoginWidget();
    analytics.logEvent('component mounted!');

    fetch('http://localhost:8080/api').then(res => res.json())
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
    let authDiv;
    if (!this.state.user) {
      authDiv = <div id='firebaseui-auth-container'></div>
    } else {
      authDiv = <div>
        <LogoutButton/>
      </div>
    }
    return (
      <div className="App">
        <p>{this.state.result}</p>
        {authDiv}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
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
