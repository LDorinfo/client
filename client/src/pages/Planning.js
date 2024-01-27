import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Planning.css';
import 'moment-timezone';
import moment from "moment";  
import fr from 'date-fns/locale/fr';
import SelecteurDate from '../SelecteurDate'
import SelecteurFilm from './SelecteurFilm';
import { useState, useEffect } from 'react';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import NavigationBar from '../NavigationBar';
import GetDetails from './GetDetails';


//<ImageFilm datafilm ={datafilm}></ImageFilm>
function Planning(props){
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [idFilm, setIdFilm]= useState(872585);  
  const [events, setEvent]= useState([]); 
  const [startdate, setDateStart]= useState(''); 
  const [datafilm, setData]= useState();
  const [enddate, setDateEnd]= useState(''); 
  const [title, setTitle]= useState(""); 
  const [ischange, setIschange]= useState(true); 

  const locales = {fr}
  const localizer = dateFnsLocalizer({format,parse,startOfWeek,getDay,locales})
  
  const getTitle= (evt)=>{
    setTitle(evt.target.value); 
  }
  const handleChangeStart = (e) =>{
    const formattedDate = format(new Date(e.target.value), "yyyy, M, d, H, m");
    setDateStart(formattedDate);
  }
  const handleChangeEnd = (e) =>{
    const formattedDate = format(new Date(e.target.value), "yyyy, M, d, H, m");
    setDateEnd(formattedDate);
  }
  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };
  function parseCustomDate(dateString) {
    const [year, month, day, hours, minutes] = dateString.split(', ');
    // Attention : le mois dans JavaScript est 0-indexé, donc soustrayez 1
    return moment(year, month - 1, day, hours, minutes).toDate();
  }

  useEffect(() => {
    const fetchGetPlanning= () => {
      fetch(`http://localhost:5000/planning/get?query=${props.data}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const formattedEvents = data.planning.map((event) => ({
          id: event.id,
          start: parseCustomDate(event.start),
          end: parseCustomDate(event.end),
          title: event.title,
          id_film: event.film_id,
        }));
        setEvent(formattedEvents);
        console.log(events);
      })
      .catch((error) => console.log(error));
    }
    fetchGetPlanning();
    console.log("Updated events:", events);
  }, [setIschange]);
  
    const fetchGetDetails= () => {
    fetch(`http://localhost:5000/movie/details?query=${idFilm}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setData(data.info);
      console.log(datafilm);
    })
    .catch((error) => console.log(error));
  }
  const handleSelectEvent = (evt) => {
    setSelectedEvent(evt);
    fetchGetDetails();
  };
  /*const handleClickDetails = (evt) =>{
    //fetchGetDetails(); 
    console.log(datafilm);
  }*/
  const handleClickCreate = (evt) => {
    evt.preventDefault();
    // perme de faire la recherche pour les films dans les filtres sélectionnées. 
    fetch(`http://localhost:5000/planning/add`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"}, 
      credentials: 'include', 
      body : JSON.stringify({idFilm : idFilm, user : props.data,start : startdate, end  : enddate, title : title})
    })
    .then((response)=> response.json())
    .then((data)=>{
      console.log(data);
      // Mettre à jour l'état events
      setEvent((prevEvents) => [...prevEvents,{
        id: data.id,
        start: parseCustomDate(data.start),
        end: parseCustomDate(data.end),
        title: data.title,
        id_film: data.film_id,
        },
      ]);
    console.log('Updated events:', events);
    setDateEnd("")
    setDateStart("")
    setTitle("")
    setIschange(true); 
    })
    .catch((error)=> console.log(error))
  }
  console.log(selectedEvent)
  return(
    <div>
        <NavigationBar setPage={props.setPage}/>
    <div className="planning-container">
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
    <div>
        {selectedEvent && (
          <div>
            <GetDetails event={selectedEvent} onClose={handleCloseDetails} datafilm={datafilm} />
          </div>
        )}
        <label htmlFor="title-calendar">Title</label>
        <input id="title-calendar" placeholder="Title" value={title} onChange={getTitle} className="title_calendar_input" />
        <p> Start: </p>
        <SelecteurDate handleChange={handleChangeStart} date={startdate} />
        <p> End: </p>
        <SelecteurDate handleChange={handleChangeEnd} date={enddate} />
        <SelecteurFilm setIdFilm={setIdFilm}/>
        <button onClick={handleClickCreate} className="button_ajout">Ajouter</button>
    </div>
    </div>

  )
}
export default Planning; 