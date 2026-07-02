import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore"

import { db } from "./config"

const categoriesCollection = collection(db, "categories")

export function listenCategories(callback) {
  return onSnapshot(categoriesCollection, (snapshot) => {
    callback(
      snapshot.docs.map((docItem) => ({
        firebaseId: docItem.id,
        ...docItem.data(),
      }))
    )
  })
}

export function addCategory(category) {
  return addDoc(categoriesCollection, category)
}

export function updateCategory(firebaseId, category) {
  return updateDoc(doc(db, "categories", firebaseId), category)
}

export function deleteCategory(firebaseId) {
  return deleteDoc(doc(db, "categories", firebaseId))
}