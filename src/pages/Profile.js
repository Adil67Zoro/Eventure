import './Profile.css';
import Header from '../Header';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { NotificationManager } from 'react-notifications'; 
import { useNavigate } from 'react-router-dom';


export default function Profile(){
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [bookedEvents, setBookedEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [currentNumber, setCurrentNumber] = useState();
    const [users, setUsers] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot(snapshot => {
          setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    
        return () => {
          unsubscribe();
        };
      }, []);

    useEffect(() => {
        const unsubscribe = db.collection('events').onSnapshot(snapshot => {
            setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const { bookings } = userDocSnapshot.data();
                    setBookedEvents(bookings || []);
                }
            } catch (error) {
                console.error("Error fetching user bookings:", error);
            }
        };
        fetchUserBookings();
    }, [user]);

    const deleteBooking = (id) => {
        setDeleteLoading(true);
        const usersDocRef = db.collection("users").doc(user.uid);
        const eventDocRef = db.collection("events").doc(id);
        
        eventDocRef.get().then((doc) => {
            if (doc.exists) {
                const currentNumber = doc.data().current;

                usersDocRef.update({
                    bookings: firebase.firestore.FieldValue.arrayRemove(id)
                }).then(() => {
                    console.log("Booking deleted successfully!");
                    const updatedCurrentNumber = currentNumber - 1;
                    eventDocRef.update({
                        current: updatedCurrentNumber,
                        people: firebase.firestore.FieldValue.arrayRemove(user.email)
                    }).then(() => {
                        setCurrentNumber(updatedCurrentNumber);
                        setBookedEvents(prevBookedEvents => prevBookedEvents.filter(bookingId => bookingId !== id));
                        NotificationManager.success('Вы отменили забронирование!');
                        setDeleteLoading(false);
                    });
                })
            }
        })
    };

    
    return(
        <div className="Profile">
            <Header/>
            <div className="page">
                <div className="my_bookings">
                    <h2 className='title'>Мои бронирования</h2>
                    {bookedEvents.length > 0 ? (
                        bookedEvents.map((booking) => {
                            const bookedEvent = events.find(event => event.id === booking);

                            if (bookedEvent) {
                                return (
                                    <div key={bookedEvent.id} className="bookedEvent">
                                        <h2 className='info'>{bookedEvent.name}</h2>
                                        <h2 className='info'>
                                            <img src="date.png" alt="date" className='images' />
                                            {bookedEvent.date}
                                        </h2>
                                        <h3 className='info'>
                                            <img src="location.png" alt="location" className='images'/>
                                            {bookedEvent.address}
                                        </h3>
                                        <button className="delete" onClick={()=>{deleteBooking(booking)}} disabled={deleteLoading}>Отменить бронирование</button>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })
                    ) : (
                        <p></p>
                    )}
                </div>
                
                <div className="settings">
                {users
                    .filter(userData => userData.key === user.uid)
                    .map(user => (
                        <div className="account_box">
                            <h2 className="info">{user.firstName} {user.lastName}</h2>
                            <h2 className="info">{user.email}</h2>
                        </div>
                ))}
                    <button className="log_out" onClick={() => {
                        auth.signOut();
                        navigate('/');
                    }}>Выйти</button>
                </div>
            </div>
        </div>
    );
}
