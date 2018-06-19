/**
 * Created by Constantine Moses Kuks on 14/06/18.
 */


import testQuery from './api/expose';

testQuery.expose({
  firewall(userId, params){
    params.test = 'asdf';
  },
  embody(body, params){
    console.log(params);
  }
});
