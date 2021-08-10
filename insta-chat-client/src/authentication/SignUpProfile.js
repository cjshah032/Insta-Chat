import React, { useCallback, useContext, useEffect } from 'react'
import { db } from './firebase'
import { AuthContext } from './auth';
import { withRouter } from 'react-router';

function SignUpProfile({history}) {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    console.log("SignUpProfile");

    useEffect(() => {
        db.collection("user-profile").where("email", "==", currentUser.email)
        .get().then((snapshot) => {
            if(snapshot.docs.length >= 1) {
                history.push('/');
                // alert("Success");
            }

            else {
                
            }
        }).catch((e) => console.log(e));
        console.log(currentUser);
    }, [])

    const submissionHandler = useCallback(
        async event => {
            event.preventDefault();
            const { firstName, 
                    lastName,
                    creditCard,
                    cardType,
                    dob,
                    phoneNumber } = event.target.elements;

            try {
                db.collection("user-profile").add({
                    first_name: firstName.value,
                    last_name: lastName.value,
                    email: currentUser.email,
                    credit_card_no: creditCard.value,
                    date_of_birth: dob.value,
                    card_type: cardType.value,
                    phone: phoneNumber.value
                })
                .then(() => {
                    history.push("/")
                })
                .catch((e) => {
                    console.log(e);
                })
            } catch (e) {
                console.log(e);
            }
        }
    )


    return (
        <form onSubmit={submissionHandler}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName"/> <br></br>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName"/> <br></br>
            <label htmlFor="creditCard">Credit Card Number</label>
            <input type="text" name="creditCard"/> <br></br>
            <label htmlFor="cardType">Credit Card Type</label>
            <input type="text" name="cardType"/> <br></br>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" name="dob"/> <br></br>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" name="phoneNumber"/> <br></br>
            <button type="submit">Submit</button>
        </form>
    )
}

export default  withRouter(SignUpProfile);
