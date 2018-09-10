#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');

const { 
  addUser,
  getUser,
  getUserList,
  updateUser,
  deleteUser
} = require('./db');

const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ..'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter lastname ..'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Enter phone number ..'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter email address ..'
  }

];

program
  .version('0.0.1')
  .description('User management system');

program
  .command('addUser')
  .alias('a')
  .description('Add a User')
  .action(() => {
    prompt(questions).then((answers) =>
      addUser(answers));
  });

program
  .command('getUser <name>')
  .alias('r')
  .description('Get User')
  .action(name => getUser(name));

program
  .command('updateUser <_id>')
  .alias('u')
  .description('Update User')
  .action(_id => {
    prompt(questions).then((answers) =>
      updateUser(_id, answers));
  });

program
  .command('deleteUser <_id>')
  .alias('d')
  .description('Delete User')
  .action(_id => deleteUser(_id));

program
  .command('getUserList')
  .alias('l')
  .description('List Users')
  .action(() => getUserList());


// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);
    