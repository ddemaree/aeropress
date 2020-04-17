'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const cuid = require('cuid')

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Post = sequelize.define('Post', {
  cuid: Sequelize.STRING,
  title: Sequelize.STRING,
  html: Sequelize.TEXT,
  source: Sequelize.JSON,
  meta: Sequelize.JSON
}, {});

Post.addHook('beforeCreate', 'setPostCuid', (post, options) => {
  post.cuid = cuid()
})

Post.associate = function(models) {
  // associations can be defined here
};

const User = sequelize.define('User', {
  cuid: Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password_digest: Sequelize.STRING,
}, {});

User.associate = function(models) {
  // associations can be defined here
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Post = Post;

module.exports = {
  db: sequelize,
  Sequelize,
  Post,
  User
};
