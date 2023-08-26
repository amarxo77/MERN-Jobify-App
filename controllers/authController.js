import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import passwordCheck from '../utils/passwordCheck.js';
import { createJWT } from '../utils/jwtTokens.js';

export const register = async (req, res) => {
  let role;
  const isFirstUser = await User.countDocuments();
  role = !isFirstUser ? 'admin' : 'user';
  const user = await User.create({ ...req.body, role });
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError('invalid credentials');
  const isPasswordMatch = await passwordCheck(req.body.password, user.password);
  if (!isPasswordMatch) throw new UnauthenticatedError('invalid credentials');
  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};
