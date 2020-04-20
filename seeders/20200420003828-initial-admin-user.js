'use strict';
const bcrypt = require('bcrypt-nodejs')
const cuid = require('cuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const currentTime = new Date()
    
    const userParams = {
      cuid: cuid(),
      name: "Melody Nelson",
      email: "melody",
      password_digest: bcrypt.hashSync("nelson"),
      createdAt: currentTime,
      updatedAt: currentTime
    }
    
    console.log(userParams)
    
    
    return queryInterface.bulkInsert('Users', [userParams])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
