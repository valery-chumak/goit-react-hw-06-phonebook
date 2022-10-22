import React, { Component } from 'react'
import { nanoid } from "nanoid";
import css from './ContactForm.module.css'
export default class FormAddContact extends Component {
    state = {
        name: '',
        number: ''
    }

    nameId = nanoid();
    numberId = nanoid();

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState(
        {
            [name]: value
        }
        );
    }
    handleSubmit = event => {
        event.preventDefault();
        const { name, number } = this.state;
        this.props.onSubmit({ name, number });
        this.resetForm();
    }
    resetForm = () => {
         this.setState({
            name: '',
            number: ''
        })
    }

    render() {
        const { nameId, numberId } = this;
        const { name, number } = this.state;
        return (
            <form className={ css.form } onSubmit={this.handleSubmit}>
                <label htmlFor={ nameId } className={css.label}>
                Name
                <input
                    id={ nameId }
                    type="text"
                    name="name"
                    placeholder="Enter the name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={this.handleInputChange}
                />
                </label>
                <label htmlFor= { numberId } className={css.label}>
                Number
                <input
                    id={ numberId }
                    type="tel"
                    name="number"
                    placeholder="Enter the number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={this.handleInputChange}
                />
                </label>
                
                <button className={css.button}>Add contact</button>
            </form>
    )
  }
}
