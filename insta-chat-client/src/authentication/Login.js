import React from 'react'
import { useCallback, useContext } from 'react'
import {Redirect, withRouter as withRouter} from "react-router"
import { AuthContext } from './auth';
import app from './firebase';
import styles from './auth.module.css'
import Logo from '../static/Logo.png'


const Login = (props) => {

    let {history} = props;

    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const submissionHandler = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;

            // app.auth()
            //         .signInWithEmailAndPassword(email.value, password.value)
            //         .then(
            //             (creds) => {
            //                 localStorage.setItem('user', creds);
            //                 console.log(JSON.parse(localStorage.getItem('user')));
            //             } 
            //         )
            //         .then(() => {
            //             history.push('/');
            //         })
            //         .catch( (err) => {
            //             console.log(err);
            //         } );

            try {
                const creds = await app.auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                
                // console.log(creds.user);
                // console.log(localStorage.getItem('user'));
                // console.log(currentUser);
                history.push('/');
            } catch (error) {
                console.log(error);
                alert("Eror");
            }

        }, [history]);

    if(currentUser !== null) {
        return <Redirect to = "/" />
    }

    return (
        <div className={styles.lcard}>
            <img src={Logo} alt="Welcome Image" />
            <form onSubmit={submissionHandler}>
                <div className={styles.head}>
                    <h3>Welcome Back Dear User!</h3>
                    <h4>Please Login to Continue</h4>
                </div>

                <div className={styles.input}>
                    <label value="Email/Username" htmlFor="email"> Email/Username<span className={styles.required}>*</span></label> <br />
                    <input type="email" name="email" placeholder="Email" required={true} /> <br />
                </div>

                <div className={styles.input}>
                    <label value="Password" htmlFor="password">Password<span className={styles.required}>*</span> </label> <br />
                    <input type="password" name="password" placeholder="Password" required={true} />
                </div>
                <div className={styles.foot}>
                    <button type="submit">
                        Log In
                    </button>
                    <a href=""><span>Forgot Password?</span></a>
                </div>
            </form>
        </div> 
    )
}

export default withRouter(Login);
