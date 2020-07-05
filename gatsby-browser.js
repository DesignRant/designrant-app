import "./src/styles/global.scss"
import WorkWithUs from "./scripts/work_with_us"

// if (typeof window !== undefined) {
//   if (
//     window.location.pathname !== "/comingsoon" &&
//     window.location.pathname !== "/comingsoon/"
//   ) {
//     window.location.replace("/comingsoon/")
//   }
// }

let firebase

if (typeof window !== "undefined" && process.env.GATSBY_PRODUCTION) {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_SB,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  }
  firebase = require("firebase/app")
  firebase.initializeApp(config)
  WorkWithUs()
}
