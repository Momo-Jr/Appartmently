import { Link } from 'react-router-dom';
import rentCategoryImg from '../assets/jpg/francesca-tosolini-tHkJAMcO3QE-unsplash.jpg';
import sellCategoryImg from '../assets/jpg/henry-becerra-jsHk0zJfvSc-unsplash.jpg';
function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>
      </header>
      <main>
        <section>{/* Slider */}</section>
        <p className='exploreCategoryHeading'>Categories</p>
        <section className='exploreCategories'>
          <Link to='/categories/sale'>
            <img
              src={sellCategoryImg}
              alt='Sale Apartment'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'> Appartments for Sale</p>
          </Link>
          <Link to='/categories/rent'>
            <img
              src={rentCategoryImg}
              alt='Rent Apartment'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'> Appartments for Rent</p>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Explore;
