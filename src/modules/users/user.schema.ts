import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userProfileId: {
    type: String,
    required: true,
  },
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
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
  },
  strategyType: {
    type: String,
    required: false,
  },
  // Add more fields as per your requirements
});

export const User = mongoose.model('User', UserSchema);
export { UserSchema };
