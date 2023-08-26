import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';

const Login = () => {
  const navigate = useNavigate();
  async function loginDemoUser() {
    try {
      const data = {
        name: 'Zippy',
        email: 'test@test.com',
        password: 'secret123',
        lastName: 'ShakeAndBake',
        location: 'Codeville',
      };
      await customFetch.post('/auth/login', data);
      toast.success('Take a test drive');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  }

  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export const action = (queryClient) =>  {
  return async function ({ request }) {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      await customFetch.post('/auth/login', data);
      queryClient.invalidateQueries()
      toast.success('Login Successful.');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
}

export default Login;
