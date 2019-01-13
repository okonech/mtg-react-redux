import React from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends React.PureComponent {
  public render() {
    return (
      <div>
        <h1>This is a login page</h1>
        <p><Link to='player'>Login</Link></p>
      </div>
    );
  }
}

export default LoginPage;
