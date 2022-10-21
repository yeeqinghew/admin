import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ViewRewards.css";
import Header from "../../components/Header";

const ViewRewards = () => {
  const [reward, setReward] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`Rewards/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setReward({ ...snapshot.val() });
        } else {
          setReward({});
        }
      });
    },[id]);

    console.log("Reward", reward)
  return (
    <>
    <Header />
    <div style={{marginTop : "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>Reward Details</p>
        </div>
        <div className="container">
          <strong>Reward Title</strong>
          <span>{reward.title}</span>
          <br/>
          <br/>
          <strong>Reward Description: </strong>
          <span>{reward.description}</span>
          <br/>
          <br/>
          <strong>Points: </strong>
          <span>{reward.point}</span>
          <br/>
          <br/>
          <strong>Expiry Date: </strong>
          <span>{reward.expirydate}</span>
          <br/>
          <br/>
         
          <Link to = "/rewardsHome">
            <button className="btn btn-edit">Back</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewRewards;
