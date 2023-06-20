import {
  query,
  collection,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {uploadBytes, getDownloadURL, ref} from 'firebase/storage'
import { store, storage } from ".";


//
export const addData = async ({ path, data, id }) => {
  await setDoc(doc(store, path, id), {
    ...data,
    timeStamp: serverTimestamp(),
  });
};


// update document
export const updateDocument = async ({ path, id, data }) => {
    const docRef = doc(store, path, id);
  
    await updateDoc(docRef, data);
  };

// read data for every collection
export const readData = async ({ path, getData }) => {
  const readQuery = query(collection(store, path));

  onSnapshot(readQuery, (qss) => {
    let temp = [];
    qss.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    getData(temp);
    temp = [];
  });
};

// Upload File
export const uploadFile = async ({ file, path, getLink }) => {
    const fileRef = ref(storage, path + "-" + new Date().getTime().toString());
    await uploadBytes(fileRef, file).then(() => {
      getDownloadURL(fileRef).then((url) => getLink(url));
    });
  };
