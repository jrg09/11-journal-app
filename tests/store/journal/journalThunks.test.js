import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import {
  addNewEmptyNote,
  deleteNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updatedNote,
} from "../../../src/store/journal/journalSlice";
import {
  startDeleteNote,
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploadingFiles,
} from "../../../src/store/journal/thunks";

describe("Pruebas sobre Journal Thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const uid = "abc123";

  beforeEach(() => jest.clearAllMocks());

  test("01 pruebas sobre startNewNote / debe crear una nueva nota en blanco", async () => {
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: [],
      })
    );

    //borrar de firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    // const docs = await getDocs(collectionRef);

    // const deletePromeses = [];

    // docs.forEach((docItem) => {
    //   deletePromeses.push(deleteDoc(docItem.ref));
    // });

    // await Promise.all(deletePromeses);
  });

  test("02 pruebas sobre startLoadingNotes / debe establecer array de notes de firebase", async () => {
    getState.mockReturnValue({ auth: { uid: uid } });

    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setNotes(expect.any(Array)));
  });

  test("03 pruebas sobre startSaveNote / debe guardar la nota editada", async () => {
    getState.mockReturnValue({
      auth: { uid: uid },
      journal: {
        activeNote: {
          id: "VRXar3oNtcjx87cwkFs8",
          date: 121212,
          title: "nota a actualizar",
          body: "nota actualizada desde test",
          imageUrls: ["image 1"],
        },
      },
    });

    await startSaveNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(
      updatedNote({
        id: expect.any(String),
        title: expect.any(String),
        body: expect.any(String),
        date: expect.any(Number),
        imageUrls: expect.any(Array),
      })
    );
  });

  test("04 pruebas sobre startUploadingFiles / debe subir fotos y regresar array de fotos subidas", async () => {
    const files = [];
    await startUploadingFiles(files)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(setPhotosToActiveNote(expect.any(Array)));
  });

  test("05 pruebas sobre startDeleteNote / debe eliminar una nota activa", async () => {
    getState.mockReturnValue({
      auth: { uid: uid },
      journal: {
        activeNote: {
          id: "VRXar3oNtcjx87cwkFs8",
          imageUrls: [],
        },
      },
    });

    await startDeleteNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(deleteNote("VRXar3oNtcjx87cwkFs8"));
  });
});
