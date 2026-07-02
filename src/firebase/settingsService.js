import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from "./config"

const settingsRef = doc(db, "settings", "store")

export function listenSettings(callback) {
  return onSnapshot(settingsRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data())
    }
  })
}

export function saveSettings(settings) {
  return setDoc(settingsRef, settings)
}