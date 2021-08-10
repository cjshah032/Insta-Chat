import React, { useCallback } from 'react'
import { withRouter } from 'react-router';
import app from '../authentication/firebase'

function Home(props) {
    const submissionHandler = useCallback(
        async (event) => {
            event.preventDefault();
            app.auth().signOut()
                .then(() => {
                    props.history.push('/signin');
                })
                .catch((e) => {
                    alert(e);
                })
        },
        [props.history]
    )

    return (
        <div>
            Hello World <br />
            <button type="submit" onClick={submissionHandler}>Logout</button>
        </div>
    )
}

export default withRouter(Home);
