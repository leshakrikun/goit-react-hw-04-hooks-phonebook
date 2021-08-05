import React from 'react';
import s from './contacts.module.css';

const Contacts  = ({contacts, onDelete}) => {
    return (
        <div className={s.contactListformat}>
        <ul className={s.contactList}>
        {contacts.map(prev =>(
            <li key={prev.id}>
                {prev.name}: { }
                {prev.number}
                <button
                    type="button"
                    className={s.contactItem__btn}
                    onClick={() => onDelete(prev.id)}>
                    Удалить
                </button>
            </li>
        ))}
        </ul>
        </div>
)}
export default  Contacts;