import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactForm from './components/ContactForm/ContactForm.js';
import Filter from './components/Filter/Filter.js';
import ContactList from './components/ContactList/ContactList.js';
import ErrorMassage from './components/ErrorMassage/ErrorMassage.js';
import classes from './App.module.css';
import './bases.css';
import classesEror from './components/ErrorMassage/ErrorMassage.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    erroMasage: '',
  };
  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = el => {
    if (this.state.contacts.find(item => item.name === el.name)) {
      this.setState({ erroMasage: 'Is already in contacts.' });
      setTimeout(() => {
        this.setState({ erroMasage: '' });
      }, 1500);
    } else {
      this.setState(prevState => {
        const updateState = [...prevState.contacts, el];
        return { contacts: updateState, erroMasage: '' };
      });
    }
  };

  handleFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contactItem =>
      contactItem.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleDelete = id => {
    const { contacts } = this.state;
    const obj = contacts.find(el => el.id === id);
    const index = contacts.indexOf(obj);
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts.slice(0, index),
        ...prevState.contacts.slice(index + 1),
      ],
    }));
    this.setState({ filter: '' }); // очистили інпут після нажаття на кнопку delete
  };

  filterRender = filter => {
    this.setState({ filter }); // відповідає запису this.setState({ filter: filter })
  };
  render() {
    const { filter, contacts, erroMasage } = this.state;
    const visibleContact = this.handleFilter();
    return (
      <>
        <div className={classes.conteiner}>
          <ContactForm addContacts={this.addContacts} />

          {contacts.length > 1 && (
            <Filter filter={filter} filterRender={this.filterRender} />
          )}

          <ContactList array={visibleContact} deleteItem={this.handleDelete} />

          <CSSTransition
            in={!!erroMasage}
            timeout={250}
            appear={true}
            classNames={{ ...classesEror }}
            unmountOnExit
          >
            <ErrorMassage>{erroMasage}</ErrorMassage>
          </CSSTransition>
        </div>
      </>
    );
  }
}
export default App;
