import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEditEvents.css";
import fireDb, { storage } from "../../firebase";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// put into List googleplaceAPI upload IMG REWARDS ID
const initialState = {
  challengetitle: "", //str
  eventtitle: "", //str
  eventdescription: "", //str
  eventdate: "", //date
  eventstarttime: "", //time
  eventendtime: "", //time
  eventlocation: "", //str
  gmapslocation: "", //coordinates
  eventpoints: "", //number
  goaltitle: "", //str
  goalpoints: "", //number
  maxparticipants: "",
};

const AddEditEvents = () => {
  const fileRef = useRef();
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [uploadedFile, setUploadedFile] = useState("");
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);

  const {
    challengetitle,
    eventtitle,
    eventdescription,
    eventdate,
    eventstarttime,
    eventendtime,
    eventlocation,
    eventpoints,
    goaltitle,
    maxparticipants,
    file,
  } = state;

  const navigate = useNavigate();

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Quest");

  useEffect(() => {
    fireDb.child("CreateEvent").on("value", (snapshot) => {
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
          optionArr.push(child.val().questTitle);
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
    fireDb.child("Quest").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const optionArr2 = [];
        var index = 1;
        snapshot.forEach((child) => {
          optionArr2.push(child.val().goalTitle);
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
    if (
      !eventtitle ||
      !eventdescription ||
      !eventdate ||
      !eventstarttime ||
      !eventendtime ||
      !eventlocation ||
      !eventpoints ||
      !goaltitle ||
      !maxparticipants ||
      !uploadedFile
    ) {
      toast.error("Please provide a value in each input field.");
    } else {
      if (!id) {
        const eventId = fireDb
          .child("CreateEvent")
          .push(state, (err) => {
            if (err) {
              toast.error(err);
            }
          })
          .getKey();

        if (eventId) {
          // store image into Storage /event_images/xx
          const storageReference = ref(
            storage,
            `/event_images/${uploadedFile.name}`
          );

          // get the downloadURL
          uploadBytes(storageReference, uploadedFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              fireDb
                .child(`CreateEvent/${eventId}`)
                .set({ ...state, file: downloadURL }, (err) => {
                  if (err) {
                    toast.error(err);
                    return;
                  }

                  fileRef.current.value = "";
                  toast.success("Event created successfully!");
                });
            });
          });
        }
      } else {
        fireDb.child(`CreateEvent/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Event updated successfully");
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
      <Link to="/eventsHome">
        <button className="btn btn-edit">
          <p
            className={`${activeTab === "addEvents" ? "active" : ""}`}
            onClick={() => setActiveTab("addEvents")}
          >
            Back to Events List
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
          <label htmlFor="challengetitle">Quest Title</label>
          <select
            id="challengetitle"
            name="challengetitle"
            onChange={handleInputChange}
          >
            {options.map((item, index) => {
              return <option value={options[index]}>{options[index]}</option>;
            })}
          </select>

          <label htmlFor="eventtitle">Event Title</label>
          <input
            type="text"
            name="eventtitle"
            id="eventtitle"
            placeholder="Event Title..."
            value={eventtitle || ""}
            onChange={handleInputChange}
          ></input>

          <label htmlFor="eventdescription">Event Description</label>
          <input
            type="text"
            name="eventdescription"
            id="eventdescription"
            placeholder="Event Description..."
            value={eventdescription || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="eventdate">Event Date</label>
          <input
            type="date"
            id="eventdate"
            name="eventdate"
            value={eventdate || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="eventstarttime">Event Start Time</label>
          <input
            type="time"
            id="eventstarttime"
            name="eventstarttime"
            // placeholder="Event Start Time.."
            value={eventstarttime || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="eventendtime">Event End Time</label>
          <input
            type="time"
            id="eventendtime"
            name="eventendtime"
            // placeholder="Event End Time.."
            value={eventendtime || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="eventlocation">Event Location</label>
          <input
            type="text"
            id="eventlocation"
            name="eventlocation"
            placeholder="Event Location..."
            value={eventlocation || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="eventpoints">Event Points</label>
          <input
            type="number"
            id="eventpoints"
            name="eventpoints"
            placeholder="Event Points..."
            value={eventpoints || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="goaltitle">Goal Title</label>
          <select id="goaltitle" name="goaltitle" onChange={handleInputChange}>
            {options2.map((item, index) => {
              return <option value={options2[index]}>{options2[index]}</option>;
            })}
          </select>
          {/*
          <label htmlFor="goalpoints">Goal Points</label>
          <input
            type="number"
            id="goalpoints"
            name="goalpoints"
            placeholder="Goal Points..."
            value={goalpoints || ""}
            onChange={handleInputChange}
          />
        */}
          <label htmlFor="maxparticipants">Max Participants</label>
          <input
            type="number"
            id="maxparticipants"
            name="maxparticipants"
            placeholder="Max Participants..."
            value={maxparticipants || ""}
            onChange={handleInputChange}
          />

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

export default AddEditEvents;
