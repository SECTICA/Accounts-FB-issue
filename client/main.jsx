import React from 'react';
import {Meteor} from 'meteor/meteor';
import reactDom from 'react-dom';

import App from '/imports/ui/app';


Meteor.startup(()=>{
	reactDom.render(
		<App/>
	, document.getElementById('app'));

});