'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    cuid: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};