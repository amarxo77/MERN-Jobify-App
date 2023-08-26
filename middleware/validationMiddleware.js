import { Types } from 'mongoose';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import { BadRequestError, NotFoundError, UnAuthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

export const validateJobInput = (req, res, next) => {
  const { company, position, jobLocation, jobStatus, jobType } = req.body;
  if (!company) throw new BadRequestError('Company is required.');
  if (!position) throw new BadRequestError('Position is required.');
  if (!jobLocation) throw new BadRequestError('Job Location is required.');
  if (!Object.values(JOB_STATUS).includes(jobStatus))
    throw new BadRequestError('Invalid status value 111.');
  if (!Object.values(JOB_TYPE).includes(jobType))
    throw new BadRequestError('Invalid job type value.');
  next();
};

export const validateIdParam = async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id))
    throw new BadRequestError('Invalid MongoDB id');
  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`no job with ID ${id}`);
  const isAdmin = req.user.role === 'admin'
  const isOwner = req.user.userId === job.createdBy.toString()
  if(!isAdmin && !isOwner) throw new UnAuthorizedError('not authorized to access this route')
  next();
};

export const validateRegisterInput = async (req, res, next) => {
  const { name, email, password, location, lastName } = req.body;
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
  if (!name) throw new BadRequestError('Name is required.');
  if (!email) throw new BadRequestError('Email is required.');
  if (!password) throw new BadRequestError('Password is required.');
  if (!location) throw new BadRequestError('Location is required.');
  if (!lastName) throw new BadRequestError('Last name is required.');
  if (!emailRegex.test(email))
    throw new BadRequestError('invalid email format');
  if (password.length < 5)
    throw new BadRequestError('password must be at least 5 characters long.');
  const user = await User.findOne({ email });
  if (user) throw new BadRequestError('email already exists.');
  next();
};

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) throw new BadRequestError('Email is required.');
  if (!password) throw new BadRequestError('Password is required.');
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
  if (!emailRegex.test(email))
    throw new BadRequestError('invalid email format');
  next();
};

export const validateUpdateUserInput = async (req, res, next) => {
  const { name, email, location, lastName } = req.body;
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
  if (!name) throw new BadRequestError('Name is required.');
  if (!email) throw new BadRequestError('Email is required.');
  if (!location) throw new BadRequestError('Location is required.');
  if (!lastName) throw new BadRequestError('Last name is required.');
  if (!emailRegex.test(email))
    throw new BadRequestError('invalid email format');
  const user = await User.findOne({ email });
  if (user && user._id.toHexString() !== req.user.userId) throw new BadRequestError('email already exists.');
  next();
}
