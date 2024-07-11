import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    mobile: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
  },
  { strict: false },
);

export const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
export { UserProfileSchema };
