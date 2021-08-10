import React, {useEffect, useState} from "react";
import app from "./firebase"


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const context = {
        currentUser: currentUser,
        setCurrentUser: setCurrentUser
    }

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));   
        });
    }, []);

    return (
        <AuthContext.Provider value = {context}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthContext = React.createContext();