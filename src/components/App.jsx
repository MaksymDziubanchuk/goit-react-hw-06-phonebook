import { useSelector, useDispatch } from 'react-redux';

import { addContact as addContactAction, removeContact, updateFilter } from '../contactsSlice';
// import contacts from 'Data/contacts.json';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from 'components/App.module.css';

export const App = () => {
  const contacts = useSelector((state) => state.contacts.items || []);
  const filter = useSelector((state) => state.contacts.filter || '');
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(updateFilter(e.target.value));
  };

  const addContact = (name, number) => {
    dispatch(addContactAction({name, number}))
  };

  const deleteContact = contactId => {
    dispatch(removeContact(contactId))
  };

  const searchContact = filter.toLowerCase();
  const filteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(searchContact))
    .sort((firstContact, secondContact) =>
      firstContact.name.localeCompare(secondContact.name)
    );

  return (
    <div className={css.thumb}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};
