import ImageFilm from '../search/ImageFilm';
import { format } from 'date-fns';

function GetDetails(props){
    /*useEffect(() => {
        const fetchGetDetails = async () => {
          if (props.selectedEvent) {
            try {
              const response = await fetch(`http://localhost:5000/movie/details?query=${props.event.id_film}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
              });
              const data = await response.json();
              console.log(data);
              setData(data.info || []);
            } catch (error) {
              console.log(error);
            }
          }
        };
    
        fetchGetDetails();
    });*/

    console.log(props.datafilm)
    return (<div className="planning-details">
    <h2>Event Details</h2>
    <p>
      <strong>Title:</strong> {props.event.title}
    </p>
    <p>
      <strong>Film:</strong> {props.event.id_film}
    </p>
    <p>
      <strong>Start:</strong> {format(props.event.start, 'PPP p')}
    </p>
    <p>
      <strong>End:</strong> {format(props.event.end, 'PPP p')}
    </p>
    <button onClick={props.onClose} className="close-btn">
      Close
    </button>
    { props.datafilm ? 
      <ImageFilm dataFilm ={props.datafilm}></ImageFilm> : 
      <button>Details Film</button>
    }
  </div>)
}

export default GetDetails; 