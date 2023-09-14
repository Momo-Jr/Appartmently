import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { app } from '../../firebase.config';
function useAuthHook() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkStatus, setCheckStatus] = useState(true);
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted) {
      const auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  });

  return { loggedIn, checkStatus };
}

export default useAuthHook;
