import { db } from './firebase';

// User API

export const doCreateUser = (id: string, username: string, email: string) =>
  db.ref(`users/${id}`).set({
    email,
    username,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const saveZip = (id: string, zip: string) => 
  db.ref(`users/${id}`).set({
    zip
  })

export const getZip = (id: string) => 
  db.ref(`users/${id}`).once('value');