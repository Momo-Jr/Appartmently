import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app, db } from '../../firebase.config';

function Profile() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const [editUserDetails, setEditUserDetails] = useState(false);
  const logout = async () => {
    signOut(auth);
    navigate('/sign-in');
  };
  const onEditSubmit = async () => {
    setEditUserDetails((prevState) => !prevState);
    try {
      //update Name in firebase
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      //update user in document in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
      });
    } catch (error) {
      toast.error("Couldn't Update user info");
    }
  };
  const onChangeDetails = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <>
      <div className='profile'>
        <header className='profileHeader'>
          <p className='pageHeader'>Profile</p>
          <button className='logOut' onClick={logout}>
            Sign-out
          </button>
        </header>
        <main>
          <div className='profileDetailsHeader'>
            <p className='profileDetailsText'> User Information</p>
            <p className='changePersonalDetails' onClick={onEditSubmit}>
              {editUserDetails ? 'Done' : 'Edit'}
            </p>
          </div>
          <div className='profileCard'>
            <form>
              <input
                type='text'
                id='name'
                className={
                  !editUserDetails ? 'profileName' : 'profileNameActive'
                }
                disabled={!editUserDetails}
                value={name}
                onChange={onChangeDetails}
              />
              <input
                type='text'
                id='email'
                className={
                  !editUserDetails ? 'profileEmail' : 'profileEmailActive'
                }
                disabled={!editUserDetails}
                value={email}
                onChange={onChangeDetails}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
