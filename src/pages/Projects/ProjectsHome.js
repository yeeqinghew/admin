import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import "./ProjectsHome.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import {Card, CardHeader, CardBody, CardFooter} from "react-simple-card";

const ProjectsHome = () => {
  const [data, setData] = useState({});
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
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Project?")) {
      fireDb.child(`Project/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Project Deleted Successfully");
        }
      });
    }
  };

  return (
    <>
    <Header />
    <br />
    <br />
      <Link to="/addProjects">
      <button class="btn btn-edit"> 
        <p
          className={`${activeTab === "addProjects" ? "active" : ""}`}
          onClick={() => setActiveTab("AddProjects")}
        >
          Add Projects
        </p>
      </button>
      </Link>
      <div style={{ marginTop: "50px" }}>
      {Object.keys(data).map((id, index) => {
              return (
                <Card style={{marginTop: "20px"}}>
                  <CardHeader><p className="titletext">{data[id].title} - Goal: {data[id].goaltitle}</p>
                  </CardHeader>
                  <CardBody>
                    <div className="bodytxt">{data[id].desc}</div>
                  
                    <div className="bodytxt"><a href={"https://www.google.com/maps/place/"+`${data[id].eventlocation}`} target="_blank">{data[id].eventlocation}</a></div>
                    <p>Target Goal: {data[id].goal}</p>
                    <p>Closing Date: {data[id].closingDate}</p>
                   
                  </CardBody>
                  <CardFooter>
                  <Link to={`/updateProjects/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/viewProjects/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
      </div>
    </>
  );
};

export default ProjectsHome;