import React from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import PrivateRoute from "./Pages/ProtectedRoute";
import LoginPage from "./Pages/LoginPage";
import ProjectPage from "./Pages/Projects";
import ProjectDetailsPage from "./Pages/ProjectDetails";
import MyTicketsPage from "./Pages/MyTickets";
import Layout from "./Pages/Layout";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <Router>
      <main className="App h-screen border bg-neutral-100 font-inter">
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/projects/:name" element={<ProjectDetailsPage />} />
              <Route path="/my-tickets" element={<MyTicketsPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
