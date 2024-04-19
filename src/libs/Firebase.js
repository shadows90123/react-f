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
    query,
    orderBy,
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

        await setDoc(doc(db, "users", user?.uid), {
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

export const GetAllDocument = async (collect, role = "student") => {
    try {
        let orderType = "created_at";

        if (role === "teacher") {
            orderType = "approved.teacher.created_at";
        } else if (role === "president") {
            orderType = "approved.president.created_at";
        }

        const q = query(collection(db, collect), orderBy(orderType));
        const retData = {};
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            retData[doc.id] = doc.data();
        });
        return retData;
    } catch (error) {
        console.error(error);
    }

    // try {
    //     const querySnapshot = await getDocs(collection(db, collect));
    //     const retData = {};
    //     querySnapshot.forEach((doc) => {
    //         retData[doc.id] = doc.data();
    //     });
    //     return retData;
    // } catch (error) {
    //     console.error(error);
    // }
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

export const CreateDocForm = async ({
    project_type,
    doc_type,
    doc_form,
    owner_id,
}) => {
    const created_at = new Date().toJSON();
    const updated_at = new Date().toJSON();
    const state = "unsubmitted";
    return await AddDocument("documents", {
        created_at,
        updated_at,
        project_type,
        doc_type,
        doc_form,
        owner_id,
        approved: {
            teacher: {
                state,
                teacher_id: null,
                signatured: null,
                created_at,
                updated_at,
            },
            president: {
                state,
                reason: "",
                created_at,
                updated_at,
            },
            exam: {
                state,
                dated: null,
                created_at,
                updated_at,
            },
        },
    });
};

export const EditDocForm = async (docId, formData) => {
    await UpdateDocument("documents", docId, {
        doc_form: formData,
        updated_at: new Date().toJSON(),
    });
};

export const ApproveDocForm = async ({ docId, teacher_id }) => {
    await UpdateDocument("documents", docId, {
        updated_at: new Date().toJSON(),
        "approved.teacher.state": "submitted",
        "approved.teacher.teacher_id": teacher_id,
        "approved.teacher.created_at": new Date().toJSON(),
        "approved.teacher.updated_at": new Date().toJSON(),
    });
};

export const SignatureForm = async ({ docId, data }) => {
    const storageRef = ref(storage, `signatures/sig_${Date.now()}.png`);
    const uploaded = await uploadString(storageRef, data, "data_url");

    await UpdateDocument("documents", docId, {
        updated_at: new Date().toJSON(),
        "approved.teacher.signatured": uploaded.metadata.fullPath,
        "approved.teacher.state": "approved",
        "approved.teacher.updated_at": new Date().toJSON(),
        "approved.president.state": "submitted",
        "approved.president.created_at": new Date().toJSON(),
        "approved.president.updated_at": new Date().toJSON(),
    });
    return uploaded.metadata.fullPath;
};

export const PresidentApproveForm = async ({ docId, state, reason }) => {
    await UpdateDocument("documents", docId, {
        updated_at: new Date().toJSON(),
        "approved.president.state": state,
        "approved.president.reason": reason,
        "approved.president.updated_at": new Date().toJSON(),
        "approved.exam.state": "submitted",
        "approved.exam.created_at": new Date().toJSON(),
        "approved.exam.updated_at": new Date().toJSON(),
    });
};

export const ExamDateForm = async ({ docId, dated }) => {
    await UpdateDocument("documents", docId, {
        "approved.exam.dated": dated,
        "approved.exam.updated_at": new Date().toJSON(),
    });
};

export const ExamStateForm = async ({ docId, state }) => {
    await UpdateDocument("documents", docId, {
        "approved.exam.state": state,
        "approved.exam.updated_at": new Date().toJSON(),
    });
};
