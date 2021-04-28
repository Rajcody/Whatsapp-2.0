// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCUk7vNiGIcrjznPk_6ky-VndOmyd2VR_8",
    authDomain: "whatsapp-c-7b35e.firebaseapp.com",
    projectId: "whatsapp-c-7b35e",
    storageBucket: "whatsapp-c-7b35e.appspot.com",
    messagingSenderId: "47458963264",
    appId: "1:47458963264:web:7b60c4f1c5a07ce1c074a5",
    measurementId: "G-0W5754SJ1Z"
  };

    const firebaseApp= firebase.initializeApp(firebaseConfig);
    //setting db
     const db=  firebaseApp.firestore(); 
     //Authentication Handler
     const auth = firebase.auth();
     //Google authentication provided by google
    const provider = new firebase.auth.GoogleAuthProvider();

    export {auth, provider};
    export default db;