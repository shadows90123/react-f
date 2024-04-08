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
    setDoc,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBrpJ5S7qkpTHk38BEu9y0GKDL4ChTKDAA",
    authDomain: "react-f-b9ab0.firebaseapp.com",
    projectId: "react-f-b9ab0",
    storageBucket: "react-f-b9ab0.appspot.com",
    messagingSenderId: "37794414436",
    appId: "1:37794414436:web:53b4ca53acb3bfad308471",
};

//////////////////////////////////////////////////////////
///////           Initialize Firebase
//////////////////////////////////////////////////////////

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

//////////////////////////////////////////////////////////
///////                    Auth
//////////////////////////////////////////////////////////

export const logOut = async () => {
    signOut(auth);
};

export const loginWithPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return user;
        })
        .catch((error) => {
            console.error(error);
        });
};

export const registerWithPassword = async ({
    name,
    studentId,
    tel,
    email,
    password,
    role,
}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role,
            name,
            studentId,
            tel,
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON(),
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

//////////////////////////////////////////////////////////
///////                     V2
//////////////////////////////////////////////////////////

export const GetDocument = async (collect, document) => {
    try {
        const docRef = doc(db, collect, document);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
            return undefined;
        }
    } catch (error) {
        console.error(error);
    }
};

export const GetAllDocument = async (collect) => {
    try {
        const querySnapshot = await getDocs(collection(db, collect));
        const retData = {};
        querySnapshot.forEach((doc) => {
            retData[doc.id] = doc.data();
        });
        return retData;
    } catch (error) {
        console.error(error);
    }
};

export const AddDocument = async (collect, data) => {
    try {
        const docRef = await addDoc(collection(db, collect), data);
        return docRef;
    } catch (error) {
        console.error(error);
    }
};

export const UpdateDocument = async (collect, document, data) => {
    try {
        await updateDoc(doc(db, collect, document), data);
    } catch (error) {
        console.error(error);
    }
};

export const DeleteDocument = async (collect, document, data) => {
    try {
        await deleteDoc(doc(db, collect, document));
    } catch (error) {
        console.error(error);
    }
};

export const getFromStorage = async (path) => {
    const url = await getDownloadURL(ref(storage, path))
        .then((url) => {
            return url;
        })
        .catch((error) => {
            console.error(error);
            return null;
        });

    return url;
};

//////////////////////////////////////////////////////////
///////                     Form
//////////////////////////////////////////////////////////

export const CreateDocForm = async (_config, _user, formData) => {
    return await AddDocument("documents", {
        created_at: new Date().toJSON(),
        updated_at: new Date().toJSON(),
        project_type: _config?.project,
        doc_type: _config?.doc,
        doc_form: formData,
        owner_id: _user.uid,
        approved: {
            teacher: {
                state: "unsubmitted",
                created_at: new Date().toJSON(),
                updated_at: new Date().toJSON(),
            },
            president: {
                state: "unsubmitted",
                created_at: new Date().toJSON(),
                updated_at: new Date().toJSON(),
            },
        },
        signatured: "",
    });
};

export const EditDocForm = async (docId, formData) => {
    await UpdateDocument("documents", docId, {
        doc_form: formData,
        updated_at: new Date().toJSON(),
    });
};

export const ApproveDocForm = async (docId, teacher_id) => {
    await UpdateDocument("documents", docId, {
        updated_at: new Date().toJSON(),
        "approved.teacher.state": "submitted",
        "approved.teacher.teacher_id": teacher_id,
        "approved.teacher.created_at": new Date().toJSON(),
        "approved.teacher.updated_at": new Date().toJSON(),
    });
};

export const SignatureForm = async (docId, data) => {
    const storageRef = ref(storage, `signatures/sig_${Date.now()}.png`);
    const uploaded = await uploadString(storageRef, data, "data_url");

    await UpdateDocument("documents", docId, {
        updated_at: new Date().toJSON(),
        signatured: uploaded.metadata.fullPath,
        "approved.teacher.state": "approved",
        "approved.teacher.updated_at": new Date().toJSON(),
        "approved.president.state": "submitted",
        "approved.president.created_at": new Date().toJSON(),
        "approved.president.updated_at": new Date().toJSON(),
    });
    return uploaded.metadata.fullPath;
};

export const PresidentApproveForm = async (docId, state) => {
    await UpdateDocument("documents", docId, {
        updated_at: new Date().toJSON(),
        "approved.president.state": state,
        "approved.president.updated_at": new Date().toJSON(),
    });
};
