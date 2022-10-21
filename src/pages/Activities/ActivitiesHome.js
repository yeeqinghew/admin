import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./ActivitiesHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const ActivitiesHome = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");
  const { id } = useParams();

  useEffect(() => {
    fireDb.child("Activities").on("value", (snapshot) => {
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
    if (window.confirm("Are you sure you want to delete this Activity?")) {
      fireDb.child(`Activities/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Activity Deleted Successfully");
        }
      });
    }
  };

  return (
    <>
    <Header />
    <br />
    <br />
      <Link to="/addActivities">
      <button class="btn btn-edit"> 
        <p
          className={`${activeTab === "addActivities" ? "active" : ""}`}
          onClick={() => setActiveTab("AddActivities")}
        >
          Add Activities
        </p>
      </button>
      </Link>
      <div style={{ marginTop: "50px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No</th>
              <th style={{ textAlign: "center" }}>Quest ID</th>
              <th style={{ textAlign: "center" }}>Activity Title</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "center" }}>Activities Points</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].questId}</td>
                  <td>{data[id].activityTitle}</td>
                  <td>{data[id].activityDescription}</td>
                  <td>{data[id].points}</td>
                  <td>
                    <Link to={`/updateActivities/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/viewActivities/${id}`}>
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

export default ActivitiesHome;
