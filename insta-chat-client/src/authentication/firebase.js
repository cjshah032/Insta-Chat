import firebase from "firebase/app"
import "firebase/auth"
import config from "../config"

const app = firebase.initializeApp(config);

export const auth = app.auth();

export default app;