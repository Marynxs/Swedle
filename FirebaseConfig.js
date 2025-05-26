// Import the functions you need from the SDKs you need
import 'react-native-get-random-values';      
import 'react-native-url-polyfill/auto'; 
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqQs1AozMir1gyVW62QUFBwtRH_rLW5is",
  authDomain: "swedle-67d07.firebaseapp.com",
  projectId: "swedle-67d07",
  storageBucket: "swedle-67d07.firebasestorage.app",
  messagingSenderId: "1042129653412",
  appId: "1:1042129653412:web:a0d8a879c0d48aa1db6031"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =
  Platform.OS === "web"
    ? getAuth(app)   // no web, use o getAuth normal
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });