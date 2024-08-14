import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import Swal from "sweetalert2";
import useAxiosPublic from '../hook/useAxiosPublic';

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProviders = ({children}) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic()

    const createUser =(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin=()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = ()=>{
        setLoading(true)
        signOut(auth)
        .then(()=>{
            Swal.fire("You logged out successfully")
        })
    }

    const updateUserProfile =(name, photo)=>{
        return updateProfile(auth.currentUser, { displayName:name, photoURL: photo})
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            console.log('current user', currentUser);
            // if user exist then issue a token
            if(currentUser){
                // TODO: get token and store client
                
                axiosPublic.post('/jwt', loggedUser)
                .then(res => {
                    console.log('token response',res.data);
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false);
                    }
                })
            }
            else{
            // TODO: remove token (if token stored in the client side local storage, caching, in memory)
                localStorage.removeItem('access-token')
                setLoading(false);    
                console.log('remove token')
            }
        return ()=>{
            return unSubscribe();
        }
    })},[])

    const authInfo={ createUser, login, logOut, googleLogin, updateUserProfile, user, loading }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;