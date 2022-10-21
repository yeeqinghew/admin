import React, {Fragment} from "react";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestHome from "./pages/Quests/QuestHome";
import AddEditQuests from "./pages/Quests/AddEditQuests";
import ViewQuests from "./pages/Quests/ViewQuests";
import ActivitiesHome from "./pages/Activities/ActivitiesHome";
import AddEditActivities from "./pages/Activities/AddEditActivities";
import ViewActivities from "./pages/Activities/ViewActivities";
import EventsHome from "./pages/Events/EventsHome";
import AddEditEvents from "./pages/Events/AddEditEvents";
import ViewEvents from "./pages/Events/ViewEvents";
import RewardsHome from "./pages/Rewards/RewardsHome";
import AddEditRewards from "./pages/Rewards/AddEditRewards";
import ViewRewards from "./pages/Rewards/ViewRewards";
import QuestionsHome from "./pages/Questions/QuestionsHome";
import AddEditQuestions from "./pages/Questions/AddEditQuestions";
import ViewQuestions from "./pages/Questions/ViewQuestions";
import UsersHome from "./pages/Users/UsersHome";
import MerchantsHome from "./pages/Merchants/MerchantsHome";
import ProjectsHome from "./pages/Projects/ProjectsHome";
import AddEditProjects from "./pages/Projects/AddEditProjects";
import ViewProjects from "./pages/Projects/ViewProjects";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./components/Login";
import QuizHome from "./pages/Quizzes/QuizHome";
import AddEditQuiz from "./pages/Quizzes/AddEditQuiz";

function App() {
  return (
      <BrowserRouter>
        <Fragment>
        <div className="App">
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/Home" element={<Home />} />
            <Route path="/questHome" element={<QuestHome />} />
            <Route path="/addQuest" element={<AddEditQuests />} />
            <Route path="/updateQuests/:id" element={<AddEditQuests />} />
            <Route path="/viewQuests/:id" element={<ViewQuests />} />
            <Route path="/activitiesHome" element={<ActivitiesHome />} />
            <Route path="/addActivities" element={<AddEditActivities />} />
            <Route path="/updateActivities/:id" element={<AddEditActivities />}/>
            <Route path="/viewActivities/:id" element={<ViewActivities />} />
            <Route path="/eventsHome" element={<EventsHome />} />
            <Route path="/addEvents" element={<AddEditEvents />} />
            <Route path="/updateEvents/:id" element={<AddEditEvents />} />
            <Route path="/viewEvents/:id" element={<ViewEvents />} />
            <Route path="/rewardsHome" element={<RewardsHome />} />
            <Route path="/addRewards" element={<AddEditRewards />} />
            <Route path="/updateRewards/:id" element={<AddEditRewards />} />
            <Route path="/viewRewards/:id" element={<ViewRewards />} />
            <Route path="/questionsHome" element={<QuestionsHome />} />
            <Route path="/addQuestions" element={<AddEditQuestions />} />
            <Route path="/updateQuestions/:id" element={<AddEditQuestions />} />
            <Route path="/viewQuestions/:id" element={<ViewQuestions />} />
            <Route path="/usersHome/:id" element={<UsersHome />} />
            <Route path="/merchantsHome/:id" element={<MerchantsHome />} />
            <Route path="/projectsHome" element={<ProjectsHome />} />
            <Route path="/addProjects" element={<AddEditProjects />} />
            <Route path="/viewProjects/:id" element={<ViewProjects />} />
            <Route path="/updateProjects/:id" element={<AddEditProjects />} />
            <Route path="/quizHome" element={<QuizHome />} />
            <Route path="/addQuiz" element={<AddEditQuiz />} />
            <Route path="/updateQuiz/:id" element={<AddEditQuiz />} />
        </Routes>
        </div>
        </Fragment>
      </BrowserRouter>
  );
}

export default App;
