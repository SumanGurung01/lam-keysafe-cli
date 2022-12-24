import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "",
    authDomain: "lam-keysafe-cli.firebaseapp.com",
    databaseURL: "",
    projectId: "lam-keysafe-cli",
    storageBucket: "lam-keysafe-cli.appspot.com",
    messagingSenderId: "124004149213",
    appId: "1:124004149213:web:c0be3f908fb2e50917b834"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
