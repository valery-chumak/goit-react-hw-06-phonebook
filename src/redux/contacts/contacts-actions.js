import { nanoid } from 'nanoid';
import { createAction } from '@reduxjs/toolkit';
export const addContact = createAction('contacts/add', data => {
  return { payload: { ...data, id: nanoid() } };
});
export const removeContact = createAction('contacts/remove');
