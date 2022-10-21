import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../firebase';

const Header = () => {
  const [activeTab, setActiveTab] = useState("Quest");
  const location = useLocation(); 
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const signOutClick = () => {
      auth.signOut();
      navigate('/');
  }
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/addQuest") {
      setActiveTab("AddQuest");
    } else if (location.pathname === "/questHome") {
      setActiveTab("questHome");
    } else if (location.pathname === "/addActivities") {
      setActiveTab("addActivities");
    } else if (location.pathname === "/activitiesHome") {
      setActiveTab("activitiesHome");
    } else if (location.pathname === "/addEvents") {
      setActiveTab("addEvents");
    } else if (location.pathname === "/eventsHome") {
      setActiveTab("eventsHome");
    } else if (location.pathname === "/addRewards") {
      setActiveTab("addRewards");
    } else if (location.pathname === "/rewardsHome") {
      setActiveTab("rewardsHome");
    } else if (location.pathname === "/addQuestions") {
      setActiveTab("addQuestions");
    } else if (location.pathname === "/questionsHome") {
      setActiveTab("questionsHome");
    } else if (location.pathname === "/projectsHome") {
      setActiveTab("projectsHome");
    } else if (location.pathname === "/quizHome") {
      setActiveTab("quizHome");
    } 
    
  }, [location]);

  return (
    <>
    <div className="header">
      <p className="logo">Net-Zero</p>
      <div className="header-right">
        <Link to="/Home">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}     
          >
            Home
          </p>
        </Link>
        <Link to="/questHome">
          <p
            className={`${activeTab === "questHome" ? "active" : ""}`}
            onClick={() => setActiveTab("QuestHome")}
          >
            Quest List
          </p>
        </Link>
        <Link to="/activitiesHome">
          <p
            className={`${activeTab === "activitiesHome" ? "active" : ""}`}
            onClick={() => setActiveTab("ActivitiesHome")}
          >
            Activties List
          </p>
        </Link>
        <Link to="/quizHome">
          <p
            className={`${activeTab === "quizHome" ? "active" : ""}`}
            onClick={() => setActiveTab("quizHome")}
          >
            Quiz List
          </p>
        </Link>
        <Link to="/questionsHome">
          <p
            className={`${activeTab === "questionsHome" ? "active" : ""}`}
            onClick={() => setActiveTab("questionsHome")}
          >
            Questions List
          </p>
        </Link>
        {/* Questions List based on quiz ID/title */}
        <Link to="/eventsHome">
          <p
            className={`${activeTab === "eventsHome" ? "active" : ""}`}
            onClick={() => setActiveTab("EventsHome")}
          >
            Events List
          </p>
        </Link>
        <Link to="/rewardsHome">
          <p
            className={`${activeTab === "rewardsHome" ? "active" : ""}`}
            onClick={() => setActiveTab("RewardsHome")}
          >
            Rewards List
          </p>
        </Link>
        <Link to="/projectsHome">
          <p
            className={`${activeTab === "projectsHome" ? "active" : ""}`}
            onClick={() => setActiveTab("ProjectsHome")}
          >
            Projects List
          </p>
        </Link>
        <Link to="/">
        <p button className="btn btn-delete" onClick={()=>signOutClick()} >Signout
        </p></Link>
        
      </div>
    </div>
    </>
  );
};

export default Header;
