// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCckKnW8c1y0_40T7HxJgGXVRVhAgNoUo0',
  authDomain: 'multipage-gallery.firebaseapp.com',
  projectId: 'multipage-gallery',
  storageBucket: 'multipage-gallery.appspot.com',
  messagingSenderId: '90405525048',
  appId: '1:90405525048:web:1d064186dd209740ea78cd',
  measurementId: 'G-BMECQ0M30F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFireStore = getFirestore(app);

export { projectStorage, projectFireStore };