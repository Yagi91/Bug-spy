import React from "react";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PrivateRoute from "./Pages/ProtectedRoute";
import LoginPage from "./Pages/LoginPage";
import ProjectPage from "./Pages/Projects";
import ProjectDetailsPage from "./Pages/ProjectDetails";
import MyTicketsPage from "./Pages/MyTickets";
import Layout, { AppLayout } from "./Pages/Layout";
import RegisterPage from "./Pages/RegisterPage";
import ErrorBoundary from "./Pages/ErrorBoundary";
import Home from "./Pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path={"/login"} element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />} errorElement={<ErrorBoundary />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:name" element={<ProjectDetailsPage />} />
          <Route path="/my-tickets/:userId" element={<MyTicketsPage />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
