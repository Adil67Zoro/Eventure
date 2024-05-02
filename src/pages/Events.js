import './Events.css'
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications'; 


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 240,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '16px',
    boxShadow: 24, 
    p: 4,
};

export default function Events({name, date, address, total, current, img , id}){
    const [bookingError, setBookingError] = useState(false);
    const [currentNumber, setCurrentNumber] = useState(current);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    const handleBooking = (event) => {
        event.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            setBookingError(true);
            return; 
        }

        const usersDocRef = db.collection("users").doc(user.uid);
        usersDocRef.get().then((doc) => {
            if (doc.exists) {
                const bookings = doc.data().bookings;
                if (bookings && bookings.includes(id)) {
                    setAlreadyBooked(true);
                }
                else{
                    const updatedCurrentNumber = currentNumber + 1;
                    const eventDocRef = db.collection("events").doc(id);
                    eventDocRef.update({
                        current: updatedCurrentNumber,
                        people: firebase.firestore.FieldValue.arrayUnion(user.email)
                    }).then(() => {
                        setCurrentNumber(updatedCurrentNumber); 
                        NotificationManager.success('Успешно забронировано!');
                    });
            
                    usersDocRef.update({
                        bookings: firebase.firestore.FieldValue.arrayUnion(id)
                    }).then(() => {
                        console.log("Booking successful!");
                    });
                }
            }
        });
        
    }

    return(
        <div className="event">
            <div className="img_container">
                <img className='image' src={img} alt="" />
            </div>

            <div className="left">
                <h1 className='left_cmp'>{name}</h1>
                <h2 className='left_cmp'>
                    <img src="date.png" alt="date" className='images' />
                    {date}
                </h2>
                <h3 className='left_cmp'>
                    <img src="location.png" alt="location" className='images'/>
                    {address}
                </h3>
            </div>

            <div className="right">
                <h3>Оставшиеся места: </h3>
                <h3 className='remain'>{currentNumber}/{total}</h3>

                <div className="booking">
                    {currentNumber === total ? (
                        <div className="booked">Максимальное количество мест достигнуто.</div>
                    ):(alreadyBooked ? (
                        <div className="booked">Вы уже забронировали место на это меропрятие.</div>
                    ):(<button className="book" onClick={handleBooking}>Забронировать место</button>))}
                    <div className="booking_error" style={{ display: bookingError ? 'block' : 'none' }}>Войдите в свой аккаунт перед тем как бронировать.</div>
                </div>
            </div>
        </div>
    )
}