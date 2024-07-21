"use client"

import { useContext, createContext, useState, useEffect } from "react";
import {signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider} from "firebase/auth";
import {auth} from "../firebase/config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userDetailsAdded, setUserDetailsAdded] = useState(false);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logOut = () => {
        signOut(auth);
    }

    const addUserToMongoDB = async (userData) => {
        try {
            const response = await fetch('http://localhost:3000/api/addUserDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to add user to MongoDB');
            }
            setUserDetailsAdded(true);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Add user details to MongoDB if not already added
                if (!userDetailsAdded) {
                    const userData = {
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photo: currentUser.photoURL,
                        phone: currentUser.providerData[0].phoneNumber
                        // Add other user details you want to store
                    };
                    await addUserToMongoDB(userData);
                }

            } else {
                setUser(null);
            }

        });

        return () => unsubscribe();
    }, [user, userDetailsAdded])

    return(
        <AuthContext.Provider value={{user, googleSignIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )

}

export const UserAuth = () => { 
    return useContext(AuthContext);
}