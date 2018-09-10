const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost:27017/User', {useMongoClient: true});

function toLower(v) {
  return v.toLowerCase();
}

const UserSchema = mongoose.Schema({
  firstname: { type: String, set: toLower },
  lastname: { type: String, set: toLower },
  phone: { type: String, set: toLower },
  email: { type: String, set: toLower }
});

const User = mongoose.model('User', UserSchema);

const addUser = (user) => {
    User.create(user, (err) => {
    console.log(user);
    assert.equal(null, err);
    console.info('New User added');
      mongoose.disconnect();
  });
};

const getUser = (name) => {
  // Define search criteria
  const search = new RegExp(name, 'i');

  User.find({$or: [{firstname: search }, {lastname: search }]})
  .exec((err, user) => {
    assert.equal(null, err);
    console.info(user);
    console.info(`${user.length} matches`);
      mongoose.disconnect();
  });
};

const updateUser = (_id, user) => {
  User.update({ _id }, user)
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Updated successfully');
      mongoose.disconnect();
  });
};

const deleteUser = (_id) => {
  User.remove({ _id })
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Deleted successfully');
      mongoose.disconnect();
  })
};

const getUserList = () => {
  User.find()
  .exec((err, user) => {
    assert.equal(null, err);
    console.info(user);
    console.info(`${user.length} matches`);
      mongoose.disconnect();
  })
};

// Export all methods
module.exports = {   
  addUser,
  getUser,
  getUserList,
  updateUser,
  deleteUser
};

