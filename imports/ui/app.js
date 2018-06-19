/**
 * Created by osboxes on 30/06/17.
 */

import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Test from '/imports/db/collection';
import testQuery from '/imports/api/expose';

class AppWrapper extends React.Component {
	constructor(props) {
		super(props);

	}



	render() {
		return (
			<div>
        Test
      </div>
		);
	}
}

const mapMeteorToProps = (props) => {

  let q = testQuery.clone();
  q.subscribe();

  return {
    test: Test.find()
  };
};

const meteorContainer = withTracker(mapMeteorToProps)(AppWrapper);

export default meteorContainer;