import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const usersReducer = createReducer(initialState, {
  getUsersRequest: (state) => {
    state.loading = true;
  },
  getUsersSuccess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  getUsersFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  addUserRequest: (state) => {
    state.loading = true;
  },
  addUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  addRelationRequest: (state) => {
    state.loading = true;
  },
  addRelationSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  addRelationFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  getRelationRequest: (state) => {
    state.loading = true;
  },
  getRelationSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  getRelationFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
