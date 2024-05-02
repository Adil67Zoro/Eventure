import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBfi611UXXSCERQULls8MIVc5_4FnxT3Jo",
    authDomain: "eventure-24af4.firebaseapp.com",
    projectId: "eventure-24af4",
    storageBucket: "eventure-24af4.appspot.com",
    messagingSenderId: "1094376364044",
    appId: "1:1094376364044:web:2182be4ed459a786d3b629",
    measurementId: "G-51DH4SCBLV"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };