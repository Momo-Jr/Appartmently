import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app, db } from '../../firebase.config';
import googleIcon from '../assets/svg/googleIcon.svg';
function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnapshot = await getDoc(docRef);

      //No user condition
      if (!docSnapshot.exists()) {
        console.log('first');
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          time: serverTimestamp(),
        });
      }
      location.pathname === '/sign-up' ? navigate('/sign-in') : navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };
  return (
    <div className='socialLogin'>
      <p> Sign {location.pathname === '/sign-in' ? 'In' : 'Up'} With </p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt='google' />
      </button>
    </div>
  );
}

export default OAuth;
