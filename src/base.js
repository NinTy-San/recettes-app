import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBvrnZ0D5j2JyIjyVC69K50uRGy0OUH7yE",
  authDomain: "recettes-app-c5287.firebaseapp.com",
  databaseURL: "https://recettes-app-c5287-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
