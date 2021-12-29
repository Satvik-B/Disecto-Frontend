import { useEffect, useState } from 'react';
import { projectFireStore } from '../firebase/config';
import { collection, onSnapshot, query } from 'firebase/firestore';

const useFirestore = (collection1) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    console.log('getting_data');
    const q = query(collection(projectFireStore, collection1));
    const unsub = onSnapshot(q, (snap) => {
      const lst = [];
      snap.forEach((doc) => {
        lst.push({ ...doc.data(), id:doc.id });
      });
      setDocs(lst);
    });
    return () => unsub();
  }, [collection1]);
  return { docs };
};

export default useFirestore;