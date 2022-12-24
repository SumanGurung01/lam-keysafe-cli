import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB0v1w7uEtbksTXU26ZAYr448dk9o3qV04",
    authDomain: "lam-keysafe-cli.firebaseapp.com",
    databaseURL: "https://lam-keysafe-cli-default-rtdb.firebaseio.com",
    projectId: "lam-keysafe-cli",
    storageBucket: "lam-keysafe-cli.appspot.com",
    messagingSenderId: "124004149213",
    appId: "1:124004149213:web:c0be3f908fb2e50917b834"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
