import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditQuests.css";
import fireDb from "../../firebase";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const initialState = {
  questId: "",
  goalTitle: "",
  questTitle: "",
  description: "",
  points: "",
};

const AddEditQuests = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");
  const [options, setOptions] = useState([]);

  const { questId,goalTitle, questTitle, description, points } = state;

  const navigate = useNavigate();

  const { id } = useParams();


  useEffect(() => {
    fireDb.child("Quest").on("value", (snapshot) => {
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
    fireDb.child("Goal").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const optionArr = []
        var index=1;
        snapshot.forEach((child) => {
          optionArr.push(child.val().goalstitle)
          index += 1
        });
        setOptions(optionArr)
      } 
    });

    return () => {
      setOptions({});
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
    if (!questId || !questTitle || !description || !points) {
      toast.error("Please provide a value in each input field.");
    } else {
      if (!id) {
        fireDb.child("Quest").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Quest added successfully");
          }
        });
      } else {
        fireDb.child(`Quest/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Quest updated successfully");
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
      <Link to="/questHome">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "AddQuest" ? "active" : ""}`}
            onClick={() => setActiveTab("AddQuest")}
          >
            Back to Quest List
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
         
          <label htmlFor="questId">Quest ID</label>
          <input
            type="text"
            id="questId"
            name="questId"
            placeholder="Quest ID..."
            value={questId} // FIND A WAY TO DISABLE
            onChange={handleInputChange}
          />
          <label htmlFor="goalTitle">Goal Title</label>
          <select id="goalTitle" name="goalTitle" onChange={handleInputChange}>
          {
            options.map((item, index) => {
              return <option value={options[index]}>{options[index]}</option>
            })
          }
        </select>
          <label htmlFor="questTitle">Quest Title</label>
          <input
            type="text"
            id="questTitle"
            name="questTitle"
            placeholder="Quest Title..."
            value={questTitle || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description.."
            value={description || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="points">Points</label>
          <input
            type="number"
            id="points"
            name="points"
            placeholder="Points..."
            value={points || ""}
            onChange={handleInputChange}
          />

          <input type="submit" value={id ? "Update" : "Save"} />
        </form>
      </div>
    </>
  );
};

export default AddEditQuests;
