import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app } from '../../firebase.config';
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset mail was sent');
    } catch (error) {
      toast.error('Failed to send email');
    }
  };

  const onChangeEmail = (e) => setEmail(e.target.value);
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'> Forgot Password </p>
        </header>
        <main>
          <form onSubmit={formSubmit}>
            <input
              className='emailInput'
              type='text'
              id='email'
              value={email}
              onChange={onChangeEmail}
            />
            <Link to='/sign-in' className='forgotPasswordLink'>
              Sign In
            </Link>
            <div className='signInBar'>
              <div className='signInText'> Send Reset Link </div>
              <button className='signInButton'>
                <img
                  src={ArrowRightIcon}
                  style={{ fill: '#ffffff', width: '34px', height: '34px' }}
                />
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default ForgotPassword;
