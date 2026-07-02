import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore"

import { db } from "./config"

const productsCollection = collection(db, "products")

export function listenProducts(callback) {
  return onSnapshot(productsCollection, (snapshot) => {
    const products = snapshot.docs.map((docItem) => ({
      firebaseId: docItem.id,
      ...docItem.data(),
    }))

    callback(products)
  })
}

export function addProduct(product) {
  return addDoc(productsCollection, product)
}

export function updateProduct(firebaseId, product) {
  const productRef = doc(db, "products", firebaseId)
  return updateDoc(productRef, product)
}

export function deleteProduct(firebaseId) {
  const productRef = doc(db, "products", firebaseId)
  return deleteDoc(productRef)
}