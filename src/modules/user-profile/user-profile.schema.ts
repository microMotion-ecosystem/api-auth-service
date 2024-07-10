import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emails: {
      type: Array<string>,
    },
    mobiles: {
      type: Array<string>,
    },
    mainEmail: {
      type: String,
    },
    mainMobile: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { strict: false },
);

export const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
export { UserProfileSchema };
