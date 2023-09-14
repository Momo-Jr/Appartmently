import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;