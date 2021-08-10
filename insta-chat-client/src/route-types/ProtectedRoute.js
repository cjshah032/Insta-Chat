import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../authentication/auth';
import { db } from '../authentication/firebase';


const ProtectedRoute = ({component: Component, ...rest}) => {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log("ProtectedRoute");

    // console.log(loggedInUser);
    // const loggedInUser = null;

    useEffect(() => {
        if(loggedInUser !== null) {
            setCurrentUser(loggedInUser);   
        }
    }, [])

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page

        <Route {...rest} render={props => (
            currentUser !== null ?
                <Component {...props} />
            : <Redirect to={"/signin"} />
        )} />
    );
};

export default ProtectedRoute;