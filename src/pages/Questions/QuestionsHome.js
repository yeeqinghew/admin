import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./QuestionsHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { Card, CardHeader, CardBody } from "react-simple-card";

const QuestionsHome = () => {
  const [activeTab, setActiveTab] = useState("Quest");
  const [questions, setQuestions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fireDb.child("Questions").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        snapshot.forEach((child) => {
          setQuestions({ ...snapshot.val() });
        });
      } else {
        setQuestions({});
      }
    });

    return () => {
      setQuestions({});
    };
  }, []);

  const handleEdit = (qnsId, question, qIndex, quizId) => {
    navigate(`/updateQuestion/${qnsId}`, {
      state: {
        question: question,
        qIndex: qIndex,
        quizId: quizId,
      },
    });
  };

  const handleDelete = (qnsId, question, qIndex, quizId) => {
    let qns = [];
    fireDb.child(`Questions/${qnsId}/questions`).on("value", (snapshot) => {
      qns = snapshot.val();
    });

    qns = qns.filter((q, index) => qIndex !== index);

    if (qns.length === 0) {
      fireDb
        .child(`Questions/${qnsId}`)
        .remove()
        .then(() => {
          toast.success("Question Deleted Successfully");
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      if (window.confirm("Are you sure you want to delete this Question?")) {
        fireDb
          .child(`Questions/${qnsId}/questions`)
          .set(qns)
          .then(() => {
            toast.success("Question Deleted Successfully");
          })
          .catch((err) => {
            toast.error(err);
          });
      }
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
        {Object.keys(questions).map((id, index) => {
          return (
            <Card style={{ marginTop: "20px" }} key={index}>
              <CardHeader style={{ display: "block" }}>
                <p className="titletxt">{questions[id].quizId}</p>
              </CardHeader>
              <CardBody>
                {questions[id].questions.map((question, qIndex) => {
                  return (
                    <div key={qIndex}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <strong>Question {qIndex + 1} </strong>
                        <div>
                          <button
                            className="btn btn-edit"
                            onClick={() =>
                              handleEdit(
                                id,
                                question,
                                qIndex,
                                questions[id].quizId
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() =>
                              handleDelete(
                                id,
                                question,
                                qIndex,
                                questions[id].quizId
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p>{question.questionTitle}</p>
                      <br />
                      <i>Options</i>
                      {question.questionOptions.map((option, opIndex) => {
                        return <p key={opIndex}>{option}</p>;
                      })}
                      <p>Correct Answer: {question.questionAnswer}</p>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default QuestionsHome;
