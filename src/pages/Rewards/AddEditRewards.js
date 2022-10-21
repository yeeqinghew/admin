import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditRewards.css";
import fireDb from "../../firebase";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const initialState = {
  title: "",
  description: "",
  point: "",
  expirydate: "",
};

const AddEditRewards = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");

  const { title, description, point, expirydate,} = state;

  const navigate = useNavigate();

  const { id } = useParams();
  
  
  useEffect(() => {
    fireDb.child("Rewards").on("value", (snapshot) => {
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
    if (id) {
      setState({ ...data[id] });
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
    if (!title || !description || !point || !expirydate) {
      toast.error("Please provide a value in each input field.");
    } else {
      if (!id) {
        fireDb.child("Rewards").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Reward added successfully");
          }
        });
      } else {
        fireDb.child(`Rewards/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Reward updated successfully");
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
      <Link to="/rewardsHome">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "addRewards" ? "active" : ""}`}
            onClick={() => setActiveTab("addRewards")}
          >
            Back to Rewards List
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
          <label htmlFor="title">Reward Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Reward Title..."
            value={title || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Reward Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Reward Description..."
            value={description || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="point">Points</label>
          <input
            type="number"
            id="point"
            name="point"
            placeholder="Points..."
            value={point || ""}
            onChange={handleInputChange}
          />

          
         
          <input type="submit" value={id ? "Update" : "Save"} />
        </form>
      </div>
    </>
  );
};

export default AddEditRewards;
