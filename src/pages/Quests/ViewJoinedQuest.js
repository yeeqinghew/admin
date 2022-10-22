import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "../../components/Header";

const ViewJoinedQuest = () => {
  const [joinedQuest, setJoinedQuest] = useState({});
  const [questId, setQuestId] = useState("");
  const [quest, setQuest] = useState({});
  const [merchantId, setMerchantId] = useState("");
  const [merchant, setMerchant] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`JoinedQuests/${id}`)
      .get()
      .then((snapshot) => {
        setJoinedQuest(snapshot.val());
        setQuestId(snapshot.val().questId);
        setMerchantId(snapshot.val().merchantId);
      });
  }, [id]);

  useEffect(() => {
    if (questId) {
      // get quest's details by questID
      fireDb
        .child(`Quest/${questId}`)
        .get()
        .then((quest) => {
          if (quest.exists()) {
            setQuest(quest.val());
          }
        });
    }
  }, [questId]);

  useEffect(() => {
    // get merchant's detail by merchantID
    fireDb
      .child(`Merchants/${merchantId}`)
      .get()
      .then((merchant) => {
        if (merchant.exists()) {
          setMerchant(merchant.val());
        }
      });
  }, [merchantId]);

  return (
    <>
      <Header />
      <div style={{ marginTop: "150px" }}>
        <div className="card">
          <div className="card-header">
            <p>Joined Quest Details</p>
          </div>
          <div className="container">
            <strong>Quest ID: </strong>
            <span>{joinedQuest && joinedQuest.questId}</span>
            <br />
            <strong>Quest Title: </strong>
            <span>{quest && quest.questTitle}</span>
            <br />
            <strong>Quest Description: </strong>
            <span>{quest && quest.description}</span>
            <br />
            <strong>Goal Title: </strong>
            <span>{quest && quest.goalTitle}</span>
            <br />
            <strong>Goal Point: </strong>
            <span>{quest && quest.points}</span>
            <br />
            <strong>When: </strong>
            <span>{quest && quest.when}</span>
            <br />
            <strong>Who: </strong>
            <span>{quest && quest.who}</span>
            <br />
            <br />

            <strong>Merchant ID: </strong>
            <span>{joinedQuest && joinedQuest.merchantId}</span>
            <br />
            <strong>Company Name: </strong>
            <span>{merchant && merchant.companyName}</span>
            <br />
            <strong>Contact No: </strong>
            <span>{merchant && merchant.contactNo}</span>
            <br />
            <strong>Email: </strong>
            <span>{merchant && merchant.email}</span>
            <br />

            <br />
            <Link to="/questHome">
              <button className="btn btn-edit">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewJoinedQuest;
