import { useEffect, useState } from "react";
// import "firebase-functions"
import React from "react";
import { db } from "./firebase";

function DbTest() {
    const [data, setData] = useState(null);

    useEffect(() => {
        db.collection("user-profile").get().then((snapshot) => {
            setData(snapshot);
            console.log(snapshot.docs[0].data());
        })
    }, []);

    return (
        <div>
            <ul>
                {data ? data.docs.forEach((element, index) => {
                    return(
                        <li id={index}>
                            <span>{element.data().email}</span>
                        </li>
                    );
                }) : <h1>Hello World</h1>}
            </ul>
            <p>
                {data ? data.docs[0].data().email: null}
            </p>
        </div>
    )
}


export default DbTest;