import React, {useEffect, useState} from "react";
import app from "./firebase"

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));   
        });
    }, []);

    return (
        <AuthContext.Provider value = {{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}