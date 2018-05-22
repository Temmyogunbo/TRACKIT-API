const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const Users = mongoose.model('Users', usersSchema);

export default Users;
