import React, { useState, useEffect } from 'react';
import { db,auth } from './firebase';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
          if (authUser) {
              setUser(authUser);
              addUserToDatabase(authUser);
          } else {
              setUser(null);
          }
      });

      return () => {
          unsubscribe();
      };
  }, [user]);

  const addUserToDatabase = async (authUser) => {
    const usersRef = db.collection('users');
    const { uid, displayName, email } = authUser;
    const [firstName, lastName] = displayName.split(' ');

    const userDoc = await usersRef.doc(uid).get();

    if (!userDoc.exists) {
        await usersRef.doc(uid).set({
            key: uid,
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            bookings: []
        });
    }
  };

  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
        .then(() => {
          window.location.reload();
      })
  };

  return (
      <div className="header">
          <button className="logo" onClick={() => navigate('/')}>
              Eventure
          </button>
          <div className="buttons">
            <button className="header_button" onClick={() => navigate('/')}>Главная</button>
            {user ? (
                <button className="header_button" onClick={() => navigate('/profile')}>Профиль</button>
            ) : (
                <button className="header_button" onClick={signInWithGoogle}>Войти через Гугл Аккаунт</button>
            )}
          </div>
      </div>
  );
}