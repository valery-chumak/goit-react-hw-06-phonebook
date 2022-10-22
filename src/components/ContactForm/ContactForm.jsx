import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
const initialState = {
  name: '',
  number: '',
};
export default function ContactForm({ onSubmit }) {
  const nameId = nanoid();
  const numberId = nanoid();

  const [state, setState] = useState(initialState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const resetForm = () => {
    setState(initialState);
  };
  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = state;
    onSubmit({ name, number });
    resetForm();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor={nameId} className={css.label}>
        Name
        <input
          id={nameId}
          type="text"
          name="name"
          placeholder="Enter the name"
          value={state.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor={numberId} className={css.label}>
        Number
        <input
          id={numberId}
          type="tel"
          name="number"
          placeholder="Enter the number"
          value={state.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </label>

      <button className={css.button}>Add contact</button>
    </form>
  );
}
