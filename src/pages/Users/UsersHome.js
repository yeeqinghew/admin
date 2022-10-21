import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./UsersHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const UsersHome = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");

  useEffect(() => {
    fireDb.child("Users").on("value", (snapshot) => {
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
    if (window.confirm("Are you sure you want to delete this User?")) {
      fireDb.child(`Users/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("User Deleted Successfully");
        }
      });
    }
  };

  return (
    <>
    <Header />
    <br />
    <br />
      <div style={{ marginTop: "50px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>FullName</th>
              <th style={{ textAlign: "center" }}>Userlevel</th>
              <th style={{ textAlign: "center" }}>Walletbalance</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].email}</td>
                  <td>{data[id].username}</td>
                  <td>{data[id].userlevel}</td>
                  <td>{data[id].walletbalance}</td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
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

export default UsersHome;