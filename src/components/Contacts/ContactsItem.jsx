import { Loader } from 'components/Loader/Loader';
import css from './Contacts.module.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContactsThunk } from '../../redux/contacts-thunk';
import { Notify } from 'notiflix';

const ContactsItem = ({ name, phone, contactId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteContact = async contactId => {
    try {
      setLoading(true);
      await dispatch(deleteContactsThunk(contactId));
      Notify.info(`Contact "${name}" deleted`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <li key={contactId} className={css.item}>
      {name}: {phone}
      <button
        className={css.buttonDelet}
        type="button"
        onClick={() => deleteContact(contactId)}
      >
        {loading ? <Loader /> : 'Delete'}
      </button>
    </li>
  );
};

export default ContactsItem;
