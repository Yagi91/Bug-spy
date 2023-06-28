import React from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import PrivateRoute from "./Pages/ProtectedRoute";
import LoginPage from "./Pages/Auth";
import ProjectPage from "./Pages/Projects";
import ProjectDetailsPage from "./Pages/ProjectDetails";
import MyTicketsPage from "./Pages/MyTickets";
import Layout from "./Pages/Layout";

function App() {
  return (
    <Router>
      <main className="App h-screen border bg-neutral-100 font-inter">
        <Routes>
          {/* <Route path={["/login", "/auth", "register"]} element={<LoginPage />} /> */}
          {["/auth"].map((path) => (
            <Route key={path} path={path} element={<LoginPage />} />
          ))}
          {/* <Route element={<ParentRoute />}>
            <Route path="/" element={<LoginPage />} />
          </Route> */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/projects/:name" element={<ProjectDetailsPage />} />
              <Route path="/my-tickets" element={<MyTicketsPage />} />
            </Route>
          </Route>
          {/* <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:name" element={<ProjectDetailsPage />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
