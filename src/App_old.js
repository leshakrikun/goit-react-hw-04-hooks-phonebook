import './App.css';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Phonebook from './components/PhoneBook/phoneBook';
import Contacts from './components/Contacts/contacts';
import Filter from './components/Filter/filter';


export default class App extends React.Component {
   
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  }

  componentDidMount() {
    const contactsLocal = JSON.parse(localStorage.getItem('state'));

    if (contactsLocal) {
    
      return this.setState({
        contacts: [...JSON.parse(localStorage.getItem('state'))],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(this.state !== prevState) {
           localStorage.setItem('state', JSON.stringify(this.state.contacts))
    }
  }


handleChange = (e) => {
  const {name, value} = e.target
  this.setState({[name]:value});
}

getVisibleContacts = () => {
  const { filter, contacts } = this.state;
  console.log(1, this.state);
  const normalizedFilter = filter.toLowerCase();

  return (contacts.filter(cont =>
    cont.name.toLowerCase().includes(normalizedFilter),
  ));
};

handleSubmit = e => {
    e.preventDefault();
    const form = e.target 
    const result = this.state.contacts.find( ({ name }) => name === this.state.name );
    if(result){
      alert(this.state.name + ` is already in contact`)
    } else {
      this.setState((state) => { 
        return {
          name: '',
          number: '',
          contacts: [...state.contacts, {id: uuidv4(), name: state.name, number: state.number }],
        }
      })}
    form.reset();
  }

deleteContact = id => {
  this.setState(prevState => ({
      contacts: prevState.contacts.filter(
      state => state.id !== id),
  }));
};

render() {
  const { filter } = this.state;
  const visibleContacts = this.getVisibleContacts();
    return (
     <>
        <Phonebook state = {this.state.contacts} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        <Filter value={filter} handleChange={this.handleChange} />
        <Contacts contacts={visibleContacts} onDelete={this.deleteContact}/>
     </>
  )}}