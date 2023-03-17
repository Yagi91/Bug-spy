import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RouterProvider, createBrowserRouter, } from 'react-router-dom';
import ParentRoute from './Pages/ProtectedRoute';
import LoginPage from './Pages/Auth';

function App() {
  return (
    <Router>
      <main className='container content App'>
        <Routes>
          {/* <Route path={["/login", "/auth", "register"]} element={<LoginPage />} /> */}
          {["/login", "/auth", "register"].map((path) => <Route key={path} path={path} element={<LoginPage />} />)}
          <Route element={<ParentRoute />} >
            <Route path='/' element={<LoginPage />} />
          </Route>
        </Routes>
      </main>
    </Router >
  );
}

export default App;
