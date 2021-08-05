import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Phonebook from './components/PhoneBook/phoneBook';
import Contacts from './components/Contacts/contacts';
import Filter from './components/Filter/filter';
import './App.css';

export default function App () {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? ''
  );

  const handleChange = e => {
    const {name, value} = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
        
      case 'number':
        setNumber(value);
        break;
      
        case 'filter':
          setFilter(value);
          break;

      default:
        return;   
      }
    }

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [name, number, contacts]);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return (contacts.filter(cont =>
      cont.name.toLowerCase().includes(normalizedFilter),
    ));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target 
    const result = contacts.find(prev  => name === prev.name );
    if(result){
      alert(name + ` is already in contact`)
    } else {
      setContacts(state => [...state,{id: uuidv4(), name, number }]);
      form.reset();
  }}

  const deleteContact = id => {
    setContacts (contacts.filter(prev => prev.id !== id))
  };
 
  return (
  <>
    <Phonebook state = {contacts} handleSubmit={handleSubmit} handleChange={handleChange} />
    <Filter value={filter} handleChange={handleChange} />
    <Contacts contacts={getVisibleContacts()} onDelete={deleteContact} /> 
  </>
)}