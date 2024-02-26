import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBrpJ5S7qkpTHk38BEu9y0GKDL4ChTKDAA",
    authDomain: "react-f-b9ab0.firebaseapp.com",
    projectId: "react-f-b9ab0",
    storageBucket: "react-f-b9ab0.appspot.com",
    messagingSenderId: "37794414436",
    appId: "1:37794414436:web:53b4ca53acb3bfad308471",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Authentication
export const logOut = async () => {
    signOut(auth);
};

export const loginWithPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.error(error);
        });
};

export const registerWithPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.error(error);
        });
};

// New FireStore
export const addNewDocument = async (collect, data) => {
    try {
        const docRef = await addDoc(collection(db, collect), data);
        return docRef;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateDocumentById = async (collect, { id, data }) => {
    try {
        const updatedRef = await updateDoc(doc(db, collect, id), data);
        return updatedRef;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// FireStore
export const createDocument = async (uid, docType, data) => {
    try {
        const docRef = await addDoc(collection(db, `documents`), data);
        await addDoc(collection(db, `document_lists`), {
            student_uid: uid,
            doc_type: docType,
            doc_id: docRef.id,
            request_state: false,
            verify_state: false,
            created_at: new Date(),
            updated_at: new Date(),
        });
    } catch (error) {
        console.error(error);
    }
};

export const updateDocument = async (id, data) => {
    try {
        await updateDoc(doc(db, "documents", id), data);
    } catch (error) {
        console.error(error);
    }
};

export const getDocumentById = async (id) => {
    try {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getDocumentByUserId = async (uid, docType) => {
    try {
        const q = query(
            collection(db, "document_lists"),
            where("student_uid", "==", uid),
            where("doc_type", "==", docType)
        );

        const querySnapshot = await getDocs(q);
        let docId;
        querySnapshot.forEach((doc) => {
            docId = doc.data()?.doc_id;
        });

        if (docId) {
            const docRef = doc(db, "documents", docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return [docSnap.id, docSnap.data()];
            } else {
                console.log("No such document!");
            }
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getTeachers = async () => {
    const q = query(
        collection(db, "users"),
        where("user_type", "==", "teacher")
    );
    const teachers = {};
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        teachers[doc.id] = doc.data();
    });
    return teachers;
};

export const createRequestSig = async (uid, docType, docId, tid) => {
    try {
        // const docRef = await addDoc(collection(db, `document_request`), data);
        await addDoc(collection(db, `document_request`), {
            student_uid: uid,
            doc_type: docType,
            doc_id: docId,
            teacher_id: tid,
            verify_state: false,
            created_at: new Date(),
            updated_at: new Date(),
            signature: null,
        });
    } catch (error) {
        console.error(error);
    }
};

export const getDocReq = async (uid, docType, docId) => {
    const q = query(
        collection(db, "document_request"),
        where("student_uid", "==", uid),
        where("doc_type", "==", docType),
        where("doc_id", "==", docId)
    );

    const querySnapshot = await getDocs(q);

    const data = {};
    querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
    });

    return data;
};

export const getTeacherDocReq = async (uid, docType) => {
    const q = query(
        collection(db, "document_request"),
        where("teacher_id", "==", uid),
        where("doc_type", "==", docType),
        where("verify_state", "==", false)
    );

    const querySnapshot = await getDocs(q);

    const data = {};
    querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
    });

    return data;
};

export const getStudentById = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        return null;
    }
};

// Storage
export const uploadToStorage = async (data) => {
    const name = `sig_${Date.now()}`;
    const storageRef = ref(storage, `signatures/${name}`);

    uploadString(storageRef, data, "data_url").then((snapshot) => {
        console.log("Uploaded a data_url string!");
    });
};

// https://firebasestorage.googleapis.com/v0/b/react-f-b9ab0.appspot.com/o/some-child?alt=media&token=2ecced58-ae07-45ac-a9db-b1001477beb7
