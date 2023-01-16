import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    savedMessage: "",
    notes: [],
    activeNote: null,
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
      state.savedMessage = "";
    },
    addNewEmptyNote: (state, { payload }) => {
      // state.notes.push(payload);
      state.notes = [payload, ...state.notes];
      state.isSaving = false;
      state.savedMessage = "";
    },
    setActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      state.savedMessage = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
      state.savedMessage = "";
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.savedMessage = "";
    },
    updatedNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((n) => {
        if (n.id === state.activeNote.id) {
          return state.activeNote;
        }
        return n;
      });
      state.savedMessage = `La entrada "${payload.title}" se ha guardado correctamente.`;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.activeNote.imageUrls = state.activeNote.imageUrls ? [...state.activeNote.imageUrls, ...payload] : payload;
      state.isSaving = false;
    },
    deleteNote: (state, { payload }) => {
      state.isSaving = false;
      state.savedMessage = "Nota eliminada correctamente";
      state.activeNote = null;
      state.notes = state.notes.filter((note) => note.id !== payload);
    },
    clearNotesLogout: (state, action) => {
      state.isSaving = false;
      state.savedMessage = "";
      state.activeNote = null;
      state.notes = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updatedNote,
  deleteNote,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogout,
} = journalSlice.actions;
