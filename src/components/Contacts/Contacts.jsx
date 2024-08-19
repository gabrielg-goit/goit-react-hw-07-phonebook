import css from './Contacts.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/filter-selector';
import ContactsItem from './ContactsItem';
import { getContactsThunk } from '../../redux/contacts-thunk';
import { Loader } from 'components/Loader/Loader';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await dispatch(getContactsThunk());
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader className={css.loader} />
      ) : (
        <ul className={css.list}>
          {contacts.map(({ id, name, phone }) => {
            return (
              <ContactsItem key={id} name={name} phone={phone} contactId={id} />
            );
          })}
        </ul>
      )}
    </>
  );
};
export default Contacts;
