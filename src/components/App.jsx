import { Component } from "react";
import React from "react";
import { nanoid } from "nanoid";
import ContactForm from "components/ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Section from "./Section/Section";
import css from '../components/ContactForm/ContactForm.module.css'
export default class App extends Component {
  state = {
    contacts: [],
    filter: ''
  }
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));

    if (contacts?.length) {
      this.setState({
        contacts
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }
  handleInputChange = event => {
        const { name, value } = event.target;
        this.setState(
        {
            [name]: value
        }
        );
  }
  addContact = (contact) => {
    if (this.isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts`)
    }
    const newContact = {
      id: nanoid(),
      ...contact
    }
    this.setState((prev) => {
      return {
        contacts:[...prev.contacts, newContact]
      }
    })
  }
  getFilteredContacts() {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter);
      return result;
    })
    return filteredContacts;
  }
  removeContact = (id) => {
    this.setState((prev) => {
      const newContacts = prev.contacts.filter((item) => item.id !== id);
      return {contacts: newContacts}
    })
  }
  isDuplicate({name}){
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name === name);
    return result;
  }
  render() {
    const { addContact, handleInputChange, removeContact } = this;
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();
    return (
      <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
          <label className={css.block}>
            Find contacts by name
            <input
            type="text"
            name="filter"
            placeholder="Enter the name"  
            value={filter}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            required
            onChange = {handleInputChange}
          />
          </label>
          <ContactList items={contacts} removeContact={removeContact } />
      </Section>
      </>
    );
  }
};
