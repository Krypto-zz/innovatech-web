import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCCLR0llODXEdg1b-pUG03hBOo-qCpK_PI",
  authDomain: "innovatech-90d97.firebaseapp.com",
  projectId: "innovatech-90d97",
  storageBucket: "innovatech-90d97.firebasestorage.app",
  messagingSenderId: "1001120328818",
  appId: "1:1001120328818:web:78d9f0f8aba5c9783ba6eb",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)