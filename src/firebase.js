import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUNmJipiJm7ZGgDP8LteZMVdDb6TsJbXM",
  authDomain: "auth-54db4.firebaseapp.com",
  databaseURL: "https://auth-54db4-default-rtdb.firebaseio.com",
  projectId: "auth-54db4",
  storageBucket: "auth-54db4.appspot.com",
  messagingSenderId: "1046094489857",
  appId: "1:1046094489857:web:6884360a2a83cc14305300",
  measurementId: "G-1MT6MQMHTM",
};

const fireDb = firebase.initializeApp(firebaseConfig);
const auth = getAuth(fireDb);
const storage = getStorage(fireDb);

export { auth };
export { storage };
export default fireDb.database().ref();
