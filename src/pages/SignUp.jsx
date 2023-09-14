import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app, db } from '../../firebase.config';
import ArrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import VisibilityIcon from '../assets/svg/visibilityIcon.svg';
function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState();
  const { email, password, name } = formData;
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

    const auth = getAuth(app);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData, time: serverTimestamp() };
      delete formDataCopy.password;
      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/sign-in');
    } catch (error) {
      toast.error('Sing-up Failed');
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome Back !</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Full Name'
          id='name'
          className='nameInput'
          value={name}
          onChange={onChange}
        />
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
        <div className='signUpBar'>
          <p className='signUpText'>SignUp</p>
          <button className='signUpButton'>
            <img
              src={ArrowRight}
              style={{ fill: '#ffffff', width: '34px', height: '34px' }}
            />
          </button>
        </div>
      </form>
      {/* {Goofgle Auth} */}

      <Link to='/sign-in' className='registerLink'>
        Sign In Now
      </Link>
    </div>
  );
}

export default SignUp;
