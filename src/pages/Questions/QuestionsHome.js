import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./QuestionsHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import {Card, CardHeader, CardBody, CardFooter} from "react-simple-card";

const QuestionsHome = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");

  useEffect(() => {
    fireDb.child("QuestionsList").on("value", (snapshot) => {
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
    if (window.confirm("Are you sure you want to delete this Question?")) {
      fireDb.child(`QuestionsList/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Question Deleted Successfully");
        }
      });
    }
  };

  return (
    <>
    <Header />
    <br />
    <br />
      <Link to="/addQuestions">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "addQuestions" ? "active" : ""}`}
            onClick={() => setActiveTab("Add Questions")}
          >
            Add Questions
          </p>
        </button>
      </Link>
      <div style={{ marginTop: "30px" }}>
      {Object.keys(data).map((id, index) => {
              return (
                <Card style={{marginTop: "20px"}}>
                  <CardHeader><p className="titletxt">{data[id].quizID} - {data[id].questId}</p><br></br>{data[id].quizType}
                  </CardHeader>
                  <CardBody>
                  <div> Question 1: {data[id].question1}</div>
                    <p>Options: {data[id].question1_mcq1}, {data[id].question1_mcq2}, {data[id].question1_mcq3}, {data[id].question1_mcq4}</p>
                    <p>Correct Answer: {data[id].answer1}</p>

                    <br></br>
                    <div> Question 2: {data[id].question2}</div>
                    <p>Options: {data[id].question2_mcq1}, {data[id].question2_mcq2}, {data[id].question2_mcq3}, {data[id].question2_mcq4}</p>
                    <p>Correct Answer: {data[id].answer2}</p>

                    <br></br>
                    <div> Question 3: {data[id].question3}</div>
                    <p>Options: {data[id].question3_mcq1}, {data[id].question3_mcq2}, {data[id].question3_mcq3}, {data[id].question3_mcq4}</p>
                    <p>Correct Answer: {data[id].answer3}</p>

                    <br></br>
                    <div> Question 4: {data[id].question4}</div>
                    <p>Options: {data[id].question4_mcq1}, {data[id].question4_mcq2}, {data[id].question4_mcq3}, {data[id].question4_mcq4}</p>
                    <p>Correct Answer: {data[id].answer4}</p>

                    <br></br>
                    <div> Question 5: {data[id].question5}</div>
                    <p>Options: {data[id].question5_mcq1}, {data[id].question5_mcq2}, {data[id].question5_mcq3}, {data[id].question5_mcq4}</p>
                    <p>Correct Answer: {data[id].answer5}</p>

                    <br></br>
                  </CardBody>
                  <CardFooter>
                  <Link to={`/updateQuestions/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    
                  </CardFooter>
                </Card>
              );
            })}
      </div>
    </>
  );
};

export default QuestionsHome;
