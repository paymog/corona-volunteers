import * as firebase from "firebase";
import '../App.css';
import React from 'react';
import Button from '@material-ui/core/Button'


type LogoutButtonProps = {}

export class LogoutButton extends React.Component<LogoutButtonProps> {
  logOut(): void {
    firebase.auth().signOut().then(function () {

      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <Button onClick={this.logOut} href='/'>Log Out</Button>
    )
  }

}
