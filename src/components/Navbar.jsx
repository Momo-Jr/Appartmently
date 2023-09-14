import { Link, useLocation } from 'react-router-dom';
import exploreIcon from '../assets/svg/exploreIcon.svg';
import offersIcon from '../assets/svg/localOfferIcon.svg';
import personOutlineIcon from '../assets/svg/personOutlineIcon.svg';

function Navbar() {
  const location = useLocation();

  const myPathCheck = (route) => {
    return location.pathname === route;
  };

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem'>
            <Link to='/'>
              <img
                src={exploreIcon}
                alt='Explore Icon'
                style={{
                  fill: myPathCheck('/') ? '#2c2c2c' : '#8f8f8f',
                  width: '36px',
                  height: '36px',
                }}
              />
              <p>Explore</p>
            </Link>
          </li>
          <li className='navbarListItem'>
            <Link to='/offers'>
              <img
                src={offersIcon}
                alt='Offers Icon'
                style={{
                  fill: myPathCheck('/offers') ? '#2c2c2c' : '#8f8f8f',
                  width: '36px',
                  height: '36px',
                }}
              />
              <p>Offers</p>
            </Link>
          </li>
          <li className='navbarListItem'>
            <Link to='/profile'>
              <img
                src={personOutlineIcon}
                alt='Profile Icon'
                style={{
                  fill: myPathCheck('/profile') ? '#2c2c2c' : '#8f8f8f',
                  width: '36px',
                  height: '36px',
                }}
              />
              <p>Profile</p>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
