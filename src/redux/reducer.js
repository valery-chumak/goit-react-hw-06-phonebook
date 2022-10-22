import { ADD_CONTACT, REMOVE_CONTACT, SET_FILTER } from './type';
const initialState = {
  contacts: [],
  filter: '',
};
const reducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      const newContacts = [...store.contacts, payload];
      return { ...store, contacts: newContacts };
    case REMOVE_CONTACT:
      const result = store.contacts.filter(item => item.id !== payload);
      return { ...store, contacts: result };
    case SET_FILTER:
      return { ...store, filter: payload };
    default:
      return store;
  }
};

export default reducer;
