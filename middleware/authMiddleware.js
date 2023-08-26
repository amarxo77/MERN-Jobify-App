import {
  BadRequestError,
  UnAuthorizedError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/jwtTokens.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication failed.');
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '64e4e22fc2ea0cacc181ce1c';
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication failed.');
  }
};

export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnAuthorizedError('Unauthorized to access this route');
    next();
  };
};
export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo User. Read Only!');
  next();
};
