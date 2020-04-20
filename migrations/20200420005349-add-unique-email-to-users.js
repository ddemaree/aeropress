'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'email_is_unique'
    })
  },

  down: (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.removeConstraint('Users', 'email_is_unique'),
    //   // queryInterface.removeConstraint('Users', 'cuid_is_unique')      
    // ])
  }
};
