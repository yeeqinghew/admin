import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ViewProjects.css";
import Header from "../../components/Header";

const ViewProjects = () => {
  const [project, setReward] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`Project/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setReward({ ...snapshot.val() });
        } else {
          setReward({});
        }
      });
    },[id]);

    console.log("Project", project)
  return (
    <>
    <Header />
    <div style={{marginTop : "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>Project Details</p>
        </div>
        <div className="container">
          <strong>Title: </strong>
          <span>{project.title}</span>
          <br/>
          <br/>
          <strong>Project Description: </strong>
          <span>{project.desc}</span>
          <br/>
          <br/>
          <strong>Goal: </strong>
          <span>{project.goal}</span>
          <br/>
          <br/>
          <strong>Current: </strong>
          <span>{project.current}</span>
          <br/>
          <br/>
          <strong>Image: </strong>
          <br/>
          <br/>
          <span><img src={`${project.image}`}width="200" height="200"/></span>
          <span></span>
          <br/>
          <br/>
          <strong>Closing Date: </strong>
          <span>{`${project.closingDate}`} </span>
          <br/>
          <br/>
          <strong>Project URL: </strong>
          <span><a href={`${project.url}`} target="_blank">{project.url}</a></span>
          <br/>
          <br/>
          <Link to = "/projectsHome">
            <button className="btn btn-edit">Back</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewProjects;
