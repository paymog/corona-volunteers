import React from 'react';

type TopUsersConfig = {}

type State = {
  result?: any
}

export class TopUsers extends React.Component<TopUsersConfig> {

  state: State = {};

  componentDidMount(): void {
    fetch('http://localhost:8080/api/top_users').then(res => res.json())
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
