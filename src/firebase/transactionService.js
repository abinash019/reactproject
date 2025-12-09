import { addDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const addTransactionToDB = async (transaction) => {
  await addDoc(collection(db, "transactions"), transaction);
  console.log("🔥 Firebase Saved with ID:", docRef.id);

};

export const listenUserTransactions = (userId, callback) => {
  const q = query(
    collection(db, "transactions"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
};
