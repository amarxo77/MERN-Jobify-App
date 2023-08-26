import mongoose from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
    },
    position: {
      type: String,
      required: [true, 'Please provide a company name'],
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      validate: {
        validator: (value) => Object.values(JOB_STATUS).includes(value),
        message: `Invalid job status value`,
      },
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      validate: {
        validator: (value) => Object.values(JOB_TYPE).includes(value),
        message: `Invalid job type value`,
      },
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      required: [true, 'Job location is required.'],
      default: 'my city',
    },
    createdBy:{
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
