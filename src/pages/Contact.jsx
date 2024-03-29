import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';

function Contact() {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState([{}]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setLandlord(docSnapshot.data());
      } else {
        toast.error('User Not Found');
      }
    };
    getLandlord();
  }, [params]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Landlord</p>
      </header>
      {landlord !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'> {landlord?.name} </p>
          </div>
          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
