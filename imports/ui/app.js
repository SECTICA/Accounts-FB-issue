/**
 * Created by osboxes on 30/06/17.
 */

import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);

  }

  _handleLogin = () => {
    Meteor.loginWithFacebook({
      loginStyle: 'popup',
      auth_type: 'reauthorize',
      requestPermissions: ['email', 'public_profile']
    }, (err) => {
      if ( err ) {
       console.error('Login failed');
       console.error(err);
      } else {
        // console.log(Meteor.user());
      }
    });
  };

  _handleLogout = () => {
    Meteor.logout();
  };

  render() {
    return (
      <div>
        {!this.props.user && <button onClick={this._handleLogin}>Login with facebook</button>}
        {this.props.user && <button onClick={this._handleLogout}>Logout</button>}
      </div>
    );
  }
}

export default withTracker(() => ({user: Meteor.user()}))(AppWrapper);