'use strict';
const cuid = require('cuid');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    cuid: DataTypes.STRING,
    title: DataTypes.STRING,
    html: DataTypes.TEXT,
    source: DataTypes.TEXT,
    meta: {
      type: DataTypes.TEXT,
      get() {
        const rawMeta = this.getDataValue('meta');
        return JSON.parse(rawMeta)
      },
      set(obj) {
        this.setDataValue('meta', JSON.stringify(obj))
      }
    }
  }, {});
  
  Post.addHook('beforeCreate', 'setPostCuid', (post, options) => {
    post.cuid = cuid()
  })

  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};