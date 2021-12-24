import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import initAuthentication from "../Pages/Firebase/firebase.init";
initAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  // createUserWithEmailAndPassword
  const sign_up = (email, password, name, location, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (userCredential) {
          swal({
            title: "Registation Successfully",
            text: "Great you do well, Now you can do everything",
            icon: "success",
            button: "Oww",
          });
        }
        //   update name
        const newUser = { email, displayName: name };
        setUser(newUser);
        //   update profile
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        setError("");
        const uri = location?.state?.from || "/";
        navigate(uri);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // sign in with existing account
  const log_in = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        if (userCredential) {
          swal({
            title: "Login Successfully",
            text: "Great you do well, Now you can do everything",
            icon: "success",
            button: "Oww",
          });
        }
        setError("");
        const uri = location?.state?.from || "/";
        navigate(uri);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // sign in with google
  const googleSignIn = (location, navigate) => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        setUser(user);
        if (result) {
          swal({
            title: "Login Successfully",
            text: "Great you do well, Now you can do everything",
            icon: "success",
            button: "Oww",
          });
        }
        setError("");
        const uri = location?.state?.from || "/";
        navigate(uri);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // sign out
  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        swal({
          title: "Sign-out Successfully",
          text: "you are now signed out",
          icon: "info",
          button: "I know!",
        });
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };
  // state tracking
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
    return () => unSubscribe;
  }, [auth]);
  return {
    sign_up,
    log_in,
    logout,
    googleSignIn,
    user,
    error,
    isLoading,
  };
};

export default useFirebase;
