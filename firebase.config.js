import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC5242oq63vKdRK6kS1YDxDQTzNQj0HzqY',
  authDomain: 'apparty-houses.firebaseapp.com',
  projectId: 'apparty-houses',
  storageBucket: 'apparty-houses.appspot.com',
  messagingSenderId: '761549145098',
  appId: '1:761549145098:web:6ee9711aeb0bc607018bf3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
