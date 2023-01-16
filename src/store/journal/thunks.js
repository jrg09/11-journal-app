//prettier-ignore
import { addNewEmptyNote, setActiveNote, setNotes, setSaving, updatedNote, deleteNote, savingNewNote, setPhotosToActiveNote } from "./journalSlice";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../firebase/loadNotes";
import { deleteImage, uploadFile } from "../../firebase/cloudinary";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes/`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    // console.log(`uid creado en firestore: ${newNote.id}`);

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    //  dispatch();

    const { uid } = getState().auth;
    // console.log("uid", uid);

    if (!uid) throw new Error("User doesn't exists");

    const notes = await loadNotes(uid);

    if (!!notes) dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { activeNote: note } = getState().journal;

    // console.log(`Start saving note ${note.id}`);

    // console.log(note);

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updatedNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    // console.log(`startUploadingFiles files: ${files.length}`);

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(uploadFile(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    // console.log("url", photosUrls);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { activeNote: note } = getState().journal;

    // console.log(`Start deleting note ${note.id} / uid: ${uid}`);

    const fileDeletePromises = [];

    for (const url of note.imageUrls) {
      fileDeletePromises.push(deleteImage(url));
    }

    const photosUrls = await Promise.all(fileDeletePromises);

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    await deleteDoc(docRef);

    // console.log("nota eliminada en Firebase");

    dispatch(deleteNote(note.id));
  };
};
