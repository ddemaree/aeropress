'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    cuid: DataTypes.STRING,
    title: DataTypes.STRING,
    html: DataTypes.TEXT,
    source: DataTypes.TEXT,
    meta: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};