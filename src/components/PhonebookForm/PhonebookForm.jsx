import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import style from './PhonebookForm.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contacts-selector';
import { addContactsThunk, getContactsThunk } from '../../redux/contacts-thunk';
import { Loader } from 'components/Loader/Loader';
import { Notify } from 'notiflix';

const PhonebookForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const validateName = name => {
    const nameRegex = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
  };

  const validateNumber = phone => {
    const phoneRegex =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    return phoneRegex.test(phone);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const contacts = useSelector(selectContacts);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateName(name)) {
      Notify.failure('Name may contain only letters, apostrophe, and spaces');
      return;
    }

    if (!validateNumber(phone)) {
      Notify.failure(
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      );
      return;
    }

    const newContact = {
      id: nanoid(4),
      name: name,
      phone: phone,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }
    try {
      setLoading(true);
      await dispatch(addContactsThunk(newContact));
      setName('');
      setPhone('');
      Notify.success(`Contact "${newContact.name}"  added successfully`);
    } catch (error) {
      Notify.error(
        `Contact "${newContact.name}" not added.  Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
    // dispatch(addContactsThunk(newContact));
    // setName('');
    // setPhone('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label}>
        Name:
        <input
          className={style.input}
          id="nameInput"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={style.label}>
        Phone Number:
        <input
          className={style.input}
          id="numberInput"
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          required
        />
      </label>
      <button className={style.button} type="submit">
        {loading ? <Loader /> : 'Add Contact'}
      </button>
    </form>
  );
};

export default PhonebookForm;
