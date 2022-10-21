import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ViewQuestions.css";
import Header from "../../components/Header";

const ViewQuestions = () => {
  const [question, setQuestion] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`Questions/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setQuestion({ ...snapshot.val() });
        } else {
          setQuestion({});
        }
      });
    },[id]);

    console.log("Questions", question)
  return (
    <>
    <Header />
    <div style={{marginTop : "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>Question Details</p>
        </div>
        <div className="container">
          <strong>Quiz ID </strong>
          <span>{question.quizId}</span>
          <br/>
          <br/>
          <strong>Question: </strong>
          <span>{question.question}</span>
          <br/>
          <br/>
          <strong>MCQ1: </strong>
          <span>{question.mcq1}</span>
          <br/>
          <br/>
          <strong>MCQ2: </strong>
          <span>{question.mcq2}</span>
          <br/>
          <br/>
          <strong>MCQ3: </strong>
          <span>{question.mcq3}</span>
          <br/>
          <br/>
          <strong>MCQ4: </strong>
          <span>{question.mcq4}</span>
          <br/>
          <br/>
          <strong>Correct Answer: </strong>
          <span>{question.answer}</span>
          <br/>
          <br/>
          <Link to = "/questionsHome">
            <button className="btn btn-edit">Back</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewQuestions;
