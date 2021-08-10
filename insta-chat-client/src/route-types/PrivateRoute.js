//// Private Routes for logged in users only.

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../authentication/auth';
import { db } from '../authentication/firebase';


const PrivateRoute = ({component: Component, ...rest}) => {
    console.log("Private Route");

    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    const [isProfileComplete, setIsProfileComplete] = useState(false);
    // console.log(loggedInUser);
    // const loggedInUser = null;

    useEffect(() => {
        if(loggedInUser !== null) {
            setCurrentUser(loggedInUser)
        }
    }, [])

    useEffect(() => {
        if(currentUser === null) return;

        db.collection("user-profile").where("email", "==", currentUser.email).get()
            .then((snapshot) => {
                if(snapshot.docs.length < 1) {
                    setIsProfileComplete(false);
                }
                else {
                    setIsProfileComplete(true);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [currentUser])

    const renderHandler = useCallback((props) => {
        if(isProfileComplete === true && currentUser !== null) {
            return <Component {...props} />
        }

        else if(currentUser !== null && isProfileComplete === false) {
            return <Redirect to = {"signup-profile"} />
        }

        else return <Redirect to = {"/signin"} />
    })

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page

        <Route {...rest} render={renderHandler} />
    );
};

export default PrivateRoute;