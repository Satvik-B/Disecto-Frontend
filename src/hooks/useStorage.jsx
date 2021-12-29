import { useState, useEffect } from "react";
import { projectFireStore, projectStorage } from "../firebase/config";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    console.log(projectStorage);
    console.log(typeof(projectFireStore));
    useEffect(() => {
        const storageReference = projectStorage.ref(file.name);
        const collectionReference = projectFireStore.collection('collections')
        storageReference.put(file).on('state_changed', (snap) => {
            let percentage = (snap.byteTransferred/snap.totalBytes)*100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
            console.log(err);
        }, async () => {
            const url = await storageReference.getDownloadURL();
            collectionReference.add( {url} );
            setUrl(url);
        });
    }, [file])

    return { progress, url, error };
}

export default useStorage;