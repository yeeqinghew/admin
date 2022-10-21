import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ViewQuests.css";
import Header from "../../components/Header";

const ViewQuests = () => {
  const [quest, setQuest] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`Quest/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setQuest({ ...snapshot.val() });
        } else {
          setQuest({});
        }
      });
    },[id]);

    console.log("Quest", quest)
  return (
    <>
    <Header />
    <div style={{marginTop : "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>Quest Details</p>
        </div>
        <div className="container">
          <strong>Quest ID: </strong>
          <span>{quest.questId}</span>
          <br/>
          <br/>
          <strong>Goal Title: </strong>
          <span>{quest.goalTitle}</span>
          <br/>
          <br/>
          <strong>Quest Title: </strong>
          <span>{quest.questTitle}</span>
          <br/>
          <br/>
          <strong>Description: </strong>
          <span>{quest.description}</span>
          <br/>
          <br/>
          <strong>Points: </strong>
          <span>{quest.points}</span>
          <br/>
          <br/>
          <Link to = "/questHome">
            <button className="btn btn-edit">Back</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewQuests;
