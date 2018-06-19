/**
 * Created by Constantine Moses Kuks on 14/06/18.
 */


import Schema from './schema';

const Test = new Mongo.Collection('test');
export default Test;

Test.attachSchema(Schema);