import app from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const updateUser = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }


    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('user->>>', currentUser);
            if (currentUser) {
                // get token and store in local storage
                // axiosPublic.post('/jwt', { email: currentUser?.email })
                //     .then(res => {
                //         if (res.data.token) {
                //             localStorage.setItem('access-token', res.data.token);
                //             setLoading(false);
                //         }
                //     })
                //     .catch(error => {
                //         console.error('Error fetching token:', error);
                //     });



            } else {
                // setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        createUser,
        setLoading,
        loading,
        user,
        setUser,
        updateUser,
        signInWithGoogle,
        logOut,
        logIn,

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;