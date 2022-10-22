import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contacts/contacts-reducer';
import filterReducer from './filter/filter-reducer';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
  },
});
