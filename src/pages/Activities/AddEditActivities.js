import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditActivities.css";
import fireDb, { storage } from "../../firebase";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initialState = {
  questId: "",
  activityTitle: "",
  activityDescription: "",
  points: "",
};

const AddEditActivities = () => {
  const fileRef = useRef();
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("Quest");
  const [options, setOptions] = useState([]);
  const [uploadedFile, setUploadedFile] = useState("");

  const { questId, activityTitle, activityDescription, points, file } = state; //questId

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("Activities").on("value", (snapshot) => {
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
    if (!activityTitle || !activityDescription || !points) {
      toast.error("Please provide a value in each input field.");
    } else {
      if (!id) {
        const activityId = fireDb
          .child("Activities")
          .push(state, (err) => {
            if (err) {
              toast.error(err);
            }
          })
          .getKey();

        if (activityId) {
          // store image into Storage /activity_images/xx
          const storageReference = ref(
            storage,
            `/activity_images/${uploadedFile.name}`
          );
          // get the downloadURL
          uploadBytes(storageReference, uploadedFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              // store this imageLink into activity
              fireDb
                .child(`Activities/${activityId}`)
                .set({ ...state, file: downloadURL }, (err) => {
                  if (err) {
                    toast.error(err);
                    return;
                  }

                  fileRef.current.value = "";
                  toast.success("Activity created successfully!");
                });
            });
          });
        }
      } else {
        fireDb.child(`Activities/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Activity updated successfully");
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
      <Link to="/activitiesHome">
        <button class="btn btn-edit">
          <p
            className={`${activeTab === "addActivities" ? "active" : ""}`}
            onClick={() => setActiveTab("ActivitiesHome")}
          >
            Back to Activities List
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
          {/* <label htmlFor="questId">Quest ID</label>
        <select
          name="questId"
          id="questId"
          value={questId}
          onChange={handleInputChange}
        >
          {Object.keys(data).map((questId) => {
            <option value={data[id].questId}>{data[id].questId}</option>;
          })}
        </select> */}

          <label htmlFor="questId">Quest ID</label>
          <select id="questId" name="questId" onChange={handleInputChange}>
            {options.map((item, index) => {
              return <option value={options[index]}>{options[index]}</option>;
            })}
          </select>

          <label htmlFor="activityTitle">Activity Title</label>

          <input
            type="text"
            id="activityTitle"
            name="activityTitle"
            placeholder="Activity Title..."
            value={activityTitle} // FIND A WAY TO DISABLE
            onChange={handleInputChange}
          />

          <label htmlFor="activityDescription">Activity Description</label>
          <input
            type="text"
            id="activityDescription"
            name="activityDescription"
            placeholder="Activity Description..."
            value={activityDescription || ""}
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

          {/*
        <label htmlFor="qrdata">QR Data</label>
          <input
            type="text"
            id="qrdata"
            name="qrdata"
            placeholder="QR Data..."
            value={qrdata || ""}
            onChange={handleInputChange}
          />
      */}

          <input
            ref={fileRef}
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

export default AddEditActivities;
