import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
function Categories() {
  const [loading, SetLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get Listings
        const listingsRef = collection(db, 'listings');
        //Create Query
        const listingQuery = query(
          listingsRef,
          where('type', '==', params.category),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        // Snapshot
        const listings = [];
        const listingsSnapshot = await getDocs(listingQuery);
        listingsSnapshot.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        SetLoading(false);
      } catch (error) {
        toast.error('Could not fetch data');
      }
    };
    fetchListings();
  }, [params.category]);

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.category === 'rent' ? 'Places for Rent' : 'Places for  Sale'}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                ></ListingItem>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Listing for {params.category}</p>
      )}
    </div>
  );
}

export default Categories;
