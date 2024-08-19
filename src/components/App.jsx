import PhonebookForm from './PhonebookForm/PhonebookForm';
import Contacts from './Contacts/Contacts';
import Filter from './FilterContacts/FilterContacts';

const App = () => {
  return (
    <div>
      <h1 className="title">Phonebook</h1>
      <PhonebookForm />
      <h2 className="title">Contacts</h2>
      <Filter />
      <Contacts />
    </div>
  );
};
export default App;
