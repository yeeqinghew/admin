import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "react-simple-card";
import "./AddQuestions.css";
import fireDb from "../../firebase";
import { toast } from "react-toastify";

const AddQuestions = () => {
  const [numOption, setNumOptions] = useState(4);
  const [questions, setQuestions] = useState([]);
  const [quizOptions, setQuizOptions] = useState();
  const [quizSelected, setQuizSelected] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fireDb.child("Quiz").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const quizList = [];
        snapshot.forEach((child) => {
          quizList.push({
            quizId: child.key,
            quizTitle: child.val().quizID,
          });
        });
        setQuizOptions(quizList);
      }
    });

    return () => {
      setQuizOptions();
    };
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const question = {
      questionTitle: e.currentTarget.elements.questionTitle.value,
      questionOptions: [
        e.currentTarget.elements.questionOption1.value,
        e.currentTarget.elements.questionOption2.value,
        e.currentTarget.elements.questionOption3.value,
        e.currentTarget.elements.questionOption4.value,
      ],
      questionAnswer: e.currentTarget.elements.questionAnswer.value,
    };
    setQuestions((prev) => [...prev, question]);
    setQuizSelected(e.currentTarget.elements.quizSelected.value);

    e.currentTarget.elements.questionTitle.value = "";
    e.currentTarget.elements.questionOption1.value = "";
    e.currentTarget.elements.questionOption2.value = "";
    e.currentTarget.elements.questionOption3.value = "";
    e.currentTarget.elements.questionOption4.value = "";
    e.currentTarget.elements.questionAnswer.value = "";
    document.getElementById("quiz-selected").setAttribute("disabled", true);
  };

  const handleSubmit = () => {
    const quiz = {
      quizId: quizSelected,
      questions: questions,
    };

    let qns = [];
    let questionKey = "";

    fireDb.child(`Questions`).on("value", (snapshot) => {
      snapshot.forEach((child) => {
        if (child.val().quizId === quizSelected) {
          qns = [...child.val().questions, ...questions];
          questionKey = child.key;
          return;
        }
      });
    });

    // check if we have created questions for quiz
    // if yes, add questions under the same quiz id
    // if not, create a new question with diff quiz id
    if (qns.length !== 0) {
      fireDb
        .child(`Questions/${questionKey}/questions`)
        .set(qns)
        .then(() => {
          toast.success("Questions have been created.");
          navigate("/questionsHome");
        });
    } else {
      fireDb
        .child("Questions")
        .push(quiz)
        .then(() => {
          toast.success("Questions have been created.");
          navigate("/questionsHome");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <Link to="/questionsHome">
        <button className="btn btn-edit">
          <p>Back to Questions List</p>
        </button>
      </Link>
      <div style={{ marginTop: "50px" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleAdd}
        >
          <label htmlFor="quiz-selected">Quiz</label>
          <select
            id="quiz-selected"
            name="quizSelected"
            onChange={(e) => setQuizSelected(e.value)}
            value={quizSelected}
          >
            {quizOptions &&
              quizOptions.map((item, index) => {
                return <option value={item.quizTitle}>{item.quizTitle}</option>;
              })}
          </select>

          <label htmlFor="question-title">Question</label>
          <input
            type="text"
            id="question-title"
            name="questionTitle"
            placeholder="Enter your question"
          />
          {Array.from(Array(numOption), (e, i) => {
            return (
              <>
                <label htmlFor={"question-option" + (i + 1)}>
                  Question Option {i + 1}
                </label>
                <input
                  type="text"
                  id={"question-option" + (i + 1)}
                  name={"questionOption" + (i + 1)}
                  placeholder="Enter your option"
                />
              </>
            );
          })}
          <label htmlFor="question-answer">Question Correct Answer</label>
          <input
            type="text"
            id="question-answer"
            name="questionAnswer"
            placeholder="Enter correct answer"
          />

          <input type="submit" value="Add" />
        </form>
      </div>

      {questions.length !== 0 && (
        <div>
          {questions.map((question, index) => (
            <Card style={{ marginTop: "20px" }}>
              <CardHeader>
                <strong>Question {index + 1}: </strong>
                <div>
                  <p className="question-title">{question.questionTitle}</p>
                </div>
              </CardHeader>
              <CardBody>
                <div style={{ textAlign: "left" }}>
                  <strong>Options</strong>
                  {question.questionOptions.map((option, index) => (
                    <p
                      className="question-option"
                      style={{ textAlign: "left" }}
                    >
                      {option}
                    </p>
                  ))}

                  <br />
                  <strong>Correct Answer</strong>
                  <p className="question-answer" style={{ textAlign: "left" }}>
                    {question.questionAnswer}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
          <button className="add-quiz-btn" onClick={handleSubmit}>
            Add Quiz
          </button>
        </div>
      )}
    </>
  );
};

export default AddQuestions;
