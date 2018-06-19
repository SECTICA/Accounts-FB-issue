/**
 * Created by Constantine Moses Kuks on 14/06/18.
 */

import SimplSchema from 'simpl-schema';

export default new SimplSchema({
  createdAt: {
    type: Date,
    label: 'createdAt',
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date();
      }
      else if ( this.isUpsert ) {
        let createdAt = this.field('createdAt');
        if ( !createdAt.isSet ) {
          return new Date();
        }
      }
    },
    optional: true
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      if ( this.isUpdate ) {
        return new Date();
      }
    },
    optional: true
  },
  text: String,
});