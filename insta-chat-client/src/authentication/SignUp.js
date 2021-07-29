import React, { useContext } from 'react'
import { useState, useCallback } from 'react'
import app from './firebase'
import {Redirect, withRouter as withRouter} from "react-router"
import { AuthContext } from './auth'
import styles from './auth.module.css'
import Logo from "../static/Logo.png"


const SignUp = (props) => {

    let {history} = props;

    // var [email, setEmail] = useState('')
    // var [password, setPassword] = useState('')

    // function changeHandler(state, e) {
    //     state(e.target.value)
    //     // console.log("Email: " + email);
    //     // console.log("Password: "+ password);
    // }

    const {currentUser} = useContext(AuthContext);

    const submissionHandler = useCallback (
        async event => {
           event.preventDefault();
           const {email, password} = event.target.elements;
           try {
               await app.auth()
                .createUserWithEmailAndPassword(email.value, password.value);
                history.push('/');
           } catch (error) {
               alert("Error");
           }
        }, [history]);

    // if(currentUser !== null) {
    //     return <Redirect to= "/" />
    // }

    return (
        <div className={styles.scard}>
            <img src={Logo} alt="Welcome Image" />
            <form onSubmit={submissionHandler}>
                <div className={styles.head}>
                    <h3>Hello Dear User!</h3>
                    <h4>Sign Up to Chat with Doctors</h4>
                </div>

                <div className={styles.input}>
                    <label value="Email/Username" htmlFor="email"> Email/Username<span className={styles.required}>*</span></label> <br />
                    <input type="email" name="email" placeholder="Email" required="true" /> <br />
                </div>

                <div className={styles.input}>
                    <label value="Password" htmlFor="password">Password<span className={styles.required}>*</span> </label> <br />
                    <input type="password" name="password" placeholder="Password" required="true" />
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

export default withRouter(SignUp);
