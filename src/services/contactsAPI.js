import axios from 'axios';

const contactsAPI = axios.create({
  baseURL: 'https://641192c7e4c9f0bb00b2c7aa.mockapi.io',
});
export const getContacts = async () => {
  const { data } = await contactsAPI.get('/contacts');
  return data;
};

export const addContacts = async contact => {
  const { data } = await contactsAPI.post('/contacts', contact);
  return data;
};

export const deleteContacts = async id => {
  console.log(id);
  const { data } = await contactsAPI.delete(`/contacts/${id}`);
  return data;
};
