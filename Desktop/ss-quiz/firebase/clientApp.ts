import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const clientCredentials = {
    apiKey: "AIzaSyBdxyQtQ-4z3rZR8EOFdELT4kfHzX0pCSE",
    authDomain: "ss-quiz-c7ad2.firebaseapp.com",
    projectId: "ss-quiz-c7ad2",
    storageBucket: "ss-quiz-c7ad2.appspot.com",
    messagingSenderId: "275447335676",
    appId: "1:275447335676:web:26544dff4f589205832579",
    measurementId: "G-4Z6EYRMQ2F"
}

if (!firebase.getApps.length) {
    firebase.initializeApp(clientCredentials);
}

export default firebase;