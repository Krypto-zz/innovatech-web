import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"

import { auth } from "./config"

export function loginAdmin(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logoutAdmin() {
  return signOut(auth)
}

export function listenAuth(callback) {
  return onAuthStateChanged(auth, callback)
}