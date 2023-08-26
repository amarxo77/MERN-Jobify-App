import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

export const action = (queryClient) => {
  return async function ({ params: { id } }) {
    try {
      await customFetch.delete(`/jobs/${id}`);
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job deleted successfully.');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect('/dashboard/all-jobs');
  };
}
