import firebase from "firebase/app"
import "firebase/auth"
import config from "../config"
import "firebase/database";
import "firebase/firestore"

const app = firebase.initializeApp(config);

export const db = firebase.firestore();

export const auth = app.auth();

export default app;