import { Form, redirect, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';

const Profile = () => {
  const { user } = useOutletContext();
  const { name, email, location, lastName } = user;

  return (
    <Wrapper>
      <Form method="POST" className="form" encType="multipart/form-data">
        <h4 className="form-tile">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              select an image file (max 5MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow name="name" defaultValue={name} />
          <FormRow
            labelText="last name"
            name="lastName"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow name="location" defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;

export const action = (queryClient) => {
  return async function ({ request }) {
    const formData = await request.formData();
    const file = formData.get('avatar');
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error('Image size too large');
      return null;
    }
    try {
      await customFetch.patch('/users/update-user', formData);
      queryClient.invalidateQueries(['user']);
      toast.success('Profile updated successfully.');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };
};
