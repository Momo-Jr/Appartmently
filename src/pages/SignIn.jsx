import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import VisibilityIcon from '../assets/svg/visibilityIcon.svg';
function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(null);
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error("Re-Enter User Details")
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome Back !</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type='email'
          placeholder='someone@something.com'
          id='email'
          className='emailInput'
          value={email}
          onChange={onChange}
        />
        <div className='passwordInputDiv'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            placeholder='Password'
            className='passwordInput'
            value={password}
            onChange={onChange}
          />
          <img
            src={VisibilityIcon}
            alt='show password'
            className='showPassword'
            onClick={() => {
              setShowPassword((prevState) => !prevState);
            }}
          />
        </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>
          Forgot Password ?
        </Link>
        <div className='signInBar'>
          <p className='signInText'>SignIn</p>
          <button className='signInButton'>
            <img
              src={ArrowRight}
              style={{ fill: '#ffffff', width: '34px', height: '34px' }}
            />
          </button>
        </div>
      </form>
      {/* {Goofgle Auth} */}

      <Link to='/sign-up' className='registerLink'>
        Don&apos;t have an account ? <br />
        Sign Up here
      </Link>
    </div>
  );
}

export default SignIn;
