import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase';
import {analytics} from './firebase'
import * as firebaseui from 'firebaseui'
import {LogoutButton} from './components/logout'
import {TopUsers} from "./components/topUsers";


type Props = {}

type AppState = {
  result: string
  token?: string
  user?: firebase.User
}

class App extends React.Component<Props> {
  state: AppState = {result: ''};
  ui: firebaseui.auth.AuthUI | undefined;

  // authConfig:

  constructor(props: Props) {
    super(props);

    this.registerFirebaseAuthListener();

    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  registerFirebaseAuthListener(): void {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user});

        user.getIdToken().then((idToken) => {

          this.setState({token: idToken})
        });

      } else {
        this.setState({user: null});


        var uiConfig = {
          'signInSuccessUrl': '/app',
          'signInOptions': [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
        };
        if (this.ui) {
          this.ui.start('#firebaseui-auth-container', uiConfig);
        }
      }

    });
  }



  componentDidMount(): void {
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
        <p>Hello {this.state.user?.displayName}</p>
        <LogoutButton/>
      </div>
    }
    return (
      <div className="App">
        <p>{this.state.result}</p>
        {authDiv}
        <Router>
          <Switch>
            <Route path='/'></Route>
          </Switch>
          <Switch>
            <Route path='/app'>
              <TopUsers />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
