import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  google: {
    type: Object,
    required: false,
  },

  // Add more fields as per your requirements
});

export const User = mongoose.model('User', UserSchema);
export { UserSchema };
