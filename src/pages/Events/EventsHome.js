import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./EventsHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import {Card, CardHeader, CardBody, CardFooter} from "react-simple-card";
const EventsHome = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");

  useEffect(() => {
    fireDb.child("CreateEvent").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Event?")) {
      fireDb.child(`CreateEvent/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Event Deleted Successfully");
        }
      });
    }
  };

  return (
    <>
    <Header />
    <br />
    <br />
      <Link to="/addEvents">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "addEvents" ? "active" : ""}`}
            onClick={() => setActiveTab("AddEvents")}
          >
            Add Event
          </p>
        </button>
      </Link>
      <div style={{ marginTop: "70px" }}>
      {Object.keys(data).map((id, index) => {
              return (
                <Card style={{marginTop: "20px"}}>
                  <CardHeader><p className="titletxt">{data[id].challengetitle} - {data[id].eventtitle}</p>
                  <br></br>{data[id].goaltitle}
                  </CardHeader>
                  <CardBody>
                    <div className="bodytxt">{data[id].eventdescription}</div>
                    <br></br>
                    <div className="bodytxt"><a href={"https://www.google.com/maps/place/"+`${data[id].eventlocation}`} target="_blank">{data[id].eventlocation}</a></div>
                    <p>Date: {data[id].eventdate}</p>
                    <p>Timing: {data[id].eventstarttime}-{data[id].eventendtime}</p>
                    
                  </CardBody>
                  <CardFooter>
                  <Link to={`/updateEvents/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/viewEvents/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
        
      </div>
    </>
  );
};

export default EventsHome;
