import { initializeApp, FirebaseApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ITask } from '@/types';

// eslint-disable-next-line import/no-mutable-exports
export let firebaseApp: FirebaseApp;

export const initializeAPI = (): FirebaseApp => {
  firebaseApp = initializeApp({
    apiKey: 'AIzaSyCnmKNT0zwROjvcUpNstdrsEzoYkuH-ySc',
    authDomain: 'todo-list-93d69.firebaseapp.com',
    projectId: 'todo-list-93d69',
    storageBucket: 'todo-list-93d69.appspot.com',
    messagingSenderId: '828952332466',
    appId: '1:828952332466:web:45c4f563f2fae07594a1ab',
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);
  getStorage(firebaseApp);

  return firebaseApp;
};

export const getTasks = async () => {
  const db = getFirestore();
  const tasks: ITask[] = [];

  try {
    const req = query(
      collection(db, 'tasks'),
      where('done', '==', false),
      orderBy('createDate', 'desc')
    );
    const querySnapshot = await getDocs(req);

    querySnapshot.forEach((task) => {
      const data = task.data() as Omit<ITask, 'id'>;
      tasks.push({ id: task.id, ...data });
    });

    return tasks;
  } catch (error) {
    console.error(`Error while fetching tasks: ${error}`);
    return Promise.reject(error);
  }
};

export const createTask = async (data: ITask) => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, 'tasks'), {
      title: data.title,
      description: data.description,
      createDate: data.createDate,
      done: data.done,
    });
  } catch (error) {
    console.error(`Error while creating new task: ${error}`);
    return Promise.reject(error);
  }
};

export const updateTask = async (data: ITask) => {
  const db = getFirestore();

  try {
    const dbTask = doc(db, 'tasks', data.id);

    await updateDoc(dbTask, {
      title: data.title,
      description: data.description,
      createDate: data.createDate,
      done: data.done,
    });
  } catch (error) {
    console.error(`Error while updating task "${data.id}": ${error}`);
    return Promise.reject(error);
  }
};

export const deleteTask = async (id: string) => {
  const db = getFirestore();

  try {
    const task = doc(db, 'tasks', id);
    await deleteDoc(task);
  } catch (error) {
    console.error(`Error while deleting task "${id}": ${error}`);
    return Promise.reject(error);
  }
};
