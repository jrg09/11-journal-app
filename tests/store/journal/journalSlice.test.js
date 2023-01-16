import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNote,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updatedNote,
} from "../../../src/store/journal/journalSlice";
import { initialState } from "../../fixtures/journalFixtures";

describe("Pruebas sobre Auth/journalSlice.js", () => {
  test("01 debe regresar el initialState y llamarse journal", () => {
    const state = journalSlice.reducer(initialState, {});

    // console.log(state);

    expect(journalSlice.name).toBe("journal");
    expect(state).toEqual(state);
  });

  test("02 pruebas en savingNewNote", () => {
    const state = journalSlice.reducer(initialState, savingNewNote());

    // console.log(state);

    expect(state.isSaving).toBe(true);
    expect(state.savedMessage).toBe("");
  });

  test("03 pruebas en addNewEmptyNote / debe modificar array de notes, isSaving a false", () => {
    const newNote = { title: "titulo", body: "entrada de prueba", date: 1545787544 };
    const state = journalSlice.reducer(initialState, addNewEmptyNote(newNote));

    // console.log(state);

    expect(state.notes.length).toBeGreaterThan(0);
    expect(state.notes[0]).toEqual(newNote);
  });

  test("04 pruebas en setActiveNote / debe poner la nota activa", () => {
    const newNote = { title: "titulo", body: "entrada de prueba", date: 1545787544 };
    const state = journalSlice.reducer(initialState, setActiveNote(newNote));

    // console.log(state);

    expect(state.activeNote).toEqual(newNote);
  });

  test("05 pruebas en setNotes", () => {
    const notes = [
      { title: "titulo", body: "entrada de prueba", date: 1545787544 },
      { title: "nota 2", body: "entrada de prueba", date: 784578 },
    ];
    const state = journalSlice.reducer(initialState, setNotes(notes));

    // console.log(state);

    expect(state.notes.length).toEqual(notes.length);
    expect(state.notes).toEqual(notes);
  });

  test("06 pruebas en setSaving", () => {
    const state = journalSlice.reducer(initialState, setSaving());

    // console.log(state);

    expect(state.isSaving).toBe(true);
    expect(state.savedMessage).toBe("");
  });

  test("07 pruebas en updatedNote", () => {
    const noteToUpdate = { title: "titulo cambiado", body: "entrada de prueba", date: 1545787544, id: "abc123" };

    const notes = [
      { title: "titulo", body: "entrada de prueba", date: 1545787544, id: "abc123" },
      { title: "nota 2", body: "entrada de prueba", date: 784578, id: "abc124" },
    ];

    const prevState = { ...initialState, isSaving: true, notes: notes };

    const state = journalSlice.reducer(prevState, setActiveNote(noteToUpdate));

    const newState = journalSlice.reducer(state, updatedNote(noteToUpdate));

    // console.log(newState);

    expect(newState.activeNote).toEqual(noteToUpdate);
    expect(newState.notes.find((note) => note.id === noteToUpdate.id)).toEqual(noteToUpdate);
  });

  test("08 pruebas en setPhotosToActiveNote", () => {
    const imageUrls = ["image1", "image 2", "image 3"];

    const newNote = { title: "titulo", body: "entrada de prueba", date: 1545787544 };

    const state = journalSlice.reducer(initialState, setActiveNote(newNote));

    const newState = journalSlice.reducer(state, setPhotosToActiveNote(imageUrls));

    expect(newState.activeNote.imageUrls).toEqual(imageUrls);
  });

  test("09 pruebas en deleteNote", () => {
    const notes = [
      { title: "titulo", body: "entrada de prueba", date: 1545787544, id: "abc123" },
      { title: "nota 2", body: "entrada de prueba", date: 784578, id: "abc124" },
    ];

    let state = journalSlice.reducer(initialState, setNotes(notes));
    state = journalSlice.reducer(state, setActiveNote(notes[0]));

    //borrar nota
    state = journalSlice.reducer(state, deleteNote(notes[0].id));

    // console.log(state);

    expect(state.isSaving).toBe(false);
    expect(state.savedMessage).toBe("Nota eliminada correctamente");
    expect(state.activeNote).toBe(null);
    expect(state.notes.find((note) => note.id === notes[0].id)).toBeFalsy();
  });

  test("10 pruebas en clearNotesLogout", () => {
    const notes = [
      { title: "titulo", body: "entrada de prueba", date: 1545787544, id: "abc123" },
      { title: "nota 2", body: "entrada de prueba", date: 784578, id: "abc124" },
    ];

    let state = journalSlice.reducer(initialState, setNotes(notes));
    state = journalSlice.reducer(state, setActiveNote(notes[0]));

    state = journalSlice.reducer(state, clearNotesLogout());

    // console.log(state);
    expect(state).toEqual(initialState);
  });
});
