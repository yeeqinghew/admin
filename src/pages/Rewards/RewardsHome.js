import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./RewardsHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const RewardsHome = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");

  useEffect(() => {
    fireDb.child("Rewards").on("value", (snapshot) => {
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
    if (window.confirm("Are you sure you want to delete this Reward?")) {
      fireDb.child(`Rewards/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Reward Deleted Successfully");
        }
      });
    }
  };

  return (
    <>
    <Header />
    <br />
    <br />
      <Link to="/addRewards">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "addRewards" ? "active" : ""}`}
            onClick={() => setActiveTab("AddRewards")}
          >
            Add Reward
          </p>
        </button>
      </Link>

      <div style={{ marginTop: "50px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Reward Title</th>
              <th style={{ textAlign: "center" }}>Reward Description</th>
              <th style={{ textAlign: "center" }}>Reward Points</th>
              <th stype={{ textAlign: "center"}}>Expiry Date</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">
                    {index + 1}
                  </th>
                  <td>{data[id].title}</td>
                  <td>{data[id].description}</td>
                  <td>{data[id].point}</td>
                  <td>{data[id].expirydate}</td>
                  <td>
                  <Link to={`/updateRewards/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link> 
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/viewRewards/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RewardsHome;
