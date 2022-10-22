import { createReducer } from '@reduxjs/toolkit';
import { addContact, removeContact } from './contacts-actions';

const initialState = [];

export const contactReducer = createReducer(initialState, {
  [addContact.type]: (store, { payload }) => {
    store.push(payload);
  },
  [removeContact.type]: (store, { payload }) =>
    store.filter(({ id }) => id !== payload),
});
