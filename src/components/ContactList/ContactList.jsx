import React from 'react'
import PropTypes from 'prop-types';
import css from './ContactList.module.css'
export default function ContactList({items, removeContact}) {
    const elements = items.map(({ name, number,id }) => {
        return (<li className={css.item} key={id}>{name}: {number}
        <button className={css.button} onClick={()=>removeContact(id)}>Delete</button>
        </li>)
            
    })
    return (
        <ul className={css.list}>{ elements }</ul>
    )
}
ContactList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape()),
    removeContact: PropTypes.func
}