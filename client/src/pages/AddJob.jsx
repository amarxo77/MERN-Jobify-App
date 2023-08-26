import { Form, redirect, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import customFetch from '../utils/customFetch';

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="POST" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow name="position" />
          <FormRow name="company" />
          <FormRow
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            listItem={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            listItem={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export const action = (queryClient) => {
  return async function ({ request })  {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      await customFetch.post('/jobs', data);
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job added successfully.');
      return redirect('/dashboard/all-jobs');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
}

export default AddJob;
