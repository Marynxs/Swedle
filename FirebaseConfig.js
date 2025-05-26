// Import the functions you need from the SDKs you need
import 'react-native-get-random-values';      
import 'react-native-url-polyfill/auto'; 
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl8amcLHAPD-5kv2QEto_U-w7d8R7Ma9Y",
  authDomain: "swedle-7082c.firebaseapp.com",
  projectId: "swedle-7082c",
  storageBucket: "swedle-7082c.firebasestorage.app",
  messagingSenderId: "416773066958",
  appId: "1:416773066958:web:876178ddecc333ae5e409f"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =
  Platform.OS === "web"
    ? getAuth(app)   // no web, use o getAuth normal
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });
export const db = getFirestore(app)
export const storage = getStorage(app);