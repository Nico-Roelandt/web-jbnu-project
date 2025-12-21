import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJETtJfKreM-zjSSGH1Zlmt8yN_n3gVBk",
  authDomain: "wordle-25eb8.firebaseapp.com",
  projectId: "wordle-25eb8",
  storageBucket: "wordle-25eb8.firebasestorage.app",
  messagingSenderId: "355578950794",
  appId: "1:355578950794:web:9d4e83aa7206d8a7bee973",
  measurementId: "G-0SJ6BBPX0N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
