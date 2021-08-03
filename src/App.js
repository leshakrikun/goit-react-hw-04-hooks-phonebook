import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Phonebook from './components/PhoneBook/phoneBook';
import Contacts from './components/Contacts/contacts';
import Filter from './components/Filter/filter';
import './App.css';

export default function App () {
  let [name, setName] = useState('');
  let [number, setNumber] = useState('');
  let [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? ''
  );

console.log(2,contacts);
  const state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  }
const handleChange = e => {
  const {name, value } = e.target;

  switch (name) {
    case 'name':
      setName(value);
      break;
      
    case 'number':
      setNumber(value);
      break;
    default:
      return;   
  }
}
/*   const handleGood = () => {
    setName(state => state + 1);
  } */
  useEffect(() => {
    
    window.localStorage.setItem('name', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    
    window.localStorage.setItem('number', JSON.stringify(number));
  }, [number]);

  useEffect(() => {
    console.log('contacts1', contacts);
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [name, number, contacts]);


/*  const handleChange = (e) => {
     const {name, value} = e.target */
/* console.log(name, value); 
name=e.target.value;
console.log('new', name);
    /* this.setState({[name]:value}); 
  }*/

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target 
    /* const result = this.state.contacts.find( ({ name }) => name === this.state.name );
    if(result){
      alert(this.state.name + ` is already in contact`)
    } else { */
      setContacts(state => [...state,{id: uuidv4(), name, number }]);
      
      console.log(33, contacts);
      /* this.setState((state) => { 
        return {
          name: '',
          number: '',
          contacts: [...state.contacts, {id: uuidv4(), name: state.name, number: state.number }],
        }
      }) */
    form.reset();
  }

  let deleteContact = contacts.filter(
    id => (
    (id !== id))
    )


    
   /*  setContacts (deleteContact)    */ 




  function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
      return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
    });
  
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
  
    return [state, setState];
  }


 
    return (
    <>
        <Phonebook state = {contacts} handleSubmit={handleSubmit} handleChange={handleChange} />
        {/* <Filter value={filter} handleChange={this.handleChange} />*/}
        <Contacts contacts={contacts} onDelete={deleteContact} /> 
    </>
  )}