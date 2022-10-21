import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ViewEvents.css";
import Header from "../../components/Header";

const ViewEvents = () => {
  const [event, setEvent] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`CreateEvent/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setEvent({ ...snapshot.val() });
        } else {
          setEvent({});
        }
      });
    },[id]);

    console.log("Event", event)
  return (
    <>
    <Header />
    <div style={{marginTop : "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>Event Details</p>
        </div>
        <div className="container">
          <strong>Event Title: </strong>
          <span>{event.eventtitle}</span>
          <br/>
          <br/>
          <strong>Event Description: </strong>
          <span>{event.eventdescription}</span>
          <br/>
          <br/>
          <strong>Event Date:  </strong>
          <span>{event.eventdate}</span>
          <br/>
          <br/>
          <strong>Event Start Time: </strong>
          <span>{event.eventstarttime}</span>
          <br/>
          <br/>
          <strong>Event End Time: </strong>
          <span>{event.eventendtime}</span>
          <br/>
          <br/>
          <strong>Event Location: </strong>
          <span><a href={"https://www.google.com/maps/place/"+`${event.eventlocation}`} target="_blank">{event.eventlocation}</a></span>
          <br/>
          <br/>
          <strong>Event Count: </strong>
          <span>{event.count}</span>
          <br/>
          <br/>
          <strong>Event Points: </strong>
          <span>{event.eventpoints}</span>
          <br/>
          <br/>
          
          <Link to = "/eventsHome">
            <button className="btn btn-edit">Back</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewEvents;
