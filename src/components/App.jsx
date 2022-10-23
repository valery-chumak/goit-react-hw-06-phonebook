import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import css from '../components/ContactForm/ContactForm.module.css';
import { addContact, removeContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';
import { getFilter } from 'redux/filter/filter-selectors';
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

export default function App() {
  const contacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { value } = event.target;
    dispatch(setFilter(value));
  };
  const isDuplicate = ({ name }) => {
    const result = contacts.find(item => item.name === name);
    return result;
  };
  const onAddContact = contact => {
    if (isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
    const action = addContact(contact);
    dispatch(action);
  };

  const onRemoveContact = id => {
    const action = removeContact(id);
    dispatch(action);
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={onAddContact} />
      </Section>
      <Section title="Contacts">
        <label className={css.block}>
          Find contacts by name
          <input
            type="text"
            name="filter"
            value={filter}
            placeholder="Enter the name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
            onChange={handleInputChange}
          />
        </label>
        <ContactList items={contacts} removeContact={onRemoveContact} />
      </Section>
    </>
  );
}
