import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ViewActivities.css";
import Header from "../../components/Header";

const ViewActivities = () => {
  const [activity, setActivity] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`Activities/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setActivity({ ...snapshot.val() });
        } else {
          setActivity({});
        }
      });
  }, [id]);

  console.log("Activities", activity);
  return (
    <>
    <Header />
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Activity Details</p>
        </div>
        <div className="container">
          <strong>Quest ID: </strong>
          <span>{activity.questId}</span> 
          <br />
          <br />
          <strong>Goal Title: </strong>
          <span>{activity.goalTitle}</span> 
          <br />
          <br />
          <strong>Activity Title: </strong>
          <span>{activity.activityTitle}</span>
          <br />
          <br />
          <strong>Activity Description: </strong>
          <span>{activity.activityDescription}</span> 
          <br />
          <br />
          <strong>Points: </strong>
          <span>{activity.points}</span> 
          <br />
          <br />
          <strong>Type: </strong>
          <span>{activity.type}</span>
          <br />
          <br />
        
          <Link to="/activitiesHome">
            <button className="btn btn-edit">Back</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewActivities;
