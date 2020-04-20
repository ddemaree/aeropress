'use strict';
const bcrypt = require('bcrypt-nodejs')
const cuid = require('cuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
