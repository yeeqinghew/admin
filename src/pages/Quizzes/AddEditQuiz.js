import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditQuiz.css";
import fireDb from "../../firebase";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const initialState = {
  quizID: "",
  questId: "",
  quizType: "",
  points: "",
};

const AddEditQuiz = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);

  const { quizID, questId, quizType, points } = state;

  const navigate = useNavigate();

  const { id } = useParams();

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
  }, [id]);

  useEffect(() => {
    fireDb.child("Quest").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const optionArr = [];
        var index = 1;
        snapshot.forEach((child) => {
          optionArr.push(child.val().questId);
          index += 1;
        });
        setOptions(optionArr);
      }
    });

    return () => {
      setOptions({});
    };
  }, [id]);

  useEffect(() => {
    fireDb.child("QuizType").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const optionArr2 = [];
        var index = 1;
        snapshot.forEach((child) => {
          optionArr2.push(child.val().Type);
          index += 1;
        });
        setOptions2(optionArr2);
      }
    });

    return () => {
      setOptions2({});
    };
  }, [id]);

  useEffect(() => {
    fireDb.child("QuizType").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const optionArr3 = [];
        var index = 1;
        snapshot.forEach((child) => {
          optionArr3.push(child.val().Points);
          index += 1;
        });
        setOptions3(optionArr3);
      }
    });

    return () => {
      setOptions3({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] }); //Cannot use Data "too big"
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizID) {
      toast.error("Please provide a value in each input field.");
    } else {
      if (!id) {
        fireDb.child("Quiz").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Quiz added successfully");
          }
        });
      } else {
        fireDb.child(`Quiz/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Quiz updated successfully");
          }
        });
      }

      setTimeout(() => navigate.push("/"), 500);
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <Link to="/quizHome">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "AddQuiz" ? "active" : ""}`}
            onClick={() => setActiveTab("AddQuiz")}
          >
            Back to Quiz List
          </p>
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
          onSubmit={handleSubmit}
        >
          <label htmlFor="quizID">Quiz ID</label>
          <input
            type="text"
            id="quizID"
            name="quizID"
            placeholder="Quiz ID..."
            value={quizID}
            onChange={handleInputChange}
          />

          <label htmlFor="questId">Quest ID</label>
          <select id="questId" name="questId" onChange={handleInputChange}>
            {options &&
              options.map((item, index) => {
                return <option value={options[index]}>{options[index]}</option>;
              })}
          </select>

          <label htmlFor="quizType">Quiz Type</label>
          <select id="quizType" name="quizType" onChange={handleInputChange}>
            {options2 &&
              options2.map((item, index) => {
                return (
                  <option value={options2[index]}>{options2[index]}</option>
                );
              })}
          </select>

          <label htmlFor="points">Points per quiz attempt</label>
          <select id="points" name="points" onChange={handleInputChange}>
            {options3 &&
              options3.map((item, index) => {
                return (
                  <option value={options3[index]}>{options3[index]}</option>
                );
              })}
          </select>

          <input type="submit" value={id ? "Update" : "Save"} />
        </form>
      </div>
    </>
  );
};

export default AddEditQuiz;
