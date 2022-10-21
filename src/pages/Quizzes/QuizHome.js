import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./QuizHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const QuizHome = () => { // if needed change Quest1 back to QuizHome
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");

  useEffect(() => {
    fireDb.child("Quiz").on("value", (snapshot) => {
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
      fireDb.child(`Quiz/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Quiz Deleted Successfully");
        }
      });
    }
  };
  return (
    <>
    <Header />
    <br />
    <br />
      <Link to="/addQuiz">
      <button class="btn btn-edit"> 
        <p
          className={`${activeTab === "addQuiz" ? "active" : ""}`}
          onClick={() => setActiveTab("AddQuiz")}
        >
          Add Quiz
        </p>
      </button>
      </Link>
      <div style={{ marginTop: "50px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Quiz ID</th>
              <th style={{ textAlign: "center" }}>Quest ID</th>
              <th style={{ textAlign: "center" }}>Quiz Type</th>
              <th style={{ textAlign: "center" }}>Points per quiz attempt</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].quizID}</td>
                  <td>{data[id].questId}</td>
                  <td>{data[id].quizType}</td>
                  <td>{data[id].points}</td>
                  
                  <td>
                    <Link to={`/updateQuiz/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
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

export default QuizHome; // if needed change Quest1 to QuizHome
