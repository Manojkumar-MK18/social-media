import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfFPB-QXWHe16VCoG60jr4pSex2_ETZkY",
  authDomain: "social-media-1aad0.firebaseapp.com",
  projectId: "social-media-1aad0",
  storageBucket: "social-media-1aad0.firebasestorage.app",
  messagingSenderId: "769052627069",
  appId: "1:769052627069:web:9dd5f16bf1f72e107fe114",
  measurementId: "G-P8CLK0QP3S",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
