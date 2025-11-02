import type { Task } from "../pages/Tasks";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import moment from "moment";

const taskServices = {
  addTask: async (taskData: Task) => {
    const taskCollectionRef = collection(db, "tasks");
    const docRef = await addDoc(taskCollectionRef, taskData);
    return docRef.id;
  },
  getTodayTasks: async (userId: string): Promise<Task[]> => {
    const today = moment().startOf("day").format("DD-MM-YYYY");
    const taskCollectionRef = collection(db, "tasks");
    const q = query(
      taskCollectionRef,
      where("dueDate", "==", today),
      where("userId", "==", userId),
      where("isCompleted", "==", false)
    );
    const data = await getDocs(q);
    const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return filterData;
  },
  getTodayCompletedTasks: async (userId: string): Promise<Task[]> => {
    const today = moment().startOf("day").format("DD-MM-YYYY");
    const taskCollectionRef = collection(db, "tasks");
    const q = query(
      taskCollectionRef,
      where("dueDate", "==", today),
      where("userId", "==", userId),
      where("isCompleted", "==", true)
    );
    const data = await getDocs(q);
    const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return filterData;
  },
  completeTask: async (taskId: string, userId: string) => {
    const taskDocRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskDocRef);
    if (taskSnap.exists()) {
      const uncompletedTask = taskSnap.data();
      if(uncompletedTask.userId !== userId) {
        throw new Error("You do not have permission to complete this task.");
      }

      if(uncompletedTask.isCompleted) {
        throw new Error("Task is already completed.");
      }
      const completedTask = {
        ...uncompletedTask,
        isCompleted: true,
      }

      await updateDoc(taskDocRef, completedTask);
      return { success: true, message: "Task completed successfully." };
    }
    throw new Error("Task not found.");
  },
};

export default taskServices;
