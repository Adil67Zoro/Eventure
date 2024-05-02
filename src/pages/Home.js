import './Home.css'
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import Header from '../Header';
import Events from './Events';


export default function Home(){
    const [events, setEvents] = useState([]);

    useEffect(() => {
        db.collection('events').onSnapshot(snapshot => {
            setEvents(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return(
        <div className="Home">
            <Header/>
            <h2>Мероприятия этой недели</h2>
            <div className="events">
            {
                events.map(e => (
                    <Events name={e.name} date={e.date} address={e.address} total={e.total} current={e.current} img={e.img} id={e.id}/>
                ))
            }
            </div>
        </div>
    )
}