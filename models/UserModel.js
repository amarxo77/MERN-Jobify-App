import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minLength: [4, 'name should be at least 4 characters long.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Please provide a valid email address.',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [5, 'Password should be at least 5 characters long.'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    minLength: [4, 'lastName should be at least 4 characters long.'],
  },
  location: {
    type: String,
    default: 'my city,',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: String,
  avatarPublicId: String,
});

// another method to compare the passwords
// userSchema.methods.comparePassword = async function(passwordProvided, hashedPassword) {
//     const isCorrectPassword = await bcrypt.compare(passwordProvided, hashedPassword);
//     return isCorrectPassword;
// }

userSchema.pre('save', async function (req, res) {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);
export default User;
