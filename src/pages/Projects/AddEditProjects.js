import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditProjects.css";
import fireDb, { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import Header from "../../components/Header";

// put into List googleplaceAPI upload IMG REWARDS ID
const initialState = {
  title: "", //str
  desc: "", //str
  current: 0,
  goal: "",
  closingDate: "",
  url: "",
  file: "",
};

const AddEditProjects = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [options, setOptions] = useState([]);
  const [uploadedFile, setUploadedFile] = useState("");

  const { title, desc, goaltitle, current, goal, closingDate, url, file } =
    state;

  const navigate = useNavigate();

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Quest");

  useEffect(() => {
    fireDb.child("Project").on("value", (snapshot) => {
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
        const optionArr = [];
        var index = 1;
        snapshot.forEach((child) => {
          optionArr.push(child.val().goalstitle);
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
    if (!title || !desc || !goal || !closingDate || !url || !uploadedFile) {
      toast.error("Please provide a value or upload a file.");
    } else {
      if (!id) {
        fireDb.child("Project").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            const storageReference = ref(
              storage,
              `/project_images/${uploadedFile.name}`
            );
            uploadBytes(storageReference, uploadedFile).then((snapshot) => {
              getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log("downloadURL", downloadURL);
              });
            });

            // TODO: get the newly created project ID and store file into it
            toast.success("Project created successfully");
          }
        });
      } else {
        fireDb.child(`Project/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Project updated successfully");
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
      <Link to="/projectsHome">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "addProjects" ? "active" : ""}`}
            onClick={() => setActiveTab("addProjects")}
          >
            Back to Projects List
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
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            value={title} // FIND A WAY TO DISABLE
            onChange={handleInputChange}
          ></input>

          <label htmlFor="desc">Project Description</label>
          <input
            type="text"
            name="desc"
            id="desc"
            placeholder="Project Description..."
            value={desc || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="goaltitle">Goal Title</label>
          <select id="goaltitle" name="goaltitle" onChange={handleInputChange}>
            {options &&
              Array.from(options).map((item, index) => {
                return <option value={options[index]}>{options[index]}</option>;
              })}
          </select>
          <label htmlFor="current">Current</label>
          <input
            type="number"
            id="current"
            name="current"
            placeholder="Current..."
            value={current}
          />
          <label htmlFor="goal">Goal</label>
          <input
            type="number"
            id="goal"
            name="goal"
            placeholder="Goal..."
            value={goal || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="closingDate">Closing Date</label>
          <input
            type="date"
            id="closingDate"
            name="closingDate"
            value={closingDate || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="url">Donation Link</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="Donation Link..."
            value={url || ""}
            onChange={handleInputChange}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files[0]) {
                setUploadedFile(event.target.files[0]);
              }
            }}
          />
          <input type="submit" value={id ? "Update" : "Save"} />
        </form>
      </div>
    </>
  );
};

export default AddEditProjects;
