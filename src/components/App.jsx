// import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
// import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import css from '../components/ContactForm/ContactForm.module.css';
import { getContacts, getFilter } from 'redux/selectors';
import { addContact, removeContact, setFilter } from 'redux/actions';

export default function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  // const [contacts, setContacts] = useState(() => {
  //   const value = JSON.parse(localStorage.getItem('contacts'));
  //   return value ?? [];
  // });
  // const [filter, setFilter] = useState('');
  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);
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

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter);
      return result;
    });
    return filteredContacts;
  };

  const onRemoveContact = id => {
    const action = removeContact(id);
    dispatch(action);
  };

  const contactsFiltered = getFilteredContacts();
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
        <ContactList items={contactsFiltered} removeContact={onRemoveContact} />
      </Section>
    </>
  );
}
