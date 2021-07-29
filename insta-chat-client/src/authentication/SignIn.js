import React, { useContext, useState } from 'react'
import {withRouter as withRouter, Redirect} from 'react-router'
import styles from './auth.module.css'
import SignUp from './SignUp';
import Login from './Login';
import { AuthContext } from './auth';


function SignIn(props) {

    const [login, setLogin] = useState(true);

    let currentUser = useContext(AuthContext);

    // if(currentUser !== null) {
    //     return <Redirect to= "/" />
    // }

    const toggleLogin = (e) => {
        setLogin(true);
    }

    const toggleSignup = (e) => {
        setLogin(false);
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHead}>
                <div className={login ? styles.cardTagActive : styles.cardTag} onClick={toggleLogin}>
                    <h2>Login</h2>
                </div>
                <div className={!login ? styles.cardTagActive : styles.cardTag} onClick={toggleSignup}>
                    <h2>Sign Up</h2>
                </div>
            </div>
            {login ? null : <SignUp></SignUp>}
            {login ? <Login></Login> : null }
        </div>
    )
}

export default withRouter(SignIn);
