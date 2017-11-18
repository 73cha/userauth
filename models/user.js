'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;
// const hashPasswordHook = (user, options) => {
//   bcrypt.hash(user.get('password'), saltRounds, (err, hash) => {
//     if (err) {
//       console.log(err);
//     }
//
//     user.set('password_hash', hash);
//   });
// };


module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      validate: {
        min: 1
      },
      is: /^[0-9a-zA-Z!"#$%&;@'()*+,./_-]$/,
      type: DataTypes.STRING
    },
    password: {
      validate: {
        len: [8, 32]
      },
      is: /^(?=.*?[0-9])(?=.*?[a-zA-Z])(?=.*?[!-/@_])[A-Za-z!-9@_]$/,
      type: DataTypes.VIRTUAL,
    },
    password_hash: {
      type: DataTypes.STRING
    }
  },{
    underscored: true,
    classMethods: {
      associate: function(models) {
      }
    },
  });

  return user;
};
