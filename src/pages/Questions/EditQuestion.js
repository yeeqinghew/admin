import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import fireDb from "../../firebase";

const EditQuestion = () => {
  const [numOption, setNumOptions] = useState(4);
  const { state } = useLocation();
  const { register, setValue } = useForm();
  const { id: qnsId = "" } = useParams();
  const [quizId, setQuizId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const qns = state.question;
    setQuizId(state.quizId);
    setValue("questionTitle", qns.questionTitle);
    for (let i = 0; i < numOption; i++) {
      setValue(`questionOption${i + 1}`, qns.questionOptions[i]);
    }
    setValue("questionAnswer", qns.questionAnswer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const questionIndex = state.qIndex;
    const updateQuestion = {
      questionTitle: e.currentTarget.elements.questionTitle.value,
      questionOptions: [
        e.currentTarget.elements.questionOption1.value,
        e.currentTarget.elements.questionOption2.value,
        e.currentTarget.elements.questionOption3.value,
        e.currentTarget.elements.questionOption4.value,
      ],
      questionAnswer: e.currentTarget.elements.questionAnswer.value,
    };

    fireDb
      .child(`Questions/${qnsId}/questions/${questionIndex}`)
      .set(updateQuestion)
      .then(() => {
        toast.success("Question is updated");
        navigate("/questionsHome");
      })
      .catch((err) => {
        toast.error(err);
      });
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
      <div>
        <h2>You are editing for {quizId}</h2>
      </div>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="question-title">Question</label>
        <input
          type="text"
          id="question-title"
          name="questionTitle"
          placeholder="Enter your question"
          {...register("questionTitle")}
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
                {...register("questionOption" + (i + 1))}
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
          {...register("questionAnswer")}
        />

        <input type="submit" value="Update" />
      </form>
    </>
  );
};

export default EditQuestion;
