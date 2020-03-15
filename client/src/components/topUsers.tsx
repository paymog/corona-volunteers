import React from 'react';
import { connect } from "react-redux";

type TopUsersConfig = {}

type Props = {
  token?: string
}

type State = {
  result?: any
  error?: any
  token: string
}

function mapStateToProps(state: any) {
  return {token: state.token}
}

class TopUsers extends React.Component<Props, State> {

  state: State = { token: ''};

  componentDidMount(): void {
    console.log(this.props.token);
    this.getTopUsers()
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevProps.token !== this.props.token) {
      this.getTopUsers()
    }
  }

  getTopUsers(): void {

    fetch('http://localhost:8080/api/top_users', {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    }).then(res => res.json())
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

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div>
        <h1>The top users are</h1>
        <p>{JSON.stringify( this.state.result)}</p>
      </div>
    )

  }
}

export default connect(mapStateToProps, null)(TopUsers)
