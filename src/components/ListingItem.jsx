/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import deleteIcon from '../assets/svg/deleteIcon.svg';
function ListingItem({ listing, id, onDelete }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/categories/${listing.type}/${id}`}
        className='categoryListingLink'
      >
        <img
          src={listing.imageUrls[1]}
          alt={listing.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listing.location}</p>
          <p className='categoryListingName'>{listing.name}</p>
          <p className='categoryListingPrice'>
            ${listing.offer ? listing.discountedPrice : listing.regularPrice}
          </p>
          <div className='categoryListingInfoDiv'>
            <img src={bedIcon} alt='beds' />
            <p className='categoryListingInfoText'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
            <img src={bathtubIcon} alt='bathtub' />
            <p className='categoryListingInfoText'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <img
          src={deleteIcon}
          alt=''
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
    </li>
  );
}

export default ListingItem;
