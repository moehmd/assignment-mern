import React from "react"
import { Routes, Route, Link } from "react-router-dom"
import Employees from "./Employees"

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="Employees">Employees</Link>
          </li>
        </ul>
      </nav>
      <div className="main">
        {/* Define all the routes */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="Employees" element={<Employees />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  )
};

export const Home = () => {
  return <div>Welcome to Homework1</div>
};

export const NotFound = () => {
  return <div>This is a 404 page</div>
};

export default App