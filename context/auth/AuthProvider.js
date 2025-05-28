import React, {useState, useEffect} from 'react'
import { onAuthStateChanged} from 'firebase/auth'
import {auth} from '../../firebaseConfig'
import AuthContext from './AuthContext'

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loaded, setLoaded] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoaded(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value= {{user, setUser, loaded}}>
            {children}
        </AuthContext.Provider>

    )


}