import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

class taskServices {
  constructor(userId) {
    this.userId = userId;
    this.taskCollection = collection(db, `task`);
  }

  //   create doc
  addTask(taskItem) {
    return addDoc(this.taskCollection, taskItem);
  }

  //   read all doc
  getTasks() {
    return getDocs(this.taskCollection);
  }

  getSingleTask(id) {
    const docRef = doc(db, id);
    return getDoc(docRef);
  }

  //   update doc
  updateTask(taskItem, docId) {
    const docRef = doc(db, docId);
    return updateDoc(docRef, taskItem);
  }

  //   delete doc
  deleteTask(docId) {
    const docRef = doc(db, docId);
    return deleteDoc(docRef);
  }
}

export default new taskServices();
