import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import ParentRoute from './Pages/ProtectedRoute';
import LoginPage from './Pages/Auth';
import ProjectPage from './Pages/Projects';

function App() {
  return (
    <Router>
      <main className='container content App'>
        <Routes>
          {/* <Route path={["/login", "/auth", "register"]} element={<LoginPage />} /> */}
          {["/auth"].map((path) => <Route key={path} path={path} element={<LoginPage />} />)}
          <Route element={<ParentRoute />} >
            <Route path='/' element={<LoginPage />} />
          </Route>
          <Route path='/projects' element={<ProjectPage />} />
        </Routes>
      </main>
    </Router >
  );
}

export default App;
