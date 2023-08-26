import { Form, redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { useQuery } from '@tanstack/react-query';

const singleJobQuery = (id) => {
  return {
    queryKey: ['job', id],
    queryFn: async () => {
      return (await customFetch.get(`/jobs/${id}`)).data;
    },
  };
};

const EditJob = () => {
  const id = useLoaderData();
  const {
    data: { job },
  } = useQuery(singleJobQuery(id));
  return (
    <Wrapper>
      <Form method="PATCH" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow name="position" defaultValue={job.position} />
          <FormRow name="company" defaultValue={job.company} />
          <FormRow
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={job.jobStatus}
            listItem={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={job.jobType}
            listItem={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

export const action = (queryClient) => {
  return async function ({ request, params: { id } }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${id}`, data);
      toast.success('Job edited successfully.');
      queryClient.invalidateQueries(['jobs']);
      return redirect('/dashboard/all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
};

export const loader = (queryClient) => {
  return async function ({ params: { id } }) {
    try {
      await queryClient.ensureQueryData(singleJobQuery(id));
      return id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-jobs');
    }
  };
};
