import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [
      /^*$/,
      'Username not valid. Username should contain between 8 to 20 letters, and be a unique username.',
    ],
  },
  image: {
    type: String,
  },
});

// ^[A-Za-z][A-Za-z0-9_]{4,29}$

const User = models.User || model('User', UserSchema);

export { User };
