import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./QuestHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const QuestHome = () => {
  const [data, setData] = useState({});
  const [joinedQuestData, setJoinedQuestData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");

  useEffect(() => {
    fireDb.child("Quest").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    // retrieve from JoinedQuests
    fireDb.child("JoinedQuests").on("value", (snapshot) => {
      const joinedQuests = snapshot.val();
      Object.entries(joinedQuests).forEach(([key, val]) => {
        // get quest's details by questID
        fireDb
          .child(`Quest/${val.questId}`)
          .get()
          .then((quest) => {
            if (quest.exists()) {
              joinedQuests[key] = { ...joinedQuests[key], quest: quest.val() };
            }
          });
        // get merchant's detail by merchantID
        fireDb
          .child(`Merchants/${val.merchantId}`)
          .get()
          .then((merchant) => {
            if (merchant.exists()) {
              joinedQuests[key] = {
                ...joinedQuests[key],
                merchant: merchant.val(),
              };
            }
          });
      });

      setJoinedQuestData(joinedQuests);
      return;
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Quest?")) {
      fireDb.child(`Quest/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Quest Deleted Successfully");
        }
      });
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <Link to="/addQuest">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "AddQuest" ? "active" : ""}`}
            onClick={() => setActiveTab("AddQuest")}
          >
            Add Quest
          </p>
        </button>
      </Link>

      <div style={{ marginTop: "50px" }}>
        <h2 className="Joined Quest">All Quests</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Quest ID</th>
              <th style={{ textAlign: "center" }}>Goal Title</th>
              <th style={{ textAlign: "center" }}>Quest Title</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>Quest Points</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th>{data[id].questId}</th>
                  <td>{data[id].goalTitle}</td>
                  <td>{data[id].questTitle}</td>
                  <td>{data[id].description}</td>
                  <td>{data[id].points}</td>
                  <td>
                    <Link to={`/updateQuests/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/viewQuests/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2 className="Joined Quest">Joined Quest</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Quest ID</th>
              <th style={{ textAlign: "center" }}>Quest Title</th>
              <th style={{ textAlign: "center" }}>Merchant ID</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {joinedQuestData &&
              Object.keys(joinedQuestData).map((id, index) => {
                return (
                  <tr key={id}>
                    <th>{joinedQuestData[id].questId}</th>
                    <td>
                      {joinedQuestData[id].quest &&
                        joinedQuestData[id].quest["questTitle"]}
                    </td>
                    <td>{joinedQuestData[id].merchantId}</td>
                    <Link to={`/viewJoinedQuest/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuestHome;
