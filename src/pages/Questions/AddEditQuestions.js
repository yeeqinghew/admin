import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import "./AddEditQuestions.css";
// import fireDb from "../../firebase";
// import { toast } from "react-toastify";

// const initialState = {
//   quizID: "",
//   questId: "",
//   question1: "",
//   question1_mcq1: "",
//   question1_mcq2: "",
//   question1_mcq3: "",
//   question1_mcq4: "",
//   answer1: "",
//   question2: "",
//   question2_mcq1: "",
//   question2_mcq2: "",
//   question2_mcq3: "",
//   question2_mcq4: "",
//   answer2: "",
//   question3: "",
//   question3_mcq1: "",
//   question3_mcq2: "",
//   question3_mcq3: "",
//   question3_mcq4: "",
//   answer3: "",
//   question4: "",
//   question4_mcq1: "",
//   question4_mcq2: "",
//   question4_mcq3: "",
//   question4_mcq4: "",
//   answer4: "",
//   question5: "",
//   question5_mcq1: "",
//   question5_mcq2: "",
//   question5_mcq3: "",
//   question5_mcq4: "",
//   answer5: "",

// };

// const AddEditQuestions = () => {
//   const [state, setState] = useState(initialState);
//   const [data, setData] = useState({});
//   const [activeTab, setActiveTab] = useState("Quest");
//   const [options, setOptions] = useState([]);
//   const [options2, setOptions2] = useState([]);
//   const { quizID, questId, question1, question1_mcq1, question1_mcq2, question1_mcq3, question1_mcq4, answer1, question2, question2_mcq1, question2_mcq2, question2_mcq3, question2_mcq4, answer2, question3, question3_mcq1, question3_mcq2, question3_mcq3, question3_mcq4, answer3, question4, question4_mcq1, question4_mcq2, question4_mcq3, question4_mcq4, answer4, question5, question5_mcq1, question5_mcq2, question5_mcq3, question5_mcq4, answer5 } = state;

//   const navigate = useNavigate();

//   const { id } = useParams();

//   useEffect(() => {
//     fireDb.child("QuestionsList").on("value", (snapshot) => {
//       if (snapshot.val() !== null) {
//         setData({ ...snapshot.val() });
//       } else {
//         setData({});
//       }
//     });

//     return () => {
//       setData({});
//     };
//   }, [id]);

//   useEffect(() => {
//     fireDb.child("Quiz").on("value", (snapshot) => {
//       if (snapshot.val() !== null) {
//         const optionArr = []
//         var index=1;
//         snapshot.forEach((child) => {
//           optionArr.push(child.val().questId)
//           index += 1
//         });
//         setOptions(optionArr)
//       }
//     });

//     return () => {
//       setOptions({});
//     };
//   }, [id]);

//   useEffect(() => {
//     fireDb.child("Quiz").on("value", (snapshot) => {
//       if (snapshot.val() !== null) {
//         const optionArr2 = []
//         var index=1;
//         snapshot.forEach((child) => {
//           optionArr2.push(child.val().quizID)
//           index += 1
//         });
//         setOptions2(optionArr2)
//       }
//     });

//     return () => {
//       setOptions2({});
//     };
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       setState({ ...data[id] });
//     } else {
//       setState({ ...initialState });
//     }

//     return () => {
//       setState({ ...initialState });
//     };
//   }, [id, data]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setState({ ...state, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!question1 || !question1_mcq1 || !question1_mcq2 || !question1_mcq3 || !question1_mcq4 || !answer1 || !question2 || !question2_mcq1 || !question2_mcq2 || !question2_mcq3 || !question2_mcq4 || !answer2 || !question3 || !question3_mcq1 || !question3_mcq2 || !question3_mcq3 || !question3_mcq4 || !answer3 || !question4 || !question4_mcq1 || !question4_mcq2 || !question4_mcq3 || !question4_mcq4 || !answer4 || !question5 || !question5_mcq1 || !question5_mcq2 || !question5_mcq3 || !question5_mcq4 || !answer5) {
//       toast.error("Please provide a value in each input field.");
//     } else {
//       if (!id) {
//         fireDb.child("QuestionsList").push(state, (err) => {
//           if (err) {
//             toast.error(err);
//           } else {
//             toast.success("Question added successfully");
//           }
//         });
//       } else {
//         fireDb.child(`QuestionsList/${id}`).set(state, (err) => {
//           if (err) {
//             toast.error(err);
//           } else {
//             toast.success("Question updated successfully");
//           }
//         });
//       }

//       setTimeout(() => navigate.push("/"), 500);
//     }
//   };

//   return (
//     <>
//     <Header />
//       <br />
//       <br />
//       <Link to="/questionsHome">
//         <button className="btn btn-edit">
//           <p
//             className={`${activeTab === "addQuestions" ? "active" : ""}`}
//             onClick={() => setActiveTab("Add Questions")}
//           >
//             Back to Questions List
//           </p>
//         </button>
//       </Link>
//       <div style={{ marginTop: "50px" }}>
//         <form
//           style={{
//             margin: "auto",
//             padding: "15px",
//             maxWidth: "400px",
//             alignContent: "center",
//           }}
//           onSubmit={handleSubmit}
//         >
//           <label htmlFor="quizID">Quiz ID</label>
//           <select id="quizID" name="quizID" onChange={handleInputChange}>
//           {
//             options.map((item, index) => {
//               return <option value={options2[index]}>{options2[index]}</option>
//             })
//           }
//         </select>
//           <label htmlFor="questId">Quest ID</label>
//           <select id="questId" name="questId" onChange={handleInputChange}>
//           {
//             options.map((item, index) => {
//               return <option value={options[index]}>{options[index]}</option>
//             })
//           }
//         </select>
//           <label htmlFor="question1">Question 1</label>
//           <input
//             type="text"
//             id="question1"
//             name="question1"
//             placeholder="Question 1..."
//             value={question1 || ""}
//             onChange={handleInputChange}
//           />
//           <label htmlFor="question1_mcq1">Question 1 Option 1</label>
//           <input
//             type="text"
//             id="question1_mcq1"
//             name="question1_mcq1"
//             placeholder="Question 1 Option 1..."
//             value={question1_mcq1 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question1_mcq2">Question 1 Option 2</label>
//           <input
//             type="text"
//             id="question1_mcq2"
//             name="question1_mcq2"
//             placeholder="Question 1 Option 2..."
//             value={question1_mcq2 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question1_mcq3">Question 1 Option 3</label>
//           <input
//             type="text"
//             id="question1_mcq3"
//             name="question1_mcq3"
//             placeholder="Question 1 Option 3..."
//             value={question1_mcq3 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question1_mcq4">Question 1 Option 4</label>
//           <input
//             type="text"
//             id="question1_mcq4"
//             name="question1_mcq4"
//             placeholder="Question 1 Option 4..."
//             value={question1_mcq4 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="answer1">Question 1 Correct Answer</label>
//           <input
//             type="text"
//             id="answer1"
//             name="answer1"
//             placeholder="Question 1 Correct Answer..."
//             value={answer1 || ""}
//             onChange={handleInputChange}
//           />
//           <label htmlFor="question2">Question 2</label>
//           <input
//             type="text"
//             id="question2"
//             name="question2"
//             placeholder="Question 2..."
//             value={question2 || ""}
//             onChange={handleInputChange}
//           />
//           <label htmlFor="question2_mcq1">Question 2 Option 1</label>
//           <input
//             type="text"
//             id="question2_mcq1"
//             name="question2_mcq1"
//             placeholder="Question 2 Option 1..."
//             value={question2_mcq1 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question2_mcq2">Question 2 Option 2</label>
//           <input
//             type="text"
//             id="question2_mcq2"
//             name="question2_mcq2"
//             placeholder="Question 2 Option 2..."
//             value={question2_mcq2 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question2_mcq3">Question 2 Option 3</label>
//           <input
//             type="text"
//             id="question2_mcq3"
//             name="question2_mcq3"
//             placeholder="Question 2 Option 3..."
//             value={question2_mcq3 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question2_mcq4">Question 2 Option 4</label>
//           <input
//             type="text"
//             id="question2_mcq4"
//             name="question2_mcq4"
//             placeholder="Question 2 Option 4..."
//             value={question2_mcq4 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="answer">Question 2 Correct Answer</label>
//           <input
//             type="text"
//             id="answer2"
//             name="answer2"
//             placeholder="Question 2 Correct Answer..."
//             value={answer2 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question3">Question 3</label>
//           <input
//             type="text"
//             id="question3"
//             name="question3"
//             placeholder="Question 3 ..."
//             value={question3 || ""}
//             onChange={handleInputChange}
//           />
//           <label htmlFor="question3_mcq1">Question 3 Option 1</label>
//           <input
//             type="text"
//             id="question3_mcq1"
//             name="question3_mcq1"
//             placeholder="Question 3 Option 1..."
//             value={question3_mcq1 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question3_mcq2">Question 3 Option 2</label>
//           <input
//             type="text"
//             id="question3_mcq2"
//             name="question3_mcq2"
//             placeholder="Question 3 Option 2..."
//             value={question3_mcq2 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question3_mcq3">Question 3 Option 3</label>
//           <input
//             type="text"
//             id="question3_mcq3"
//             name="question3_mcq3"
//             placeholder="Question 3 Option 3..."
//             value={question3_mcq3 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question3_mcq4">Question 3 Option 4</label>
//           <input
//             type="text"
//             id="question3_mcq4"
//             name="question3_mcq4"
//             placeholder="Question 3 Option 4..."
//             value={question3_mcq4 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="answer3">Question 3 Correct Answer</label>
//           <input
//             type="text"
//             id="answer3"
//             name="answer3"
//             placeholder="Question 3 Correct Answer..."
//             value={answer3 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question4">Question 4</label>
//           <input
//             type="text"
//             id="question4"
//             name="question4"
//             placeholder="Question 4..."
//             value={question4 || ""}
//             onChange={handleInputChange}
//           />
//           <label htmlFor="question4_mcq1">Question 4 Option 1</label>
//           <input
//             type="text"
//             id="question4_mcq1"
//             name="question4_mcq1"
//             placeholder="Question 4 Option 1..."
//             value={question4_mcq1 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question4_mcq2">Question 4 Option 2</label>
//           <input
//             type="text"
//             id="question4_mcq2"
//             name="question4_mcq2"
//             placeholder="Question 4 Option 2..."
//             value={question4_mcq2 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question4_mcq3">Question 4 Option 3</label>
//           <input
//             type="text"
//             id="question4_mcq3"
//             name="question4_mcq3"
//             placeholder="Question 4 Option 3..."
//             value={question4_mcq3 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question4_mcq4">Question 4 Option 4</label>
//           <input
//             type="text"
//             id="question4_mcq4"
//             name="question4_mcq4"
//             placeholder="Question 4 Option 4..."
//             value={question4_mcq4 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="answer">Question 4 Correct Answer</label>
//           <input
//             type="text"
//             id="answer4"
//             name="answer4"
//             placeholder="Question 4 Correct Answer..."
//             value={answer4 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question5">Question 5</label>
//           <input
//             type="text"
//             id="question5"
//             name="question5"
//             placeholder="Question 5..."
//             value={question5 || ""}
//             onChange={handleInputChange}
//           />
//           <label htmlFor="question5_mcq1">Question 5 Option 1</label>
//           <input
//             type="text"
//             id="question5_mcq1"
//             name="question5_mcq1"
//             placeholder="Question 5 Option 1..."
//             value={question5_mcq1 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question5_mcq2">Question 5 Option 2</label>
//           <input
//             type="text"
//             id="question5_mcq2"
//             name="question5_mcq2"
//             placeholder="Question 5 Option 2..."
//             value={question5_mcq2 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question5_mcq3">Question 5 Option 3</label>
//           <input
//             type="text"
//             id="question5_mcq3"
//             name="question5_mcq3"
//             placeholder="Question 5 Option 3..."
//             value={question5_mcq3 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="question5_mcq4">Question 5 Option 4</label>
//           <input
//             type="text"
//             id="question5_mcq4"
//             name="question5_mcq4"
//             placeholder="Question 5 Option 4..."
//             value={question5_mcq4 || ""}
//             onChange={handleInputChange}
//           />

//           <label htmlFor="answer5">Question 5 Correct Answer</label>
//           <input
//             type="text"
//             id="answer5"
//             name="answer5"
//             placeholder="Question 5 Correct Answer..."
//             value={answer5 || ""}
//             onChange={handleInputChange}
//           />
//           <input type="submit" value={id ? "Update" : "Save"} />
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddEditQuestions;

const AddEditQuestions = () => {
  const [numOption, setNumOptions] = useState(4);

  return (
    <>
      <Header />
      <br />
      <br />
      <Link to="/questionsHome">
        <button className="btn btn-edit">
          <p
          // className={`${activeTab === "addQuestions" ? "active" : ""}`}
          // onClick={() => setActiveTab("Add Questions")}
          >
            Back to Questions List
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
          // onSubmit={handleSubmit}
        >
          <label htmlFor="question1">Question</label>
          <input
            type="text"
            id="question"
            name="question"
            placeholder="Enter your question"
            // value={question1 || ""}
            // onChange={handleInputChange}
          />
          {Array.from(Array(numOption), (e, i) => {
            return (
              <>
                <label htmlFor={"question_mcq" + (i + 1)}>
                  Question Option {i + 1}
                </label>
                <input
                  type="text"
                  id={"question_mcq" + (i + 1)}
                  name={"question_mcq" + (i + 1)}
                  placeholder="Enter your option"
                  // value={question1_mcq2 || ""}
                  // onChange={handleInputChange}
                />
              </>
            );
          })}
          <label htmlFor="question_answer">Question Correct Answer</label>
          <input
            type="text"
            id="question_answer"
            name="question_answer"
            placeholder="Enter correct answer"
            // value={answer1 || ""}
            // onChange={handleInputChange}
          />

          <input
            type="submit"
            value="Add"
            // value={id ? "Update" : "Save"}
          />
        </form>
      </div>
    </>
  );
};

export default AddEditQuestions;
